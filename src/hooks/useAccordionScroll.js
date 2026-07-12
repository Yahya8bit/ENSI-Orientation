import { useCallback, useRef } from 'react'

const NAVBAR_HEIGHT = 72
const TOP_MARGIN = 16
// Must match the accordion panels' own `transition-[grid-template-rows] duration-300`
// (Tailwind's default transition-timing-function) — see useAccordionScroll below for why.
const DURATION_MS = 300

// Cubic-bezier evaluator (Newton-Raphson on the bezier's x(t), same approach browsers use
// internally), so our manual scroll interpolation follows the exact same easing curve as
// the CSS grid-template-rows transition running at the same time — that's what makes the
// panel expanding/collapsing and the page scrolling read as one continuous glide instead
// of two separate movements.
function makeCubicBezier(mX1, mY1, mX2, mY2) {
  const A = (a1, a2) => 1 - 3 * a2 + 3 * a1
  const B = (a1, a2) => 3 * a2 - 6 * a1
  const C = (a1) => 3 * a1
  const calcBezier = (t, a1, a2) => ((A(a1, a2) * t + B(a1, a2)) * t + C(a1)) * t
  const getSlope = (t, a1, a2) => 3 * A(a1, a2) * t * t + 2 * B(a1, a2) * t + C(a1)
  function getTForX(x) {
    let t = x
    for (let i = 0; i < 6; i++) {
      const slope = getSlope(t, mX1, mX2)
      if (slope === 0) return t
      t -= (calcBezier(t, mX1, mX2) - x) / slope
    }
    return t
  }
  return (x) => (x <= 0 ? 0 : x >= 1 ? 1 : calcBezier(getTForX(x), mY1, mY2))
}

const EASE = makeCubicBezier(0.4, 0, 0.2, 1) // Tailwind's default transition timing function

// Each accordion item is rendered as <wrapper><button/><panel/></wrapper> (see
// CurriculumSection / PathwaysSection) — find the sibling wrapper whose panel is
// currently expanded (gridTemplateRows: '1fr'), i.e. the one about to collapse.
function findOpenSibling(itemEl) {
  const container = itemEl.parentElement
  if (!container) return null
  for (const child of container.children) {
    if (child === itemEl) continue
    const panel = child.children[1]
    if (panel && panel.style.gridTemplateRows === '1fr') return { itemEl: child, panelEl: panel }
  }
  return null
}

// Single-open accordions (curriculum semesters, specialization cards) collapse a sibling
// above the clicked item when opening a new one, which shifts the page. Rather than
// waiting for the collapse/expand transitions to finish and then scrolling (two separate,
// clunky movements), this computes the FINAL resting scroll position up front — using the
// collapsing sibling's current height, measured before the state change — and drives the
// scroll itself over the same duration/easing as the CSS transition, so both animate as
// one motion. Never fires on close, skips when no adjustment is needed, and yields to the
// user the moment they scroll or wheel themselves, or click another item.
export function useAccordionScroll(openId, setOpen) {
  const rafRef = useRef(null)
  const cleanupRef = useRef(null)

  const stop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    if (cleanupRef.current) {
      cleanupRef.current()
      cleanupRef.current = null
    }
  }, [])

  const toggle = useCallback(
    (id, headerEl) => {
      stop()

      const willOpen = openId !== id
      setOpen((current) => (current === id ? null : id))

      if (!willOpen || !headerEl) return

      const itemEl = headerEl.parentElement
      const currentTop = headerEl.getBoundingClientRect().top

      let collapsingHeight = 0
      if (itemEl) {
        const sibling = findOpenSibling(itemEl)
        if (sibling) {
          const siblingIsAbove = !!(itemEl.compareDocumentPosition(sibling.itemEl) & Node.DOCUMENT_POSITION_PRECEDING)
          if (siblingIsAbove) collapsingHeight = sibling.panelEl.getBoundingClientRect().height
        }
      }

      const startY = window.scrollY
      const finalTargetY = currentTop + startY - collapsingHeight - NAVBAR_HEIGHT - TOP_MARGIN
      const delta = finalTargetY - startY

      // Already where it needs to be — don't yank the page for a no-op adjustment.
      if (Math.abs(delta) < 2) return

      let cancelled = false
      const cancel = () => {
        cancelled = true
      }
      window.addEventListener('wheel', cancel, { passive: true, once: true })
      window.addEventListener('touchmove', cancel, { passive: true, once: true })
      cleanupRef.current = () => {
        window.removeEventListener('wheel', cancel)
        window.removeEventListener('touchmove', cancel)
      }

      const start = performance.now()
      function step(now) {
        if (cancelled) {
          rafRef.current = null
          return
        }
        const progress = Math.min((now - start) / DURATION_MS, 1)
        window.scrollTo(0, startY + delta * EASE(progress))
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step)
        } else {
          rafRef.current = null
          cleanupRef.current?.()
          cleanupRef.current = null
        }
      }
      rafRef.current = requestAnimationFrame(step)
    },
    [openId, setOpen, stop],
  )

  return toggle
}

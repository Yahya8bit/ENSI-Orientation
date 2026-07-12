import { useEffect, useRef, useState } from 'react'

function formatFR(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

// Animates 0 -> target once `start` flips true (typically driven by useInView),
// easing with the same cubic curve used elsewhere for scroll reveals.
export function useCountUp(target, { start = false, duration = 1200, prefix = '', suffix = '', plain = false } = {}) {
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!start || startedRef.current) return
    startedRef.current = true
    const startTime = performance.now()
    let raf
    const step = (now) => {
      const p = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])

  // Before the count-up starts, match the original's rest state: prefix shown (it was
  // baked into the initial static markup, e.g. "~0"), suffix not (e.g. "0" not "0+").
  if (!start) return `${prefix}0`
  return `${prefix}${plain ? value : formatFR(value)}${suffix}`
}

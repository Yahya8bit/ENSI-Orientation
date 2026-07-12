import { useEffect, useRef } from 'react'

// Thin bar fixed just below the navbar. Desktop: horizontal, fills left-to-right.
// Mobile (<=768px): vertical, pinned to the right edge, fills top-to-bottom.
// Both read the same --scroll-progress custom property; only the Tailwind
// max-[768px]: variant differs on which dimension (width vs height) uses it.
function ScrollProgress() {
  const trackRef = useRef(null)

  useEffect(() => {
    function update() {
      const max = document.body.scrollHeight - window.innerHeight
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0
      trackRef.current?.style.setProperty('--scroll-progress', `${pct}%`)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      ref={trackRef}
      style={{ '--scroll-progress': '0%' }}
      className="fixed left-0 right-0 top-[72px] z-[99] h-1 max-[768px]:left-auto max-[768px]:right-0 max-[768px]:bottom-0 max-[768px]:h-auto max-[768px]:w-1"
    >
      <div className="h-full w-[var(--scroll-progress)] bg-gradient-to-r from-ensi-blue to-ensi-accent max-[768px]:h-[var(--scroll-progress)] max-[768px]:w-full max-[768px]:bg-gradient-to-b" />
    </div>
  )
}

export default ScrollProgress

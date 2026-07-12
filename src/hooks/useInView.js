import { useEffect, useState } from 'react'

// IntersectionObserver-based scroll reveal: fires once when the observed element
// enters the viewport, then stops observing it. Pass in your own ref so callers
// can reuse it for other purposes (scroll-to targets, etc).
export function useInView(ref, options = { threshold: 0.3 }) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.unobserve(entry.target)
        }
      })
    }, options)
    obs.observe(el)
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current])

  return inView
}

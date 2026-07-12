import { useRef } from 'react'
import { useInView } from '../hooks/useInView.js'

// Fade + slight slide-up entrance, triggered once via useInView. Kept as its own
// wrapper element so the reveal transition never collides with an inner element's
// own hover transform/transition (e.g. a club tile's hover lift).
function Reveal({ children, className = '', as: Tag = 'div', registerRef, ...rest }) {
  const ref = useRef(null)
  const inView = useInView(ref, { threshold: 0.3 })

  return (
    <Tag
      ref={(el) => {
        ref.current = el
        registerRef?.(el)
      }}
      className={`transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Reveal

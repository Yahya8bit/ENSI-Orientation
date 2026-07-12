import { useEffect } from 'react'

// Combines the old trapFocus (Tab wrapping), handleModalKey (Escape),
// and arrowTrapHandler/enableArrowTrap/disableArrowTrap (Up/Down scrolls the
// overlay, not the page behind it) into one hook, shared by the drawer and the club modal.
export function useFocusTrap(ref, isOpen, onClose) {
  useEffect(() => {
    if (!isOpen || !ref.current) return
    const container = ref.current

    function handleKeydown(e) {
      if (e.key === 'Escape') {
        onClose?.()
        return
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        container.scrollBy({ top: e.key === 'ArrowDown' ? 80 : -80, behavior: 'auto' })
        return
      }
      if (e.key !== 'Tab') return
      const focusable = [...container.querySelectorAll('button,a,[tabindex]:not([tabindex="-1"])')].filter(
        (el) => !el.disabled,
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [ref, isOpen, onClose])
}

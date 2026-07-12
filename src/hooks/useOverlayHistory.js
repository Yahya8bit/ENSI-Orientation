import { useEffect, useRef } from 'react'
import { pushOverlay, popOverlay } from '../lib/overlayHistory.js'

// Pushes a history entry while `isOpen` is true so the browser/Android back
// button closes this overlay instead of navigating away. `onClose(fromPopstate)`
// is called either way (user action or back button).
export function useOverlayHistory(isOpen, onClose) {
  const entryRef = useRef(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (isOpen) {
      entryRef.current = pushOverlay((fromPopstate) => onCloseRef.current(fromPopstate))
    } else if (entryRef.current) {
      popOverlay(entryRef.current)
      entryRef.current = null
    }
  }, [isOpen])
}

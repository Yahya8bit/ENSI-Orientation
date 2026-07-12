import { useState } from 'react'
import { subjectFullName } from '../lib/modules.js'

// Replaces initCodeTooltips(): hover shows the subject-name tooltip on desktop,
// tap toggles it (auto-hides after 2s) on touch devices, via its own local state
// instead of global DOM listeners.
function ModuleCode({ code, color, className = '', onClick, noTip = false }) {
  const [tipShown, setTipShown] = useState(false)
  const tip = noTip ? null : subjectFullName(code)

  function handleTouchStart(e) {
    if (!tip) return
    e.preventDefault()
    e.stopPropagation()
    setTipShown((wasShown) => {
      if (!wasShown) setTimeout(() => setTipShown(false), 2000)
      return !wasShown
    })
  }

  return (
    <span
      className={`${tip ? 'code-tip' : ''} font-mono text-xs font-bold ${tipShown ? 'tip-show' : ''} ${className}`}
      style={color ? { color } : undefined}
      data-tip={tip || undefined}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
      onTouchStart={handleTouchStart}
    >
      {code}
    </span>
  )
}

export default ModuleCode

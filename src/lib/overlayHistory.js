// Generic "back button closes the topmost overlay" stack, shared by the drawer,
// club modal, and accordions. Replaces the old pushOverlayHistory/popOverlayHistoryIfNeeded
// pattern with a proper LIFO stack instead of a hand-checked priority order.
const stack = []
let ignoreNextPopstate = false

// Without this, history.back() below makes the browser silently restore whatever
// scroll position was active when the corresponding pushState happened — fighting
// our own explicit accordion/drawer scroll logic (e.g. snapping back on close).
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

window.addEventListener('popstate', () => {
  if (ignoreNextPopstate) {
    ignoreNextPopstate = false
    return
  }
  const top = stack.pop()
  if (top) top.onClose(true)
})

export function pushOverlay(onClose) {
  const entry = { onClose }
  stack.push(entry)
  history.pushState({ ensiOverlay: true, depth: stack.length }, '')
  return entry
}

export function popOverlay(entry) {
  const idx = stack.indexOf(entry)
  if (idx === -1) return // already popped by a popstate event
  stack.splice(idx, 1)
  ignoreNextPopstate = true
  history.back()
}

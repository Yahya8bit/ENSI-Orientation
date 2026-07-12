// Pure lookup helpers for module codes (e.g. "AI.5.3" -> subject full name).
import { SUBJECT_FULLNAMES } from '../data/modules.js'

export function subjectFullName(code) {
  const prefix = (code.match(/^[A-Z]+/) || [])[0]
  return SUBJECT_FULLNAMES[prefix] || ''
}

export function codeTipAttr(code) {
  const full = subjectFullName(code)
  return full ? `data-tip="${full}"` : ''
}

export function codeTip(code) {
  const attr = codeTipAttr(code)
  return attr ? `class="code-tip" ${attr}` : ''
}

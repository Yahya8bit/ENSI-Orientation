// Specialization detail accordion cards (single item open, replacing toggleSpecAcc).
import { useState } from 'react'
import { SPECIALIZATIONS, SPEC_BADGE_LABEL } from '../data/specializations.js'
import { MODULES, SUBJECT_COLORS } from '../data/modules.js'
import { useOverlayHistory } from '../hooks/useOverlayHistory.js'
import { useAccordionScroll } from '../hooks/useAccordionScroll.js'
import { useOverlay } from '../context/OverlayContext.jsx'
import ModuleCode from './ModuleCode.jsx'
import Reveal from './Reveal.jsx'

const modByCode = Object.fromEntries(MODULES.map((m) => [m.code, m]))

function ModuleGrid({ mods, accent, onSelect }) {
  if (!mods.length) return null
  return (
    <div className="grid grid-cols-3 items-stretch gap-3 max-[768px]:grid-cols-1">
      {mods.map((m) => {
        const sc = SUBJECT_COLORS[m.subject] || accent
        return (
          <button
            key={m.code}
            onClick={() => onSelect(m.code)}
            className="relative flex w-full flex-col gap-1.5 rounded-[10px] border border-ensi-cardgray bg-white p-3.5 text-left transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-md"
            style={{ borderLeft: `3px solid ${sc}` }}
          >
            <ModuleCode code={m.code} color={sc} noTip />
            <span className="pr-5 font-body text-sm font-bold leading-[1.3] text-ensi-navy">{m.title}</span>
            <span className="absolute bottom-2.5 right-3 text-2xl font-bold leading-none opacity-55" style={{ color: sc }}>›</span>
          </button>
        )
      })}
    </div>
  )
}

function PathwaysSection() {
  const [openSpec, setOpenSpec] = useState(null)
  const { openDrawer } = useOverlay()

  useOverlayHistory(openSpec !== null, () => setOpenSpec(null))

  // Clicking a card's own header while it (or a sibling above it) is already open/closing
  // must keep that header anchored on screen — see useAccordionScroll.
  const toggleSpecAnchored = useAccordionScroll(openSpec, setOpenSpec)

  return (
    <section id="section-pathways" className="bg-white py-20">
        <div className="mb-10 px-[10vw] max-[768px]:px-4">
          <p className="mb-4 font-display text-[0.8125rem] font-bold uppercase tracking-[-0.01em] text-ensi-blue">
            SPÉCIALISATIONS DU SEMESTRE 5
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-ensi-navy">
            Choisissez votre <span className="text-ensi-accent">coloration.</span>
          </h2>
        </div>
        <div className="border-t border-ensi-cardgray">
          {SPECIALIZATIONS.map((sp) => {
            const spComp = (sp.compulsory || []).map((code) => modByCode[code]).filter(Boolean)
            const spOpt = (sp.optional || []).map((code) => modByCode[code]).filter(Boolean)
            const isOpen = openSpec === sp.id
            return (
              <Reveal
                key={sp.id}
                id={`spec-${sp.id}`}
                className="w-full scroll-mt-[88px] overflow-hidden border-b border-ensi-cardgray bg-white"
              >
                <button
                  onClick={(e) => toggleSpecAnchored(sp.id, e.currentTarget)}
                  className="group relative flex h-[126px] w-full items-center gap-5 overflow-hidden px-[10vw] text-left max-[768px]:px-4"
                  style={{ background: `${sp.color}06`, '--sp-color': sp.color }}
                >
                  <span
                    className="pointer-events-none absolute inset-0 left-0 top-0 h-full w-0 bg-[var(--sp-color)] transition-[width] duration-[400ms] ease-out group-hover:w-full"
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute right-[10vw] top-1/2 z-[1] -translate-y-1/2 select-none font-mono text-[6rem] font-bold leading-none opacity-[0.09] transition-[color,opacity] duration-300 group-hover:text-white group-hover:opacity-[0.15] max-[768px]:hidden"
                    style={{ color: sp.color }}
                    aria-hidden="true"
                  >
                    {SPEC_BADGE_LABEL[sp.id] || sp.id}
                  </div>
                  <div
                    className="relative z-[1] flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg font-mono text-2xl font-semibold transition-colors duration-300 group-hover:bg-white/25 group-hover:text-white"
                    style={{ color: sp.color, background: `${sp.color}15` }}
                  >
                    {SPEC_BADGE_LABEL[sp.id] || sp.id}
                  </div>
                  <span className="relative z-[1] min-w-0 flex-1 font-display text-[1.1rem] font-extrabold text-ensi-navy transition-colors duration-300 group-hover:text-white">
                    {sp.nameFr}
                  </span>
                  <span
                    className="relative z-[1] flex-shrink-0 text-2xl font-bold transition-[transform,color] duration-200 group-hover:text-white"
                    style={{ color: sp.color, transform: isOpen ? 'rotate(90deg)' : 'none' }}
                  >
                    ›
                  </span>
                </button>
                <div className="grid overflow-hidden transition-[grid-template-rows] duration-300" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                  <div className="min-h-0">
                    <div className="flex items-start gap-4 border-t px-[10vw] py-6 max-[768px]:px-4" style={{ background: `${sp.color}06`, borderColor: `${sp.color}25` }}>
                      <p className="text-sm italic text-gray-400">{sp.name}</p>
                    </div>
                    <div className="flex w-full flex-col gap-5 overflow-hidden px-[10vw] py-5 max-[768px]:px-4">
                      {spComp.length > 0 && (
                        <div className="w-full">
                          <div className="mb-2.5 text-[0.72rem] font-bold uppercase tracking-[0.1em]" style={{ color: sp.color }}>
                            Obligatoire · {spComp.length} modules
                          </div>
                          <ModuleGrid mods={spComp} accent={sp.color} onSelect={openDrawer} />
                        </div>
                      )}
                      {spOpt.length > 0 && (
                        <div className="w-full">
                          <div className="mb-2.5 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-gray-400">
                            Optionnel · {spOpt.length} modules
                          </div>
                          <ModuleGrid mods={spOpt} accent={sp.color} onSelect={openDrawer} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>
  )
}

export default PathwaysSection

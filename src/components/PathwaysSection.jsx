// "Choisissez votre coloration" strips (with touch-active fill, replacing initSpecStripTouch)
// + specialization detail accordion cards (single item open, replacing toggleSpecAcc).
import { useRef, useState } from 'react'
import { SPECIALIZATIONS, SPEC_BADGE_LABEL } from '../data/specializations.js'
import { MODULES, SUBJECT_COLORS } from '../data/modules.js'
import { useOverlayHistory } from '../hooks/useOverlayHistory.js'
import { useAccordionScroll } from '../hooks/useAccordionScroll.js'
import { useOverlay } from '../context/OverlayContext.jsx'
import ModuleCode from './ModuleCode.jsx'
import Reveal from './Reveal.jsx'

const SPEC_KEYWORDS = {
  AI: 'Apprentissage automatique · Deep learning · NLP · Systèmes cognitifs',
  GL: 'Qualité logicielle · DevOps · Cloud · Architecture',
  CV: 'Vision par ordinateur · Reconnaissance de formes · Big data · Imagerie médicale',
  IF: 'Finance quantitative · Trading algorithmique · Blockchain · Risque',
  SLE: 'Temps réel · FPGA · Protocoles IoT · Linux embarqué',
  'ST-IoT': 'Cloud computing · Microservices · Applications IoT · Sécurité réseau',
}

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
            <ModuleCode code={m.code} color={sc} />
            <span className="pr-5 font-body text-sm font-bold leading-[1.3] text-ensi-navy">{m.title}</span>
            <span className="absolute bottom-2.5 right-3 text-2xl font-bold leading-none opacity-55" style={{ color: sc }}>›</span>
          </button>
        )
      })}
    </div>
  )
}

function PathwaysSection() {
  const [activeStripId, setActiveStripId] = useState(null)
  const [openSpec, setOpenSpec] = useState(null)
  const itemRefs = useRef({})
  const { openDrawer } = useOverlay()

  useOverlayHistory(openSpec !== null, () => setOpenSpec(null))

  // Clicking a card's own header while it (or a sibling above it) is already open/closing
  // must keep that header anchored on screen — see useAccordionScroll.
  const toggleSpecAnchored = useAccordionScroll(openSpec, setOpenSpec)

  function toggleSpec(id) {
    setOpenSpec((current) => (current === id ? null : id))
  }

  // The strip nav links a potentially far-off-screen card into view, so unlike the
  // card's own header, we deliberately DO jump the page here.
  function handleStripClick(e, id) {
    e.preventDefault()
    const willOpen = openSpec !== id
    toggleSpec(id)
    if (willOpen) {
      requestAnimationFrame(() => {
        const item = itemRefs.current[id]
        if (!item) return
        const nav = document.getElementById('navbar')
        const offset = (nav?.offsetHeight || 72) + 16
        const top = item.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: 'auto' })
      })
    }
  }

  // Touch devices have no hover — a tap toggles the fill state instead, matching initSpecStripTouch.
  function handleStripTouchStart(id) {
    if (window.matchMedia('(max-width:768px)').matches !== true) return
    setActiveStripId((current) => (current === id ? null : id))
  }

  return (
    <>
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
            const badge = SPEC_BADGE_LABEL[sp.id] || sp.id
            const forced = activeStripId === sp.id
            return (
              <a
                key={sp.id}
                href={`#spec-${sp.id}`}
                onClick={(e) => handleStripClick(e, sp.id)}
                onTouchStart={() => handleStripTouchStart(sp.id)}
                className={`group relative flex items-center gap-5 overflow-hidden border-b border-l-[3px] border-ensi-cardgray bg-white px-[10vw] py-5 no-underline hover:border-l-[var(--sp-color)] max-[768px]:gap-3 max-[768px]:px-4 ${
                  forced ? 'border-l-[var(--sp-color)]' : 'border-l-transparent'
                }`}
                style={{ '--sp-color': sp.color }}
              >
                <span
                  className={`pointer-events-none absolute inset-0 left-0 top-0 h-full bg-[var(--sp-color)] transition-[width] duration-[400ms] ease-out group-hover:w-full ${
                    forced ? 'w-full' : 'w-0'
                  }`}
                  aria-hidden="true"
                />
                <div
                  className={`relative z-[1] flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--sp-color)] shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-colors duration-300 group-hover:bg-white/25 ${
                    forced ? 'bg-white/25' : ''
                  }`}
                >
                  <span className="text-center font-mono text-[0.8rem] font-bold leading-[1.3] tracking-[0.02em] text-white">
                    {badge}
                  </span>
                </div>
                <div className="relative z-[1] min-w-0 flex-1">
                  <div
                    className={`mb-0.5 font-display text-[1.05rem] font-medium text-ensi-navy transition-colors duration-300 group-hover:text-white/90 ${
                      forced ? 'text-white/90' : ''
                    }`}
                  >
                    {sp.nameFr}
                  </div>
                  <div
                    className={`mb-1.5 text-[0.78rem] text-gray-400 transition-colors duration-300 group-hover:text-white/90 ${
                      forced ? 'text-white/90' : ''
                    }`}
                  >
                    {sp.id}
                  </div>
                  <div
                    className={`text-[0.8rem] text-[var(--sp-color)] transition-colors duration-300 group-hover:text-white/90 ${
                      forced ? 'text-white/90' : ''
                    }`}
                  >
                    {SPEC_KEYWORDS[sp.id] || ''}
                  </div>
                </div>
                <div
                  className={`absolute right-[10vw] top-1/2 z-[1] -translate-y-1/2 select-none font-mono text-[6rem] font-bold leading-none text-[var(--sp-color)] opacity-[0.09] transition-[color,opacity] duration-300 group-hover:text-white group-hover:opacity-[0.15] max-[768px]:hidden ${
                    forced ? 'text-white opacity-[0.15]' : ''
                  }`}
                >
                  {badge}
                </div>
                <span
                  className={`relative z-[1] ml-auto flex-shrink-0 text-[1.1rem] text-[var(--sp-color)] transition-[color,transform] duration-200 group-hover:translate-x-[5px] group-hover:text-white ${
                    forced ? 'translate-x-[5px] text-white' : ''
                  }`}
                >
                  →
                </span>
              </a>
            )
          })}
        </div>
      </section>

      {/* SPECIALIZATION DETAIL CARDS */}
      <section className="px-[10vw] py-16 max-[768px]:px-4">
        <div className="flex flex-col gap-7">
          {SPECIALIZATIONS.map((sp) => {
            const spComp = (sp.compulsory || []).map((code) => modByCode[code]).filter(Boolean)
            const spOpt = (sp.optional || []).map((code) => modByCode[code]).filter(Boolean)
            const isOpen = openSpec === sp.id
            return (
              <Reveal
                key={sp.id}
                id={`spec-${sp.id}`}
                registerRef={(el) => (itemRefs.current[sp.id] = el)}
                className="w-full overflow-hidden rounded-[14px] border border-ensi-cardgray bg-white"
              >
                <button
                  onClick={(e) => toggleSpecAnchored(sp.id, e.currentTarget)}
                  className="flex w-full items-center gap-4 border-b px-7 py-5 text-left"
                  style={{ background: `${sp.color}06`, borderColor: `${sp.color}25` }}
                >
                  <div
                    className="flex-shrink-0 rounded-lg px-3.5 py-2.5 font-mono text-2xl font-semibold"
                    style={{ color: sp.color, background: `${sp.color}15` }}
                  >
                    {SPEC_BADGE_LABEL[sp.id] || sp.id}
                  </div>
                  <span className="min-w-0 flex-1 font-display text-[1.1rem] font-extrabold text-ensi-navy">{sp.nameFr}</span>
                  <span
                    className="flex-shrink-0 text-2xl font-bold transition-transform duration-200"
                    style={{ color: sp.color, transform: isOpen ? 'rotate(90deg)' : 'none' }}
                  >
                    ›
                  </span>
                </button>
                <div className="grid overflow-hidden transition-[grid-template-rows] duration-300" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                  <div className="min-h-0">
                    <div className="flex items-start gap-4 border-b px-7 py-6" style={{ background: `${sp.color}06`, borderColor: `${sp.color}25` }}>
                      <div>
                        <p className="mb-2 text-sm italic text-gray-400">{sp.name}</p>
                        <p className="text-sm text-gray-600">{sp.desc}</p>
                      </div>
                    </div>
                    <div className="flex w-full flex-col gap-5 overflow-hidden px-7 py-5">
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
    </>
  )
}

export default PathwaysSection

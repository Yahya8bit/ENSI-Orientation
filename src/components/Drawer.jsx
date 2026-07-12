import { useEffect, useRef, useState } from 'react'
import { MODULES, MODULE_HANDBOOK, SUBJECT_COLORS } from '../data/modules.js'
import { useFocusTrap } from '../hooks/useFocusTrap.js'
import { useOverlayHistory } from '../hooks/useOverlayHistory.js'
import ModuleCode from './ModuleCode.jsx'

const LANG_COLORS = { French: '#6366F1', English: '#059669', Both: '#D97706' }
const LANG_LABELS = { French: 'Français', English: 'Anglais', Both: 'Bilingue' }

function Tag({ children, bg, color, border }) {
  return (
    <span
      className="font-body inline-flex items-center rounded-full px-2.5 py-1 text-[0.78rem] font-semibold tracking-[0.02em]"
      style={{ background: bg, color, border: border ? `1px solid ${border}` : 'none' }}
    >
      {children}
    </span>
  )
}

function Section({ id, title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-slate-100">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between bg-transparent py-3.5 text-left"
      >
        <span className="font-display text-sm font-bold tracking-[0.02em] text-ensi-navy">{title}</span>
        <span
          className="text-ensi-blue text-sm transition-transform duration-200"
          style={{ transform: open ? 'rotate(0)' : 'rotate(-90deg)' }}
        >
          ▼
        </span>
      </button>
      <div className="grid overflow-hidden transition-[grid-template-rows] duration-200" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div className="min-h-0">{children}</div>
      </div>
    </div>
  )
}

function Drawer({ moduleCode, onClose }) {
  const drawerRef = useRef(null)
  const isOpen = !!moduleCode
  useFocusTrap(drawerRef, isOpen, onClose)
  useOverlayHistory(isOpen, onClose)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      if (drawerRef.current) drawerRef.current.scrollTop = 0
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const base = moduleCode ? MODULES.find((x) => x.code === moduleCode) : null
  const hb = (base && MODULE_HANDBOOK[base.code]) || {}
  const m = base
    ? {
        ...base,
        objectives: hb.objectives?.length ? hb.objectives : base.objectives || [],
        content: hb.content?.length ? hb.content : base.content || [],
      }
    : null

  const subColor = m ? SUBJECT_COLORS[m.subject] || '#6B7280' : '#6B7280'

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-ensi-navy/55 transition-opacity duration-[250ms] ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        className={`fixed right-0 top-0 z-[200] flex h-screen w-[480px] max-w-full flex-col overflow-y-auto border-l-2 border-ensi-blue bg-white transition-transform duration-[250ms] ease-[cubic-bezier(.4,0,.2,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } max-[768px]:w-screen`}
      >
        {m && (
          <>
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-3">
              <ModuleCode code={m.code} color={subColor} />
              <button
                onClick={onClose}
                aria-label="Fermer"
                className="flex min-h-9 min-w-9 items-center justify-center rounded-md bg-ensi-gray text-xl leading-none text-ensi-navy"
              >
                &times;
              </button>
            </div>
            <div className="px-6 pt-6">
              <h2 className="mb-4 font-display text-[1.35rem] font-bold leading-[1.3] text-ensi-navy">{m.title}</h2>
              <div className="mb-6 flex flex-wrap gap-1.5">
                <Tag bg="#1B2A4A14" color="#1B2A4A">S{m.semester}</Tag>
                <Tag bg="#4DB8E814" color="#0891B2">{m.credits} ECTS</Tag>
                <Tag bg={`${LANG_COLORS[m.language] || '#6B7280'}14`} color={LANG_COLORS[m.language] || '#6B7280'}>
                  {LANG_LABELS[m.language] || m.language}
                </Tag>
                <Tag bg={m.type === 'Compulsory' ? '#1B2A4A12' : '#4DB8E814'} color={m.type === 'Compulsory' ? '#1B2A4A' : '#0891B2'}>
                  {m.type === 'Compulsory' ? 'Obligatoire' : 'Optionnel'}
                </Tag>
                <Tag bg={`${subColor}33`} color={subColor} border={`${subColor}66`}>{m.subject}</Tag>
              </div>
              {(m.teachingTeam || m.responsible) && (
                <div className="mb-6 text-sm text-gray-500">
                  <span className="font-semibold text-ensi-navy">Équipe pédagogique : </span>
                  {m.teachingTeam || m.responsible}
                </div>
              )}
            </div>
            <div className="px-6 pb-6">
              {m.prerequisites?.length > 0 && (
                <Section id="prereq" title="Prérequis">
                  <ul className="list-none space-y-1.5 pb-4">
                    {m.prerequisites.map((p, i) => (
                      <li key={i} className="font-body flex items-start gap-2 text-sm font-semibold leading-relaxed text-slate-700">
                        <span className="mt-0.5 flex-shrink-0 text-ensi-blue">▸</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </Section>
              )}
              <Section id="obj" title="Objectifs">
                <ul className="list-none space-y-2.5 pb-4">
                  {(m.objectives || []).map((o, i) => (
                    <li key={i} className="font-body flex items-start gap-2 text-sm font-semibold leading-relaxed text-slate-700">
                      <span className="mt-0.5 flex-shrink-0 text-ensi-blue">▸</span>
                      {o}
                    </li>
                  ))}
                </ul>
              </Section>
              <Section id="content" title="Contenu">
                <ul className="list-none space-y-2.5 pb-4">
                  {(m.content || []).map((c, i) => (
                    <li key={i} className="font-body flex items-start gap-2.5 text-sm font-semibold leading-relaxed text-slate-700">
                      <span className="mt-0.5 flex-shrink-0 rounded bg-ensi-blue/10 px-1 font-mono text-[0.7rem] font-bold text-ensi-blue">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              </Section>
              <Section id="workload" title="Volume horaire">
                <div className="grid grid-cols-2 gap-2 pb-3">
                  {[
                    ['Total', m.hours.total],
                    ['Cours', m.hours.lecture],
                    ['TP', m.hours.lab],
                    ['Travail personnel', m.hours.selfStudy],
                  ].map(([l, v]) => (
                    <div key={l} className="rounded-lg bg-ensi-gray p-3">
                      <div className="mb-0.5 text-[0.7rem] font-medium uppercase tracking-[0.06em] text-gray-500">{l}</div>
                      <div className="font-display text-xl font-bold text-ensi-navy">
                        {v}
                        <span className="ml-0.5 text-[0.7rem] text-gray-400">h</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
              <Section id="exam" title="Évaluation">
                <div className="pb-3 text-sm text-gray-700">
                  <div className="mb-1">{m.examForm}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-gray-500">Note de passage</span>
                    <span className="font-mono text-[0.85rem] font-semibold text-emerald-600">{m.passMark}</span>
                  </div>
                </div>
              </Section>
              {m.readingList?.length > 0 && (
                <Section id="reading" title="Bibliographie" defaultOpen={false}>
                  <ul className="list-none space-y-1.5 pb-4">
                    {m.readingList.map((r, i) => (
                      <li key={i} className="text-sm leading-relaxed text-gray-600">
                        {r}
                      </li>
                    ))}
                  </ul>
                </Section>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Drawer

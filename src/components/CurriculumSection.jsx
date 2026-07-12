// Subject x semester matrix + per-semester module accordion (single item open at a time,
// matching the old _accOpen behavior: opening one closes any other, and scrolls it into view).
import { useState } from 'react'
import { MODULES, SUBJECT_COLORS } from '../data/modules.js'
import { useOverlayHistory } from '../hooks/useOverlayHistory.js'
import { useAccordionScroll } from '../hooks/useAccordionScroll.js'
import { useOverlay } from '../context/OverlayContext.jsx'
import ModuleCode from './ModuleCode.jsx'
import Reveal from './Reveal.jsx'

const SUBJECT_NAMES = {
  MAT: 'Mathématiques', AP: 'Algorithmique & Programmation', EHA: 'Électronique & Matériel',
  AI: 'Intelligence Artificielle', DAT: 'Données', OS: "Systèmes d'Exploitation",
  IMA: "Traitement d'Images", NET: 'Réseaux Informatiques', SE: 'Génie Logiciel',
  FIN: 'Finance', SEC: 'Sécurité', DDP: 'Projet de Développement', BDC: 'Business & Communication',
}

const MATRIX = [
  { code: 'MAT', data: [2, 2, 1, 1, 0] },
  { code: 'AP', data: [2, 3, 2, 0, 0] },
  { code: 'EHA', data: [2, 1, 1, 1, 0] },
  { code: 'AI', data: [1, 0, 1, 0, 0] },
  { code: 'DAT', data: [1, 1, 0, 0, 0] },
  { code: 'OS', data: [0, 1, 1, 0, 0] },
  { code: 'IMA', data: [0, 1, 0, 0, 0] },
  { code: 'NET', data: [0, 1, 2, 1, 0] },
  { code: 'SE', data: [0, 0, 2, 2, 0] },
  { code: 'FIN', data: [1, 0, 0, 1, 0] },
  { code: 'SEC', data: [0, 0, 0, 1, 0] },
  { code: 'DDP', data: [0, 0, 0, 1, 0] },
  { code: 'BDC', data: [2, 1, 1, 2, 3] },
]

const OPACITY = { 1: 'opacity-45', 2: 'opacity-70', 3: 'opacity-100' }
const SEMS = [1, 2, 3, 4, 5]

function CurriculumSection() {
  const [openSem, setOpenSem] = useState(null)
  const { openDrawer } = useOverlay()
  const toggleSem = useAccordionScroll(openSem, setOpenSem)

  useOverlayHistory(openSem !== null, () => setOpenSem(null))

  return (
    <section id="curriculum-section" className="bg-white px-[10vw] py-20 max-[768px]:px-4">
      <p className="mb-4 font-display text-[0.8125rem] font-bold uppercase tracking-[-0.01em] text-ensi-blue">
        PLAN D'ÉTUDES
      </p>
      <h2 className="mb-7 font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-ensi-navy">
        Comment se déroule le <span className="text-ensi-accent">plan d'études.</span>
      </h2>

      <div className="hidden overflow-x-auto">
        <table className="w-full border-separate [border-spacing:16px_0]">
          <thead>
            <tr>
              <th className="w-[320px]" />
              {SEMS.map((s) => (
                <th key={s} className="w-[88px] select-none pb-5 text-center">
                  <span className="font-mono text-[1.375rem] font-bold tracking-[0.08em] text-ensi-blue">S{s}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MATRIX.map((row) => {
              const color = SUBJECT_COLORS[row.code] || '#6B7280'
              return (
                <tr key={row.code} className="transition-opacity duration-150">
                  <td className="w-[320px] whitespace-nowrap py-0.5 pr-8 align-middle">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-mono text-2xl font-bold" style={{ color }}>{row.code}</span>
                      <span className="text-[1.375rem] font-medium text-slate-600">{SUBJECT_NAMES[row.code] || ''}</span>
                    </div>
                  </td>
                  {row.data.map((cnt, i) => (
                    <td key={i} className="h-16 w-[88px] p-0.5 text-center align-middle">
                      {cnt === 0 ? (
                        <span className="text-2xl leading-none text-gray-300">·</span>
                      ) : (
                        <div
                          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-lg transition-[opacity,transform] duration-150 hover:!opacity-100 hover:scale-105 ${OPACITY[cnt]}`}
                          style={{ background: color }}
                          title={`${cnt} module${cnt > 1 ? 's' : ''}, ${row.code} en S${i + 1}`}
                        >
                          <span className="font-mono text-[1.625rem] font-bold text-white">{cnt}</span>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div>
        {SEMS.map((s) => {
          const mods = MODULES.filter((m) => m.semester === s && (s !== 5 || m.type === 'Compulsory'))
          const isOpen = openSem === s
          return (
            <Reveal key={s} as="div">
              <button
                onClick={(e) => toggleSem(s, e.currentTarget)}
                className="flex w-full items-center justify-between border-b border-ensi-cardgray bg-transparent py-4 text-left"
              >
                <span className="font-display text-base font-extrabold text-ensi-navy">Semestre {s}</span>
                <span
                  className="inline-block text-xl text-ensi-blue transition-transform duration-200"
                  style={{ transform: isOpen ? 'rotate(90deg)' : 'none' }}
                >
                  ›
                </span>
              </button>
              <div
                className="grid overflow-hidden transition-[grid-template-rows] duration-300"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div className="min-h-0">
                  <div className="grid grid-cols-3 items-stretch gap-3 py-4 max-[768px]:grid-cols-1">
                    {mods.map((m) => {
                      const sc = SUBJECT_COLORS[m.subject] || '#6B7280'
                      return (
                        <div
                          key={m.code}
                          onClick={() => openDrawer(m.code)}
                          className="relative flex cursor-pointer flex-col gap-1.5 rounded-[10px] border border-ensi-cardgray bg-white p-3.5 transition-[box-shadow,transform,background-color] duration-150 hover:-translate-y-0.5 hover:bg-[var(--hover-bg)] hover:shadow-md active:translate-y-0 active:shadow-sm"
                          style={{ borderLeft: `3px solid ${sc}`, '--hover-bg': `${sc}0d` }}
                        >
                          <ModuleCode code={m.code} color={sc} noTip />
                          <span className="pr-5 font-body text-sm font-bold leading-[1.3] text-ensi-navy">{m.title}</span>
                          <span className="absolute bottom-2.5 right-3 text-2xl font-bold leading-none opacity-55" style={{ color: sc }}>›</span>
                        </div>
                      )
                    })}
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

export default CurriculumSection

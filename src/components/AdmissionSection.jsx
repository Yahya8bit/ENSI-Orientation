// Admission cutoff-rank table. Each row's rank numbers count up from 0 to their
// final value once scrolled into view.
import { useRef } from 'react'
import { useInView } from '../hooks/useInView.js'
import { useCountUp } from '../hooks/useCountUp.js'

const TRACKS = [
  { track: 'Mathématiques-Physique', color: '#2563EB', seats: 150, r2024: 367, r2025: 410 },
  { track: 'Physique-Chimie', color: '#4DB8E8', seats: 25, r2024: 100, r2025: 110 },
  { track: 'Physique-Technologie', color: '#E63946', seats: 25, r2024: 69, r2025: 78 },
]

function AdmissionRow({ t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { threshold: 0.3 })
  const r2025 = useCountUp(t.r2025, { start: inView, plain: true })
  const r2024 = useCountUp(t.r2024, { start: inView, plain: true })

  return (
    <tr ref={ref} className="border-b border-ensi-navy/10">
      <td className="w-[45%] py-[22px] pr-8 align-middle">
        <div className="flex items-stretch gap-3">
          <div className="w-[5px] flex-shrink-0 self-stretch rounded" style={{ background: t.color }} />
          <div>
            <div
              className="font-display text-xl font-extrabold leading-[1.1] tracking-[-0.02em]"
              style={{ color: t.color }}
            >
              {t.track}
            </div>
            <div className="mt-[9px] font-mono text-base text-ensi-navy/40">{t.seats} places</div>
          </div>
        </div>
      </td>
      <td className="py-[22px] pr-8 align-middle font-mono text-[1.75rem] font-semibold text-ensi-navy">{r2025}</td>
      <td className="py-[22px] align-middle font-mono text-[1.75rem] font-semibold text-ensi-navy">{r2024}</td>
    </tr>
  )
}

function AdmissionSection() {
  return (
    <section id="section-admission" className="bg-white px-[10vw] py-24 max-[768px]:px-4">
      <p className="mb-4 font-display text-[0.8125rem] font-bold uppercase tracking-[-0.01em] text-ensi-blue">
        QUELLE SÉLECTIVITÉ ?
      </p>
      <h2 className="mb-4 font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-ensi-navy">
        Rang du <span className="text-ensi-accent">dernier admis</span>
      </h2>
      <p className="mb-10 max-w-[640px] text-base leading-relaxed text-ensi-navy/65">
        Chaque année, l'ENSI admet 200 étudiants répartis sur trois filières de prépa. Le rang du
        dernier admis est le dernier rang accepté dans chaque filière — plus il monte, plus vous
        pouvez être loin dans le classement et être quand même admis.
      </p>

      <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
        <table id="admission-table" className="w-full min-w-[480px] border-collapse max-[768px]:min-w-0">
          <thead>
            <tr className="border-b border-ensi-navy/15">
              <th className="py-0 pb-[18px] pr-8 text-left font-display text-base font-bold uppercase tracking-[-0.01em] text-ensi-navy/40">
                Filière
              </th>
              <th className="py-0 pb-[18px] pr-8 text-left font-display text-base font-bold uppercase tracking-[-0.01em] text-ensi-navy/40">
                2025
              </th>
              <th className="py-0 pb-[18px] text-left font-display text-base font-bold uppercase tracking-[-0.01em] text-ensi-navy/40">
                2024
              </th>
            </tr>
          </thead>
          <tbody>
            {TRACKS.map((t) => (
              <AdmissionRow key={t.track} t={t} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AdmissionSection

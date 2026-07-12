// Each bar's fill animates from 0% to its target % once scrolled into view,
// replacing the old initDegreeBars() IntersectionObserver.
import { useRef } from 'react'
import { DOUBLE_DIPLOMAS, COUNTRY_FLAGS, COUNTRY_BAR_COLORS } from '../data/doubleDiplomas.js'
import { useInView } from '../hooks/useInView.js'

const REAL_CODES = ['ECLyon', 'TSP', 'PASSAU', 'ENSEIRB', 'Canada']
const bars = DOUBLE_DIPLOMAS.filter((p) => REAL_CODES.includes(p.code)).sort((a, b) => b.total - a.total)
const maxCount = Math.max(...bars.map((p) => p.total))

function DegreeBar({ p }) {
  const ref = useRef(null)
  const inView = useInView(ref, { threshold: 0.3 })
  const color = COUNTRY_BAR_COLORS[p.country] || '#1B2A4A'
  const pct = ((p.total / maxCount) * 100).toFixed(1)
  const isNew = p.code === 'Canada'

  return (
    <div ref={ref}>
      <div className="mb-2 flex items-baseline gap-2">
        <span className="text-[1.1rem] leading-none">{COUNTRY_FLAGS[p.country] || ''}</span>
        <span className="font-display text-[0.95rem] font-bold text-ensi-navy">{p.name}</span>
        {isNew && (
          <span className="rounded bg-ensi-blue px-1.5 py-px font-mono text-[0.55rem] font-semibold uppercase tracking-[0.08em] text-white">
            NOUVEAU
          </span>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="h-[34px] flex-1 overflow-hidden rounded bg-gray-200">
          <div
            className="h-full rounded transition-[width] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ width: inView ? `${pct}%` : '0%', background: color }}
          />
        </div>
        <div className="min-w-[34px] flex-shrink-0 text-right font-mono text-[1.3rem] font-extrabold text-ensi-navy">
          {p.total}
        </div>
      </div>
    </div>
  )
}

function DoubleDegreesSection() {
  return (
    <section className="px-[10vw] py-24">
      <p className="mb-3 font-display text-[0.8125rem] font-bold uppercase tracking-[-0.01em] text-ensi-blue">
        DOUBLES DIPLÔMES
      </p>
      <h2 className="mb-4 font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-ensi-navy">
        Obtenez un second <span className="text-ensi-accent">diplôme</span> à l'étranger.
      </h2>
      <p className="mb-12 max-w-[640px] text-base text-gray-600">
        Les étudiants de l'ENSI peuvent effectuer un double diplôme dans des écoles d'ingénieurs
        partenaires en France, Allemagne et Canada (placements 2017–2023).
      </p>

      <div className="flex flex-col gap-6">
        {bars.map((p) => (
          <DegreeBar key={p.code} p={p} />
        ))}
      </div>
    </section>
  )
}

export default DoubleDegreesSection

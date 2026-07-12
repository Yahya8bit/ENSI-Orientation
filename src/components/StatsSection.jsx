// "By the Numbers" section. Each stat fades/slides in and counts up from 0
// to its final value once scrolled into view.
import { useRef } from 'react'
import { useInView } from '../hooks/useInView.js'
import { useCountUp } from '../hooks/useCountUp.js'

const STATS = [
  { target: 2500, suffix: '+', label: 'ingénieurs diplômés depuis 2013' },
  { target: 220, prefix: '~', label: 'nouveaux diplômés chaque année' },
  { target: 98, label: 'diplômés en double diplôme, 2013–2024' },
  { target: 1984, plain: true, label: "année de fondation de l'ENSI" },
]

const ACCREDITATIONS = [
  { logo: 'eur-ace.png', label: "EUR-ACE® Master · jusqu'en 2028" },
  { logo: 'asiin.jpg', label: "ASIIN · jusqu'en 2028" },
  { logo: '9001.jpeg', label: 'ISO 9001:2015 · jusqu\'en 2027' },
  { logo: 'iso.png', label: "ISO 21001:2018 · jusqu'en 2027" },
]

function StatItem({ stat }) {
  const ref = useRef(null)
  const inView = useInView(ref, { threshold: 0.3 })
  const display = useCountUp(stat.target, {
    start: inView,
    prefix: stat.prefix,
    suffix: stat.suffix,
    plain: stat.plain,
  })

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div className="font-display text-[3.5rem] font-extrabold leading-none tracking-[-0.03em] text-ensi-navy max-[768px]:text-4xl">
        {display}
      </div>
      <div className="mt-2 text-sm text-gray-500">{stat.label}</div>
    </div>
  )
}

function StatsSection() {
  return (
    <section id="section-numbers" className="bg-white px-[10vw] py-24 max-[768px]:px-6 max-[768px]:pb-16 max-[768px]:pt-12">
      <p className="mb-3 font-display text-[0.8125rem] font-bold uppercase tracking-[-0.01em] text-ensi-blue">
        EN CHIFFRES
      </p>
      <h2 className="mb-14 font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-ensi-navy max-[768px]:whitespace-nowrap max-[768px]:text-[1.75rem]">
        40 ans d'<span className="text-ensi-accent">ingénieurs.</span>
      </h2>

      <div className="mb-16 grid grid-cols-4 gap-10 max-[768px]:mb-0 max-[768px]:grid-cols-1 max-[768px]:gap-7">
        {STATS.map((s) => (
          <StatItem key={s.label} stat={s} />
        ))}
      </div>

      <div className="mt-0 max-[768px]:mt-10">
        <p className="mb-5 font-display text-[0.8125rem] font-bold uppercase tracking-[-0.01em] text-ensi-blue">
          ACCRÉDITATIONS
        </p>
        <div className="flex w-full items-start justify-between gap-6 max-[768px]:grid max-[768px]:grid-cols-2 max-[768px]:items-center max-[768px]:gap-6">
          {ACCREDITATIONS.map((a) => (
            <div
              key={a.logo}
              className="flex flex-col items-start gap-2 max-[768px]:items-center max-[768px]:text-center"
            >
              <img
                src={`/imag/${a.logo}`}
                alt={a.label}
                loading="lazy"
                className="h-[100px] max-w-[180px] object-contain max-[768px]:max-h-20 max-[768px]:max-w-full"
              />
              <span className="text-[0.72rem] text-gray-500">{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection


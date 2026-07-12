// Fetches public/data/clubs.json on mount, category filter tabs, and the club tile grid.
// Replaces the old CLUBS-array-plus-filterClubs()-plus-DOM-toggling approach.
import { useEffect, useRef, useState } from 'react'
import { PARTNERS } from '../data/partners.js'
import { CAT_SHORT } from '../data/clubCategories.js'
import { useOverlay } from '../context/OverlayContext.jsx'
import Reveal from './Reveal.jsx'

const CATEGORIES = ['Tous', 'Science · Tech · Innovation', 'Sport · Art · Culture', 'Humanitarian · Social']

function ClubTile({ club, onOpen }) {
  const btnRef = useRef(null)
  return (
    <button
      ref={btnRef}
      data-cat={club.category}
      onClick={() => onOpen(club, btnRef.current)}
      aria-label={`Voir les détails de ${club.name}`}
      className="group w-full cursor-pointer border-none bg-transparent p-0 text-left transition-[transform,background-color] duration-200 hover:-translate-y-0.5 active:scale-[0.98] max-[768px]:flex max-[768px]:flex-row max-[768px]:items-center max-[768px]:gap-3.5 max-[768px]:rounded-lg max-[768px]:border-b max-[768px]:border-slate-100 max-[768px]:px-2.5 max-[768px]:py-2.5 max-[768px]:hover:bg-[var(--hover-bg)] max-[768px]:active:bg-[var(--hover-bg)]"
      style={{ WebkitTapHighlightColor: `${club.accent}33`, '--hover-bg': `${club.accent}14` }}
    >
      <div className="overflow-hidden rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-transform duration-200 group-hover:-translate-y-0.5 max-[768px]:w-20 max-[768px]:min-w-[80px] max-[768px]:flex-shrink-0">
        {club.logo ? (
          <img
            src={`/imag/clubs/${club.logo}`}
            alt={club.name}
            loading="lazy"
            width="300"
            height="300"
            className="block aspect-square w-full bg-slate-100 object-cover object-center max-[768px]:h-20 max-[768px]:w-20"
          />
        ) : (
          <div className="flex aspect-square w-full items-center justify-center rounded-lg max-[768px]:h-20 max-[768px]:w-20" style={{ background: club.accent }}>
            <span className="p-3 text-center font-display text-xl font-extrabold text-white">{club.name}</span>
          </div>
        )}
      </div>
      <div
        className="mb-2.5 h-[3px] origin-left scale-x-0 rounded-b-[3px] transition-transform duration-200 group-hover:scale-x-100 max-[768px]:hidden"
        style={{ background: club.accent }}
      />
      <div className="max-[768px]:min-w-0 max-[768px]:flex-1">
        <div className="mb-0.5 font-display text-base font-extrabold leading-[1.2] text-ensi-navy">
          {club.name}
          <span
            className="ml-[5px] inline-block align-middle text-2xl font-bold leading-none opacity-55 transition-[opacity,transform] duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
            style={{ color: club.accent }}
          >
            ›
          </span>
        </div>
        <div className="mb-2 overflow-hidden text-ellipsis whitespace-nowrap font-body text-xs italic text-ensi-navy/60">
          {club.tagline}
        </div>
        <div className="font-mono text-[0.625rem] uppercase tracking-[0.05em] text-ensi-navy/45">
          EST. {club.founded} · {CAT_SHORT[club.category] || club.category}
        </div>
      </div>
    </button>
  )
}

function StudentLifeSection() {
  const [clubs, setClubs] = useState([])
  const [activeCat, setActiveCat] = useState('Tous')
  const { openClubModal } = useOverlay()

  useEffect(() => {
    fetch('/data/clubs.json')
      .then((r) => r.json())
      .then(setClubs)
      .catch(() => setClubs([]))
  }, [])

  const visibleClubs = activeCat === 'Tous' ? clubs : clubs.filter((c) => c.category === activeCat)

  function handleOpen(club, ref) {
    openClubModal(club, ref)
  }

  return (
    <section id="section-studentlife" className="bg-white px-[10vw] py-24 max-[768px]:px-4">
      <p className="mb-3 font-display text-[0.8125rem] font-bold uppercase tracking-[-0.01em] text-ensi-blue">
        12 CLUBS ACTIFS · 3 CATÉGORIES
      </p>
      <h2 className="mb-10 font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-ensi-navy">
        Vie <span className="text-ensi-accent">étudiante</span>
      </h2>

      <div className="mb-10 flex gap-0 overflow-x-auto border-b-2 border-ensi-cardgray [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`mb-[-2px] whitespace-nowrap border-b-2 bg-transparent px-5 pb-3 font-display text-sm font-bold transition-colors ${
              activeCat === cat ? 'border-ensi-accent text-ensi-navy' : 'border-transparent text-ensi-navy/45'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div id="club-grid" className="grid grid-cols-4 gap-5 max-[768px]:grid-cols-1 max-[768px]:gap-0">
        {visibleClubs.map((c) => (
          <Reveal key={c.id}>
            <ClubTile club={c} onOpen={handleOpen} />
          </Reveal>
        ))}
      </div>

      <div className="mt-[72px] pt-12">
        <p className="mb-2.5 font-display text-[0.8125rem] font-bold uppercase tracking-[-0.01em] text-ensi-blue">
          Recruteurs d'ingénieurs ENSI
        </p>
        <h3 className="mb-9 font-display text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-ensi-navy">
          Partenaires <span className="text-ensi-accent">industriels</span>
        </h3>
        <div className="flex w-full flex-wrap items-center justify-between gap-y-7 max-[768px]:grid max-[768px]:grid-cols-3 max-[768px]:gap-6">
          {PARTNERS.map((p) => (
            <Reveal key={p.name} className="flex items-center justify-center max-[768px]:overflow-hidden">
              <img
                src={`/imag/${p.logo}`}
                alt={p.name}
                loading="lazy"
                className="block max-h-[70px] max-w-[150px] object-contain max-[768px]:max-h-[50px] max-[768px]:max-w-full"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
    
  )
}

export default StudentLifeSection

import { useEffect, useRef } from 'react'
import { CAT_SHORT, SOCIAL_ICONS } from '../data/clubCategories.js'
import { useFocusTrap } from '../hooks/useFocusTrap.js'
import { useOverlayHistory } from '../hooks/useOverlayHistory.js'

function EventRow({ item, accent }) {
  return (
    <div className="flex items-start gap-3.5 py-2">
      <div className="mt-[3px] h-3.5 w-[3px] min-w-[3px] flex-shrink-0 rounded" style={{ background: accent }} />
      <div>
        <div className="mb-0.5 font-display text-sm font-bold text-ensi-navy">{item.name}</div>
        <div className="text-[0.8125rem] leading-relaxed text-slate-500">{item.note}</div>
      </div>
    </div>
  )
}

function ClubModal({ club, onClose, openerRef }) {
  const modalRef = useRef(null)
  const isOpen = !!club
  useFocusTrap(modalRef, isOpen, onClose)
  useOverlayHistory(isOpen, onClose)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      modalRef.current?.focus()
    } else {
      document.body.style.overflow = ''
      openerRef?.current?.focus()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <div
      className={`fixed inset-0 z-[900] box-border flex max-w-full items-center justify-center overflow-x-hidden p-4 transition-opacity duration-200 ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      } bg-ensi-navy/55`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {club && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={club.name}
          tabIndex={-1}
          className="relative box-border max-h-[90vh] w-[calc(100%-2rem)] max-w-[600px] overflow-y-auto overflow-x-hidden rounded-xl bg-white [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-ensi-cardgray"
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-2.5 top-2.5 z-10 flex items-center justify-center rounded-md bg-ensi-navy/10 p-1.5 text-ensi-navy transition-colors hover:bg-ensi-navy/20 focus:outline focus:outline-2 focus:outline-ensi-accent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="relative overflow-hidden rounded-t-xl px-7 pb-5 pt-6" style={{ background: club.accent }}>
            <div className="flex items-center gap-4">
              {club.logo ? (
                <img
                  src={`/imag/clubs/${club.logo}`}
                  alt={club.name}
                  loading="lazy"
                  width="56"
                  height="56"
                  className="h-14 w-14 flex-shrink-0 rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-white/20">
                  <span className="text-center font-display text-xs font-extrabold text-white">{club.name}</span>
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="mb-1.5 font-display text-[1.6rem] font-extrabold leading-[1.1] text-white">{club.name}</div>
                <div className="flex flex-nowrap items-center gap-2 whitespace-nowrap font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-white/70">
                  {club.founded && (
                    <>
                      <span>EST. {club.founded}</span>
                      <span>·</span>
                    </>
                  )}
                  <span>{CAT_SHORT[club.category] || club.category}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-8 pt-7 [overflow-wrap:break-word]">
            {club.overview && <p className="mb-4 text-[0.9375rem] leading-relaxed text-ensi-navy/80">{club.overview}</p>}
            {club.mission && (
              <>
                <p className="mb-2.5 font-display text-[0.6875rem] font-bold uppercase tracking-[0.08em]" style={{ color: club.accent }}>
                  Mission
                </p>
                <div className="flex gap-4">
                  <div className="w-[3px] min-w-[3px] flex-shrink-0 rounded" style={{ background: club.accent }} />
                  <p className="py-0.5 font-body text-base italic leading-relaxed text-ensi-navy">{club.mission}</p>
                </div>
              </>
            )}
          </div>

          {club.events?.length > 0 && (
            <div className="px-8 pt-9">
              <p className="mb-1 font-display text-[0.6875rem] font-bold uppercase tracking-[0.08em]" style={{ color: club.accent }}>
                Événements
              </p>
              {club.events.map((ev, i) => (
                <EventRow key={i} item={ev} accent={club.accent} />
              ))}
            </div>
          )}

          {club.projects?.length > 0 && (
            <div className="px-8">
              <div className="mt-8">
                <p className="mb-2 font-display text-[0.6875rem] font-bold uppercase tracking-[0.08em]" style={{ color: club.accent }}>
                  Projets
                </p>
                {club.projects.map((pr, i) => (
                  <EventRow key={i} item={pr} accent={club.accent} />
                ))}
              </div>
            </div>
          )}

          {club.socials?.length > 0 && (
            <div className="px-8 pb-8">
              <div className="mt-8">
                <p className="mb-3 font-display text-[0.6875rem] font-bold uppercase tracking-[0.08em]" style={{ color: club.accent }}>
                  Suivre
                </p>
                <div className="flex items-center gap-4">
                  {club.socials.map((s, i) => (
                    <a
                      key={i}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.type}
                      className="text-ensi-navy/40 transition-colors hover:[color:var(--hover-accent)]"
                      style={{ '--hover-accent': club.accent }}
                      dangerouslySetInnerHTML={{ __html: SOCIAL_ICONS[s.type] || SOCIAL_ICONS.globe }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ClubModal

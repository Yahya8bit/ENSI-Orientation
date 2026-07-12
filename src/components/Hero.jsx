import { useCallback, useEffect, useRef, useState } from 'react'

const SLIDES = [
  { src: 'imag/hero/forum-20th-edition.jpeg', label: 'ENSI Forum 20.0' },
  { src: 'imag/hero/code&conquer-3th-edition.jpg', label: 'Code & Conquer 3.0' },
  { src: 'imag/hero/robocup-8th-edition.jpg', label: 'RoboCup 8.0' },
  { src: 'imag/hero/tunihack-11th-edition.jpg', label: 'TuniHack 11.0' },
]
const N = SLIDES.length

function splitLabel(label) {
  const parts = label.split(' ')
  const num = parts.pop()
  return { rest: parts.join(' '), num }
}

// Replaces initHeroSlideshow(): autoplay with pause-on-interaction, drag/swipe,
// keyboard arrows, and dot/arrow navigation, all driven by React state.
function Hero() {
  const [current, setCurrent] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const trackRef = useRef(null)
  const autoTimerRef = useRef(null)
  const userTimerRef = useRef(null)
  const startXRef = useRef(0)
  const draggingRef = useRef(false)
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const goTo = useCallback((idx) => {
    setCurrent(((idx % N) + N) % N)
  }, [])

  const startAuto = useCallback(() => {
    if (reducedMotion) return
    clearInterval(autoTimerRef.current)
    autoTimerRef.current = setInterval(() => setCurrent((c) => (c + 1) % N), 6000)
  }, [reducedMotion])

  const pauseAuto = useCallback(() => {
    clearInterval(autoTimerRef.current)
    clearTimeout(userTimerRef.current)
    userTimerRef.current = setTimeout(startAuto, 10000)
  }, [startAuto])

  useEffect(() => {
    startAuto()
    return () => {
      clearInterval(autoTimerRef.current)
      clearTimeout(userTimerRef.current)
    }
  }, [startAuto])

  function handlePrev() {
    pauseAuto()
    goTo(current - 1)
  }
  function handleNext() {
    pauseAuto()
    goTo(current + 1)
  }
  function handleDot(i) {
    pauseAuto()
    goTo(i)
  }
  function handleKeyDown(e) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      handlePrev()
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      handleNext()
    }
  }

  function onDragStart(e) {
    startXRef.current = e.touches ? e.touches[0].clientX : e.clientX
    draggingRef.current = true
    setIsDragging(true)
    pauseAuto()
  }
  useEffect(() => {
    function onDragEnd(e) {
      if (!draggingRef.current) return
      draggingRef.current = false
      setIsDragging(false)
      const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
      const diff = startXRef.current - endX
      if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1))
    }
    window.addEventListener('mouseup', onDragEnd)
    return () => window.removeEventListener('mouseup', onDragEnd)
  }, [current, goTo])

  const { rest, num } = splitLabel(SLIDES[current].label)

  function dotsRow(className) {
    return (
      <div className={className} role="tablist" aria-label="Navigation du diaporama">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-none bg-transparent p-0"
            aria-label={`Aller à ${s.label}`}
            role="tab"
            aria-selected={i === current}
            onClick={() => handleDot(i)}
          >
            <span
              className={
                i === current
                  ? 'block h-3 w-3 rounded-full bg-ensi-blue shadow-[0_0_0_2px_rgba(255,255,255,0.35)]'
                  : 'block h-2.5 w-2.5 rounded-full bg-white/45'
              }
            />
          </button>
        ))}
      </div>
    )
  }

  return (
    <section
      id="hero-section"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden max-[768px]:min-h-[calc(100svh-72px)] max-[768px]:pb-[max(24px,env(safe-area-inset-bottom))] max-[768px]:pt-24"
      aria-label="Diaporama hero, utilisez les touches fléchées pour naviguer"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={trackRef}
        className={`absolute inset-0 flex will-change-transform ${isDragging ? '' : 'transition-transform duration-[800ms] ease'} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ transform: `translateX(-${current * 100}%)`, transition: isDragging || reducedMotion ? 'none' : undefined }}
        onMouseDown={onDragStart}
        onTouchStart={onDragStart}
        onTouchEnd={(e) => {
          if (!draggingRef.current) return
          draggingRef.current = false
          setIsDragging(false)
          const endX = e.changedTouches[0].clientX
          const diff = startXRef.current - endX
          if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1))
        }}
        onDragStart={(e) => e.preventDefault()}
      >
        {SLIDES.map((s) => (
          <div
            key={s.src}
            className="relative w-full flex-[0_0_100%] bg-cover bg-center [filter:grayscale(1)_contrast(1.05)_brightness(0.9)]"
            style={{ backgroundImage: `url('/${s.src}')` }}
            aria-label={s.label}
          >
            <div className="absolute inset-0 bg-ensi-navy opacity-55 mix-blend-multiply pointer-events-none" />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(105deg,rgba(27,42,74,0.82)_0%,rgba(27,42,74,0.5)_45%,rgba(27,42,74,0.15)_100%)]" />

      <button
        onClick={handlePrev}
        className="absolute left-6 top-1/2 z-[3] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-none bg-white/10 text-white transition-colors hover:bg-white/25 max-[768px]:hidden"
        aria-label="Photo précédente"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
      </button>
      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 z-[3] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-none bg-white/10 text-white transition-colors hover:bg-white/25 max-[768px]:hidden"
        aria-label="Photo suivante"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
      </button>

      {/* Text block. Desktop: vertically centered by the section, CTA is its last child, caption/dots are separate absolute-positioned
          siblings below (unchanged). Mobile: this container fills the section (flex-1); inside it, [eyebrow/title/subtitle/paragraph]
          is its own flex-1+items-center group that self-centers in whatever space is left above the bottom group, while
          [CTA, caption, dots] stay anchored at the bottom (pushed there naturally since the centered group consumes the rest). */}
      <div className="relative z-[2] max-w-[960px] px-[10vw] pointer-events-none max-[768px]:flex max-[768px]:max-w-none max-[768px]:flex-1 max-[768px]:flex-col max-[768px]:px-6">
        <div className="max-[768px]:flex max-[768px]:flex-1 max-[768px]:items-center">
          <div className="max-[768px]:w-full">
            <p className="animate-fade-up mb-7 font-display text-[0.8125rem] font-bold uppercase tracking-[-0.01em] text-ensi-blue [animation-delay:0ms] max-[768px]:mb-4 max-[768px]:text-[0.7rem]">
              DEPUIS 1984 · UNIVERSITÉ DE LA MANOUBA
            </p>
            <h1 className="animate-fade-up mb-2 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-white [animation-delay:80ms] max-[768px]:text-[clamp(2.25rem,9vw,3.5rem)]">
              Bienvenue à <span className="text-ensi-blue">l'ENSI</span>
            </h1>
            <p className="animate-fade-up mb-6 font-body text-xl font-light leading-[1.3] text-white/75 [animation-delay:80ms] max-[768px]:mb-4 max-[768px]:text-[1.05rem]">
              École Nationale des Sciences de l'Informatique
            </p>
            <p className="animate-fade-up mb-8 max-w-[52ch] text-lg text-white/60 [animation-delay:160ms] max-[768px]:mb-0 max-[768px]:max-w-[34ch] max-[768px]:text-[0.9rem] max-[768px]:leading-[1.5]">
              Tout ce qu'un nouvel admis doit savoir : admission, filières, vie étudiante et programme d'études.
            </p>
          </div>
        </div>
        <a
          href="#section-numbers"
          className="animate-fade-up pointer-events-auto inline-flex items-center gap-2.5 self-start rounded bg-ensi-blue px-7 py-3.5 font-display text-[0.9375rem] font-semibold text-ensi-navy transition-colors hover:bg-[#3AA5D5] [animation-delay:240ms] max-[768px]:mt-6"
        >
          Découvrir <span className="inline-block transition-transform">↓</span>
        </a>

        {/* Mobile-only: caption + dots flow directly after the CTA in this same column, tight fixed gaps, never absolute. */}
        <div className="pointer-events-none hidden text-center font-mono text-[0.85rem] font-medium tracking-[0.04em] text-white/90 max-[768px]:mt-6 max-[768px]:block">
          {rest} <span className="text-ensi-blue">{num}</span>
        </div>
        <div className="pointer-events-auto hidden max-[768px]:mt-4 max-[768px]:flex max-[768px]:justify-center">
          {dotsRow('flex items-center gap-0')}
        </div>
      </div>

      {/* Desktop: caption + dots pinned near the bottom, absolute — unchanged. */}
      <div className="pointer-events-none absolute bottom-[92px] left-1/2 z-[3] -translate-x-1/2 whitespace-nowrap font-mono text-[0.9375rem] font-medium tracking-[0.04em] text-white/90 max-[768px]:hidden">
        {rest} <span className="text-ensi-blue">{num}</span>
      </div>
      {dotsRow('absolute bottom-[72px] left-1/2 z-[3] flex -translate-x-1/2 items-center gap-0 max-[768px]:hidden')}
    </section>
  )
}

export default Hero

import { useEffect, useState } from 'react'

const LINKS = [
  { id: 'section-admission', label: 'Admission' },
  { id: 'section-studentlife', label: 'Vie étudiante' },
  { id: 'curriculum-section', label: "Plan d'études" },
  { id: 'section-pathways', label: 'Filières' },
]

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Body scroll lock while the mobile sidebar is open, matching the old openMobileNav/closeMobileNav.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  function goHome(e) {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goSection(e, id) {
    e.preventDefault()
    setMobileOpen(false)
    scrollToSection(id)
  }

  return (
    <>
      <nav
        id="navbar"
        className={`fixed left-0 right-0 top-0 z-[100] flex h-[72px] items-center justify-between bg-white px-[10vw] transition-shadow duration-200 max-[768px]:px-4 ${
          scrolled ? 'shadow-[0_1px_3px_rgba(0,0,0,0.08)]' : ''
        }`}
      >
        <button
          className="hidden h-11 min-h-11 w-11 min-w-11 flex-shrink-0 items-center justify-center border-none bg-transparent text-2xl leading-none text-ensi-navy max-[768px]:flex"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Ouvrir le menu"
        >
          ☰
        </button>
        <a href="#hero-section" onClick={goHome} className="flex flex-shrink-0 items-center no-underline">
          <img src="/imag/ensi-navbar.png" alt="ENSI" loading="lazy" width="37" height="52" className="block h-[52px] w-auto flex-shrink-0 max-[768px]:h-11" />
        </a>
        <div className="flex items-center gap-7 max-[768px]:hidden">
          <a
            href="#hero-section"
            onClick={goHome}
            className="border-b-2 border-transparent pb-0.5 font-display text-sm font-semibold tracking-[0.01em] text-ensi-navy/55 transition-colors hover:border-ensi-blue hover:text-ensi-navy"
          >
            Accueil
          </a>
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => goSection(e, l.id)}
              className="border-b-2 border-transparent pb-0.5 font-display text-sm font-semibold tracking-[0.01em] text-ensi-navy/55 transition-colors hover:border-ensi-blue hover:text-ensi-navy"
            >
              {l.label}
            </a>
          ))}
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 max-[768px]:block ${
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        } hidden`}
        onClick={() => setMobileOpen(false)}
      />
      <nav
        aria-label="Navigation mobile"
        className={`fixed left-0 top-0 z-[110] flex h-screen w-[280px] flex-col bg-white py-6 pb-8 shadow-[4px_0_24px_rgba(0,0,0,0.12)] transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          className="mb-6 self-end bg-transparent px-2 py-1 text-2xl leading-none text-ensi-navy"
          onClick={() => setMobileOpen(false)}
          aria-label="Fermer le menu"
        >
          ×
        </button>
        <a
          href="#hero-section"
          onClick={(e) => {
            setMobileOpen(false)
            goHome(e)
          }}
          className="flex min-h-12 items-center border-l-[3px] border-transparent px-7 py-3.5 font-display text-xl font-extrabold text-ensi-navy no-underline transition-colors hover:border-ensi-blue hover:text-ensi-accent"
        >
          Accueil
        </a>
        {LINKS.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            onClick={(e) => goSection(e, l.id)}
            className="flex min-h-12 items-center border-l-[3px] border-transparent px-7 py-3.5 font-display text-xl font-extrabold text-ensi-navy no-underline transition-colors hover:border-ensi-blue hover:text-ensi-accent"
          >
            {l.label}
          </a>
        ))}
      </nav>
    </>
  )
}

export default Navbar

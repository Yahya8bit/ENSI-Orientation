// Static site footer.
function Footer() {
  return (
    <footer id="site-footer" className="bg-ensi-navy px-[10vw] pb-10 pt-16 max-[768px]:px-6 max-[768px]:pb-8 max-[768px]:pt-10">
      <div className="grid grid-cols-[1fr_auto_auto] items-start gap-12 max-[768px]:grid-cols-1 max-[768px]:gap-0">
        <div className="max-[768px]:pb-6">
          <img src="/imag/ensi-navbar.png" alt="ENSI" loading="lazy" width="29" height="40" className="mb-5 block h-10 w-auto" />
          <p className="mb-1 text-sm leading-relaxed text-white/45">ENSI, Campus Universitaire de la Manouba</p>
          <p className="text-sm leading-relaxed text-white/45">2010 Manouba, Tunisia</p>
        </div>

        <div className="max-[768px]:pb-6">
          <p className="mb-4 font-display text-xs font-bold uppercase tracking-[-0.01em] text-white/30">Navigation</p>
          <div className="flex flex-col gap-2.5">
            <a href="#hero-section" className="text-sm text-white/50 no-underline transition-colors hover:text-white">
              Accueil
            </a>
            <a href="#section-admission" className="text-sm text-white/50 no-underline transition-colors hover:text-white">
              Admission
            </a>
            <a href="#section-doublediplomes" className="text-sm text-white/50 no-underline transition-colors hover:text-white">
              Doubles diplômes
            </a>
            <a href="#section-studentlife" className="text-sm text-white/50 no-underline transition-colors hover:text-white">
              Vie étudiante
            </a>
            <a href="#curriculum-section" className="text-sm text-white/50 no-underline transition-colors hover:text-white">
              Plan d'études
            </a>
            <a href="#section-pathways" className="text-sm text-white/50 no-underline transition-colors hover:text-white">
              Filières
            </a>
            <a
              href="https://ensi.rnu.tn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-white/50 no-underline transition-colors hover:text-ensi-blue"
            >
              Site officiel
              <svg
                xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="ml-[3px] align-middle"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <p className="mb-4 font-display text-xs font-bold uppercase tracking-[-0.01em] text-white/30">Suivre</p>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=100085598258430"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ENSI sur Facebook"
              className="text-white/50 transition-colors hover:text-ensi-blue"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/school/ensitn/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ENSI sur LinkedIn"
              className="text-white/50 transition-colors hover:text-ensi-blue"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-white/10 pt-5 text-center">
        <span className="text-[0.8rem] text-white/35">
          © 2026 All Rights Reserved. Made with 💙 by Mohamed Yahia Gazzeh
        </span>
      </div>
    </footer>
  )
}

export default Footer

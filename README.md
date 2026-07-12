# ENSI Guide Orientation

A website that helps new students coming from *prépa* get to know **ENSI** (École Nationale des Sciences de l'Informatique) before and during their first days on campus.

🔗 **Live site:** [ensi-guide-orientation.tech](https://ensi-guide-orientation.tech/)

---

## About

Starting at ENSI after the *classes préparatoires* can be overwhelming: new campus, new people, new way of studying. This site gathers the essentials in one place so incoming students arrive knowing what to expect instead of figuring it all out on the fly.

## Features

- **Admission**: cutoff ranks by track (MP, PC, PT), year over year.
- **Double degrees**: partner engineering schools abroad and placement counts.
- **Student life**: clubs by category, with a filterable grid, and industry partner logos.
- **Curriculum**: subject × semester matrix plus a full per-semester module catalog (objectives, content, workload, evaluation), sourced from the official ENSI Module Handbook.
- **Specializations**: the six Semester-5 tracks (AI, GL, CV, IF, SLE, ST-IoT), each with its compulsory/optional module list.

## Tech Stack

- **React 19** + **Vite** — component-based SPA, no routing (single scrolling page with anchor navigation)
- **Tailwind CSS** for styling
- **Vercel** for hosting & deployment

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/Yahya8bit/ENSI-Orientation.git
cd ENSI-Orientation
npm install
```

Run the dev server:

```bash
npm run dev
```

Then visit the URL Vite prints (typically `http://localhost:5173`).

## Building

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

## Deployment

The site is deployed on **Vercel**. Any push to the main branch triggers an automatic redeploy.

## Project Structure

```
ENSI-Orientation/
├── index.html
├── public/
│   ├── clubs.json          ← club data, fetched at runtime
│   └── imag/                ← images (hero, clubs, partners, logos)
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── components/          ← one component per section (Hero, AdmissionSection, CurriculumSection, PathwaysSection, Drawer, ...)
│   ├── data/                ← modules, specializations, partners, double diplomas
│   ├── hooks/                ← useInView, useCountUp, useAccordionScroll, ...
│   └── context/              ← overlay (drawer/modal) state
└── vite.config.js
```

## Contributing

Suggestions and improvements are welcome. Open an issue or submit a pull request.

## Author

**Yahya** ([@Yahya8bit](https://github.com/Yahya8bit))

# ENSI Guide Orientation

A website that helps new students coming from *prépa* get to know **ENSI** (École Nationale des Sciences de l'Informatique) before and during their first days on campus.

🔗 **Live site:** [[ensi-guide-orientation.tech](https://ensi-guide-orientation.tech/)]

---

## About

Starting at ENSI after the *classes préparatoires* can be overwhelming: new campus, new people, new way of studying. This site gathers the essentials in one place so incoming students arrive knowing what to expect instead of figuring it all out on the fly.

## Features

- **School overview**: what ENSI is, its specializations, and how the curriculum is organized.
- **Newcomer guidance**: practical info for students transitioning from prépa.
- **Campus & student life**: clubs, activities, and day-to-day essentials.
<!-- Add or trim these to match what the site actually covers -->

## Tech Stack

- **HTML** for structure
- **CSS** for styling
- **JavaScript** for interactivity
- **Vercel** for hosting & deployment

No frameworks or build step. It's a static site, so it runs straight from the files.

## Getting Started

Clone the repository and open it locally:

```bash
git clone https://github.com/Yahya8bit/ENSI-Orientation.git
cd ENSI-Orientation
```

Then open `index.html` in your browser. For a smoother local experience (correct asset paths, live reload), serve it with any static server:

```bash
# Python
python3 -m http.server 8000

# or, with Node + npx
npx serve
```

Then visit `http://localhost:8000`.

## Deployment

The site is deployed on **Vercel**. Any push to the main branch triggers an automatic redeploy.

## Project Structure

```
ENSI-Orientation/
├── index.html
├── css/
├── js/
└── assets/
```
<!-- Adjust to match your actual folder layout -->

## Contributing

Suggestions and improvements are welcome. Open an issue or submit a pull request.

## Author

**Yahya** ([@Yahya8bit](https://github.com/Yahya8bit))

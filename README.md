# Notes App — Evernote-style MVP

A small responsive notes management web app built with React + Vite + Tailwind CSS.
Features:
- Create, edit, delete notes (title, description, category, timestamp).
- Sidebar categories with filtering.
- Loads initial notes from `src/notes.json`.
- Persists changes in `localStorage`.
- Duplicate title handling: shows "Duplicate Title" badge and auto-appends numbering.

## Quick start (local)

1. Install dependencies:
```bash
npm install
```

2. Start dev server:
```bash
npm run dev
```

Open http://localhost:5173

## Build & Deploy

### Vercel
- Push this repo to GitHub.
- Create a new Vercel project and import the repo.
- Build command: `npm run build`
- Output directory: `dist`

### Netlify
- Connect repo in Netlify.
- Build command: `npm run build`
- Publish directory: `dist`

### GitHub Pages (recommended using gh-pages for SPA)
- Alternatively use GitHub Actions or the `gh-pages` package to publish the `dist` folder.

## Project structure
```
src/
  components/
    NoteCard.jsx
    NoteModal.jsx
    Sidebar.jsx
  notes.json
  App.jsx
  main.jsx
  index.css
tailwind.config.cjs
postcss.config.cjs
vite.config.js
```

## Notes
- The app persists to `localStorage` key `notesApp.v1`. To reset, clear localStorage or remove that key.
- The UI is responsive; sidebar hides on small screens but you can add a mobile toggle if desired.

Good luck — push the code to GitHub, deploy to Vercel/Netlify/GitHub Pages, and share the links with your team.

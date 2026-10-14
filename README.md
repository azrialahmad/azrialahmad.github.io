# azrialahmad.is-a.dev

Personal portfolio of Azrial Ahmad Haidar Daffi Zuhri — data, AI, web, and
photography. Built with React 19 + Vite, styled with hand-rolled CSS using an
editorial blue-on-cream design system (OKLCH tokens, fluid type scale).

**Live:** https://azrialahmad.is-a.dev

## Getting started

```bash
npm install
npm run dev        # local dev server
npm test           # run the test suite (Vitest + React Testing Library)
npm run lint       # ESLint
npm run build      # production build + prerender to dist/
npm run preview    # preview the production build locally
```

## How it's built

- **Prerendered.** `npm run build` builds the client bundle, then an SSR
  bundle, and `scripts/prerender.js` renders the app to static HTML inside
  `dist/index.html`. The page is readable before JavaScript loads; React then
  hydrates it.
- **Responsive images.** Photos are processed at build time by
  [vite-imagetools](https://github.com/JonasKruckenberg/imagetools) into AVIF +
  WebP at 480/960/1600 px, with intrinsic sizes so layouts never shift.
  Processed images are cached in `node_modules/.cache/imagetools`.
- **Self-hosted variable fonts** (Cormorant Garamond, DM Sans via Fontsource);
  the hero's display face is preloaded.
- **Small touches:** cursor-reactive variable-weight hero name, animated SVG
  figure plates per project, duotone ↔ colour photo toggle, a `<dialog>`
  lightbox with keyboard and swipe navigation, View Transition theme swap, a
  CSS scroll-driven reading-progress bar, and `prefers-reduced-motion`
  support throughout.

## Project structure

```
├── .github/workflows/   # ci.yml (PRs) and deploy.yml (main → GitHub Pages)
├── index.html           # meta, Open Graph, JSON-LD, no-flash theme script
├── public/              # copied as-is (CNAME, 404.html, og-image, robots, sitemap)
├── scripts/prerender.js # renders the app into dist/index.html after the build
└── src/
    ├── data/content.js  # all copy: projects, publications, toolkit, alt text
    ├── lib/images.js    # glob-imports the photo folders through imagetools
    ├── components/      # Hero, Navbar, Projects, ProjectFigure, Photography, …
    ├── hooks/           # theme, scroll reveal, gallery, clipboard, local time
    ├── styles/          # tokens, base, and one stylesheet per area
    ├── __tests__/       # component tests
    ├── test/setup.js    # jsdom shims + a fake images module
    ├── main.jsx         # client entry (hydrates the prerendered HTML)
    └── entry-server.jsx # SSR entry used by the prerender step
```

### Editing content

Text, projects, the GitHub index, publications and image alt text all live
in `src/data/content.js`.

### Adding photos

Drop images into `src/assets/photography/street/`, `…/cosplay/`, or
`src/assets/design/` (webp, jpg, png, or avif) — they're picked up
automatically and resized at build time; no thumbnails needed. Files are
ordered by name, so prefix them (`01-…`, `02-…`) to control order, and add an
entry to `ALT_TEXT` in `content.js` to describe each one.

## Deployment

GitHub Actions deploys `main` to GitHub Pages automatically (see
`.github/workflows/deploy.yml`). The site is served at
[azrialahmad.is-a.dev](https://azrialahmad.is-a.dev) via the `CNAME` file in
`public/`.

> The repo's Pages setting must be **Source: GitHub Actions**
> (Settings → Pages) for the workflow to deploy.

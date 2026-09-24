# Keene Xander Brigado · Portfolio

Source for my personal portfolio: projects, experience, and achievements across code, operations, and AI.

**Live:** [koala3353.github.io/portfolio](https://koala3353.github.io/portfolio/)

## Stack

| Area | Choice |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) App Router, static export |
| Language | TypeScript, React 19 |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) with CSS-variable design tokens |
| Motion | [Motion](https://motion.dev/) (`motion/react`) |
| Icons | [Phosphor](https://phosphoricons.com/) |
| Fonts | Geist and Geist Mono via `next/font` |
| Hosting | GitHub Pages via GitHub Actions |

## Features

- **Light, dark, and system themes.** Resolved before first paint, so there is no flash on load.
- **Command menu.** Press `⌘K` / `Ctrl+K` to jump to any page, copy my email, download the résumé, or switch theme.
- **Custom SVG artwork.** A layered hero illustration, per-category project marks, generated contour lines behind page headers, and scroll-driven parallax. All of it respects `prefers-reduced-motion`.
- **Filterable projects.** Filter by category, with deep links to each project (`/projects#slug`).
- **Contact form.** Inline validation, a spam honeypot, and a prefilled email fallback if sending fails. Submissions go to a Google Apps Script endpoint.
- **Automated résumé.** The `prebuild` step downloads the latest PDF from [`Koala3353/Koala3353`](https://github.com/Koala3353/Koala3353). Updating the résumé there triggers a `repository_dispatch` that redeploys this site.
- **SEO.** Per-page metadata, `sitemap.xml`, `robots.txt`, a generated Open Graph image, and Person structured data.
- **Accessibility.** Semantic landmarks, a skip link, keyboard-operable menus, visible focus states, and AA contrast in both themes.
- **Easter egg.** A playable Snake game on the 404 page, with keyboard and on-screen controls.

## Project structure

```
src/
  app/          Routes. Each page is a server component that exports its own metadata.
  components/   Shared UI (Navbar, Footer, CommandMenu, Reveal, PageHeader)
    art/        Custom SVG artwork and the Parallax wrapper
    <page>/     Client-side pieces for a specific page
  data/         All site content as typed TypeScript (projects, experience, achievements...)
  lib/site.ts   Site-wide config: name, links, navigation, base path
```

To update content, edit the files in `src/data/`. Home page case studies are listed in `caseStudies` in `src/data/home.ts`, and the build fails if a slug there doesn't match a project.

## Development

Requires Node 22.

```bash
git clone https://github.com/Koala3353/portfolio.git
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Download the latest résumé, then build the static site into `out/` |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |

In production the site is served under `/portfolio` (set in `next.config.js` and `src/lib/site.ts`).

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which installs with `npm ci`, runs lint and typecheck, builds, and publishes `out/` to GitHub Pages. A failed lint, typecheck, or résumé download stops the deploy.

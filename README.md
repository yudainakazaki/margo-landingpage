# Margo

Website for **Margo**, an art project. Built with **Vue 3 (Composition API) +
Vite** and deployed as a static site.

> Visual inspiration: [allright-inc.jp](https://www.allright-inc.jp/) — minimal,
> editorial, image-forward. Detailed design TBD; the site currently ships a
> "coming soon" placeholder.

Production domain (planned): **`2bcdef4hijkl1n5pq3stuvwxyz.jp`**

## Getting started

```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
npm run lint     # lint with ESLint
npm run format   # format with Prettier
```

Requires Node.js 20+.

## Project structure

```
index.html            # app shell + <head> meta
src/
  main.js             # app entry
  App.vue             # root component (Composition API)
  assets/main.css     # global styles & design tokens
  components/         # UI components
public/               # static assets copied as-is (favicon, CNAME)
.github/workflows/    # CI (lint+build) and GitHub Pages deploy
```

## Deployment

Pushes to `main` build and deploy to **GitHub Pages** automatically via
`.github/workflows/deploy.yml`. The custom domain is configured through
`public/CNAME`.

## Roadmap

See **[ROADMAP.md](./ROADMAP.md)** for the full plan: repository setup, web app,
domain registration (`.jp` specifics), hosting comparison, DNS, CI/CD, and the
launch checklist.

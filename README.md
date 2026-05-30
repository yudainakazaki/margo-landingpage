# Margo

Website for **Margo**, an art project. Built with **Vue 3 (Composition API) +
Vite** and deployed as a static site. Bilingual (Japanese / English).

> Visual inspiration: [allright-inc.jp](https://www.allright-inc.jp/) — minimal,
> editorial, image-forward. Detailed design TBD; the site currently ships a
> "coming soon" placeholder.

- **Production domain:** `2bcdef4hijkl1n5pq3stuvwxyz.jp` (cutover in progress)

## Getting started

```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
npm run lint     # lint with ESLint
npm run format   # format with Prettier
```

Requires Node.js 20+ (CI/CD uses Node 22).

## Project structure

```
index.html                 # app shell + <head> meta
src/
  main.js                  # app entry (createApp + i18n)
  App.vue                  # root component (Composition API)
  assets/main.css          # global styles & design tokens
  components/              # UI components (LanguageSwitcher, SiteFooter)
  i18n/                    # vue-i18n setup + locale strings (en/ja)
  content/                 # content layer — the seam for a future CMS
    index.js               #   getSiteContent() + provider selection
    providers/local.js     #   in-repo provider
    data/site.js           #   editable in-repo content
public/                    # static assets copied as-is (favicon, CNAME)
.github/workflows/         # CI (lint+build) and GitHub Pages deploy
```

## Editing content

Today, content lives in-repo. Edit copy in **`src/content/data/site.js`** (keyed
by locale) and UI strings in **`src/i18n/locales/{en,ja}.json`**.

### Migrating to a CMS later

Components only ever import `getSiteContent()` from `@/content`, so the source of
content is swappable without touching the UI:

1. Add `src/content/providers/<cms>.js` returning the same `SiteContent` shape.
2. Register it in `providers` (`src/content/index.js`).
3. Set `VITE_CONTENT_SOURCE=<cms>` (or change the default).

## Internationalization

`vue-i18n` powers JA/EN. Japanese is the default; English is the fallback. The
initial locale resolves from a saved choice → browser language → default, and
the choice is persisted to `localStorage`. `<html lang>` and the document title
stay in sync with the active locale.

## Deployment

Pushes to `main` build and deploy to **GitHub Pages** automatically via
`.github/workflows/deploy.yml`.

### Custom domain

The site is served from the root of **`2bcdef4hijkl1n5pq3stuvwxyz.jp`**
(the apex is canonical; `www` redirects to it), configured via `public/CNAME`.
Vite `base` is `/`. The DNS records, GitHub Pages custom-domain setup, and HTTPS
steps are in the **Custom-domain cutover** section of
[ROADMAP.md](./ROADMAP.md).

## Roadmap

See **[ROADMAP.md](./ROADMAP.md)** for the full plan and confirmed decisions:
hosting (GitHub Pages + custom domain), content (in-repo → CMS-ready), domain
(Onamae.com `.jp`), DNS, CI/CD, and the launch checklist.

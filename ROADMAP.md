# Margo — Project Roadmap

Margo is an art-project website built with **Vue 3 (Composition API) + Vite**.
This document is the single source of truth for how we take the project from an
empty repository to a live site on **`2bcdef4hijkl1n5pq3stuvwxyz.jp`**.

The visual inspiration is [allright-inc.jp](https://www.allright-inc.jp/):
minimal, editorial, image-forward, generous whitespace, refined typography, and
smooth transitions. Detailed design specs will be supplied later; until then the
site ships a clean "coming soon" placeholder.

---

## Confirmed decisions

| Question        | Decision                                                                 |
| --------------- | ------------------------------------------------------------------------ |
| **Hosting**     | **GitHub Pages** for now (free, custom domain + auto HTTPS).             |
| **Content/CMS** | **In-repo content for now**, behind a provider abstraction so migrating to a real CMS later is a single-file change. |
| **Domain**      | **Onamae.com** registrar; a Japanese postal address is available.        |
| **Language**    | **Bilingual i18n: Japanese ⇄ English** (Japanese is the default).        |

---

## At a glance

| Concern        | Decision                                                       | Cost (est.)            |
| -------------- | -------------------------------------------------------------- | ---------------------- |
| Framework      | Vue 3 + Vite, Composition API (`<script setup>`)               | Free                   |
| Repository     | This Git repo (GitHub)                                          | Free                   |
| Hosting        | **GitHub Pages** — static, free, custom-domain + TLS           | Free                   |
| i18n           | `vue-i18n` (JA default, EN fallback)                           | Free                   |
| Content        | In-repo provider now → CMS-ready (Sanity/Contentful) later     | Free                   |
| Domain         | `2bcdef4hijkl1n5pq3stuvwxyz.jp` via Onamae.com                 | ~¥0 reg / ~¥1,276 yr   |
| CI/CD          | GitHub Actions (lint + build on PR, deploy on `main`)          | Free                   |
| **Total/yr**   |                                                                | **≈ ¥1,300**           |

> Because the site is a static SPA, hosting is **¥0**. The domain renewal is the
> only meaningful recurring cost.

---

## Phase 0 — Foundations (done)

- [x] Repository initialized (GitHub).
- [x] Vue 3 + Vite scaffold using the Composition API.
- [x] Minimal "coming soon" landing placeholder.
- [x] Tooling: ESLint + Prettier.
- [x] GitHub Actions: `ci.yml` (lint + build) and `deploy.yml` (Pages).
- [x] `public/CNAME` pre-set to the production domain.
- [x] **i18n (JA/EN)** with a language switcher and persisted preference.
- [x] **CMS-ready content layer** (in-repo provider today).

---

## Phase 1 — Repository hygiene

1. **Protect `main`**: Settings → Branches → require the `CI` check to pass and
   at least one review before merge.
2. **Default branch**: confirm `main`.
3. **Secrets**: none required for the GitHub Pages path.
4. **Issues / Project board** (optional): track design + content tasks.

---

## Phase 2 — Build the web app

The scaffold is intentionally thin so the real design drops in cleanly.

1. **Local dev**

   ```bash
   npm install
   npm run dev      # http://localhost:5173
   npm run build    # outputs to dist/
   npm run preview  # serve the production build locally
   ```

2. **Structure**

   ```
   index.html              # app shell, <head>, meta/OG tags
   src/
     main.js               # app entry (createApp + i18n)
     App.vue               # root component (Composition API)
     assets/main.css       # global styles + design tokens (CSS variables)
     components/           # reusable UI (LanguageSwitcher, SiteFooter)
     i18n/                 # vue-i18n setup
       index.js            #   instance + setLocale()
       config.js           #   supported locales, default, detection
       locales/{en,ja}.json#   UI strings
     content/              # content layer (the CMS seam)
       index.js            #   getSiteContent() + provider selection
       providers/local.js  #   in-repo provider
       data/site.js        #   the actual in-repo content (edit here)
   public/                 # static files copied verbatim (favicon, CNAME)
   ```

### i18n (done)

- `vue-i18n` in Composition mode (`legacy: false`).
- **Japanese is the default**; English is the fallback.
- Initial locale = saved choice → browser language → default.
- `<html lang>` and `document.title` stay in sync with the active locale.
- UI strings live in `src/i18n/locales/*.json`; localized **content** lives in
  the content layer (below).

### Content layer & CMS migration path (done)

Content is read through a single function, `getSiteContent(locale)`, from
`@/content`. Components never know where content comes from.

- **Today**: `localProvider` reads `src/content/data/site.js` (edit content
  there). The call is `async`, mirroring a network-backed CMS.
- **Later (CMS)**: add `src/content/providers/<cms>.js` returning the same
  `SiteContent` shape, register it in `providers`, and set
  `VITE_CONTENT_SOURCE=<cms>` (or change the default). **No component changes.**
  Candidates: Sanity (what Allright uses), Contentful, or a headless Git CMS.

3. **Likely additions once the design is finalized**
   - `vue-router` if more than one page/section is needed (locale-aware routes).
   - Image optimization (responsive `srcset`, lazy loading, AVIF/WebP).
   - Web fonts (a refined sans + Noto Sans JP for Japanese text).
   - Scroll/intro animations (GSAP, `@vueuse/motion`, or CSS).
   - Accessibility pass (semantic landmarks, focus states, reduced motion).

---

## Phase 3 — Hosting: GitHub Pages (confirmed)

The site is a static bundle served free from GitHub Pages with a custom domain
and automatic HTTPS. The deploy workflow is already wired up.

### Enabling GitHub Pages

1. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Merge to `main`; the `Deploy to GitHub Pages` workflow publishes `dist/`.
3. The included `public/CNAME` tells Pages to serve the custom domain.

> If we ever want a faster edge network or CDN features, migrating to Cloudflare
> Pages is straightforward — only the deploy workflow and DNS change.

---

## Phase 4 — Register the domain (Onamae.com)

Target: **`2bcdef4hijkl1n5pq3stuvwxyz.jp`** — a *general-use* (`汎用`) `.jp`
domain (anyone may register multiple; no `.co.jp`-style corporate restriction).

### Key requirement

A `.jp` domain **requires a permanent postal address in Japan** for the
registrant (available — confirmed). You cannot register directly with the
registry (JPRS); Onamae.com is an accredited registrar.

### Indicative pricing (Onamae.com)

- Registration: ~¥0 (frequent promo)
- Renewal: ~¥1,276/yr

### Steps

1. Sign in to Onamae.com and search for `2bcdef4hijkl1n5pq3stuvwxyz.jp`.
2. Verify availability and register using the Japanese postal address.
3. Enable WHOIS privacy if offered, and **auto-renew** to avoid expiry loss.
4. Document the login + renewal date.

---

## Phase 5 — DNS configuration

Point the domain at GitHub Pages. In Onamae.com's DNS panel:

**Apex domain (`2bcdef4hijkl1n5pq3stuvwxyz.jp`)** — A records to GitHub Pages:

```
A   @   185.199.108.153
A   @   185.199.109.153
A   @   185.199.110.153
A   @   185.199.111.153
```

(Optionally add the matching AAAA records for IPv6.)

For `www` (optional):

```
CNAME   www   <your-github-username>.github.io.
```

Then:

1. Repo → **Settings → Pages → Custom domain** → enter the domain (the `CNAME`
   file already sets this on deploy; the UI step verifies ownership).
2. Wait for the DNS check to pass, then enable **Enforce HTTPS**.
3. Allow time for DNS propagation and certificate issuance.

---

## Phase 6 — CI/CD pipeline (done)

Two GitHub Actions workflows:

- **`.github/workflows/ci.yml`** — on every PR and push to `main`: install,
  `npm run lint`, `npm run build`. Use as a required status check.
- **`.github/workflows/deploy.yml`** — on push to `main`: build and publish
  `dist/` to GitHub Pages via the official Pages actions (no extra secrets).

Future enhancements: unit tests (Vitest), a Lighthouse CI step, and PR preview
deploys.

---

## Phase 7 — Launch checklist

- [ ] Final design implemented; content/imagery added (both JA + EN).
- [ ] Favicon + social/OG image set; titles and meta descriptions filled in.
- [ ] Responsive QA (mobile / tablet / desktop) and cross-browser check.
- [ ] Accessibility pass (contrast, focus, alt text, reduced motion).
- [ ] Performance pass (Lighthouse ≥ 90; optimized images; preloaded fonts).
- [ ] Domain registered, DNS set, HTTPS enforced and verified.
- [ ] Analytics (privacy-friendly, e.g. Plausible/Umami) — optional.
- [ ] `main` protected; CI required; auto-renew enabled on the domain.
- [ ] Announce / go live.

---

## Next up

With these decisions locked in, the remaining work is: register the domain on
Onamae.com + configure DNS (Phases 4–5), enable Pages (Phase 3), and implement
the real design + bilingual content once the design specs arrive (Phase 2 → 7).

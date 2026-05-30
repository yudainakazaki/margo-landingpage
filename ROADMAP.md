# Margo — Project Roadmap

Margo is an art-project website built with **Vue 3 (Composition API) + Vite**.
This document is the single source of truth for how we take the project from an
empty repository to a live site on **`www.2bcdef4hijkl1n5pq3stuvwxyz.jp`**.

The visual inspiration is [allright-inc.jp](https://www.allright-inc.jp/):
minimal, editorial, image-forward, generous whitespace, refined typography, and
smooth transitions. Detailed design specs will be supplied later; until then the
site ships a clean "coming soon" placeholder.

---

## Current state

- ✅ Foundation, i18n, content layer, and CI/CD are merged to `main`.
- ✅ GitHub Pages enabled and **deploying on every push to `main`**.
- ✅ **Domain registered** at Onamae.com: `2bcdef4hijkl1n5pq3stuvwxyz.jp`.
- 🚀 **In progress: custom-domain cutover** (this PR) — `www` as the canonical
  host, served from the root. No repo rename needed (a custom domain serves at
  the root even for a project repo), so the earlier user-site idea is dropped.

---

## Confirmed decisions

| Question        | Decision                                                                 |
| --------------- | ------------------------------------------------------------------------ |
| **Hosting**     | **GitHub Pages** (project repo `margo-landingpage`) + custom domain.     |
| **Canonical**   | **`www.2bcdef4hijkl1n5pq3stuvwxyz.jp`** (apex redirects to `www`).        |
| **Content/CMS** | **In-repo content for now**, behind a provider abstraction so migrating to a real CMS later is a single-file change. |
| **Domain**      | **Onamae.com** registrar; registered.                                    |
| **Language**    | **Bilingual i18n: Japanese ⇄ English** (Japanese is the default).        |

---

## At a glance

| Concern        | Decision                                                       | Cost (est.)            |
| -------------- | -------------------------------------------------------------- | ---------------------- |
| Framework      | Vue 3 + Vite, Composition API (`<script setup>`)               | Free                   |
| Repository     | This Git repo (`margo-landingpage`)                            | Free                   |
| Hosting        | **GitHub Pages** + custom domain — static, free, TLS           | Free                   |
| i18n           | `vue-i18n` (JA default, EN fallback)                           | Free                   |
| Content        | In-repo provider now → CMS-ready (Sanity/Contentful) later     | Free                   |
| Domain         | `2bcdef4hijkl1n5pq3stuvwxyz.jp` via Onamae.com                 | ~¥0 reg / ~¥1,276 yr   |
| CI/CD          | GitHub Actions (lint + build on PR, deploy on `main`)          | Free                   |
| **Total/yr**   |                                                                | **≈ ¥1,300**           |

> Static hosting is **¥0**; the domain renewal is the only recurring cost.

---

## Phase 0 — Foundations (done)

- [x] Repository, Vue 3 + Vite scaffold (Composition API), placeholder landing.
- [x] Tooling: ESLint + Prettier.
- [x] GitHub Actions: `ci.yml` (lint + build) and `deploy.yml` (Pages).
- [x] **i18n (JA/EN)** with a language switcher and persisted preference.
- [x] **CMS-ready content layer** (in-repo provider today).
- [x] GitHub Pages enabled; pipeline deploying.
- [x] Domain registered at Onamae.com.

---

## Phase 1 — Custom-domain cutover (this PR + your DNS steps)

The site uses `www` as the canonical host; the apex redirects to it.

### A. In the repo (this PR)

- `public/CNAME` = `www.2bcdef4hijkl1n5pq3stuvwxyz.jp`
- Vite `base` = `/` (a custom domain serves from the root).

### B. DNS at Onamae.com

In Onamae's DNS settings, add:

```
# Apex → GitHub Pages IPs (so the apex can redirect to www)
A      @     185.199.108.153
A      @     185.199.109.153
A      @     185.199.110.153
A      @     185.199.111.153

# www → your GitHub Pages host (canonical)
CNAME  www   yudainakazaki.github.io.
```

(Optionally add the four `AAAA` records for IPv6 on the apex.)

### C. GitHub settings

1. Merge this PR so the deploy publishes the `CNAME` file.
2. **Settings → Pages → Custom domain** should auto-fill with
   `www.2bcdef4hijkl1n5pq3stuvwxyz.jp` (from the `CNAME` file). If not, enter it.
3. Wait for the **DNS check** to pass (propagation can take minutes–hours).
4. Enable **Enforce HTTPS** once the certificate is issued.
5. (Optional, recommended) Add the **domain verification** TXT record GitHub
   offers (Settings → Pages → "Verify") to prevent domain takeover.

### D. Verify

- `https://www.2bcdef4hijkl1n5pq3stuvwxyz.jp/` loads the site over HTTPS.
- `https://2bcdef4hijkl1n5pq3stuvwxyz.jp/` (apex) redirects to the `www` host.
- The old `yudainakazaki.github.io/...` URL redirects to the custom domain.

---

## Phase 2 — Build the web app

The scaffold is intentionally thin so the real design drops in cleanly.

1. **Local dev**

   ```bash
   npm install
   npm run dev      # http://localhost:5173
   npm run build    # outputs to dist/  (base '/')
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

### Content layer & CMS migration path (done)

Content is read through a single function, `getSiteContent(locale)`, from
`@/content`. Components never know where content comes from.

- **Today**: `localProvider` reads `src/content/data/site.js` (edit content
  there). The call is `async`, mirroring a network-backed CMS.
- **Later (CMS)**: add `src/content/providers/<cms>.js` returning the same
  `SiteContent` shape, register it in `providers`, and set
  `VITE_CONTENT_SOURCE=<cms>` (or change the default). **No component changes.**

3. **Likely additions once the design is finalized**
   - `vue-router` if more than one page/section is needed (locale-aware routes).
   - Image optimization (responsive `srcset`, lazy loading, AVIF/WebP).
   - Web fonts (a refined sans + Noto Sans JP for Japanese text).
   - Scroll/intro animations (GSAP, `@vueuse/motion`, or CSS).
   - Accessibility pass (semantic landmarks, focus states, reduced motion).

---

## Phase 3 — CI/CD pipeline (done)

- **`.github/workflows/ci.yml`** — on every PR and push to `main`: install,
  `npm run lint`, `npm run build`. Use as a required status check.
- **`.github/workflows/deploy.yml`** — on push to `main`: build and publish
  `dist/` to GitHub Pages via the official Pages actions (no extra secrets).

Future enhancements: unit tests (Vitest), a Lighthouse CI step, and PR preview
deploys.

---

## Phase 4 — Repository hygiene

- **Protect `main`**: require the `CI` check to pass + a review before merge.
- **Auto-renew** the domain at Onamae to avoid expiry.
- **Secrets**: none required for the GitHub Pages path.

---

## Phase 5 — Launch checklist

- [ ] Final design implemented; content/imagery added (both JA + EN).
- [ ] Favicon + social/OG image set; titles and meta descriptions filled in.
- [ ] Responsive QA (mobile / tablet / desktop) and cross-browser check.
- [ ] Accessibility pass (contrast, focus, alt text, reduced motion).
- [ ] Performance pass (Lighthouse ≥ 90; optimized images; preloaded fonts).
- [x] Domain registered.
- [ ] DNS set, custom domain verified, HTTPS enforced (Phase 1).
- [ ] Analytics (privacy-friendly, e.g. Plausible/Umami) — optional.
- [ ] `main` protected; CI required; auto-renew enabled on the domain.
- [ ] Announce / go live.

---

## Next up

Complete the cutover (merge this PR + set DNS + enable HTTPS), then implement
the real design + bilingual content once specs arrive (Phase 2 → 5).

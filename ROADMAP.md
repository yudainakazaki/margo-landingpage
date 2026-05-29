# Margo — Project Roadmap

Margo is an art-project website built with **Vue 3 (Composition API) + Vite**.
This document is the single source of truth for how we take the project from an
empty repository to a live site on **`2bcdef4hijkl1n5pq3stuvwxyz.jp`**.

The visual inspiration is [allright-inc.jp](https://www.allright-inc.jp/):
minimal, editorial, image-forward, generous whitespace, refined typography, and
smooth transitions. Detailed design specs will be supplied later; until then the
site ships a clean "coming soon" placeholder.

---

## Current state

- ✅ Foundation, i18n, content layer, and CI/CD are merged to `main`.
- ✅ GitHub Pages is enabled and **deploying on every push to `main`**.
- 🧭 **Hosting model: GitHub Pages _user_ site** (served from the **root**), so
  the build `base` is `/` everywhere — no project subpath, no path juggling.
- 🌐 **Live preview (after repo rename):** <https://yudainakazaki.github.io/>
- ⏳ Custom domain `2bcdef4hijkl1n5pq3stuvwxyz.jp` not registered yet (owner).
  Because both the user-site URL and the domain serve from the root, the
  cutover needs **no `base` change** — just add `CNAME` + DNS.

---

## Confirmed decisions

| Question        | Decision                                                                 |
| --------------- | ------------------------------------------------------------------------ |
| **Hosting**     | **GitHub Pages — user site** (`yudainakazaki.github.io`, served at root). |
| **Content/CMS** | **In-repo content for now**, behind a provider abstraction so migrating to a real CMS later is a single-file change. |
| **Domain**      | **Onamae.com** registrar; a Japanese postal address is available.        |
| **Language**    | **Bilingual i18n: Japanese ⇄ English** (Japanese is the default).        |
| **Canonical**   | Leaning **`www.` as canonical** (decide at cutover; apex redirects to it).|

---

## At a glance

| Concern        | Decision                                                       | Cost (est.)            |
| -------------- | -------------------------------------------------------------- | ---------------------- |
| Framework      | Vue 3 + Vite, Composition API (`<script setup>`)               | Free                   |
| Repository     | This Git repo, renamed to `yudainakazaki.github.io`            | Free                   |
| Hosting        | **GitHub Pages user site** — static, free, root URL + TLS      | Free                   |
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
- [x] **i18n (JA/EN)** with a language switcher and persisted preference.
- [x] **CMS-ready content layer** (in-repo provider today).
- [x] GitHub Pages enabled; pipeline deploying.

---

## Phase 1 — Switch to a user site (root URL)

To get a **path-free** URL (now and after cutover), this repo is published as a
GitHub Pages **user site**.

1. **Rename the repo** to `yudainakazaki.github.io`:
   Settings → General → *Repository name* → `yudainakazaki.github.io` → Rename.
   (Assumes no existing `yudainakazaki.github.io` repo; only one user site is
   allowed per account.)
2. **Update your local remote** afterward (GitHub also keeps a redirect):
   ```bash
   git remote set-url origin https://github.com/yudainakazaki/yudainakazaki.github.io.git
   ```
3. **Confirm Pages source** is still *GitHub Actions*
   (Settings → Pages). The published URL becomes <https://yudainakazaki.github.io/>.

### Repository hygiene

- **Protect `main`**: require the `CI` check to pass + a review before merge.
- **Secrets**: none required for GitHub Pages.

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
   public/                 # static files copied verbatim (favicon; CNAME at cutover)
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

## Phase 3 — Hosting: GitHub Pages user site (root)

The site is a static bundle served free from GitHub Pages at the **root** URL,
so `base` is `/` and there is no subpath to manage.

- **Enable once (done)**: Settings → Pages → Source: **GitHub Actions**.
- **URL after rename**: <https://yudainakazaki.github.io/>

---

## Phase 3.5 — Custom-domain cutover checklist

Do these **once the domain is registered and DNS can be set**. Because the user
site already serves from the root, **no `base` change is needed** — just:

1. **Decide canonical host** — apex `DOMAIN.jp` or `www.DOMAIN.jp`
   (current lean: `www`). The chosen host goes in the `CNAME` file.
2. **Add `public/CNAME`** containing the canonical host, e.g.
   `www.2bcdef4hijkl1n5pq3stuvwxyz.jp` (or the apex).
3. **DNS at Onamae** (see Phase 5): apex A-records to GitHub + `www` CNAME.
4. **GitHub**: Settings → Pages → Custom domain (auto-filled by the `CNAME`
   file) → wait for the DNS check → enable **Enforce HTTPS**.

After cutover the `github.io` URL redirects to the custom domain automatically.

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

For `www` (needed if `www` is canonical, or to redirect `www` → apex):

```
CNAME   www   yudainakazaki.github.io.
```

Then:

1. Repo → **Settings → Pages → Custom domain** → enter the domain (the `CNAME`
   file sets this on deploy; the UI step verifies ownership).
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
- [ ] Domain registered, DNS set, HTTPS enforced and verified (Phase 3.5).
- [ ] Analytics (privacy-friendly, e.g. Plausible/Umami) — optional.
- [ ] `main` protected; CI required; auto-renew enabled on the domain.
- [ ] Announce / go live.

---

## Next up

Rename the repo to `yudainakazaki.github.io` (path-free root URL), then:
register the domain on Onamae + configure DNS, run the **Custom-domain cutover**
(Phase 3.5 — no base change needed), and implement the real design + bilingual
content once specs arrive (Phase 2 → 7).

# Margo — Project Roadmap

Margo is an art-project website built with **Vue 3 (Composition API) + Vite**.
This document is the single source of truth for how we take the project from an
empty repository to a live site on **`2bcdef4hijkl1n5pq3stuvwxyz.jp`**.

The visual inspiration is [allright-inc.jp](https://www.allright-inc.jp/):
minimal, editorial, image-forward, generous whitespace, refined typography, and
smooth transitions. Detailed design specs will be supplied later; until then the
site ships a clean "coming soon" placeholder.

---

## At a glance

| Concern        | Decision                                                      | Cost (est.)            |
| -------------- | ------------------------------------------------------------- | ---------------------- |
| Framework      | Vue 3 + Vite, Composition API (`<script setup>`)              | Free                   |
| Repository     | This Git repo (GitHub)                                         | Free                   |
| Hosting        | **GitHub Pages** (default) — static, free, custom-domain + TLS | Free                   |
| Alt. hosting   | Cloudflare Pages (best CDN) / Netlify / Vercel                | Free tiers             |
| Domain         | `2bcdef4hijkl1n5pq3stuvwxyz.jp` (general-use .jp)             | ~¥0–2,035 / ~¥1,276–3,803 yr |
| CI/CD          | GitHub Actions (lint + build on PR, deploy on `main`)         | Free                   |
| **Total/yr**   |                                                               | **≈ ¥1,300–3,800**     |

> Because the site is a static SPA, hosting can be **¥0**. The domain is the only
> recurring cost, so total running cost is roughly the renewal price of the
> `.jp` domain.

---

## Phase 0 — Foundations (done in this PR)

- [x] Repository initialized (GitHub).
- [x] Vue 3 + Vite scaffold using the Composition API.
- [x] Minimal "coming soon" landing placeholder (`src/App.vue`).
- [x] Tooling: ESLint + Prettier.
- [x] GitHub Actions: `ci.yml` (lint + build) and `deploy.yml` (Pages).
- [x] `public/CNAME` pre-set to the production domain for GitHub Pages.
- [x] Verified local `npm run build` produces a working `dist/`.

What you get after merging: a green CI pipeline and a deployable static site.
Everything below is the operational work that follows.

---

## Phase 1 — Repository hygiene

1. **Protect `main`**: Settings → Branches → add a rule requiring the `CI`
   check to pass and at least one review before merge.
2. **Default branch**: confirm `main`.
3. **Secrets**: none required for the GitHub Pages path. (Cloudflare/Netlify/
   Vercel would need API tokens — see Phase 3 alternatives.)
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

2. **Structure** (extend as the design lands)

   ```
   index.html            # app shell, <head>, meta/OG tags
   src/
     main.js             # app entry (createApp)
     App.vue             # root component (Composition API)
     assets/main.css     # global styles + design tokens (CSS variables)
     components/         # reusable UI (SiteFooter.vue today)
   public/               # static files copied verbatim (favicon, CNAME)
   ```

3. **Likely additions once the design is finalized**
   - `vue-router` if more than one page/section is needed.
   - A CMS for editable content/imagery (Allright uses Sanity). Options:
     Sanity, Contentful, or simple Markdown/JSON in-repo for a small site.
   - Image optimization (responsive `srcset`, lazy loading, AVIF/WebP).
   - Web fonts (e.g. a refined sans + Noto Sans JP for Japanese text).
   - Scroll/intro animations (GSAP, `@vueuse/motion`, or CSS).
   - Accessibility pass (semantic landmarks, focus states, reduced-motion).

---

## Phase 3 — Choose hosting (cheaper is better)

The site is a static bundle, so the cheapest viable option is **free static
hosting**. Recommendation below; all options cost ¥0 for this traffic profile.

| Option                | Cost | Custom domain + TLS | Notes                                              |
| --------------------- | ---- | ------------------- | -------------------------------------------------- |
| **GitHub Pages** ⭐    | Free | Yes (auto HTTPS)    | Zero extra accounts/secrets; pipeline already set up |
| Cloudflare Pages      | Free | Yes                 | Best global CDN/perf; needs Cloudflare account/token |
| Netlify               | Free | Yes                 | Great DX, form handling; needs account/token       |
| Vercel                | Free | Yes                 | Great DX; needs account/token                      |

**Decision: start on GitHub Pages** (already wired up, no third-party secrets).
If we later want a faster edge network or CDN features, migrating to Cloudflare
Pages is straightforward — only the deploy workflow and DNS change.

### Enabling GitHub Pages

1. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Merge to `main`; the `Deploy to GitHub Pages` workflow publishes `dist/`.
3. The included `public/CNAME` tells Pages to serve the custom domain.

---

## Phase 4 — Request / buy the domain

Target: **`2bcdef4hijkl1n5pq3stuvwxyz.jp`** — a *general-use* (`汎用`) `.jp`
domain (anyone may register multiple; no `.co.jp`-style corporate restriction).

### Key requirement ⚠️

A `.jp` domain **requires a permanent postal address in Japan** for the
registrant. You do **not** need to be a Japanese citizen or company, but a valid
Japanese mailing address is mandatory (a virtual-office address is generally
accepted). You cannot register directly with the registry (JPRS) — you must use
an accredited registrar.

### Registrar options & indicative pricing

| Registrar                  | Register   | Renew        | Notes                            |
| -------------------------- | ---------- | ------------ | -------------------------------- |
| Onamae.com (GMO) ⭐         | ~¥0        | ~¥1,276/yr   | Largest JP registrar; cheapest   |
| Star Domain                | ~¥1,280    | ~¥1,300/yr   | Simple, cheap renewals           |
| Value-Domain               | ~¥2,035    | ~¥3,803/yr   | Bundles hosting/DNS              |
| Sakura Internet            | varies     | varies       | Popular JP host + registrar      |
| Gandi / Openprovider (intl)| higher     | higher       | If you lack a JP address service |

> Prices fluctuate and promos are common — confirm at purchase time.

### Steps

1. Pick a registrar (recommended: **Onamae.com** for lowest cost).
2. Search for `2bcdef4hijkl1n5pq3stuvwxyz.jp` and verify availability.
3. Provide a valid Japanese postal address as registrant.
4. Enable WHOIS privacy if offered, and **auto-renew** to avoid expiry loss.
5. Keep registrar login + renewal date documented.

---

## Phase 5 — DNS configuration

Point the domain at GitHub Pages. In the registrar's DNS panel:

**Apex domain (`2bcdef4hijkl1n5pq3stuvwxyz.jp`)** — A records to GitHub Pages:

```
A   @   185.199.108.153
A   @   185.199.109.153
A   @   185.199.110.153
A   @   185.199.111.153
```

(Optionally add the matching AAAA records for IPv6.)

If you also want `www`, add:

```
CNAME   www   <your-github-username>.github.io.
```

Then:

1. Repo → **Settings → Pages → Custom domain** → enter the domain (the `CNAME`
   file already does this on deploy; the UI step verifies ownership).
2. Wait for DNS check to pass, then enable **Enforce HTTPS**.
3. Allow time for DNS propagation and certificate issuance.

> Switching to Cloudflare Pages later: move the nameservers/records to
> Cloudflare and set the project's custom domain there instead. (Note:
> Cloudflare **Registrar** does not sell `.jp`, but Cloudflare **DNS/Pages**
> works fine with a `.jp` registered elsewhere.)

---

## Phase 6 — CI/CD pipeline (done in this PR)

Two GitHub Actions workflows:

- **`.github/workflows/ci.yml`** — on every PR and push to `main`: install,
  `npm run lint`, `npm run build`. Use as a required status check.
- **`.github/workflows/deploy.yml`** — on push to `main`: build and publish
  `dist/` to GitHub Pages via the official Pages actions (no extra secrets).

Future enhancements: add unit tests (Vitest) and an `e2e`/Lighthouse CI step,
plus PR preview deploys (native on Cloudflare/Netlify/Vercel).

---

## Phase 7 — Launch checklist

- [ ] Final design implemented and content/imagery added.
- [ ] Favicon + social/OG image set; titles and meta descriptions filled in.
- [ ] Responsive QA (mobile / tablet / desktop) and cross-browser check.
- [ ] Accessibility pass (contrast, focus, alt text, reduced motion).
- [ ] Performance pass (Lighthouse ≥ 90; optimized images; preloaded fonts).
- [ ] Domain registered, DNS set, HTTPS enforced and verified.
- [ ] Analytics (privacy-friendly, e.g. Plausible/Umami) — optional.
- [ ] `main` protected; CI required; auto-renew enabled on the domain.
- [ ] Announce / go live.

---

## Open decisions for you

1. **Hosting**: confirm GitHub Pages, or prefer Cloudflare Pages for CDN/perf?
2. **CMS vs. in-repo content**: will content change often (CMS) or rarely (in-repo)?
3. **Domain registrar**: Onamae.com (cheapest) acceptable? Do you have a Japanese
   postal address for registration, or do you need a virtual-office service?
4. **Multi-language?** Japanese + English, or single language?

Once you confirm these and share the design, we proceed through Phases 2–7.

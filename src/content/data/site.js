/**
 * In-repo site content, keyed by locale.
 *
 * This is the ONLY place editors touch content today. The shape here is the
 * contract the rest of the app relies on (see `SiteContent` in
 * `src/content/index.js`). When we migrate to a real CMS, a new provider just
 * has to return this same shape — no UI changes required.
 *
 * Keep keys identical across locales so fallback behaves predictably.
 */
export const siteContent = {
  en: {
    meta: {
      title: 'Margo',
      description: 'Margo — an art project.',
    },
    hero: {
      title: 'Margo',
    },
  },
  ja: {
    meta: {
      title: 'Margo（マーゴ）',
      description: 'Margo — アートプロジェクト。',
    },
    hero: {
      title: 'Margo',
    },
  },
}

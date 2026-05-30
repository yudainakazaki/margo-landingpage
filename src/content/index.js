import { localProvider } from '@/content/providers/local'

/**
 * Content layer — the single seam between the app and wherever content lives.
 *
 * Today content is bundled in-repo (`localProvider`). To migrate to a CMS
 * (Sanity, Contentful, etc.) later:
 *   1. Add `src/content/providers/<cms>.js` exporting an object that satisfies
 *      the `ContentProvider` shape below.
 *   2. Register it in `providers` and point `VITE_CONTENT_SOURCE` at it
 *      (or change the default below).
 * No component needs to change, because they only import from `@/content`.
 *
 * @typedef {Object} SiteMeta
 * @property {string} title
 * @property {string} description
 *
 * @typedef {Object} SiteHero
 * @property {string} title
 *
 * @typedef {Object} SiteContent
 * @property {SiteMeta} meta
 * @property {SiteHero} hero
 *
 * @typedef {Object} ContentProvider
 * @property {string} name
 * @property {(locale: string) => Promise<SiteContent>} getSiteContent
 */

/** @type {Record<string, ContentProvider>} */
const providers = {
  local: localProvider,
  // sanity: sanityProvider,    // <- add here when migrating
}

const source = import.meta.env.VITE_CONTENT_SOURCE || 'local'

/** @type {ContentProvider} */
const provider = providers[source] || localProvider

/**
 * Fetch the localized site content.
 * @param {string} locale
 * @returns {Promise<SiteContent>}
 */
export function getSiteContent(locale) {
  return provider.getSiteContent(locale)
}

export const activeContentSource = provider.name

/**
 * Shared i18n configuration. Kept separate from the i18n instance so other
 * modules (content providers, the language switcher) can import constants
 * without creating circular dependencies.
 */

/** Locales the site supports, in display order. */
export const SUPPORTED_LOCALES = [
  { code: 'ja', name: '日本語' },
  { code: 'en', name: 'English' },
]

export const SUPPORTED_LOCALE_CODES = SUPPORTED_LOCALES.map((l) => l.code)

/** Default locale — this is a .jp site, so Japanese leads. */
export const DEFAULT_LOCALE = 'ja'

/** Fallback used when a key/locale is missing. */
export const FALLBACK_LOCALE = 'en'

/** localStorage key for the user's explicit choice. */
export const LOCALE_STORAGE_KEY = 'margo:locale'

function isSupported(code) {
  return SUPPORTED_LOCALE_CODES.includes(code)
}

/**
 * Resolve the initial locale: a previously saved choice wins, then the
 * browser's preferred language, then the default.
 * @returns {string}
 */
export function getStartingLocale() {
  if (typeof window !== 'undefined') {
    const saved = window.localStorage?.getItem(LOCALE_STORAGE_KEY)
    if (saved && isSupported(saved)) return saved

    const browser = window.navigator?.language?.slice(0, 2)
    if (browser && isSupported(browser)) return browser
  }
  return DEFAULT_LOCALE
}

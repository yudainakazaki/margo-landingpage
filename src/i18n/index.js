import { createI18n } from 'vue-i18n'
import en from '@/i18n/locales/en.json'
import ja from '@/i18n/locales/ja.json'
import {
  FALLBACK_LOCALE,
  getStartingLocale,
  LOCALE_STORAGE_KEY,
} from '@/i18n/config'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getStartingLocale(),
  fallbackLocale: FALLBACK_LOCALE,
  messages: { en, ja },
})

/**
 * Switch locale app-wide and persist the choice. Also keeps the document's
 * `<html lang>` attribute in sync for accessibility and SEO.
 * @param {string} locale
 */
export function setLocale(locale) {
  i18n.global.locale.value = locale
  if (typeof window !== 'undefined') {
    window.localStorage?.setItem(LOCALE_STORAGE_KEY, locale)
    document.documentElement.setAttribute('lang', locale)
  }
}

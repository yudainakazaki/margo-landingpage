import { siteContent } from '@/content/data/site'
import { DEFAULT_LOCALE } from '@/i18n/config'

/**
 * Local (in-repo) content provider.
 *
 * Reads from the bundled `siteContent` object. Methods are async on purpose so
 * the interface matches a future network-backed CMS provider — consumers can
 * `await` today and nothing changes when we swap in a real CMS.
 *
 * @type {import('@/content').ContentProvider}
 */
export const localProvider = {
  name: 'local',

  async getSiteContent(locale) {
    return siteContent[locale] ?? siteContent[DEFAULT_LOCALE]
  },
}

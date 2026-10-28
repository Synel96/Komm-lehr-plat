import { SUPPORTED_LANGS, langPath } from "./i18n-config";

/**
 * Every URL a page should be prerendered at: the un-prefixed path (served in
 * the default language) plus one lang-prefixed URL per supported language.
 * Use it from each page's +onBeforePrerenderStart.ts.
 */
export function prerenderUrls(pathname: string) {
  return [pathname, ...SUPPORTED_LANGS.map((lang) => langPath(pathname, lang))];
}

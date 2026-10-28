import { usePageContext } from "vike-react/usePageContext";
import { DEFAULT_LANG, langPath, type SupportedLang } from "../i18n-config";

/** Current language (from the URL prefix) and a helper for lang-prefixed links. */
export function useLang() {
  const pageContext = usePageContext() as { lang?: SupportedLang };
  const lang = pageContext.lang ?? DEFAULT_LANG;
  return { lang, href: (pathname: string) => langPath(pathname, lang) };
}

import type { PageContext } from "vike/types";
import { getArea } from "../../../src/content/lessons";
import { DEFAULT_LANG, type SupportedLang } from "../../../src/i18n-config";

// The area's title, in the page's language.
export default (pageContext: PageContext) => {
  const lang = (pageContext as PageContext & { lang?: SupportedLang }).lang ?? DEFAULT_LANG;
  return getArea(pageContext.routeParams.area)?.title[lang] ?? "Lektionen";
};

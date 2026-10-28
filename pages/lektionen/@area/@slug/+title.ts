import type { PageContext } from "vike/types";
import { getLesson } from "../../../../src/content/lessons";
import { DEFAULT_LANG, type SupportedLang } from "../../../../src/i18n-config";

// The lesson's own title, in the page's language.
export default (pageContext: PageContext) => {
  const lang = (pageContext as PageContext & { lang?: SupportedLang }).lang ?? DEFAULT_LANG;
  const { area, slug } = pageContext.routeParams;
  return getLesson(area, slug)?.title[lang] ?? "Lektion";
};

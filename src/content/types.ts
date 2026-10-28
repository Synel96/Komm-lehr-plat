import type { SupportedLang } from "../i18n-config";

/** A text in every supported language. German is the source text. */
export type Localized = Record<SupportedLang, string>;

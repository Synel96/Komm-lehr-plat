import type { SupportedLang } from "../i18n-config";
import type { GlossaryEntry, GlossaryKind } from "./glossary";

/** Lowercases and strips accents/umlauts so "mhd", "MHD" and "Stück"/"stuck" all match. */
export function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function sortGlossary(entries: GlossaryEntry[]) {
  return [...entries].sort((a, b) => a.term.localeCompare(b.term, "de", { sensitivity: "base" }));
}

type FilterOptions = {
  query: string;
  lang: SupportedLang;
  kind: GlossaryKind | "all";
};

/**
 * Matches the query against the term, its full form and the explanation in
 * the current language. Matches on the term itself are listed first.
 */
export function filterGlossary(entries: GlossaryEntry[], { query, lang, kind }: FilterOptions) {
  const byKind = kind === "all" ? entries : entries.filter((entry) => entry.kind === kind);
  const q = normalize(query);
  if (!q) return byKind;

  const termMatches: GlossaryEntry[] = [];
  const otherMatches: GlossaryEntry[] = [];
  for (const entry of byKind) {
    if (normalize(`${entry.term} ${entry.full ?? ""}`).includes(q)) {
      termMatches.push(entry);
    } else if (normalize(entry.explanation[lang]).includes(q)) {
      otherMatches.push(entry);
    }
  }
  return [...termMatches, ...otherMatches];
}

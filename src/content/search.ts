import type { SupportedLang } from "../i18n-config";
import type { GlossaryCategory, GlossaryEntry, GlossaryKind } from "./glossary";

export type GlossaryFilter = "all" | GlossaryKind | GlossaryCategory;

/** Lowercases and strips accents/umlauts so "mhd", "MHD" and "Stück"/"stuck" all match. */
export function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function sortGlossary(entries: GlossaryEntry[]) {
  return [...entries].sort((a, b) => a.term.localeCompare(b.term, "de", { sensitivity: "base" }));
}

type FilterOptions = {
  query: string;
  lang: SupportedLang;
  filter: GlossaryFilter;
};

/**
 * Matches the query against the term, its full form and the explanation in
 * the current language. Matches on the term itself are listed first.
 */
export function filterGlossary(entries: GlossaryEntry[], { query, lang, filter }: FilterOptions) {
  const byFilter =
    filter === "all"
      ? entries
      : entries.filter((entry) => entry.kind === filter || entry.category === filter);
  const q = normalize(query);
  if (!q) return byFilter;

  const termMatches: GlossaryEntry[] = [];
  const otherMatches: GlossaryEntry[] = [];
  for (const entry of byFilter) {
    if (normalize(`${entry.term} ${entry.full ?? ""}`).includes(q)) {
      termMatches.push(entry);
    } else if (normalize(entry.explanation[lang]).includes(q)) {
      otherMatches.push(entry);
    }
  }
  return [...termMatches, ...otherMatches];
}

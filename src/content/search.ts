import type { SupportedLang } from "../i18n-config";
import {
  GLOSSARY_CATEGORIES,
  type GlossaryCategory,
  type GlossaryEntry,
  type GlossaryKind,
} from "./glossary";

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
  category?: GlossaryCategory | "all";
  kind?: GlossaryKind | "all";
};

/**
 * Narrows by category and kind, then matches the query against the term, its
 * full form and the explanation in the current language. Matches on the term
 * itself are listed first.
 */
export function filterGlossary(
  entries: GlossaryEntry[],
  { query, lang, category = "all", kind = "all" }: FilterOptions
) {
  const narrowed = entries.filter(
    (entry) =>
      (category === "all" || entry.category === category) && (kind === "all" || entry.kind === kind)
  );
  const q = normalize(query);
  if (!q) return narrowed;

  const termMatches: GlossaryEntry[] = [];
  const otherMatches: GlossaryEntry[] = [];
  for (const entry of narrowed) {
    if (normalize(`${entry.term} ${entry.full ?? ""}`).includes(q)) {
      termMatches.push(entry);
    } else if (normalize(entry.explanation[lang]).includes(q)) {
      otherMatches.push(entry);
    }
  }
  return [...termMatches, ...otherMatches];
}

/** Splits entries into the glossary groups (in GLOSSARY_CATEGORIES order), skipping empty ones. */
export function groupByCategory(entries: GlossaryEntry[]) {
  return GLOSSARY_CATEGORIES.map((category) => ({
    category,
    entries: entries.filter((entry) => entry.category === category.id),
  })).filter((group) => group.entries.length > 0);
}

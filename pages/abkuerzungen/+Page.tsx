import { ArrowLeft, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  GLOSSARY,
  GLOSSARY_CATEGORIES,
  type GlossaryCategory,
  type GlossaryEntry,
} from "@/src/content/glossary";
import { filterGlossary, groupByCategory, sortGlossary } from "@/src/content/search";
import type { SupportedLang } from "@/src/i18n-config";
import { useLang } from "@/src/hooks/use-lang";
import { clearLessonReturn, readLessonReturn, type LessonReturn } from "@/src/lesson-position";
import { CATEGORY_STYLES } from "@/components/glossary/category-styles";
import { cn } from "@/lib/utils";

const SORTED_GLOSSARY = sortGlossary(GLOSSARY);

type View = "grouped" | "flat" | "abbr";

function categoryLabel(id: GlossaryCategory, lang: SupportedLang) {
  return GLOSSARY_CATEGORIES.find((category) => category.id === id)?.label[lang];
}

function ToggleButton({
  active,
  onClick,
  chip = false,
  children,
}: {
  active: boolean;
  onClick: () => void;
  /** Bordered pill style, for the category filter. */
  chip?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 text-sm font-medium transition-colors",
        chip ? "rounded-full border" : "rounded-md",
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

function CategoryBadge({ category, lang }: { category: GlossaryCategory; lang: SupportedLang }) {
  return (
    <span
      lang={lang}
      className={cn(
        "inline-block rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        CATEGORY_STYLES[category].badge
      )}
    >
      {categoryLabel(category, lang)}
    </span>
  );
}

function EntryCard({
  entry,
  lang,
  exampleLabel,
}: {
  entry: GlossaryEntry;
  lang: SupportedLang;
  exampleLabel: string;
}) {
  return (
    <li
      id={entry.id}
      className={cn(
        "text-card-foreground scroll-mt-6 rounded-2xl border border-l-4 p-5 shadow-sm target:ring-2 target:ring-amber-400",
        CATEGORY_STYLES[entry.category].card
      )}
    >
      <div lang="de" className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-lg font-bold">{entry.term}</span>
        {entry.full && <span className="text-muted-foreground italic">{entry.full}</span>}
        <CategoryBadge category={entry.category} lang={lang} />
      </div>
      <p className="mt-2">{entry.explanation[lang]}</p>
      {entry.example && (
        <p className="text-muted-foreground mt-2 text-sm">
          {exampleLabel}:{" "}
          <code lang="de" className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono">
            {entry.example}
          </code>
        </p>
      )}
    </li>
  );
}

export default function Page() {
  const { t } = useTranslation();
  const { lang } = useLang();
  const [query, setQuery] = useState("");
  const [view, setView] = useState<View>("grouped");
  const [category, setCategory] = useState<GlossaryCategory | "all">("all");
  // Set when a word was opened from a lesson: offers a way back to it.
  const [lessonReturn, setLessonReturn] = useState<LessonReturn | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage is only readable after mount
    setLessonReturn(readLessonReturn());
  }, []);

  const results = useMemo(
    () =>
      filterGlossary(SORTED_GLOSSARY, {
        query,
        lang,
        category,
        kind: view === "abbr" ? "abbr" : "all",
      }),
    [query, lang, category, view]
  );

  const views: { value: View; label: string }[] = [
    { value: "grouped", label: t("glossary.viewGrouped") },
    { value: "flat", label: t("glossary.viewFlat") },
    { value: "abbr", label: t("glossary.filterAbbr") },
  ];
  const exampleLabel = t("glossary.example");

  return (
    <div className={cn("mx-auto w-full max-w-4xl px-6 py-12", lessonReturn && "pb-28")}>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("glossary.title")}</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl text-lg">{t("glossary.intro")}</p>

      <div className="bg-card mt-8 space-y-4 rounded-2xl border p-4 shadow-sm">
        <label className="relative block">
          <span className="sr-only">{t("glossary.searchLabel")}</span>
          <Search
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("glossary.searchPlaceholder")}
            autoComplete="off"
            className="bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-11 w-full rounded-lg border pr-3 pl-9 text-base outline-none focus-visible:ring-3"
          />
        </label>

        <div>
          <p className="text-muted-foreground mb-1.5 text-xs font-medium tracking-wide uppercase">
            {t("glossary.viewLabel")}
          </p>
          <div
            role="group"
            aria-label={t("glossary.viewLabel")}
            className="inline-flex flex-wrap rounded-lg border p-1"
          >
            {views.map((option) => (
              <ToggleButton
                key={option.value}
                active={view === option.value}
                onClick={() => setView(option.value)}
              >
                {option.label}
              </ToggleButton>
            ))}
          </div>
        </div>

        <div>
          <p className="text-muted-foreground mb-1.5 text-xs font-medium tracking-wide uppercase">
            {t("glossary.categoryLabel")}
          </p>
          <div
            role="group"
            aria-label={t("glossary.categoryLabel")}
            className="flex flex-wrap gap-1.5"
          >
            <ToggleButton chip active={category === "all"} onClick={() => setCategory("all")}>
              {t("glossary.filterAll")}
            </ToggleButton>
            {GLOSSARY_CATEGORIES.map((option) => (
              <ToggleButton
                key={option.id}
                chip
                active={category === option.id}
                onClick={() => setCategory(option.id)}
              >
                <span
                  className={cn(
                    "mr-1.5 inline-block size-2 rounded-full align-middle",
                    CATEGORY_STYLES[option.id].dot
                  )}
                  aria-hidden="true"
                />
                {option.label[lang]}
              </ToggleButton>
            ))}
          </div>
        </div>
      </div>

      <p className="text-muted-foreground mt-4 text-sm" aria-live="polite">
        {results.length > 0
          ? t("glossary.count", { count: results.length })
          : t("glossary.noResults")}
      </p>

      {view === "grouped" &&
        groupByCategory(results).map((group) => (
          <section
            key={group.category.id}
            aria-labelledby={`group-${group.category.id}`}
            className="mt-8 first-of-type:mt-4"
          >
            <h2
              id={`group-${group.category.id}`}
              className="flex items-center gap-2 border-b pb-2 text-xl font-semibold"
            >
              <span
                className={cn(
                  "size-3 shrink-0 rounded-full",
                  CATEGORY_STYLES[group.category.id].dot
                )}
                aria-hidden="true"
              />
              {group.category.label[lang]}
              <span className="text-muted-foreground text-sm font-normal">
                {group.entries.length}
              </span>
            </h2>
            <ul className="mt-3 grid gap-3">
              {group.entries.map((entry) => (
                <EntryCard key={entry.id} entry={entry} lang={lang} exampleLabel={exampleLabel} />
              ))}
            </ul>
          </section>
        ))}

      {view === "flat" && (
        <ul className="mt-4 grid gap-3">
          {results.map((entry) => (
            <EntryCard key={entry.id} entry={entry} lang={lang} exampleLabel={exampleLabel} />
          ))}
        </ul>
      )}

      {view === "abbr" && results.length > 0 && (
        // Abbreviation list: every abbreviation written out in full.
        <div className="mt-4 overflow-hidden rounded-2xl border shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted">
              <tr>
                <th scope="col" className="px-4 py-2 font-semibold">
                  {t("glossary.abbrTerm")}
                </th>
                <th scope="col" className="px-4 py-2 font-semibold">
                  {t("glossary.abbrFull")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {results.map((entry) => (
                <tr
                  key={entry.id}
                  id={entry.id}
                  className="bg-card scroll-mt-6 align-top target:ring-2 target:ring-amber-400"
                >
                  <th scope="row" className="px-4 py-3 align-top">
                    <span lang="de" className="block font-bold whitespace-nowrap">
                      {entry.term}
                    </span>
                    <span className="mt-1 block">
                      <CategoryBadge category={entry.category} lang={lang} />
                    </span>
                  </th>
                  <td className="px-4 py-3">
                    <span lang="de" className="font-medium">
                      {entry.full}
                    </span>
                    <span className="text-muted-foreground mt-1 block">
                      {entry.explanation[lang]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {lessonReturn && (
        // Pinned to the bottom: the page usually opens scrolled to the looked-up word.
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex justify-center px-4">
          <a
            href={lessonReturn.href}
            onClick={clearLessonReturn}
            className="pointer-events-auto inline-flex max-w-full items-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-black shadow-lg hover:bg-amber-300"
          >
            <ArrowLeft className="size-4 shrink-0" aria-hidden="true" />
            <span className="truncate">
              {t("glossary.backToLesson", { title: lessonReturn.title })}
            </span>
          </a>
        </div>
      )}
    </div>
  );
}

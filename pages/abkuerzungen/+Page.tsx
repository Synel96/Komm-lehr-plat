import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { GLOSSARY, type GlossaryKind } from "@/src/content/glossary";
import { filterGlossary, sortGlossary } from "@/src/content/search";
import { useLang } from "@/src/hooks/use-lang";
import { cn } from "@/lib/utils";

const SORTED_GLOSSARY = sortGlossary(GLOSSARY);

type KindFilter = GlossaryKind | "all";

export default function Page() {
  const { t } = useTranslation();
  const { lang } = useLang();
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<KindFilter>("all");

  const results = useMemo(
    () => filterGlossary(SORTED_GLOSSARY, { query, lang, kind }),
    [query, lang, kind]
  );

  const filters: { value: KindFilter; label: string }[] = [
    { value: "all", label: t("glossary.filterAll") },
    { value: "abbr", label: t("glossary.filterAbbr") },
    { value: "word", label: t("glossary.filterWord") },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("glossary.title")}</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl text-lg">{t("glossary.intro")}</p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <label className="relative flex-1">
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

        <div
          role="group"
          aria-label={t("glossary.filterLabel")}
          className="inline-flex shrink-0 rounded-lg border p-1"
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              aria-pressed={kind === filter.value}
              onClick={() => setKind(filter.value)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                kind === filter.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-muted-foreground mt-4 text-sm" aria-live="polite">
        {results.length > 0
          ? t("glossary.count", { count: results.length })
          : t("glossary.noResults")}
      </p>

      <ul className="mt-4 grid gap-3">
        {results.map((entry) => (
          <li key={entry.id} className="bg-card text-card-foreground rounded-xl border p-5">
            <div lang="de" className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-lg font-bold">{entry.term}</span>
              {entry.full && <span className="text-muted-foreground italic">{entry.full}</span>}
            </div>
            <p className="mt-2">{entry.explanation[lang]}</p>
            {entry.example && (
              <p className="text-muted-foreground mt-2 text-sm">
                {t("glossary.example")}:{" "}
                <code
                  lang="de"
                  className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono"
                >
                  {entry.example}
                </code>
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

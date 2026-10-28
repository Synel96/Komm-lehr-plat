import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AREA_ICONS, AREA_STYLES } from "@/components/lessons/area-icons";
import { AREAS, lessonsInArea } from "@/src/content/lessons";
import { useLang } from "@/src/hooks/use-lang";
import { useLessonProgress } from "@/src/hooks/use-lesson-progress";
import { cn } from "@/lib/utils";

export default function Page() {
  const { t } = useTranslation();
  const { lang, href } = useLang();
  const { progress } = useLessonProgress();

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("lessons.title")}</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl text-lg">{t("lessons.intro")}</p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {AREAS.map((area) => {
          const Icon = AREA_ICONS[area.id];
          const chapters = lessonsInArea(area.id);
          const done = chapters.filter((lesson) => progress[lesson.slug]).length;
          return (
            <li key={area.id}>
              <a
                href={href(`/lektionen/${area.id}`)}
                className="group bg-card text-card-foreground flex h-full flex-col rounded-2xl border p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span
                  className={cn(
                    "inline-flex size-14 items-center justify-center rounded-xl",
                    AREA_STYLES[area.id].tile
                  )}
                >
                  <Icon className="size-7" aria-hidden="true" />
                </span>
                <span className="mt-4 text-2xl font-semibold">{area.title[lang]}</span>
                <span className="text-muted-foreground mt-2 flex-1">{area.description[lang]}</span>
                <span className="text-muted-foreground mt-4 text-sm">
                  {t("lessons.chapterCount", { count: chapters.length })} ·{" "}
                  {t("lessons.areaProgress", { done, total: chapters.length })}
                </span>
                <span
                  className="bg-muted mt-3 h-1.5 overflow-hidden rounded-full"
                  aria-hidden="true"
                >
                  <span
                    className={cn("block h-full rounded-full", AREA_STYLES[area.id].bar)}
                    style={{ width: `${Math.round((done / chapters.length) * 100)}%` }}
                  />
                </span>
                <span className="text-primary mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                  {t("lessons.chooseChapterCta")}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

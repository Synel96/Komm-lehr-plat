import { ArrowLeft, CircleCheck, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePageContext } from "vike-react/usePageContext";
import { AREA_ICONS } from "@/components/lessons/area-icons";
import { getArea, lessonPath, lessonsInArea } from "@/src/content/lessons";
import { useLang } from "@/src/hooks/use-lang";
import { useLessonProgress } from "@/src/hooks/use-lesson-progress";
import { cn } from "@/lib/utils";

export default function Page() {
  const { t } = useTranslation();
  const { lang, href } = useLang();
  const { routeParams } = usePageContext();
  const { progress } = useLessonProgress();

  // +guard.ts has already turned unknown areas into a 404.
  const area = getArea(routeParams.area)!;
  const chapters = lessonsInArea(area.id);
  const done = chapters.filter((lesson) => progress[lesson.slug]).length;
  const Icon = AREA_ICONS[area.id];

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <a
        href={href("/lektionen")}
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        {t("lessons.backToAreas")}
      </a>

      <div className="mt-6 flex items-center gap-4">
        <span className="bg-muted inline-flex size-14 shrink-0 items-center justify-center rounded-xl">
          <Icon className="size-7" aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{area.title[lang]}</h1>
          <p className="text-muted-foreground mt-1">{area.description[lang]}</p>
        </div>
      </div>
      <p className="text-muted-foreground mt-6 text-sm">
        {t("lessons.chooseChapter")} {t("lessons.areaProgress", { done, total: chapters.length })}
      </p>

      <ol className="mt-4 grid gap-3">
        {chapters.map((lesson, index) => {
          const result = progress[lesson.slug];
          return (
            <li key={lesson.slug}>
              <a
                href={href(lessonPath(lesson))}
                className="bg-card text-card-foreground hover:border-foreground/30 hover:bg-muted flex items-start gap-4 rounded-xl border p-5 transition-colors"
              >
                <span
                  className={cn(
                    "inline-flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",
                    result && "border-green-600 bg-green-600/10 text-green-700 dark:text-green-500"
                  )}
                  aria-hidden="true"
                >
                  {result ? <CircleCheck className="size-5" /> : index + 1}
                </span>
                <span className="flex flex-1 flex-col">
                  <span className="text-muted-foreground text-xs font-medium">
                    {t("lessons.chapterNo", { n: index + 1 })}
                  </span>
                  <span className="font-semibold">{lesson.title[lang]}</span>
                  <span className="text-muted-foreground mt-1 text-sm">{lesson.summary[lang]}</span>
                  <span className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" aria-hidden="true" />
                      {t("lessons.minutes", { count: lesson.minutes })}
                    </span>
                    <span>{t("lessons.exerciseCount", { count: lesson.exercises.length })}</span>
                    {result && (
                      <span className="font-medium text-green-700 dark:text-green-500">
                        {t("lessons.doneScore", { score: result.score, total: result.total })}
                      </span>
                    )}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

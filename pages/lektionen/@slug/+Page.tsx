import { ArrowLeft, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePageContext } from "vike-react/usePageContext";
import { LessonPlayer } from "@/components/lessons/LessonPlayer";
import { LESSONS, TOPICS } from "@/src/content/lessons";
import { useLang } from "@/src/hooks/use-lang";
import { useLessonProgress } from "@/src/hooks/use-lesson-progress";

export default function Page() {
  const { t } = useTranslation();
  const { lang, href } = useLang();
  const { routeParams } = usePageContext();
  const { saveResult } = useLessonProgress();

  // +guard.ts has already turned unknown slugs into a 404.
  const index = LESSONS.findIndex((lesson) => lesson.slug === routeParams.slug);
  const lesson = LESSONS[index];
  const topic = TOPICS.find((item) => item.id === lesson.topic);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <a
        href={href("/lektionen")}
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        {t("lessons.backToOverview")}
      </a>

      {topic && (
        <p className="text-muted-foreground mt-6 text-sm font-medium">{topic.title[lang]}</p>
      )}
      <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
        {lesson.title[lang]}
      </h1>
      <p className="text-muted-foreground mt-3 text-lg">{lesson.summary[lang]}</p>
      <p className="text-muted-foreground mt-2 inline-flex items-center gap-1 text-sm">
        <Clock className="size-4" aria-hidden="true" />
        {t("lessons.minutes", { count: lesson.minutes })}
      </p>

      <div className="mt-8">
        <LessonPlayer
          key={lesson.slug}
          lesson={lesson}
          nextLesson={LESSONS[index + 1]}
          onFinished={(result) => saveResult(lesson.slug, result)}
        />
      </div>
    </div>
  );
}

import {
  AlertTriangle,
  CircleCheck,
  Clock,
  PackageSearch,
  ScanLine,
  Tag,
  Timer,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { LESSONS, TOPICS, lessonsByTopic, type TopicId } from "@/src/content/lessons";
import { useLang } from "@/src/hooks/use-lang";
import { useLessonProgress } from "@/src/hooks/use-lesson-progress";

const TOPIC_ICONS: Record<TopicId, typeof ScanLine> = {
  scanner: ScanLine,
  zeiterfassung: Timer,
  kommissionierung: PackageSearch,
  etiketten: Tag,
  sonderfaelle: AlertTriangle,
};

export default function Page() {
  const { t } = useTranslation();
  const { lang, href } = useLang();
  const { progress } = useLessonProgress();

  const completed = LESSONS.filter((lesson) => progress[lesson.slug]).length;

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("lessons.title")}</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl text-lg">{t("lessons.intro")}</p>
      <p className="text-muted-foreground mt-4 text-sm">
        {t("lessons.overallProgress", { done: completed, total: LESSONS.length })}
      </p>

      <div className="mt-10 space-y-12">
        {TOPICS.map((topic) => {
          const Icon = TOPIC_ICONS[topic.id];
          const lessons = lessonsByTopic(topic.id);
          if (lessons.length === 0) return null;
          return (
            <section key={topic.id} aria-labelledby={`topic-${topic.id}`}>
              <div className="flex items-center gap-3">
                <span className="bg-muted inline-flex size-10 items-center justify-center rounded-lg">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 id={`topic-${topic.id}`} className="text-xl font-semibold">
                    {topic.title[lang]}
                  </h2>
                  <p className="text-muted-foreground text-sm">{topic.description[lang]}</p>
                </div>
              </div>

              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {lessons.map((lesson) => {
                  const result = progress[lesson.slug];
                  return (
                    <li key={lesson.slug}>
                      <a
                        href={href(`/lektionen/${lesson.slug}`)}
                        className="bg-card text-card-foreground hover:border-foreground/30 hover:bg-muted flex h-full flex-col rounded-xl border p-5 transition-colors"
                      >
                        <span className="font-semibold">{lesson.title[lang]}</span>
                        <span className="text-muted-foreground mt-1 flex-1 text-sm">
                          {lesson.summary[lang]}
                        </span>
                        <span className="text-muted-foreground mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="size-3.5" aria-hidden="true" />
                            {t("lessons.minutes", { count: lesson.minutes })}
                          </span>
                          <span>
                            {t("lessons.exerciseCount", { count: lesson.exercises.length })}
                          </span>
                          {result && (
                            <span className="inline-flex items-center gap-1 font-medium text-green-700 dark:text-green-500">
                              <CircleCheck className="size-3.5" aria-hidden="true" />
                              {t("lessons.doneScore", { score: result.score, total: result.total })}
                            </span>
                          )}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

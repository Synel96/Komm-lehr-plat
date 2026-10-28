import { ArrowLeft, ArrowRight, BookOpen, History, RotateCcw, Trophy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { GLOSSARY } from "@/src/content/glossary";
import { lessonPath, type Lesson } from "@/src/content/lessons";
import type { LessonResult } from "@/src/hooks/use-lesson-progress";
import { useLang } from "@/src/hooks/use-lang";
import {
  clearPosition,
  isValidPosition,
  readPosition,
  saveLessonReturn,
  savePosition,
} from "@/src/lesson-position";
import { ChoiceExercise } from "./ChoiceExercise";
import { ClassifyExercise } from "./ClassifyExercise";
import { OrderExercise } from "./OrderExercise";

type Phase = "steps" | "exercises" | "result";

type Props = {
  lesson: Lesson;
  nextLesson?: Lesson;
  onFinished: (result: LessonResult) => void;
};

export function LessonPlayer({ lesson, nextLesson, onFinished }: Props) {
  const { t } = useTranslation();
  const { lang, href } = useLang();
  const topRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<Phase>("steps");
  const [stepIndex, setStepIndex] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  // Bumped on "try again" so the exercise components remount with fresh state.
  const [attempt, setAttempt] = useState(0);
  // True when the lesson was picked up from a stored position (shows a notice).
  const [resumed, setResumed] = useState(false);
  const skipNextSave = useRef(true);

  const totalSteps = lesson.steps.length;
  const totalExercises = lesson.exercises.length;

  // Pick up where the learner left off (e.g. after looking up a word in the
  // glossary). Done after mount: the prerendered HTML always shows step 1.
  useEffect(() => {
    const stored = readPosition(lesson.slug);
    if (!stored || !isValidPosition(stored, totalSteps, totalExercises)) return;
    if (stored.phase === "steps" && stored.stepIndex === 0) return;
    /* eslint-disable react-hooks/set-state-in-effect -- localStorage is only readable after mount */
    setPhase(stored.phase);
    setStepIndex(stored.stepIndex);
    setExerciseIndex(stored.exerciseIndex);
    setAnswers(stored.answers);
    setResumed(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [lesson.slug, totalSteps, totalExercises]);

  // Remember the current position on every move; forget it once finished.
  useEffect(() => {
    // The first run would store the initial state before the restore above
    // has been applied, so skip it.
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
    if (phase === "result") {
      clearPosition(lesson.slug);
      return;
    }
    savePosition(lesson.slug, {
      phase,
      stepIndex,
      exerciseIndex,
      // An answered-but-not-continued exercise is asked again after resuming.
      answers: answers.slice(0, exerciseIndex),
    });
  }, [lesson.slug, phase, stepIndex, exerciseIndex, answers]);
  const done =
    phase === "steps"
      ? stepIndex
      : phase === "exercises"
        ? totalSteps + exerciseIndex
        : totalSteps + totalExercises;
  const percent = Math.round((done / (totalSteps + totalExercises)) * 100);

  const scrollToTop = () => {
    const el = topRef.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ behavior: "smooth" });
  };

  const goToStep = (index: number) => {
    setResumed(false);
    setStepIndex(index);
    scrollToTop();
  };

  const startExercises = () => {
    setResumed(false);
    setPhase("exercises");
    setExerciseIndex(0);
    setAnswers([]);
    scrollToTop();
  };

  const nextExercise = () => {
    setResumed(false);
    if (exerciseIndex + 1 < totalExercises) {
      setExerciseIndex(exerciseIndex + 1);
    } else {
      setPhase("result");
      onFinished({ score: answers.filter(Boolean).length, total: totalExercises });
    }
    scrollToTop();
  };

  const retry = () => {
    setAttempt(attempt + 1);
    startExercises();
  };

  const restart = () => {
    setResumed(false);
    setAttempt(attempt + 1);
    setPhase("steps");
    setStepIndex(0);
    setAnswers([]);
    scrollToTop();
  };

  const step = lesson.steps[stepIndex];
  const exercise = lesson.exercises[exerciseIndex];
  const answeredCurrent = answers.length > exerciseIndex;
  const score = answers.filter(Boolean).length;

  return (
    <div ref={topRef} className="scroll-mt-4">
      <div
        className="bg-muted h-2 overflow-hidden rounded-full"
        role="progressbar"
        aria-label={t("lessons.progress")}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div
          className="h-full rounded-full bg-amber-400 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      {resumed && (
        <div
          role="status"
          className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-amber-400/50 bg-amber-400/10 px-4 py-2 text-sm"
        >
          <span className="inline-flex items-center gap-2">
            <History className="size-4 shrink-0" aria-hidden="true" />
            {t("lessons.resumed")}
          </span>
          <Button variant="ghost" size="sm" onClick={restart}>
            {t("lessons.startOver")}
          </Button>
        </div>
      )}

      <div className="bg-card text-card-foreground mt-6 rounded-2xl border p-6 shadow-sm sm:p-8">
        {phase === "steps" && (
          <>
            <p className="text-muted-foreground text-sm font-medium">
              {t("lessons.stepOf", { current: stepIndex + 1, total: totalSteps })}
            </p>
            <h2 className="mt-1 text-2xl font-semibold">{step.title[lang]}</h2>
            <p className="mt-4 text-lg leading-relaxed">{step.text[lang]}</p>

            {step.terms && step.terms.length > 0 && (
              <div className="mt-6">
                <p className="text-muted-foreground flex items-center gap-1.5 text-sm font-medium">
                  <BookOpen className="size-4" aria-hidden="true" />
                  {t("lessons.terms")}
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {step.terms.map((id) => {
                    const entry = GLOSSARY.find((item) => item.id === id);
                    if (!entry) return null;
                    return (
                      <li key={id}>
                        <a
                          href={href(`/abkuerzungen#${id}`)}
                          onClick={() =>
                            saveLessonReturn({
                              href: window.location.pathname,
                              title: lesson.title[lang],
                            })
                          }
                          lang="de"
                          className="hover:bg-muted inline-block rounded-full border px-3 py-1 text-sm"
                        >
                          {entry.term}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="mt-8 flex justify-between gap-2">
              <Button
                variant="outline"
                onClick={() => goToStep(stepIndex - 1)}
                disabled={stepIndex === 0}
              >
                <ArrowLeft aria-hidden="true" />
                {t("lessons.back")}
              </Button>
              {stepIndex + 1 < totalSteps ? (
                <Button onClick={() => goToStep(stepIndex + 1)}>
                  {t("lessons.next")}
                  <ArrowRight aria-hidden="true" />
                </Button>
              ) : (
                <Button onClick={startExercises}>
                  {t("lessons.toExercises")}
                  <ArrowRight aria-hidden="true" />
                </Button>
              )}
            </div>
          </>
        )}

        {phase === "exercises" && (
          <>
            <p className="text-muted-foreground mb-3 text-sm font-medium">
              {t("lessons.exerciseOf", { current: exerciseIndex + 1, total: totalExercises })}
            </p>
            {exercise.type === "choice" && (
              <ChoiceExercise
                key={`${attempt}-${exerciseIndex}`}
                exercise={exercise}
                lang={lang}
                onAnswered={(correct) => setAnswers([...answers, correct])}
              />
            )}
            {exercise.type === "order" && (
              <OrderExercise
                key={`${attempt}-${exerciseIndex}`}
                exercise={exercise}
                lang={lang}
                onAnswered={(correct) => setAnswers([...answers, correct])}
              />
            )}
            {exercise.type === "classify" && (
              <ClassifyExercise
                key={`${attempt}-${exerciseIndex}`}
                exercise={exercise}
                lang={lang}
                onAnswered={(correct) => setAnswers([...answers, correct])}
              />
            )}
            {answeredCurrent && (
              <div className="mt-6 flex justify-end">
                <Button onClick={nextExercise}>
                  {exerciseIndex + 1 < totalExercises ? t("lessons.next") : t("lessons.showResult")}
                  <ArrowRight aria-hidden="true" />
                </Button>
              </div>
            )}
          </>
        )}

        {phase === "result" && (
          <div className="text-center">
            <Trophy
              className={
                score === totalExercises
                  ? "mx-auto size-12 text-amber-400"
                  : "text-muted-foreground mx-auto size-12"
              }
              aria-hidden="true"
            />
            <h2 className="mt-4 text-2xl font-semibold">
              {t("lessons.result", { score, total: totalExercises })}
            </h2>
            <p className="text-muted-foreground mt-2">
              {score === totalExercises ? t("lessons.perfect") : t("lessons.almost")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {score < totalExercises && (
                <Button variant="outline" onClick={retry}>
                  <RotateCcw aria-hidden="true" />
                  {t("lessons.retry")}
                </Button>
              )}
              <Button variant="outline" onClick={restart}>
                {t("lessons.restart")}
              </Button>
              {nextLesson ? (
                <Button asChild>
                  <a href={href(lessonPath(nextLesson))}>
                    {t("lessons.nextLesson")}
                    <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
              ) : (
                <Button asChild>
                  <a href={href(`/lektionen/${lesson.area}`)}>{t("lessons.allChapters")}</a>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

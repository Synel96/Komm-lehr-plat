import { Check, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { ChoiceExercise as ChoiceExerciseData } from "@/src/content/lessons";
import type { SupportedLang } from "@/src/i18n-config";
import { cn } from "@/lib/utils";
import { Feedback } from "./Feedback";

type Props = {
  exercise: ChoiceExerciseData;
  lang: SupportedLang;
  onAnswered: (correct: boolean) => void;
};

export function ChoiceExercise({ exercise, lang, onAnswered }: Props) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  const choose = (index: number) => {
    if (answered) return;
    setSelected(index);
    onAnswered(index === exercise.answer);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">{exercise.question[lang]}</h3>
      <div role="group" aria-label={t("lessons.answers")} className="mt-4 grid gap-2">
        {exercise.options.map((option, index) => {
          const isAnswer = index === exercise.answer;
          const isSelected = index === selected;
          return (
            <button
              key={index}
              type="button"
              onClick={() => choose(index)}
              disabled={answered}
              aria-pressed={isSelected}
              className={cn(
                "flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left transition-colors",
                !answered && "hover:border-foreground/30 hover:bg-muted",
                answered && isAnswer && "border-green-600 bg-green-600/10",
                answered && isSelected && !isAnswer && "border-red-600 bg-red-600/10",
                answered && !isAnswer && !isSelected && "opacity-60"
              )}
            >
              <span>{option[lang]}</span>
              {answered && isAnswer && (
                <Check className="size-5 shrink-0 text-green-600" aria-hidden="true" />
              )}
              {answered && isSelected && !isAnswer && (
                <X className="size-5 shrink-0 text-red-600" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>
      {answered && (
        <Feedback correct={selected === exercise.answer} explanation={exercise.explanation[lang]} />
      )}
    </div>
  );
}

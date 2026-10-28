import { Check, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import type { ClassifyExercise as ClassifyExerciseData } from "@/src/content/lessons";
import type { SupportedLang } from "@/src/i18n-config";
import { cn } from "@/lib/utils";
import { Feedback } from "./Feedback";

type Props = {
  exercise: ClassifyExerciseData;
  lang: SupportedLang;
  onAnswered: (correct: boolean) => void;
};

// Each case gets one of the categories (e.g. "open" / "keep closed"), then
// everything is checked at once. Counts as correct only if every case is.
export function ClassifyExercise({ exercise, lang, onAnswered }: Props) {
  const { t } = useTranslation();
  const [choices, setChoices] = useState<(number | null)[]>(() => exercise.items.map(() => null));
  const [checked, setChecked] = useState(false);

  const allAssigned = choices.every((choice) => choice !== null);
  const correct = exercise.items.every((item, i) => choices[i] === item.category);

  const choose = (itemIndex: number, category: number) => {
    if (checked) return;
    setChoices(choices.map((choice, i) => (i === itemIndex ? category : choice)));
  };

  const check = () => {
    setChecked(true);
    onAnswered(correct);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">{exercise.question[lang]}</h3>
      <p className="text-muted-foreground mt-1 text-sm">{t("lessons.classifyHint")}</p>

      <ul className="mt-4 grid gap-3">
        {exercise.items.map((item, itemIndex) => {
          const choice = choices[itemIndex];
          const isRight = choice === item.category;
          return (
            <li
              key={itemIndex}
              className={cn(
                "rounded-lg border p-4",
                checked && isRight && "border-green-600 bg-green-600/10",
                checked && !isRight && "border-red-600 bg-red-600/10"
              )}
            >
              <p className="flex items-start justify-between gap-3 font-medium">
                <span>{item.text[lang]}</span>
                {checked &&
                  (isRight ? (
                    <Check className="size-5 shrink-0 text-green-600" aria-hidden="true" />
                  ) : (
                    <X className="size-5 shrink-0 text-red-600" aria-hidden="true" />
                  ))}
              </p>
              <div role="group" aria-label={item.text[lang]} className="mt-3 flex flex-wrap gap-2">
                {exercise.categories.map((category, categoryIndex) => (
                  <button
                    key={categoryIndex}
                    type="button"
                    onClick={() => choose(itemIndex, categoryIndex)}
                    disabled={checked}
                    aria-pressed={choice === categoryIndex}
                    className={cn(
                      "rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
                      choice === categoryIndex
                        ? "border-primary bg-primary text-primary-foreground"
                        : "hover:bg-muted",
                      checked && choice !== categoryIndex && "opacity-60"
                    )}
                  >
                    {category[lang]}
                  </button>
                ))}
              </div>
              {checked && !isRight && (
                <p className="mt-2 text-sm">
                  {t("lessons.rightAnswer", {
                    answer: exercise.categories[item.category][lang],
                  })}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      {!checked && (
        <div className="mt-4">
          <Button onClick={check} disabled={!allAssigned}>
            {t("lessons.check")}
          </Button>
        </div>
      )}

      {checked && <Feedback correct={correct} explanation={exercise.explanation[lang]} />}
    </div>
  );
}

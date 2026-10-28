import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import type { OrderExercise as OrderExerciseData } from "@/src/content/lessons";
import type { SupportedLang } from "@/src/i18n-config";
import { cn } from "@/lib/utils";
import { Feedback } from "./Feedback";

/** Indices 0..n-1 in random order, never already in the correct order. */
function shuffledIndices(n: number) {
  const indices = Array.from({ length: n }, (_, i) => i);
  if (n < 2) return indices;
  do {
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
  } while (indices.every((value, i) => value === i));
  return indices;
}

type Props = {
  exercise: OrderExerciseData;
  lang: SupportedLang;
  onAnswered: (correct: boolean) => void;
};

// Tap the items in the order they happen; each tap moves an item from the
// pool into the numbered list. Only ever rendered after the learner has
// clicked through the steps, so the random order can't cause a hydration
// mismatch with the prerendered HTML.
export function OrderExercise({ exercise, lang, onAnswered }: Props) {
  const { t } = useTranslation();
  const [pool] = useState(() => shuffledIndices(exercise.items.length));
  const [picked, setPicked] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);

  const done = picked.length === exercise.items.length;
  const correct = picked.every((value, i) => value === i);

  const pick = (index: number) => {
    if (checked || picked.includes(index)) return;
    setPicked([...picked, index]);
  };

  const check = () => {
    setChecked(true);
    onAnswered(correct);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold">{exercise.question[lang]}</h3>
      <p className="text-muted-foreground mt-1 text-sm">{t("lessons.orderHint")}</p>

      <div className="mt-4 grid gap-2">
        {pool.map((index) => {
          const position = picked.indexOf(index);
          const isPicked = position !== -1;
          return (
            <button
              key={index}
              type="button"
              onClick={() => pick(index)}
              disabled={checked || isPicked}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors",
                !isPicked && !checked && "hover:border-foreground/30 hover:bg-muted",
                isPicked && "bg-muted",
                checked && isPicked && position === index && "border-green-600 bg-green-600/10",
                checked && isPicked && position !== index && "border-red-600 bg-red-600/10"
              )}
            >
              <span
                className={cn(
                  "inline-flex size-7 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",
                  isPicked ? "border-primary bg-primary text-primary-foreground" : "border-dashed"
                )}
                aria-hidden={!isPicked}
              >
                {isPicked ? position + 1 : ""}
              </span>
              <span>{exercise.items[index][lang]}</span>
            </button>
          );
        })}
      </div>

      {!checked && (
        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={check} disabled={!done}>
            {t("lessons.check")}
          </Button>
          <Button variant="outline" onClick={() => setPicked([])} disabled={picked.length === 0}>
            <RotateCcw aria-hidden="true" />
            {t("lessons.reset")}
          </Button>
        </div>
      )}

      {checked && (
        <>
          {!correct && (
            <div className="mt-4 rounded-lg border p-4 text-sm">
              <p className="mb-2 font-semibold">{t("lessons.correctOrder")}</p>
              <ol className="list-inside list-decimal">
                {exercise.items.map((item, index) => (
                  <li key={index}>{item[lang]}</li>
                ))}
              </ol>
            </div>
          )}
          <Feedback correct={correct} explanation={exercise.explanation[lang]} />
        </>
      )}
    </div>
  );
}

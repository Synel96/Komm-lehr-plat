import { CircleCheck, CircleX } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export function Feedback({ correct, explanation }: { correct: boolean; explanation: string }) {
  const { t } = useTranslation();
  const Icon = correct ? CircleCheck : CircleX;

  return (
    <div
      role="status"
      className={cn(
        "mt-4 flex gap-3 rounded-lg border p-4",
        correct ? "border-green-600/40 bg-green-600/10" : "border-red-600/40 bg-red-600/10"
      )}
    >
      <Icon
        className={cn("mt-0.5 size-5 shrink-0", correct ? "text-green-600" : "text-red-600")}
        aria-hidden="true"
      />
      <div>
        <p className="font-semibold">{correct ? t("lessons.correct") : t("lessons.wrong")}</p>
        <p className="mt-1 text-sm">{explanation}</p>
      </div>
    </div>
  );
}

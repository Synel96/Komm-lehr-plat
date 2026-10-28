import { useCallback, useEffect, useState } from "react";

// Per-browser lesson progress. Kept in localStorage on purpose: it's only a
// convenience for the person learning, so a private window or blocked
// storage just means nothing is remembered.
const STORAGE_KEY = "lesson-progress";

export type LessonResult = { score: number; total: number };
export type LessonProgress = Record<string, LessonResult>;

function readProgress(): LessonProgress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LessonProgress) : {};
  } catch {
    return {};
  }
}

export function useLessonProgress() {
  // Empty on the server and during hydration; filled in after mount so the
  // prerendered HTML and the first client render match.
  const [progress, setProgress] = useState<LessonProgress>({});

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable after mount
    setProgress(readProgress());
  }, []);

  const saveResult = useCallback((slug: string, result: LessonResult) => {
    const next = { ...readProgress() };
    const previous = next[slug];
    // Keep the best attempt.
    if (!previous || result.score / result.total >= previous.score / previous.total) {
      next[slug] = result;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage unavailable — progress just isn't remembered.
    }
    setProgress(next);
  }, []);

  return { progress, saveResult };
}

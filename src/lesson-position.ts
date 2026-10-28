// Where a learner is inside a lesson, kept in localStorage so they can jump
// to the glossary (or close the tab) and continue where they left off.
// Like lesson progress it's only a per-browser convenience: if storage is
// unavailable, the lesson simply starts from the beginning.

export type LessonPosition = {
  phase: "steps" | "exercises";
  stepIndex: number;
  exerciseIndex: number;
  /** Results of the exercises before `exerciseIndex`. */
  answers: boolean[];
};

const positionKey = (slug: string) => `lesson-position:${slug}`;
const RETURN_KEY = "lesson-return";

export function readPosition(slug: string): LessonPosition | null {
  try {
    const raw = window.localStorage.getItem(positionKey(slug));
    return raw ? (JSON.parse(raw) as LessonPosition) : null;
  } catch {
    return null;
  }
}

export function savePosition(slug: string, position: LessonPosition) {
  try {
    window.localStorage.setItem(positionKey(slug), JSON.stringify(position));
  } catch {
    // Storage unavailable — the position just isn't remembered.
  }
}

export function clearPosition(slug: string) {
  try {
    window.localStorage.removeItem(positionKey(slug));
  } catch {
    // Nothing to clear.
  }
}

/** Only keeps a stored position if it still fits the lesson (content may have changed). */
export function isValidPosition(
  position: LessonPosition,
  totalSteps: number,
  totalExercises: number
) {
  return (
    position.stepIndex >= 0 &&
    position.stepIndex < totalSteps &&
    position.exerciseIndex >= 0 &&
    position.exerciseIndex < totalExercises &&
    position.answers.length <= position.exerciseIndex
  );
}

export type LessonReturn = { href: string; title: string };

/** Remembers which lesson a glossary link was opened from (for a "back to lesson" link). */
export function saveLessonReturn(lessonReturn: LessonReturn) {
  try {
    window.sessionStorage.setItem(RETURN_KEY, JSON.stringify(lessonReturn));
  } catch {
    // No back link then.
  }
}

export function readLessonReturn(): LessonReturn | null {
  try {
    const raw = window.sessionStorage.getItem(RETURN_KEY);
    return raw ? (JSON.parse(raw) as LessonReturn) : null;
  } catch {
    return null;
  }
}

export function clearLessonReturn() {
  try {
    window.sessionStorage.removeItem(RETURN_KEY);
  } catch {
    // Nothing to clear.
  }
}

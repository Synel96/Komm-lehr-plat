import { describe, expect, it } from "vitest";
import { isValidPosition } from "./lesson-position";

describe("isValidPosition", () => {
  const base = { phase: "steps" as const, stepIndex: 2, exerciseIndex: 1, answers: [true] };

  it("accepts a position that fits the lesson", () => {
    expect(isValidPosition(base, 5, 3)).toBe(true);
  });

  it("rejects positions outside the lesson (e.g. after the content changed)", () => {
    expect(isValidPosition({ ...base, stepIndex: 5 }, 5, 3)).toBe(false);
    expect(isValidPosition({ ...base, exerciseIndex: 3 }, 5, 3)).toBe(false);
    expect(isValidPosition({ ...base, answers: [true, false] }, 5, 3)).toBe(false);
  });
});

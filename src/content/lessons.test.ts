import { describe, expect, it } from "vitest";
import de from "../../public/locales/de/common.json";
import en from "../../public/locales/en/common.json";
import hu from "../../public/locales/hu/common.json";
import { SUPPORTED_LANGS } from "../i18n-config";
import { GLOSSARY } from "./glossary";
import { AREAS, LESSONS } from "./lessons";
import type { Localized } from "./types";

function expectTranslated(text: Localized) {
  for (const lang of SUPPORTED_LANGS) {
    expect(text[lang]?.trim(), JSON.stringify(text)).toBeTruthy();
  }
}

function keysOf(value: object, prefix = ""): string[] {
  return Object.entries(value).flatMap(([key, child]) =>
    typeof child === "object" && child !== null
      ? keysOf(child, `${prefix}${key}.`)
      : [`${prefix}${key}`]
  );
}

describe("lessons", () => {
  it("has unique, URL-safe slugs", () => {
    const slugs = LESSONS.map((lesson) => lesson.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/);
  });

  it("puts every lesson in a known area, and every area has a chapter", () => {
    const areaIds = AREAS.map((area) => area.id);
    for (const lesson of LESSONS) expect(areaIds).toContain(lesson.area);
    for (const id of areaIds) expect(LESSONS.some((lesson) => lesson.area === id)).toBe(true);
  });

  it("has every text translated", () => {
    for (const area of AREAS) [area.title, area.description].forEach(expectTranslated);
    for (const lesson of LESSONS) {
      [lesson.title, lesson.summary].forEach(expectTranslated);
      for (const step of lesson.steps) [step.title, step.text].forEach(expectTranslated);
      for (const exercise of lesson.exercises) {
        [exercise.question, exercise.explanation].forEach(expectTranslated);
        if (exercise.type === "choice") exercise.options.forEach(expectTranslated);
        if (exercise.type === "order") exercise.items.forEach(expectTranslated);
        if (exercise.type === "classify") {
          exercise.categories.forEach(expectTranslated);
          exercise.items.forEach((item) => expectTranslated(item.text));
        }
      }
    }
  });

  it("has steps and valid exercises", () => {
    for (const lesson of LESSONS) {
      expect(lesson.steps.length, lesson.slug).toBeGreaterThan(0);
      expect(lesson.exercises.length, lesson.slug).toBeGreaterThan(0);
      for (const exercise of lesson.exercises) {
        if (exercise.type === "choice") {
          expect(exercise.options.length).toBeGreaterThanOrEqual(2);
          expect(exercise.answer).toBeGreaterThanOrEqual(0);
          expect(exercise.answer).toBeLessThan(exercise.options.length);
        } else if (exercise.type === "order") {
          expect(exercise.items.length).toBeGreaterThanOrEqual(2);
        } else {
          expect(exercise.categories.length).toBeGreaterThanOrEqual(2);
          for (const item of exercise.items) {
            expect(item.category).toBeGreaterThanOrEqual(0);
            expect(item.category).toBeLessThan(exercise.categories.length);
          }
          // Every category is used, so the answer isn't "always the same button".
          const used = new Set(exercise.items.map((item) => item.category));
          expect(used.size, lesson.slug).toBe(exercise.categories.length);
        }
      }
    }
  });

  it("only links to existing glossary entries", () => {
    const ids = new Set(GLOSSARY.map((entry) => entry.id));
    for (const lesson of LESSONS) {
      for (const step of lesson.steps) {
        for (const term of step.terms ?? []) expect(ids, `${lesson.slug}: ${term}`).toContain(term);
      }
    }
  });
});

describe("translation files", () => {
  it("have the same keys in every language", () => {
    const deKeys = keysOf(de).sort();
    expect(keysOf(hu).sort()).toEqual(deKeys);
    expect(keysOf(en).sort()).toEqual(deKeys);
  });
});

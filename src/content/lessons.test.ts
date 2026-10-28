import { describe, expect, it } from "vitest";
import de from "../../public/locales/de/common.json";
import en from "../../public/locales/en/common.json";
import hu from "../../public/locales/hu/common.json";
import { SUPPORTED_LANGS } from "../i18n-config";
import { GLOSSARY } from "./glossary";
import { LESSONS, TOPICS } from "./lessons";
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

  it("puts every lesson in a known topic, and every topic has a lesson", () => {
    const topicIds = TOPICS.map((topic) => topic.id);
    for (const lesson of LESSONS) expect(topicIds).toContain(lesson.topic);
    for (const id of topicIds) expect(LESSONS.some((lesson) => lesson.topic === id)).toBe(true);
  });

  it("has every text translated", () => {
    for (const topic of TOPICS) [topic.title, topic.description].forEach(expectTranslated);
    for (const lesson of LESSONS) {
      [lesson.title, lesson.summary].forEach(expectTranslated);
      for (const step of lesson.steps) [step.title, step.text].forEach(expectTranslated);
      for (const exercise of lesson.exercises) {
        [exercise.question, exercise.explanation].forEach(expectTranslated);
        (exercise.type === "choice" ? exercise.options : exercise.items).forEach(expectTranslated);
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
        } else {
          expect(exercise.items.length).toBeGreaterThanOrEqual(2);
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

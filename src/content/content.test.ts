import { describe, expect, it } from "vitest";
import { SUPPORTED_LANGS } from "../i18n-config";
import { GLOSSARY } from "./glossary";
import { SCANNER_FIELDS, SCANNER_KEYS, SCANNER_MESSAGES } from "./scanner";
import { filterGlossary, normalize, sortGlossary } from "./search";

describe("content", () => {
  it("has unique glossary ids", () => {
    const ids = GLOSSARY.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has every text translated into every supported language", () => {
    const texts = [
      ...GLOSSARY.map((entry) => entry.explanation),
      ...SCANNER_FIELDS.map((field) => field.explanation),
      ...SCANNER_KEYS.map((key) => key.explanation),
      ...SCANNER_MESSAGES.flatMap((message) => [message.meaning, message.action]),
    ];
    for (const text of texts) {
      for (const lang of SUPPORTED_LANGS) {
        expect(text[lang]?.trim(), JSON.stringify(text)).toBeTruthy();
      }
    }
  });

  it("numbers the sample scanner screen markers 1..n", () => {
    expect(SCANNER_FIELDS.map((field) => field.marker)).toEqual(
      SCANNER_FIELDS.map((_, index) => index + 1)
    );
  });
});

describe("glossary search", () => {
  it("ignores case, umlauts and ß", () => {
    expect(normalize("Stück")).toBe("stuck");
    expect(normalize("Maß")).toBe("mass");
    expect(normalize("Art.-Nr.")).toBe("art nr");
  });

  it("finds entries by abbreviation and full form", () => {
    const byAbbr = filterGlossary(GLOSSARY, { query: "mhd", lang: "de", kind: "all" });
    expect(byAbbr[0]?.id).toBe("mhd");

    const byFullForm = filterGlossary(GLOSSARY, {
      query: "versandeinheit",
      lang: "de",
      kind: "all",
    });
    expect(byFullForm[0]?.id).toBe("nve");
  });

  it("searches explanations in the current language, after term matches", () => {
    const results = filterGlossary(GLOSSARY, { query: "raklap", lang: "hu", kind: "all" });
    expect(results.map((entry) => entry.id)).toContain("le");
  });

  it("filters by kind", () => {
    const words = filterGlossary(GLOSSARY, { query: "", lang: "de", kind: "word" });
    expect(words.length).toBeGreaterThan(0);
    expect(words.every((entry) => entry.kind === "word")).toBe(true);
  });

  it("sorts alphabetically in German", () => {
    const terms = sortGlossary(GLOSSARY).map((entry) => entry.term);
    expect(terms).toEqual(
      [...terms].sort((a, b) => a.localeCompare(b, "de", { sensitivity: "base" }))
    );
  });
});

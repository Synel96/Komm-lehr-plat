import type { GlossaryCategory } from "@/src/content/glossary";

// One colour per glossary group, used for the entry cards, badges, section
// headings and filter chips. Class names are written out in full so Tailwind
// picks them up. The card's left border needs `!`: the global
// `* { border-color }` rule in pages/Layout.css would otherwise win.
export const CATEGORY_STYLES: Record<
  GlossaryCategory,
  { card: string; badge: string; dot: string }
> = {
  scanner: {
    card: "border-l-sky-500! bg-sky-500/5",
    badge: "bg-sky-500/15 text-sky-800 dark:text-sky-300",
    dot: "bg-sky-500",
  },
  zeiterfassung: {
    card: "border-l-violet-500! bg-violet-500/5",
    badge: "bg-violet-500/15 text-violet-800 dark:text-violet-300",
    dot: "bg-violet-500",
  },
  auftrag: {
    card: "border-l-amber-500! bg-amber-500/5",
    badge: "bg-amber-500/15 text-amber-800 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  mengen: {
    card: "border-l-emerald-500! bg-emerald-500/5",
    badge: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
  etiketten: {
    card: "border-l-fuchsia-500! bg-fuchsia-500/5",
    badge: "bg-fuchsia-500/15 text-fuchsia-800 dark:text-fuchsia-300",
    dot: "bg-fuchsia-500",
  },
  lager: {
    card: "border-l-indigo-500! bg-indigo-500/5",
    badge: "bg-indigo-500/15 text-indigo-800 dark:text-indigo-300",
    dot: "bg-indigo-500",
  },
  qualitaet: {
    card: "border-l-red-500! bg-red-500/5",
    badge: "bg-red-500/15 text-red-800 dark:text-red-300",
    dot: "bg-red-500",
  },
};

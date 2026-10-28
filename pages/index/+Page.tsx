import { ArrowRight, BookOpen, GraduationCap, Languages, ScanLine } from "lucide-react";
import { useTranslation } from "react-i18next";
import { GLOSSARY } from "@/src/content/glossary";
import { LESSONS } from "@/src/content/lessons";
import { SUPPORTED_LANGS } from "@/src/i18n-config";
import { useLang } from "@/src/hooks/use-lang";
import { cn } from "@/lib/utils";

export default function Page() {
  const { t } = useTranslation();
  const { href } = useLang();

  const sections = [
    {
      path: "/lektionen",
      icon: GraduationCap,
      title: t("nav.lessons"),
      text: t("home.lessonsText"),
      tile: "bg-amber-400/15 text-amber-600 dark:text-amber-400",
    },
    {
      path: "/scanner",
      icon: ScanLine,
      title: t("nav.scanner"),
      text: t("home.scannerText"),
      tile: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
    },
    {
      path: "/abkuerzungen",
      icon: BookOpen,
      title: t("nav.glossary"),
      text: t("home.glossaryText"),
      tile: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    },
  ];

  const stats = [
    { icon: GraduationCap, value: LESSONS.length, label: t("home.statLessons") },
    { icon: BookOpen, value: GLOSSARY.length, label: t("home.statWords") },
    { icon: Languages, value: SUPPORTED_LANGS.length, label: t("home.statLangs") },
  ];

  return (
    <div>
      <section className="relative overflow-hidden bg-linear-to-br from-(--brand-surface) via-indigo-800 to-indigo-600 text-white">
        {/* Soft glow accents */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-amber-400/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full bg-sky-400/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-5xl px-6 py-14 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-wide ring-1 ring-white/20">
            <ScanLine className="size-3.5 text-amber-300" aria-hidden="true" />
            {t("home.badge")}
          </span>
          <h1 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            {t("home.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{t("home.intro")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={href("/lektionen")}
              className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300"
            >
              {t("home.ctaLessons")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href={href("/abkuerzungen")}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/20"
            >
              {t("home.ctaGlossary")}
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
                <Icon className="size-5 text-amber-300" aria-hidden="true" />
                <p className="mt-2 text-2xl font-bold">{value}</p>
                <p className="text-xs text-white/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-5xl px-6 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map(({ path, icon: Icon, title, text, tile }) => (
            <a
              key={path}
              href={href(path)}
              className="group bg-card text-card-foreground flex flex-col rounded-2xl border p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span
                className={cn("inline-flex size-12 items-center justify-center rounded-xl", tile)}
              >
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-xl font-semibold">{title}</h2>
              <p className="text-muted-foreground mt-2 flex-1">{text}</p>
              <span className="text-primary mt-5 inline-flex items-center gap-1 text-sm font-semibold">
                {t("home.open")}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

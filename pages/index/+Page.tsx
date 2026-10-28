import { ArrowRight, BookOpen, GraduationCap, ScanLine } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLang } from "@/src/hooks/use-lang";

export default function Page() {
  const { t } = useTranslation();
  const { href } = useLang();

  const sections = [
    {
      path: "/lektionen",
      icon: GraduationCap,
      title: t("nav.lessons"),
      text: t("home.lessonsText"),
    },
    { path: "/scanner", icon: ScanLine, title: t("nav.scanner"), text: t("home.scannerText") },
    {
      path: "/abkuerzungen",
      icon: BookOpen,
      title: t("nav.glossary"),
      text: t("home.glossaryText"),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("home.title")}</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl text-lg">{t("home.intro")}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(({ path, icon: Icon, title, text }) => (
          <a
            key={path}
            href={href(path)}
            className="group bg-card text-card-foreground hover:border-foreground/30 hover:bg-muted flex flex-col rounded-xl border p-6 transition-colors"
          >
            <Icon className="size-8" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold">{title}</h2>
            <p className="text-muted-foreground mt-2 flex-1">{text}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium">
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
  );
}

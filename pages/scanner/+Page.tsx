import { Delete, Info, TriangleAlert } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  SCANNER_FIELDS,
  SCANNER_KEYS,
  SCANNER_MESSAGES,
  SCANNER_SCREEN_TITLE,
} from "@/src/content/scanner";
import { useLang } from "@/src/hooks/use-lang";

function Marker({ n }: { n: number }) {
  return (
    <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-black">
      {n}
    </span>
  );
}

export default function Page() {
  const { t } = useTranslation();
  const { lang } = useLang();

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("scanner.title")}</h1>
      <p className="text-muted-foreground mt-3 max-w-2xl text-lg">{t("scanner.intro")}</p>
      <p className="text-muted-foreground mt-4 flex items-start gap-2 text-sm">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        {t("scanner.sampleNote")}
      </p>

      <section className="mt-10" aria-labelledby="screen-heading">
        <h2 id="screen-heading" className="text-2xl font-semibold">
          {t("scanner.screenHeading")}
        </h2>

        <div className="mt-6 grid items-start gap-8 md:grid-cols-[18rem_1fr]">
          {/* Sample device: German labels stay as they appear on the real screen. */}
          <figure
            className="mx-auto w-full max-w-72 rounded-3xl bg-neutral-800 p-4 shadow-lg"
            aria-label={t("scanner.screenLabel")}
          >
            <div
              lang="de"
              className="rounded-lg bg-[#d8e6d0] p-3 font-mono text-[0.8rem] leading-relaxed text-neutral-900"
            >
              <div className="mb-2 border-b border-neutral-900/30 pb-1 text-center font-bold">
                {SCANNER_SCREEN_TITLE}
              </div>
              <dl className="space-y-1">
                {SCANNER_FIELDS.map((field) => (
                  <div key={field.marker} className="flex items-center gap-2">
                    <Marker n={field.marker} />
                    <dt className="w-16 shrink-0 font-semibold">{field.label}</dt>
                    <dd className="truncate">{field.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-3 flex justify-between border-t border-neutral-900/30 pt-1 text-[0.7rem]">
                <span>F1 Hilfe</span>
                <span>F3 Fehlm.</span>
                <span>ESC</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2" aria-hidden="true">
              {["F1", "F2", "F3", "ALP", "ESC", "DEL", "ENT", "SCAN"].map((key) => (
                <span
                  key={key}
                  className="flex items-center justify-center rounded-md bg-neutral-600 py-1 text-xs font-semibold text-white"
                >
                  {key === "DEL" ? <Delete className="size-4" /> : key}
                </span>
              ))}
            </div>
          </figure>

          <ol className="space-y-4">
            {SCANNER_FIELDS.map((field) => (
              <li key={field.marker} className="flex gap-3">
                <Marker n={field.marker} />
                <div>
                  <span lang="de" className="font-semibold">
                    {field.label}
                  </span>
                  <p className="text-muted-foreground">{field.explanation[lang]}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-14" aria-labelledby="keys-heading">
        <h2 id="keys-heading" className="text-2xl font-semibold">
          {t("scanner.keysHeading")}
        </h2>
        <dl className="mt-6 divide-y rounded-xl border">
          {SCANNER_KEYS.map((key) => (
            <div key={key.key} className="flex flex-col gap-1 p-4 sm:flex-row sm:gap-4">
              <dt className="sm:w-32 sm:shrink-0">
                <kbd
                  className="bg-muted inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-sm font-semibold"
                  aria-label={key.label?.[lang]}
                >
                  {key.icon === "delete" ? (
                    <Delete className="size-4" aria-hidden="true" />
                  ) : (
                    key.key
                  )}
                </kbd>
              </dt>
              <dd className="text-muted-foreground">{key.explanation[lang]}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14" aria-labelledby="messages-heading">
        <h2 id="messages-heading" className="text-2xl font-semibold">
          {t("scanner.messagesHeading")}
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {SCANNER_MESSAGES.map((message) => (
            <li
              key={message.message}
              className="bg-card text-card-foreground rounded-xl border p-5"
            >
              <p lang="de" className="flex items-center gap-2 font-mono font-semibold">
                <TriangleAlert className="size-4 shrink-0 text-amber-500" aria-hidden="true" />
                {message.message}
              </p>
              <p className="mt-3 text-sm">
                <span className="font-semibold">{t("scanner.meaning")}: </span>
                <span className="text-muted-foreground">{message.meaning[lang]}</span>
              </p>
              <p className="mt-2 text-sm">
                <span className="font-semibold">{t("scanner.action")}: </span>
                <span className="text-muted-foreground">{message.action[lang]}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

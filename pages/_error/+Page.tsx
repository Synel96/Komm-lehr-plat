import { useTranslation } from "react-i18next";
import { usePageContext } from "vike-react/usePageContext";
import { useLang } from "@/src/hooks/use-lang";

export default function Page() {
  const { is404 } = usePageContext();
  const { t } = useTranslation();
  const { href } = useLang();

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        {is404 ? t("error.notFoundTitle") : t("error.errorTitle")}
      </h1>
      <p className="text-muted-foreground mt-3">
        {is404 ? t("error.notFoundText") : t("error.errorText")}
      </p>
      <a href={href("/")} className="mt-6 inline-block font-medium underline underline-offset-4">
        {t("error.backHome")}
      </a>
    </div>
  );
}

import logoUrl from "../assets/logo.svg";
import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { usePageContext } from "vike-react/usePageContext";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useMounted } from "@/src/hooks/use-mounted";
import {
  PushDrawer,
  PushDrawerClose,
  PushDrawerContent,
  PushDrawerTitle,
  PushDrawerTrigger,
} from "@/components/ui/push-drawer";
import { BRAND_NAME, NAV_LINKS } from "./site";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { DEFAULT_LANG, langPath, type SupportedLang } from "@/src/i18n-config";

type NavbarProps = {
  // Optional so the navbar still works standalone; the layout passes these
  // in so it can push the rest of the page aside while the drawer is open.
  menuOpen?: boolean;
  onMenuOpenChange?: (open: boolean) => void;
};

export function Navbar({ menuOpen, onMenuOpenChange }: NavbarProps = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = menuOpen ?? uncontrolledOpen;
  const setOpen = (next: boolean) => {
    if (menuOpen === undefined) setUncontrolledOpen(next);
    onMenuOpenChange?.(next);
  };
  const mounted = useMounted();
  const pageContext = usePageContext() as { urlPathname: string; lang?: SupportedLang };
  const { urlPathname } = pageContext;
  const lang = pageContext.lang ?? DEFAULT_LANG;
  const { t } = useTranslation();

  // Build a URL with the current lang prefix
  const langHref = (href: string) => langPath(href, lang);

  const isActive = (href: string) =>
    href === "/" ? urlPathname === href : urlPathname.startsWith(href);

  const navLinkClass = (href: string) =>
    isActive(href)
      ? "rounded-full bg-white/15 px-3 py-1.5 font-medium text-(--brand-on-surface)"
      : "rounded-full px-3 py-1.5 text-white/75 transition-colors hover:bg-white/10 hover:text-(--brand-on-surface)";

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-(--brand-surface) text-(--brand-on-surface) shadow-sm backdrop-blur supports-backdrop-filter:bg-[color-mix(in_oklch,var(--brand-surface),transparent_8%)]">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <a
          href={langHref("/")}
          className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-(--brand-on-surface)"
        >
          <img src={logoUrl} alt="" width="32" height="32" className="size-8 rounded-lg" />
          {BRAND_NAME}
        </a>

        <nav className="hidden items-center gap-1 text-sm md:flex">
          {NAV_LINKS.map((item) => (
            <a key={item.href} href={langHref(item.href)} className={navLinkClass(item.href)}>
              {t(item.labelKey)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <div className="hidden items-center md:flex">
            <LanguageSwitcher />
          </div>

          <ThemeToggle />

          <div className="md:hidden">
            {mounted ? (
              <PushDrawer open={open} onOpenChange={setOpen}>
                <PushDrawerTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={t("nav.openMenu")}
                    className="text-(--brand-on-surface) hover:bg-white/10 hover:text-(--brand-on-surface)"
                  >
                    <span className="relative size-5">
                      <MenuIcon
                        className={`absolute inset-0 size-5 transition-all duration-300 ${
                          open ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
                        }`}
                      />
                      <XIcon
                        className={`absolute inset-0 size-5 transition-all duration-300 ${
                          open ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
                        }`}
                      />
                    </span>
                  </Button>
                </PushDrawerTrigger>
                <PushDrawerContent
                  open={open}
                  closeLabel={t("nav.closeMenu")}
                  aria-describedby={undefined}
                  className="border-l-white/10 bg-(--brand-surface) text-(--brand-on-surface)"
                >
                  {/* Kept for screen readers (Radix requires an accessible dialog title) but not shown visually. */}
                  <PushDrawerTitle className="sr-only">{t("nav.navigationMenu")}</PushDrawerTitle>

                  <nav className="mt-12 flex flex-col gap-1 px-4 pb-6">
                    {NAV_LINKS.map((item) => (
                      <PushDrawerClose asChild key={item.href}>
                        <a
                          href={langHref(item.href)}
                          className={`rounded-md px-3 py-2 text-sm ${
                            isActive(item.href)
                              ? "bg-white/15 font-medium text-(--brand-on-surface)"
                              : "text-white/75 hover:bg-white/10 hover:text-(--brand-on-surface)"
                          }`}
                        >
                          {t(item.labelKey)}
                        </a>
                      </PushDrawerClose>
                    ))}
                  </nav>

                  <div className="border-t border-white/10 px-4 pt-4 pb-6">
                    <LanguageSwitcher />
                  </div>
                </PushDrawerContent>
              </PushDrawer>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                aria-label={t("nav.openMenu")}
                disabled
                className="text-(--brand-on-surface) hover:bg-white/10 hover:text-(--brand-on-surface)"
              >
                <MenuIcon className="size-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

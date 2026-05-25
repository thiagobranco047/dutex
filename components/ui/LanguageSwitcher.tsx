"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const localeLabels: Record<Locale, string> = {
  pt: "PT",
  en: "EN",
  es: "ES",
};

export default function LanguageSwitcher({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(nextLocale: Locale) {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border p-0.5",
        variant === "dark"
          ? "border-white/20 bg-white/5"
          : "border-gray-border bg-white",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchLocale(loc)}
          className={cn(
            "rounded-md px-2.5 py-1 text-[11px] font-semibold tracking-wide transition-colors cursor-pointer",
            locale === loc
              ? variant === "dark"
                ? "bg-white/15 text-white"
                : "bg-primary text-white"
              : variant === "dark"
                ? "text-white/55 hover:text-white"
                : "text-gray-text hover:text-gray-900"
          )}
          aria-current={locale === loc ? "true" : undefined}
        >
          {localeLabels[loc]}
        </button>
      ))}
    </div>
  );
}

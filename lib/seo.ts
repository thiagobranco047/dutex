import type { Locale } from "@/i18n/routing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.dutex.ind.br";

export const GOOGLE_SITE_VERIFICATION =
  "ucy8vAL7Ydvvw-92U4HOPCYN2z3Q8tE4n-RSmHyKKws";

export const GA_MEASUREMENT_ID = "G-6PV86ZCTMB";

const localePrefixes: Record<Locale, string> = {
  pt: "",
  en: "/en",
  es: "/es",
};

export function localizedPath(locale: Locale, path = "") {
  const normalizedPath = path ? `/${path.replace(/^\/+/, "")}` : "";
  return `${localePrefixes[locale]}${normalizedPath}` || "/";
}

export function absoluteUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function localizedAlternates(path = "") {
  return {
    languages: {
      "pt-BR": absoluteUrl(localizedPath("pt", path)),
      en: absoluteUrl(localizedPath("en", path)),
      es: absoluteUrl(localizedPath("es", path)),
      "x-default": absoluteUrl(localizedPath("pt", path)),
    },
  };
}

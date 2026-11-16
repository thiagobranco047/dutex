import type { Metadata } from "next";
import { absoluteUrl, localizedAlternates, localizedPath } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";

export function resolveLocale(locale: string): Locale {
  return (routing.locales.includes(locale as Locale) ? locale : routing.defaultLocale) as Locale;
}

/** Metadata padrão das páginas do catálogo (canonical, hreflang, Open Graph e robots). */
export function catalogMetadata({
  locale,
  path,
  title,
  description,
  image,
  noindex = false,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string | null;
  noindex?: boolean;
}): Metadata {
  const url = absoluteUrl(localizedPath(locale, path));
  const ogImage = absoluteUrl(image ?? "/images/protecao-e-logistica.webp");
  return {
    title,
    description,
    alternates: { canonical: url, ...localizedAlternates(path) },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: "Dutex",
      type: "website",
      locale: locale === "pt" ? "pt_BR" : locale,
      images: [{ url: ogImage, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localizedPath(locale, item.path)),
    })),
  };
}

export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

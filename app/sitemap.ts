import type { MetadataRoute } from "next";
import { absoluteUrl, localizedPath } from "@/lib/seo";
import { routing } from "@/i18n/routing";

const staticSlugs = ["", "sobre", "compliance", "dutex-conecta"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routing.locales.flatMap((locale) =>
    staticSlugs.map((slug) => ({
      url: absoluteUrl(localizedPath(locale, slug)),
      lastModified: now,
      changeFrequency: slug === "" ? "weekly" : "monthly",
      priority: slug === "" ? 1 : 0.8,
    }))
  );
}

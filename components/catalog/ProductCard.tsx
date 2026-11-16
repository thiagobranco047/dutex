"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, ImageOff } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { CatalogEntry } from "@/lib/catalog/search";

export default function ProductCard({ entry, priority = false }: { entry: CatalogEntry; priority?: boolean }) {
  const t = useTranslations("catalog");

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-border bg-white transition-shadow duration-200 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-light">
        {entry.image ? (
          <Image
            src={entry.image.src}
            alt={entry.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
            priority={priority}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-gray-400">
            <ImageOff size={28} strokeWidth={1.5} aria-hidden />
            <span className="text-xs font-medium">{t("product.imagePlaceholder")}</span>
          </div>
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {entry.draft && (
            <span className="rounded-full bg-yellow-400 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-900">
              {t("card.draft")}
            </span>
          )}
          {entry.customizable && (
            <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
              {t("card.customizable")}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-green-accent-dark">{entry.categoryName}</p>
        <h3 className="mt-1.5 text-lg font-bold leading-snug text-gray-900">
          <Link href={entry.href} className="after:absolute after:inset-0 focus-visible:outline-none">
            {entry.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-text">{entry.summary}</p>
        <div className="mt-auto flex items-center justify-between pt-4 text-xs">
          <span className="text-gray-500">{t("card.configurations", { count: entry.configurationCount })}</span>
          <span className="inline-flex items-center gap-1 font-semibold text-primary">
            {t("card.view")}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
        </div>
      </div>
    </article>
  );
}

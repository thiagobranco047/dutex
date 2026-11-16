"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

type GalleryImage = { src: string; width: number; height: number; alt: string };

export default function ProductGallery({ images, name }: { images: readonly GalleryImage[]; name: string }) {
  const t = useTranslations("catalog.product");
  const [index, setIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 text-white/50">
        <ImageOff size={36} strokeWidth={1.4} aria-hidden />
        <span className="text-sm font-medium">{t("imagePlaceholder")}</span>
      </div>
    );
  }

  const current = images[index];
  const go = (delta: number) => setIndex((value) => (value + delta + images.length) % images.length);

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white">
        <Image
          key={current.src}
          src={current.src}
          alt={`${name} - ${t("imageOf", { index: index + 1, total: images.length })}`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain p-4"
          priority={index === 0}
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={t("previousImage")}
              className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-dark/70 p-2 text-white transition-colors hover:bg-dark"
            >
              <ChevronLeft size={20} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t("nextImage")}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-dark/70 p-2 text-white transition-colors hover:bg-dark"
            >
              <ChevronRight size={20} aria-hidden />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
          {images.map((image, i) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={t("imageOf", { index: i + 1, total: images.length })}
                aria-current={i === index}
                className={cn(
                  "relative block aspect-square w-full cursor-pointer overflow-hidden rounded-lg border-2 bg-white transition-colors",
                  i === index ? "border-green-accent" : "border-transparent opacity-70 hover:opacity-100",
                )}
              >
                <Image src={image.src} alt="" fill sizes="96px" className="object-contain p-1" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

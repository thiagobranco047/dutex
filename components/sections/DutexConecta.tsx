"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { ArrowRight, Sparkles } from "lucide-react";

const BACKGROUND_IMAGES = [
  "/images/industria.webp",
  "/images/transformacao-de-aco.webp",
  "/images/plasticos-de-engenharia.webp",
  "/images/protecao-e-logistica.webp",
  "/images/siderurgia.webp",
  "/images/energia-renovavel.webp",
];

function pickRandomBackground() {
  const pool = [...BACKGROUND_IMAGES];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool[0];
}

export default function DutexConecta() {
  const t = useTranslations("conectaHome");
  const randomImage = useMemo(() => pickRandomBackground(), []);

  return (
    <section className="bg-primary py-20 lg:py-24 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={randomImage}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/88 via-primary/85 to-primary-dark/90" />
      </div>
      <Container>
        <div className="relative z-10 border border-white/20 bg-primary-dark/50 p-8 lg:p-10 rounded-xl backdrop-blur-[2px]">
          <Badge variant="white" className="mb-4">
            {t("badge")}
          </Badge>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {t("title")}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/75 max-w-2xl">
                {t("description")}
              </p>
            </div>

            <Link
              href="/dutex-conecta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-accent px-6 py-3 text-sm font-bold text-dark hover:bg-green-accent-dark transition-colors group whitespace-nowrap"
            >
              {t("cta")}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs text-white/70">
            <Sparkles size={14} className="text-green-accent shrink-0" />
            <span>{t("footnote")}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

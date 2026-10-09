"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Cpu, Droplets, Pause, Play, Ruler, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { DUCHABR_WHATSAPP_NUMBER, duchabrUrl } from "@/lib/data";

const PILLAR_ICONS = [Sparkles, Cpu, Droplets, Ruler];

export default function DuchaBR() {
  const t = useTranslations("duchabrHome");
  const tA11y = useTranslations("a11y");
  const pillars = t.raw("pillars") as { title: string; text: string }[];
  const steps = t.raw("steps") as string[];

  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (shouldLoad) videoRef.current?.load();
  }, [shouldLoad]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !shouldLoad) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isVisible && !reduceMotion) void el.play().catch(() => {});
    else if (!isVisible) el.pause();
  }, [isVisible, shouldLoad]);

  function togglePlayPause() {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) void el.play().catch(() => {});
    else el.pause();
  }

  const whatsappUrl = `https://wa.me/${DUCHABR_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t("whatsappMessage")
  )}`;

  return (
    <section
      id="duchabr"
      className="bg-dark-deep py-20 lg:py-28"
      aria-labelledby="duchabr-heading"
    >
      <Container>
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <Badge variant="green" className="mb-5">
              {t("badge")}
            </Badge>
            <h2
              id="duchabr-heading"
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight"
            >
              {t("title")}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-white/70 sm:text-lg">
            {t("description")}
          </p>
        </div>

        <div className="mt-10 lg:mt-14">
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black">
            <video
              ref={videoRef}
              className="aspect-video w-full object-cover"
              poster="/images/duchabr-poster.webp"
              muted
              loop
              playsInline
              preload="none"
              aria-label={t("videoLabel")}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              {shouldLoad && (
                <>
                  <source src="/videos/duchabr.webm" type="video/webm" />
                  <source src="/videos/ducha_site.mp4" type="video/mp4" />
                </>
              )}
              {tA11y("videoUnsupported")}
            </video>

            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent"
              aria-hidden
            />

            <Badge
              variant="white"
              className="absolute left-3 top-3 bg-black/50 px-2.5 text-[10px] backdrop-blur-md sm:left-5 sm:top-5 sm:px-3.5 sm:text-xs"
            >
              {t("videoBadge")}
            </Badge>

            <button
              type="button"
              onClick={togglePlayPause}
              aria-label={isPlaying ? t("pause") : t("play")}
              className="absolute bottom-3 right-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-md transition-colors hover:bg-white/15 sm:bottom-5 sm:right-5 sm:h-12 sm:w-12"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="translate-x-px" />}
            </button>
          </div>

          <ol
            className="mt-3 flex snap-x overflow-x-auto rounded-lg border border-white/10 [scrollbar-width:none] sm:mt-4"
            aria-label={t("stepsLabel")}
          >
            {steps.map((step, index) => (
              <li
                key={step}
                className="flex flex-none snap-start items-center justify-center gap-2 border-r border-white/10 px-4 py-3 last:border-r-0 sm:flex-1 sm:px-3 sm:py-4"
              >
                <span className="text-xs font-bold text-green-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="whitespace-nowrap text-xs font-medium text-white/70 sm:text-sm">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 sm:mt-12 sm:gap-x-10 lg:mt-16 lg:grid-cols-4 lg:gap-x-8">
          {pillars.map((pillar, index) => {
            const Icon = PILLAR_ICONS[index] ?? Sparkles;
            return (
              <div key={pillar.title}>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-green-accent/10">
                  <Icon size={22} className="text-green-accent" strokeWidth={1.8} />
                </div>
                <h3 className="text-base font-bold text-white">{pillar.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/60">{pillar.text}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 lg:mt-16 lg:flex-row lg:items-center lg:justify-between">
          <p className="order-last text-sm text-white/50 lg:order-none lg:max-w-md">
            {t("footnote")}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={duchabrUrl("home")}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-green-accent px-6 py-3 text-sm font-bold text-dark transition-colors hover:bg-green-accent-dark"
            >
              {t("primaryCta")}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              <span className="sr-only">({t("externalLink")})</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {t("secondaryCta")}
              <span className="sr-only">({t("externalLink")})</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

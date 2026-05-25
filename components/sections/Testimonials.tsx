"use client";

import { useMemo, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const testimonials = useMemo(
    () => t.raw("items") as TestimonialItem[],
    [t]
  );
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const visibleDesktop = [
    testimonials[current % testimonials.length],
    testimonials[(current + 1) % testimonials.length],
  ];

  return (
    <section id="depoimentos" className="bg-gray-light py-20 lg:py-28">
      <Container>
        <SectionHeading
          badgeText={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="hidden lg:grid lg:grid-cols-2 gap-8">
          {visibleDesktop.map((item, i) => (
            <Card key={`${current}-${i}`} className="p-8">
              <Quote
                size={32}
                className="text-primary/15 mb-4"
                strokeWidth={1.5}
              />
              <blockquote className="text-base leading-relaxed text-gray-700">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {item.author[0]}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">
                    {item.author}
                  </div>
                  <div className="text-xs text-gray-text">
                    {item.role} | {item.company}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="lg:hidden">
          <Card className="p-6">
            <Quote
              size={28}
              className="text-primary/15 mb-3"
              strokeWidth={1.5}
            />
            <blockquote className="text-base leading-relaxed text-gray-700">
              &ldquo;{testimonials[current].quote}&rdquo;
            </blockquote>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {testimonials[current].author[0]}
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">
                  {testimonials[current].author}
                </div>
                <div className="text-xs text-gray-text">
                  {testimonials[current].role} | {testimonials[current].company}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-border bg-white text-gray-500 hover:border-primary hover:text-primary transition-colors cursor-pointer"
            aria-label={t("prev")}
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === current
                    ? "w-6 bg-primary"
                    : "w-2 bg-gray-border hover:bg-gray-300"
                }`}
                aria-label={t("goTo", { n: i + 1 })}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-border bg-white text-gray-500 hover:border-primary hover:text-primary transition-colors cursor-pointer"
            aria-label={t("next")}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </Container>
    </section>
  );
}

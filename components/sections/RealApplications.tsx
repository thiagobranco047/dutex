"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { applications } from "@/lib/data";
import { ChevronRight } from "lucide-react";

export default function RealApplications() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = applications[activeIndex];

  return (
    <section id="aplicacoes" className="bg-primary py-20 lg:py-28">
      <Container>
        <SectionHeading
          badgeText="Engenharia aplicada"
          title={<>Quando o mercado não tem<br />a solução, a Dutex desenvolve.</>}
          subtitle="Diversas soluções da Dutex nasceram a partir de necessidades específicas de clientes industriais. A empresa analisa o problema, desenvolve a engenharia, projeta as ferramentas e fabrica internamente."
          dark
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Case image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white/5">
            <Image
              src={active.image}
              alt={active.subtitle}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Case details */}
          <div className="flex flex-col justify-center">
            <span className="inline-flex self-start items-center rounded-full border border-green-accent px-4 py-1.5 text-xs font-semibold text-green-accent">
              {active.badge}
            </span>

            <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
              {active.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-white/50">
              {active.subtitle}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-white/65">
              {active.description}
            </p>

            <ul className="mt-5 space-y-2">
              {active.steps.map((step) => (
                <li key={step} className="flex items-start gap-2 text-sm text-white/80">
                  <ChevronRight size={14} className="mt-0.5 shrink-0 text-green-accent" />
                  {step}
                </li>
              ))}
            </ul>

            <p className="mt-5 text-sm leading-relaxed text-white/50 italic">
              {active.result}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-center gap-6">
          {applications.map((app, index) => (
            <button
              key={app.id}
              onClick={() => setActiveIndex(index)}
              className="flex flex-col items-center gap-2 cursor-pointer group"
              aria-label={`Ver caso ${app.id}: ${app.title}`}
            >
              <div
                className={`h-[3px] w-14 rounded-full transition-colors duration-300 ${
                  index === activeIndex
                    ? "bg-green-accent"
                    : "bg-white/30 group-hover:bg-white/50"
                }`}
              />
              <span
                className={`text-sm font-semibold transition-colors duration-300 ${
                  index === activeIndex
                    ? "text-white"
                    : "text-white/40 group-hover:text-white/60"
                }`}
              >
                {app.id}
              </span>
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}

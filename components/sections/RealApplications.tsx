"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { applications } from "@/lib/data";

export default function RealApplications() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = applications[activeIndex];

  return (
    <section id="aplicacoes" className="bg-primary py-20 lg:py-28">
      <Container>
        <SectionHeading
          badgeText="Aplicações reais"
          title="Aplicações reais"
          subtitle="Galeria com imagens reais de produtos Dutex aplicados em siderurgia, alumínio, papel e celulose e logística e distribuição."
          dark
        />

        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-3">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary-dark to-dark">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-white/30">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/20">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">
                    {active.title}
                  </span>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 rounded-lg bg-black/40 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm">
                Visualização 3D
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="flex h-full flex-col justify-center rounded-2xl bg-white/10 p-6 backdrop-blur-sm lg:p-8">
              <Badge variant="green" className="mb-4 self-start">
                {active.badge}
              </Badge>
              <h3 className="text-xl font-bold text-white sm:text-2xl">
                {active.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {active.description}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {applications.map((app, index) => (
            <button
              key={app.id}
              onClick={() => setActiveIndex(index)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer ${
                index === activeIndex
                  ? "bg-green-accent text-white shadow-lg shadow-green-accent/30"
                  : "bg-white/10 text-white/50 hover:bg-white/20 hover:text-white"
              }`}
              aria-label={`Ver aplicação ${app.id}: ${app.title}`}
            >
              {app.id}
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}

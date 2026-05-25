"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export default function Process() {
  const t = useTranslations("process");
  const processSteps = useMemo(() => t.raw("items") as ProcessStep[], [t]);
  const [activeStep, setActiveStep] = useState(0);
  const total = String(processSteps.length).padStart(2, "0");

  return (
    <section id="processo" className="py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Badge variant="green" className="mb-5">
              {t("badge")}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {t("titleLine1")}
              <br />
              {t("titleLine2")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-text max-w-md">
              {t("subtitle")}
            </p>
          </div>

          <div className="flex flex-col">
            {processSteps.map((step, index) => {
              const isActive = index === activeStep;
              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(index)}
                  className="group w-full text-left cursor-pointer"
                >
                  <div
                    className={`h-[2px] transition-colors duration-300 ${
                      isActive ? "bg-primary" : "bg-gray-border"
                    }`}
                  />

                  <div className="py-7">
                    <div className="flex items-center gap-1.5 text-sm text-gray-400 mb-3">
                      <span
                        className={`font-bold transition-colors duration-300 ${isActive ? "text-gray-900" : "text-gray-400"}`}
                      >
                        {step.number}
                      </span>
                      <span>/({total})</span>
                      <ArrowRight size={14} className="ml-1" />
                    </div>

                    <h3
                      className={`text-xl font-bold transition-colors duration-300 ${isActive ? "text-gray-900" : "text-gray-500"}`}
                    >
                      {step.title}
                    </h3>

                    <div className="mt-2">
                      <p
                        className={`text-sm leading-relaxed max-w-md transition-colors duration-300 ${isActive ? "text-gray-text" : "text-gray-300"}`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

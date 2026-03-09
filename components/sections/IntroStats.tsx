import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { stats } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function IntroStats() {
  return (
    <section id="sobre" className="py-20 lg:py-28">
      <Container>
        <Badge variant="green" className="mb-6">
          Sobre a Dutex
        </Badge>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-2xl text-2xl leading-relaxed text-gray-900 sm:text-3xl lg:text-[2rem] lg:leading-[1.45]">
            A Dutex integra{" "}
            <span className="text-primary font-semibold">
              transformação de aço, plásticos de engenharia e sistemas de
              proteção
            </span>{" "}
            para otimizar operações industriais com bobinas, chapas e materiais
            críticos.
          </p>

          <div className="flex flex-col gap-3 shrink-0 sm:flex-row lg:flex-col">
            <a
              href="/sobre"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-border px-5 py-2.5 text-sm font-semibold text-gray-700 hover:border-gray-400 hover:text-gray-900 transition-colors group whitespace-nowrap"
            >
              Conheça nossa empresa
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="/compliance"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-border px-5 py-2.5 text-sm font-semibold text-gray-700 hover:border-gray-400 hover:text-gray-900 transition-colors group whitespace-nowrap"
            >
              Compliance
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:mt-20">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-left px-6 lg:px-8 ${
                i > 0 ? "border-l border-gray-border" : ""
              } ${i === 0 ? "pl-0" : ""}`}
            >
              <div className="text-4xl font-semibold text-gray-900 sm:text-5xl tracking-tight">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-gray-text">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

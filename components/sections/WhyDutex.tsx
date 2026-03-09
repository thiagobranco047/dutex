import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { differentials } from "@/lib/data";
import { ArrowRight, CircleCheckBig } from "lucide-react";

export default function WhyDutex() {
  return (
    <section id="diferenciais" className="py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Badge variant="green" className="mb-4">
              Diferenciais
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              Por que a Dutex?
            </h2>
            <a
              href="/sobre"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-gray-border px-5 py-2.5 text-sm font-semibold text-gray-700 hover:border-primary hover:text-primary transition-colors group"
            >
              Conheça nossa empresa
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>

          <div>
            <p className="text-lg leading-relaxed text-gray-700 sm:text-xl lg:text-[1.3rem] lg:leading-[1.6] mb-8">
              A Dutex fabrica internamente com estrutura completa — controle
              total sobre qualidade, prazo e customização, sem depender de
              terceiros. Soluções customizadas para cada cliente e tipo de carga.
            </p>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-10">
              {differentials.map((item) => (
                <div key={item.title}>
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-green-accent/10">
                    <CircleCheckBig size={22} className="text-green-accent" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="mt-1 text-sm leading-relaxed text-gray-text">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import IconCircle from "@/components/ui/IconCircle";
import { differentials } from "@/lib/data";
import { ArrowRight } from "lucide-react";

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
              href="#aplicacoes"
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {differentials.map((item) => (
                <Card key={item.title} className="p-5">
                  <IconCircle icon={item.icon} className="mb-3" />
                  <h3 className="text-sm font-bold text-gray-900">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="mt-0.5 text-xs text-gray-text">
                      {item.subtitle}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { solutions } from "@/lib/data";

export default function Solutions() {
  return (
    <section id="solucoes" className="bg-gray-light py-20 lg:py-28">
      <Container>
        <SectionHeading
          badgeText="Nossas soluções"
          title="Soluções industriais para transformação e proteção"
          subtitle="A Dutex atua nas duas pontas da operação. Entrega o material transformado pronto para produção. E protege a carga do ponto de origem até a linha de produção."
        />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {solutions.map((solution) => (
            <div key={solution.number}>
              <span className="text-sm font-bold text-green-accent">
                {solution.number}
              </span>
              <h3 className="mt-1.5 text-xl font-bold text-gray-900">
                {solution.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-gray-text">
                {solution.description}
              </p>

              <div className="mt-6 aspect-[4/3] w-full rounded-2xl bg-gray-200" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

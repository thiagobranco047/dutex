import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  Shield,
  Clock,
  Lock,
  Users,
  Phone,
  Mail,
  LayoutGrid,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Compliance & Integridade — Dutex",
  description:
    "A Dutex opera com tolerância zero a condutas antiéticas, assédio e discriminação. Conheça nosso programa de integridade.",
};

const pillars = [
  {
    icon: Shield,
    title: "Tolerância Zero",
    description:
      "Nenhuma conduta de assédio moral, assédio sexual ou discriminação é tolerada — independentemente de cargo, hierarquia ou tempo de empresa.",
  },
  {
    icon: Clock,
    title: "Processo Estruturado",
    description:
      "Todas as denúncias são apuradas por comissão independente, com contraditório, ampla defesa e prazo máximo de 30 dias para resolução.",
  },
  {
    icon: Lock,
    title: "Sigilo e Proteção",
    description:
      "O denunciante pode optar pelo anonimato. Qualquer retaliação a vítimas ou testemunhas é tratada como infração autônoma e punível.",
  },
  {
    icon: Users,
    title: "Abrangência Total",
    description:
      "O programa vincula colaboradores, terceiros, fornecedores e representantes comerciais. A adesão é obrigatória e parte do contrato.",
  },
];

const laws = [
  "Lei 14.457/2022",
  "Lei 14.540/2023",
  "OIT — Conv. 190",
  "CLT",
  "CF / 1988",
  "LGPD",
];

const channels = [
  {
    icon: Phone,
    title: "Canal de Compliance",
    lines: [
      { text: "compliance@dutex.com.br", href: "mailto:compliance@dutex.com.br" },
      { text: "+55 47 9168-9143", href: "tel:+554791689143" },
    ],
  },
  {
    icon: Mail,
    title: "Canal de Denúncias",
    lines: [
      { text: "denuncia@dutex.com.br", href: "mailto:denuncia@dutex.com.br" },
      { text: "Anônimo · Sigiloso · Disponível 24h" },
    ],
  },
  {
    icon: LayoutGrid,
    title: "LGPD / Privacidade",
    lines: [
      { text: "privacidade@dutex.com.br", href: "mailto:privacidade@dutex.com.br" },
      { text: "Titular de dados · Requisições LGPD" },
    ],
  },
];

const principles = [
  "Dignidade da Pessoa Humana",
  "Igualdade Material e Não Discriminação",
  "Confidencialidade e Proteção ao Denunciante",
  "Responsabilidade e Sanção Proporcional",
  "Transparência e Governança Ética",
  "Prevenção e Educação Permanente",
];

export default function CompliancePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-dark pt-40 pb-20 lg:pt-48 lg:pb-24 relative overflow-hidden">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <Badge variant="white" className="mb-5">
                  Governança Corporativa
                </Badge>
                <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
                  Compliance &<br />
                  <span className="text-green-accent">Integridade</span>
                </h1>
                <p className="mt-6 text-base leading-relaxed text-white/55 sm:text-lg max-w-xl">
                  A Dutex opera com tolerância zero a condutas antiéticas,
                  assédio e discriminação. Nosso programa de integridade é
                  condição de entrada para qualquer relação comercial ou de
                  trabalho com a empresa.
                </p>
              </div>
              <div className="hidden lg:flex flex-col items-center gap-3 border border-green-accent/25 rounded-lg bg-primary/25 px-8 py-7 self-center justify-self-end">
                <ShieldCheck size={40} className="text-green-accent" />
                <span className="text-[10px] font-semibold tracking-[3px] uppercase text-green-accent">
                  Certificado
                </span>
                <span className="text-lg font-bold text-white tracking-wide">
                  ISO 9001:2015
                </span>
              </div>
            </div>
          </Container>
        </section>

        {/* Pillar Cards */}
        <section className="bg-white py-20 lg:py-28">
          <Container>
            <Badge variant="green" className="mb-5">
              Nossos Pilares
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight mb-12">
              Quatro fundamentos que guiam nossa conduta
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="bg-white border border-gray-border border-t-[3px] border-t-primary p-7 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 transition-all duration-200 group"
                  >
                    <p className="text-[10px] font-bold tracking-[3px] uppercase text-primary mb-5">
                      {String(i + 1).padStart(2, "0")} / pilar
                    </p>
                    <Icon
                      size={32}
                      className="text-primary mb-4"
                      strokeWidth={1.5}
                    />
                    <h3 className="text-base font-bold text-gray-900 mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-text">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Commitment + Channels */}
        <section className="bg-dark py-20 lg:py-28 relative overflow-hidden">
          <Container className="relative z-10">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
              <div>
                <Badge variant="white" className="mb-5">
                  Base Legal
                </Badge>
                <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight mb-5">
                  Conformidade com a{" "}
                  <span className="text-green-accent">legislação vigente</span>
                </h2>
                <p className="text-sm leading-relaxed text-white/50 mb-3">
                  O Programa de Integridade da Dutex é elaborado por assessoria
                  jurídica especializada e atualizado anualmente para refletir a
                  evolução normativa brasileira.
                </p>
                <p className="text-sm leading-relaxed text-white/50">
                  Fornecedores e parceiros que operam conosco aderem formalmente
                  às nossas diretrizes éticas como condição contratual — sem
                  exceção.
                </p>
                <div className="flex flex-wrap gap-2 mt-7">
                  {laws.map((law) => (
                    <span
                      key={law}
                      className="text-xs font-semibold px-3 py-1.5 border border-green-accent/30 text-green-accent rounded bg-green-accent/5"
                    >
                      {law}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <Badge variant="white" className="mb-5">
                  Canais Oficiais
                </Badge>
                <div className="flex flex-col gap-3">
                  {channels.map((ch) => {
                    const Icon = ch.icon;
                    return (
                      <div
                        key={ch.title}
                        className="flex items-start gap-4 p-5 border border-white/[0.07] border-l-[3px] border-l-green-accent bg-white/[0.03] hover:bg-green-accent/5 transition-colors"
                      >
                        <Icon
                          size={24}
                          className="text-green-accent shrink-0 mt-0.5"
                          strokeWidth={1.5}
                        />
                        <div>
                          <h4 className="text-sm font-bold text-white mb-1">
                            {ch.title}
                          </h4>
                          {ch.lines.map((line) =>
                            line.href ? (
                              <a
                                key={line.text}
                                href={line.href}
                                className="block text-xs text-white/40 hover:text-green-accent transition-colors"
                              >
                                {line.text}
                              </a>
                            ) : (
                              <span
                                key={line.text}
                                className="block text-xs text-white/40 leading-relaxed"
                              >
                                {line.text}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Principles */}
        <section className="bg-primary py-20 lg:py-28 relative overflow-hidden">
          <Container className="relative z-10">
            <Badge variant="white" className="mb-5">
              Princípios
            </Badge>
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight mb-12">
              A ética como fundamento operacional
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[2px]">
              {principles.map((p, i) => (
                <div
                  key={p}
                  className="p-5 bg-white/[0.06] border border-white/[0.08] hover:bg-green-accent/10 transition-colors"
                >
                  <span className="block text-3xl font-black text-green-accent/25 leading-none mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-sm font-semibold text-white/85 leading-snug">
                    {p}
                  </h4>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="bg-gray-light py-20 lg:py-28">
          <Container>
            <div className="bg-white border border-gray-border border-l-4 border-l-primary p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Quer qualificar a Dutex como fornecedor?
                </h3>
                <p className="text-sm text-gray-text">
                  Solicite nosso pacote de credenciais — ISO 9001 + Programa de
                  Compliance
                </p>
              </div>
              <Button
                variant="primary"
                size="lg"
                href="mailto:comercial@dutex.ind.br"
                className="shrink-0"
              >
                <span className="w-2 h-2 rounded-full bg-green-accent" />
                Solicitar credenciais
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

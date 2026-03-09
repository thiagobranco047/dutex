import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  ShieldCheck,
  Eye,
  Star,
  ArrowRight,
  Recycle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Quem Somos — Dutex Industrial",
  description:
    "Da linha de produção ao destino final, a Dutex é a empresa que enxerga o problema antes do cliente — e entrega a solução antes da concorrência.",
};

const timeline = [
  {
    year: "Anos 2000",
    title: "A trinca se forma",
    description:
      "Carlos Garcez conhece Oebier dos Santos na Tigre. Oebier apresenta seu irmão Alexandre. Três amigos, uma vocação em comum.",
  },
  {
    year: "2008 – 2010",
    title: "Porto Velho & Rio Madeira",
    description:
      "Alexandre parte para Rondônia para atender obras da Camargo Corrêa. Carlos desenvolve fornecedores do Sul. O projeto de empreender ganha forma.",
  },
  {
    year: "2010 – 2012",
    title: "Diagnóstico & Superação",
    description:
      "Carlos recebe diagnóstico de linfoma. Dois anos de tratamento. A ideia não para — numa janta, Robson é apresentado ao projeto e decide investir.",
  },
  {
    year: "2013",
    title: "Dutex nasce",
    description:
      "Após muitas reuniões, a Dutex Indústria Plástica é fundada em Garuva, SC. Da ideia gestada em Porto Velho à primeira injetora ligada.",
  },
  {
    year: "2018",
    title: "100% dos fundadores",
    description:
      "Carlos, Alexandre e Oebier adquirem 100% da empresa. A Dutex se torna Dutex Industrial — aço, plástico e logística integrados.",
  },
  {
    year: "Hoje",
    title: "E a história continua…",
    description:
      "ISO 9001:2015, ciclo fechado com as maiores siderúrgicas do Brasil, e uma nova fase de expansão em curso.",
  },
];

const beliefs = [
  {
    title: "Resolver antes de vender",
    description:
      "Resolver é prioridade — não o produto. Eliminamos risco, reduzimos perda, melhoramos operação. Se não resolve, não serve.",
  },
  {
    title: "Eficiência acima de ego",
    description:
      "Processo simples, decisão rápida, zero ruído. Eficiência opera primeiro; ego fica do lado de fora.",
  },
  {
    title: "Confiança no detalhe",
    description:
      "Do PP ao aço, tudo segue padrão. ISO 9001:2015 não é selo — é disciplina diária.",
  },
  {
    title: "Clareza sempre vence",
    description:
      "Previsibilidade acima de achismo. Explicamos, alinhamos, entregamos. Sempre.",
  },
  {
    title: "Inovar para resolver",
    description:
      "Inovação não é firula. É prática: dor real → solução técnica real. Engenharia, protótipo, teste, validação.",
  },
  {
    title: "Responsabilidade pelo impacto",
    description:
      "Cada peça protege gente, evita custo, melhora operações. O impacto existe — e a equipe sabe disso.",
  },
  {
    title: "Parceria acima de transação",
    description:
      "Cliente, fornecedor, transportadora, operador. Trabalhamos juntos. Ganhamos juntos.",
  },
  {
    title: "Crescimento com coragem",
    description:
      "Melhor antes de maior. Coragem para enxergar o que a indústria vai perceber só amanhã.",
  },
];

const values = [
  "Responsabilidade socioambiental",
  "Qualidade",
  "Empatia",
  "Otimismo",
  "Compromisso",
  "Harmonia",
];

const esgStats = [
  { value: "+70%", label: "Majoritariamente Reciclado", description: "A maior parte dos produtos logísticos usa PP reciclado. PP virgem é aplicado onde a especificação técnica exige." },
  { value: "−1,2t", label: "CO₂ por tonelada", description: "Substituição de PP virgem por reciclado evita até 1,2 tCO₂ por tonelada processada." },
  { value: "10×", label: "Vida útil — palete metálico", description: "Paletes metálicos Dutex vs. palete de madeira descartável. Menos resíduo, menos custo." },
  { value: "0", label: "Rebarbas para aterro", description: "Sobras de extrusão e refile são reprocessados internamente — zero descarte produtivo." },
];

const cases = [
  {
    tag: "Siderurgia · Proteção de Bobinas",
    challenge: "Avarias recorrentes em bordas de bobinas durante movimentação interna e transporte — gerando retrabalho e refugo na linha de produção.",
    solution: "Desenvolvimento de cantoneira coextrusada com reforço em TNT, especificada para o peso e formato das bobinas do cliente.",
    result: "Redução significativa de danos logísticos e maior estabilidade no empilhamento.",
    color: "primary" as const,
  },
  {
    tag: "Siderurgia · Logística de Bobinas",
    challenge: "Uso de berços de madeira descartáveis para apoio de bobinas pesadas — alto custo recorrente, baixa durabilidade e geração de resíduo.",
    solution: "Projeto e fabricação de berços metálicos reutilizáveis sob medida, dimensionados para bobinas de 3 a 20 toneladas.",
    result: "Vida útil até 10× maior que a solução anterior, com eliminação de custo recorrente de descarte.",
    color: "green" as const,
  },
  {
    tag: "Metalmecânica · Transformação de Aço",
    challenge: "Necessidade de chapas e blanks sob medida com qualidade de superfície ZC/FF/FQ — prazo curto e especificação técnica rígida.",
    solution: "Slitter e corte transversal próprios, produção integrada de blanks no padrão exigido, com rastreabilidade e inspeção de qualidade.",
    result: "Entrega no prazo com material certificado — sem intermediário, sem retrabalho.",
    color: "yellow" as const,
  },
];

const caseColors = {
  primary: { border: "border-t-primary", tag: "text-primary", result: "bg-primary" },
  green: { border: "border-t-green-accent", tag: "text-green-accent-dark", result: "bg-dark" },
  yellow: { border: "border-t-yellow-500", tag: "text-yellow-600", result: "bg-dark" },
};

export default function SobrePage() {
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
                  Sobre a Dutex
                </Badge>
                <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
                  &ldquo;Aqui, resolver é cultura — e inovar{" "}
                  <span className="text-green-accent">é obrigação.&rdquo;</span>
                </h1>
                <p className="mt-6 text-base leading-relaxed text-white/55 sm:text-lg max-w-xl">
                  Da linha de produção ao destino final, a Dutex é a empresa que
                  enxerga o problema antes do cliente — e entrega a solução
                  antes da concorrência.
                </p>
              </div>
              <div className="hidden lg:flex gap-0 border border-green-accent/25 rounded-lg overflow-hidden self-center justify-self-end">
                {["Resolver.", "Inovar.", "Entregar."].map((word, i) => (
                  <div
                    key={word}
                    className={`px-8 py-6 text-center ${i < 2 ? "border-r border-green-accent/20" : ""} bg-primary/25`}
                  >
                    <span className="block text-lg font-bold text-green-accent">
                      {word}
                    </span>
                    <span className="block mt-1 text-[10px] font-semibold tracking-[3px] uppercase text-white/35">
                      Pilar {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* História */}
        <section className="bg-white py-20 lg:py-28">
          <Container>
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
              <div>
                <Badge variant="green" className="mb-5">
                  Nossa História
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
                  Uma empresa nascida da{" "}
                  <span className="text-primary">amizade</span>, da superação e
                  da vontade de criar.
                </h2>
                <div className="mt-8 space-y-4 text-sm leading-relaxed text-gray-text">
                  <p>
                    Tudo começou nos anos 2000, quando{" "}
                    <strong className="text-gray-900">Carlos Garcez</strong>,
                    então representante comercial, conheceu{" "}
                    <strong className="text-gray-900">Oebier dos Santos</strong>
                    , responsável pela homologação de embalagens na Tigre Tubos e
                    Conexões. Muitas viagens, muitas visitas — e uma amizade que
                    virou sociedade.
                  </p>
                  <p>
                    Oebier apresentou seu irmão{" "}
                    <strong className="text-gray-900">
                      Alexandre dos Santos
                    </strong>
                    , e a trinca estava formada. Entre 2008 e 2010, Alexandre
                    firmou residência em Porto Velho para atender obras da
                    Camargo Corrêa no Rio Madeira. Carlos organizava as compras
                    do Sul. Oebier participava das viagens. A ideia de
                    empreender crescia a cada conversa.
                  </p>
                  <p>
                    Em 2010, Carlos recebeu o diagnóstico de linfoma. Dois anos
                    de tratamento. Mas a ideia nunca parou. Numa janta durante o
                    tratamento, Carlos apresentou o projeto ao amigo{" "}
                    <strong className="text-gray-900">Robson</strong>, que se
                    juntou ao grupo como investidor.
                  </p>
                  <p>
                    Em <strong className="text-gray-900">2013</strong>, a Dutex
                    Indústria Plástica nasceu. Em{" "}
                    <strong className="text-gray-900">2018</strong>, Carlos,
                    Alexandre e Oebier adquiriram 100% da empresa — e a história
                    continua.
                  </p>
                </div>

                <blockquote className="mt-8 border-l-4 border-primary bg-gray-light rounded-r-lg p-6">
                  <p className="text-base italic leading-relaxed text-gray-900">
                    &ldquo;Enquanto estava em tratamento, eu pensava: se isso
                    passar, vou construir algo que dure. A Dutex é isso —
                    construída contra todas as probabilidades.&rdquo;
                  </p>
                  <footer className="mt-3 text-sm">
                    <strong className="text-primary">Carlos Garcez</strong>
                    <span className="text-gray-text">
                      {" "}
                      · Co-fundador & Sócio, Dutex Industrial
                    </span>
                  </footer>
                </blockquote>
              </div>

              {/* Timeline */}
              <div>
                <Badge variant="green" className="mb-5">
                  Linha do Tempo
                </Badge>
                <div className="relative pl-7">
                  <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary to-green-accent" />
                  {timeline.map((item, i) => (
                    <div key={item.year} className="relative mb-8 last:mb-0">
                      <div
                        className={`absolute -left-7 top-1 h-4 w-4 rounded-full border-[3px] border-white ${
                          i <= 2
                            ? "bg-primary shadow-[0_0_0_2px_theme(colors.primary)]"
                            : i <= 3
                              ? "bg-green-accent shadow-[0_0_0_2px_theme(colors.green-accent)]"
                              : "bg-yellow-400 shadow-[0_0_0_2px_theme(colors.yellow-400)]"
                        }`}
                      />
                      <p className="text-[10px] font-extrabold tracking-[3px] uppercase text-primary mb-1">
                        {item.year}
                      </p>
                      <h3 className="text-base font-bold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-text">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Cultura / Crenças */}
        <section className="bg-primary py-20 lg:py-28 relative overflow-hidden">
          <Container className="relative z-10">
            <div className="mb-12 lg:mb-16">
              <Badge variant="white" className="mb-5">
                Cultura Dutex 2025
              </Badge>
              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
                O que acreditamos — e como isso{" "}
                <span className="text-green-accent">
                  define cada entrega.
                </span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/50 max-w-xl">
                Oito crenças que não estão num quadro. Estão no chão de fábrica,
                na conversa com o cliente e em cada decisão técnica.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px]">
              {beliefs.map((belief, i) => (
                <div
                  key={belief.title}
                  className="p-6 bg-white/5 border border-white/7 transition-colors hover:bg-green-accent/10"
                >
                  <span className="block text-[2.5rem] leading-none font-bold text-green-accent/20 mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-sm font-bold text-green-accent mb-2">
                    {belief.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-white/50">
                    {belief.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* MVV */}
        <section className="bg-gray-light py-20 lg:py-28">
          <Container>
            <Badge variant="green" className="mb-5">
              Propósito
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-12">
              Missão, Visão & Valores
            </h2>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white border border-gray-border p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
                <ShieldCheck size={32} className="text-primary mb-4" strokeWidth={1.5} />
                <h3 className="text-[10px] font-extrabold tracking-[3px] uppercase text-primary mb-3">
                  Missão
                </h3>
                <p className="text-sm leading-relaxed text-gray-text">
                  Fornecer soluções, produtos e serviços inovadores, enquanto
                  nos comprometemos com a sociedade e o meio ambiente.
                </p>
              </div>

              <div className="bg-white border border-gray-border p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-green-accent" />
                <Eye size={32} className="text-green-accent-dark mb-4" strokeWidth={1.5} />
                <h3 className="text-[10px] font-extrabold tracking-[3px] uppercase text-green-accent-dark mb-3">
                  Visão
                </h3>
                <p className="text-sm leading-relaxed text-gray-text">
                  Ampliar o portfólio de produtos, serviços e projetos para
                  atingir o faturamento planejado, com foco em rentabilidade,
                  sustentabilidade e qualidade de vida no trabalho.
                </p>
              </div>

              <div className="bg-white border border-gray-border p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-400" />
                <Star size={32} className="text-yellow-500 mb-4" strokeWidth={1.5} />
                <h3 className="text-[10px] font-extrabold tracking-[3px] uppercase text-yellow-600 mb-3">
                  Valores
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {values.map((v) => (
                    <span
                      key={v}
                      className="text-xs font-bold px-3 py-1.5 rounded-full bg-gray-light border border-gray-border text-gray-900"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ISO Banner */}
            <div className="mt-5 bg-dark p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex flex-col items-center gap-1 shrink-0">
                <ShieldCheck size={36} className="text-green-accent" />
                <span className="text-[10px] font-extrabold tracking-[2px] uppercase text-green-accent">
                  ISO 9001:2015
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">
                  Política da Qualidade
                </h4>
                <p className="text-xs leading-relaxed text-white/50">
                  A Dutex é comprometida com a sociedade, o meio ambiente e a
                  qualidade de seus produtos e serviços — cumprindo com os
                  requisitos aplicáveis e buscando melhoria contínua em cada
                  processo.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ESG */}
        <section className="bg-dark py-20 lg:py-28 relative overflow-hidden">
          <Container className="relative z-10">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
              <div>
                <Badge variant="green" className="mb-5">
                  ESG & Circularidade
                </Badge>
                <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
                  O aço deles vira solução que protege…{" "}
                  <span className="text-green-accent italic">o aço deles.</span>
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-white/50">
                  A Dutex opera num ciclo fechado com as maiores siderúrgicas do
                  Brasil. Compramos resíduos plásticos deles, transformamos em
                  produtos de proteção e logística, e devolvemos como solução —
                  reduzindo emissões, eliminando aterro e gerando eficiência na
                  cadeia inteira.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  A grande maioria dos nossos produtos logísticos utiliza PP
                  reciclado. Onde a aplicação técnica exige maior resistência ou
                  pureza, utilizamos PP virgem — porque performance e segurança
                  da carga não se negociam.
                </p>
                <div className="mt-6 border-l-[3px] border-green-accent bg-green-accent/5 px-5 py-4 rounded-r">
                  <p className="text-sm leading-relaxed text-white/75 italic">
                    <strong className="text-green-accent not-italic">
                      Circularidade industrial real:
                    </strong>{" "}
                    resíduo do cliente vira matéria-prima Dutex — que vira
                    produto que volta para o cliente.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {esgStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-6 bg-white/[0.03] border border-white/[0.07] border-t-[3px] border-t-green-accent hover:bg-green-accent/5 transition-colors"
                  >
                    <span className="block text-3xl font-bold text-green-accent leading-none mb-2">
                      {stat.value}
                    </span>
                    <h4 className="text-xs font-bold text-white mb-1">
                      {stat.label}
                    </h4>
                    <p className="text-[11px] leading-relaxed text-white/35">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dutex Circular badge */}
            <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-5 bg-green-accent/5 border border-green-accent/20 rounded-lg p-6">
              <Recycle size={40} className="text-green-accent shrink-0" />
              <div>
                <h4 className="text-base font-extrabold text-green-accent">
                  Dutex Circular®
                </h4>
                <p className="text-xs text-white/45">
                  Programa de circularidade industrial em desenvolvimento —
                  relatório oficial com as principais siderúrgicas e indústrias
                  parceiras · 2025
                </p>
              </div>
              <span className="sm:ml-auto shrink-0 px-3 py-1.5 bg-green-accent/10 border border-green-accent/30 rounded-full text-[10px] font-bold tracking-[1.5px] uppercase text-green-accent">
                Em certificação
              </span>
            </div>

            <p className="mt-5 text-[11px] text-white/25">
              * Dados de CO₂ baseados em fatores globais de referência (PP
              virgem ≈ 1,7 tCO₂/t · PP reciclado ≈ 0,5 tCO₂/t). Relatório de
              circularidade com dados auditados em elaboração.
            </p>
          </Container>
        </section>

        {/* Mini Cases */}
        <section className="bg-white py-20 lg:py-28">
          <Container>
            <Badge variant="green" className="mb-5">
              Resultados reais
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-[2.5rem] lg:leading-tight mb-3">
              Engenharia que resolve. Projetos que provam.
            </h2>
            <p className="text-sm text-gray-text max-w-xl mb-12 leading-relaxed">
              Cada projeto começa com um problema real. O resultado é sempre o
              mesmo: menos dano, menos custo, mais confiabilidade operacional.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cases.map((c) => {
                const colors = caseColors[c.color];
                return (
                  <div
                    key={c.tag}
                    className={`bg-gray-light border border-gray-border p-8 border-t-4 ${colors.border}`}
                  >
                    <p
                      className={`text-[10px] font-extrabold tracking-[3px] uppercase mb-5 ${colors.tag}`}
                    >
                      {c.tag}
                    </p>
                    <div className="mb-4">
                      <p className="text-[10px] font-bold tracking-[2px] uppercase text-gray-400 mb-1">
                        Desafio
                      </p>
                      <p className="text-sm leading-relaxed text-gray-900">
                        {c.challenge}
                      </p>
                    </div>
                    <div className="mb-4">
                      <p className="text-[10px] font-bold tracking-[2px] uppercase text-gray-400 mb-1">
                        Solução Dutex
                      </p>
                      <p className="text-sm leading-relaxed text-gray-900">
                        {c.solution}
                      </p>
                    </div>
                    <div className={`${colors.result} rounded-sm p-4`}>
                      <p className="text-[10px] font-bold tracking-[2px] uppercase text-white/55 mb-1">
                        Resultado
                      </p>
                      <p className="text-sm leading-relaxed text-white font-medium">
                        {c.result}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-6 text-xs text-gray-text italic">
              * Cases apresentados de forma anônima por política de
              confidencialidade com clientes.
            </p>
          </Container>
        </section>

        {/* CTA */}
        <section className="bg-primary py-20 lg:py-24 relative overflow-hidden">
          <Container className="relative z-10">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <Badge variant="white" className="mb-5">
                  Próximo passo
                </Badge>
                <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
                  Tem um desafio na sua
                  <br />
                  operação industrial?
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/55 max-w-md">
                  Nossa engenharia avalia sua aplicação e propõe a solução
                  técnica ideal — sem custo, sem compromisso.
                </p>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <Button
                  variant="primary"
                  size="lg"
                  href="mailto:comercial@dutex.ind.br"
                  className="bg-green-accent text-dark hover:bg-green-accent-dark font-extrabold"
                >
                  Solicitar diagnóstico técnico
                  <ArrowRight size={16} />
                </Button>
                <Button variant="outline" size="lg" href="https://wa.me/5547991214911?text=Olá%20Dutex%2C%20gostaria%20de%20um%20diagnóstico%20técnico">
                  Falar com o comercial
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

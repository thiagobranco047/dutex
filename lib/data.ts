export interface NavLink {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface SolutionCard {
  number: string;
  title: string;
  description: string;
  image: string;
}

export interface DifferentialItem {
  title: string;
  subtitle?: string;
  icon: string;
}

export interface ApplicationItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  steps: string[];
  result: string;
  image: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

export const navLinks: NavLink[] = [
  { label: "Início", href: "/#home" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Soluções", href: "/#solucoes" },
  { label: "Por que Dutex?", href: "/#diferenciais" },
  { label: "Aplicações", href: "/#aplicacoes" },
  { label: "Processo", href: "/#processo" },
  { label: "Depoimentos", href: "/#depoimentos" },
  { label: "Contato", href: "/#contato" },
];

export const stats: StatItem[] = [
  { value: "12+", label: "anos de atuação" },
  { value: "1500+", label: "aplicações técnicas" },
  { value: "10/10", label: "satisfação dos clientes" },
  { value: "100%", label: "de confiabilidade operacional" },
];

export const solutions: SolutionCard[] = [
  {
    number: "01",
    title: "Transformação de Aço",
    description:
      "Aço transformado com precisão industrial — bobinas, chapas sob medida, slitter e blanks em ZC, FF e FQ com espessuras até 40mm. Matéria-prima pronta para sua produção.",
    image: "/images/solution-metalica.jpg",
  },
  {
    number: "02",
    title: "Plásticos de Engenharia",
    description:
      "Componentes industriais em PP virgem ou reciclado por injeção (240 a 650ton) e extrusão. Cantoneiras, separadores e protetores com alta absorção de impacto.",
    image: "/images/solution-plastica.jpg",
  },
  {
    number: "03",
    title: "Proteção e Logística",
    description:
      "Berços para bobinas de 3 a 20 toneladas, luvas, colarinhos, protetores emborrachados e colmeias. Proteção da linha de produção até o destino final.",
    image: "/images/solution-sobmedida.jpg",
  },
];

export const differentials: DifferentialItem[] = [
  {
    title: "Engenharia aplicada à operação",
    subtitle: "Não é produto de prateleira. Cada solução é projetada para a realidade do cliente.",
    icon: "CheckCircle",
  },
  {
    title: "Produção integrada aço + plástico",
    subtitle: "Verticalização completa: materiais, engenharia, operação e logística em uma única empresa.",
    icon: "CheckCircle",
  },
  {
    title: "Rastreabilidade e controle",
    subtitle: "Controle dimensional em cada lote com certificação ISO 9001:2015.",
    icon: "CheckCircle",
  },
  {
    title: "Fabricação 100% própria",
    subtitle: "Injeção plástica, extrusão em PP e caldeiraria metálica — sem depender de terceiros.",
    icon: "CheckCircle",
  },
];

export const applications: ApplicationItem[] = [
  {
    id: "01",
    badge: "Siderurgia",
    title: "Líder do setor siderúrgico",
    subtitle: "Cantoneira plástica co-extrusada",
    description:
      "Um grande player da siderurgia nacional procurou a Dutex buscando solução de proteção para materiais metálicos. Trouxe uma referência e perguntou se seria possível desenvolver algo semelhante.",
    steps: [
      "Análise técnica do produto de referência",
      "Desenvolvimento de ferramentas de extrusão",
      "Adaptação do processo de co-extrusão com TNT",
    ],
    result:
      "O resultado foi a cantoneira plástica co-extrusada com TNT hoje utilizada nas operações de vários clientes. Esse projeto abriu caminho para toda a linha de produtos logísticos da Dutex.",
    image: "/images/applications-placeholder.jpg",
  },
  {
    id: "02",
    badge: "Indústria",
    title: "Grande player industrial",
    subtitle: "Verticalização de produto importado",
    description:
      "Uma indústria utilizava um componente importado da Coreia. Trouxe uma amostra e perguntou se seria possível fabricar o produto no Brasil.",
    steps: [
      "Engenharia reversa do produto importado",
      "Desenvolvimento de ferramentas de produção próprias",
      "Industrialização e produção nacional do componente",
    ],
    result:
      "A Dutex verticalizou a produção nacional desse componente, eliminando a dependência de importação e reduzindo custos e prazo de entrega.",
    image: "/images/applications-placeholder.jpg",
  },
  {
    id: "03",
    badge: "Energia renovável",
    title: "Setor de energia solar",
    subtitle: "Perfil especial em PP para energia solar",
    description:
      "Uma empresa do setor de energia solar apresentou um perfil encontrado na Europa para sinalização e proteção de cabos em usinas solares. Perguntou se a Dutex conseguia desenvolver no Brasil.",
    steps: [
      "Desenvolvimento da engenharia e desenho técnico",
      "Ferramentas de extrusão desenvolvidas internamente",
      "Produção industrial do componente",
    ],
    result:
      "O produto passou a ser utilizado em projetos de geração de energia solar no Brasil.",
    image: "/images/applications-placeholder.jpg",
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Diagnóstico técnico",
    description:
      "Análise detalhada da aplicação, tipo de carga, ambiente operacional e riscos envolvidos no transporte, manuseio e armazenamento.",
  },
  {
    number: "02",
    title: "Engenharia e projeto",
    description:
      "Engenharia reversa ou desenvolvimento do zero — definição de materiais, geometrias e ferramentas de produção conforme a necessidade da operação.",
  },
  {
    number: "03",
    title: "Produção e validação",
    description:
      "Fabricação, testes funcionais e entrega com controle de qualidade, rastreabilidade e conformidade com os padrões industriais.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Os berços da Dutex reduziram significativamente as avarias no transporte de bobinas. A engenharia aplicada à nossa operação fez toda a diferença — não é produto de prateleira.",
    author: "Carlos Mendes",
    role: "Gerente de Logística",
    company: "Centro de Serviço de Aço",
  },
  {
    quote:
      "Trouxemos uma amostra de um componente importado e a Dutex verticalizou a produção nacional. Eliminamos a dependência de importação e reduzimos custos e prazo de entrega.",
    author: "Fernanda Oliveira",
    role: "Engenharia de Processos",
    company: "Indústria Metalmecânica",
  },
  {
    quote:
      "A integração aço e plástico em um único fornecedor simplificou toda a nossa cadeia. Rastreabilidade, controle dimensional e entrega no prazo — a Dutex entrega o que promete.",
    author: "Rafael Costa",
    role: "Coordenador de Suprimentos",
    company: "Implementos Rodoviários",
  },
];

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Empresa",
    links: [
      { label: "Início", href: "/#home" },
      { label: "Sobre", href: "/#sobre" },
      { label: "Soluções", href: "/#solucoes" },
      { label: "Aplicações", href: "/#aplicacoes" },
      { label: "Contato", href: "/#contato" },
    ],
  },
  {
    title: "Siga-nos",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "YouTube", href: "https://youtube.com" },
    ],
  },
  {
    title: "Fale com a Dutex",
    links: [
      { label: "Fale com um especialista", href: "/#contato" },
      { label: "Canal de Compliance", href: "mailto:compliance@dutex.com.br" },
      { label: "LGPD / Privacidade", href: "mailto:privacidade@dutex.com.br" },
    ],
  },
];

export const contactInfo = {
  email: "comercial@dutex.ind.br",
  phone: "(47) 3439-1111",
  whatsapp: "99121-4911",
  address: "Garuva – SC",
  channels: [
    {
      label: "Compliance",
      value: "compliance@dutex.com.br | +55 47 9168-9143",
    },
    { label: "Canal de Denúncias", value: "denuncia@dutex.com.br" },
    { label: "LGPD/Privacidade", value: "privacidade@dutex.com.br" },
    { label: "Trabalhe Conosco", value: "Envie seu currículo" },
  ],
};

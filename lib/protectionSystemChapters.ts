export interface ProtectionChapter {
  id: string;
  /** Tempo em segundos — alinhado ao corte do vídeo */
  startTime: number;
  title: string;
  description: string;
}

export const protectionChapters: ProtectionChapter[] = [
  {
    id: "00",
    startTime: 0,
    title: "Abertura",
    description:
      "Introdução à linha de proteção Dutex: visão geral do vídeo, transição entre cenários 3D e o que você verá em seguida — da linha metálica à linha plástica, componente a componente.",
  },
  {
    id: "01",
    startTime: 12,
    title: "Linha Metálica",
    description:
      "Família de componentes em aço para berços, reforços e proteção estrutural da bobina: alta rigidez, padronização Dutex e compatibilidade com amarração e movimentação em ambientes industriais exigentes.",
  },
  {
    id: "02",
    startTime: 14,
    title: "Cantoneira Plástica 70×40 mm",
    description:
      "Perfil em polímero nas dimensões 70×40 mm para amortecer impactos e preservar bordas externas durante transporte e estocagem, sem marcar ou contaminar o material enrolado.",
  },
  {
    id: "03",
    startTime: 24,
    title: "Chapa metálica",
    description:
      "Elemento plano de aço que reforça zonas de apoio ou fechamento, distribuindo cargas pontuais e contribuindo para a estabilidade geométrica do conjunto na bobina.",
  },
  {
    id: "04",
    startTime: 30,
    title: "Cantoneira plissada metálica",
    description:
      "Cantoneira em chapa com pregas que elevam o momento de inércia e a resistência a torção: proteção de quinas com menos peso morto e melhor aproveitamento de aço.",
  },
  {
    id: "05",
    startTime: 38,
    title: "Luva em aço",
    description:
      "Manga metálica que envolve trechos sensíveis do núcleo ou do eixo efetivo, reduzindo risco de amassamento, desgaste por atrito e contaminação no manuseio com equipamentos.",
  },
  {
    id: "06",
    startTime: 49,
    title: "Protetor tubular",
    description:
      "Componente tubular que circunda ou apoia a periferia da bobina, evitando deformações locais e oferecendo uma superfície de contenção contínua durante rolamento e fixação.",
  },
  {
    id: "07",
    startTime: 60,
    title: "Linha Plástica",
    description:
      "Conjunto de soluções em polímeros de engenharia para absorção de impacto, vedação leve e proteção superficial — complementar à linha metálica na mesma filosofia de projeto Dutex.",
  },
  {
    id: "08",
    startTime: 63,
    title: "Cantoneira Plástica 70×40 mm",
    description:
      "Reforço de borda no formato 70×40 mm aplicado em nova configuração no vídeo: encaixe pensado para diferentes diâmetros e alturas de pacote, mantendo o mesmo perfil de proteção elastomérica.",
  },
  {
    id: "09",
    startTime: 72,
    title: "Manta de espuma",
    description:
      "Camada de espuma técnica que uniformiza pressões de contato, absorve vibrações em transporte e protege acabamentos sensíveis da fita ou metais nobres contra micro-avarias.",
  },
  {
    id: "10",
    startTime: 78,
    title: "Cantoneira Plástica 135×70 mm",
    description:
      "Perfil maior (135×70 mm) para vãos e raios maiores: cobre uma faixa mais ampla da lateral da bobina, ideal quando o empacotamento exige maior área de distribuição de impacto.",
  },
  {
    id: "11",
    startTime: 87,
    title: "Anel cartola",
    description:
      "Anel com geometria característica de ‘cartola’ para proteger faces ou colares da bobina, centralizar esforços e facilitar alinhamento com cintas, tampas ou dispositivos de içamento.",
  },
  {
    id: "12",
    startTime: 105,
    title: "Berço individual",
    description:
      "Suporte dedicado à bobina isoladamente: posicionamento estável, menor risco de contato bobina a bobina e operação mais segura na carga, descarga e empilhamento controlado.",
  },
];

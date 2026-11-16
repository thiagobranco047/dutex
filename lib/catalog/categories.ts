import type { Category, CategoryId } from "./types.ts";

export const categories: readonly Category[] = [
  {
    id: "protecao-de-bobinas",
    order: 1,
    name: {
      pt: "Proteção de bobinas",
      en: "Coil protection",
      es: "Protección de bobinas",
    },
    description: {
      pt: "Luvas, anéis, colarinhos, protetores e berços que preservam bordas, núcleo e camadas externas de bobinas no transporte, manuseio e armazenagem.",
      en: "Sleeves, rings, collars, protectors and cradles that preserve the edges, core and outer wraps of coils during transport, handling and storage.",
      es: "Camisas, anillos, collarines, protectores y cunas que preservan bordes, núcleo y capas externas de bobinas en transporte, manipulación y almacenamiento.",
    },
  },
  {
    id: "protecao-de-bordas",
    order: 2,
    name: {
      pt: "Proteção de bordas e cantos",
      en: "Edge and corner protection",
      es: "Protección de bordes y esquinas",
    },
    description: {
      pt: "Cantoneiras plásticas e metálicas e chapas para embalagem que protegem arestas, distribuem a pressão das cintas e estabilizam a carga.",
      en: "Plastic and steel edge protectors and packaging sheets that shield edges, spread strapping pressure and stabilize the load.",
      es: "Cantoneras plásticas y metálicas y chapas para embalaje que protegen aristas, distribuyen la presión de los flejes y estabilizan la carga.",
    },
  },
  {
    id: "embalagem-e-paletizacao",
    order: 3,
    name: {
      pt: "Embalagem e paletização",
      en: "Packaging and palletizing",
      es: "Embalaje y paletizado",
    },
    description: {
      pt: "Colmeias, tabuleiros, placas, mantas, estrados e paletes para separar, organizar e movimentar produtos industriais.",
      en: "Honeycomb dividers, layer pads, sheets, mats, skids and pallets to separate, organize and move industrial goods.",
      es: "Colmenas, tableros, placas, mantas, estrados y palés para separar, organizar y mover productos industriales.",
    },
  },
  {
    id: "infraestrutura-de-cabos",
    order: 4,
    name: {
      pt: "Infraestrutura de cabos",
      en: "Cable infrastructure",
      es: "Infraestructura de cables",
    },
    description: {
      pt: "Dutos corrugados em PEAD e placas de proteção mecânica para cabos de energia, telecomunicações e fibra óptica.",
      en: "HDPE corrugated ducts and mechanical protection boards for power, telecom and fiber optic cables.",
      es: "Ductos corrugados de PEAD y placas de protección mecánica para cables de energía, telecomunicaciones y fibra óptica.",
    },
  },
  {
    id: "transformacao-de-aco",
    order: 5,
    name: {
      pt: "Transformação de aço",
      en: "Steel processing",
      es: "Transformación de acero",
    },
    description: {
      pt: "Chapas e blanks cortados sob medida, prontos para a sua produção.",
      en: "Sheets and blanks cut to size, ready for your production.",
      es: "Chapas y blanks cortados a medida, listos para su producción.",
    },
  },
];

export const categoryIds = categories.map((category) => category.id) as readonly CategoryId[];

export function getCategory(id: string) {
  return categories.find((category) => category.id === id) ?? null;
}

// Modelo do catálogo Dutex: Categoria (aplicação) -> Produto (família, uma página) -> Configuração.
// Fontes: desenhos técnicos (E:\work\dutex\materiais\fichas tecnicas), apresentação comercial
// "DUTEX INDUSTRIA" e instruções de fabricação. Campo ausente na fonte fica null; nada é inventado.
// Inventário, decisões e pendências: docs/catalogo-estrutura.md e lib/catalog/audit.ts.

import type { Locale } from "@/i18n/routing";

export type { Locale };

/** Texto por idioma. en/es ficam null até a tradução; a página cai no pt e recebe noindex. */
export type LocalizedText = { pt: string; en: string | null; es: string | null };

export type CategoryId =
  | "protecao-de-bobinas"
  | "protecao-de-bordas"
  | "embalagem-e-paletizacao"
  | "infraestrutura-de-cabos"
  | "transformacao-de-aco";

export type MaterialId =
  | "aco-carbono"
  | "aco-zincado"
  | "aco-galvanizado"
  | "pp"
  | "pead"
  | "polionda"
  | "plastico-de-engenharia"
  | "borracha"
  | "poliuretano"
  | "manta-magnetica";

export type ProcessId =
  | "caldeiraria"
  | "conformacao"
  | "corte"
  | "extrusao"
  | "injecao"
  | "rotomoldagem"
  | "estampagem"
  | "usinagem-cnc";

export type Category = {
  id: CategoryId;
  name: LocalizedText;
  description: LocalizedText;
  order: number;
};

export type ProductImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Arquivo de origem na pasta de materiais, para rastreabilidade. */
  source: string;
};

export type Weight = {
  /** Valor como aparece na fonte. */
  raw: string;
  value: number | null;
  unit: "kg" | "g" | "kg/m" | "g/m";
  /** A que o peso se refere. */
  basis: "peca" | "metro" | "bobina";
};

/** Chaves de especificação extra. Os rótulos ficam em messages/{locale}/catalog.json (catalog.specs). */
export type SpecKey =
  | "diametroNominal"
  | "resistenciaCompressao"
  | "pesoBobina"
  | "comprimentoBobina"
  | "acabamento"
  | "opcoes";

/**
 * Linha da tabela de configurações: medida já produzida, mostrada como referência.
 * O código interno nunca é renderizado (ver teste em scripts/catalog-check.mts).
 */
export type Configuration = {
  id: string;
  label: string;
  dimensions: string | null;
  thickness: string | null;
  length: string | null;
  material: string | null;
  weight: Weight | null;
  specs: Partial<Record<SpecKey, string>>;
  /** Código do desenho técnico. Uso interno, não vai para o HTML. */
  internalCode: string | null;
  /** Arquivo de origem do dado. */
  sourceFile: string | null;
};

export type ProductStatus = "publicado" | "rascunho";

export type ProductInput = {
  slug: string;
  categoryId: CategoryId;
  /** Outras aplicações em que o produto aparece no filtro, além da categoria principal. */
  alsoIn: readonly CategoryId[];
  materials: readonly MaterialId[];
  processes: readonly ProcessId[];
  name: LocalizedText;
  /** Uma frase para card e meta description. */
  summary: LocalizedText;
  description: LocalizedText | null;
  features: readonly LocalizedText[];
  uses: readonly LocalizedText[];
  /** Fabricado conforme projeto do cliente. */
  customizable: boolean;
  configurations: readonly Configuration[];
  status: ProductStatus;
  /** Documentos de onde vieram os dados do produto. */
  sources: readonly string[];
  /** IDs de pendências em audit.ts que afetam o produto. */
  auditIds: readonly string[];
};

export type Product = ProductInput & {
  order: number;
  images: readonly ProductImage[];
  /** Caminho público da ficha técnica para download (pode ainda não existir). */
  datasheetPath: string;
  /** Tradução revisada pela Dutex. Sem revisão, a página no idioma recebe noindex. */
  translationReviewed: { en: boolean; es: boolean };
};

export type AuditStatus = "aberto" | "resolvido";

export type AuditKind =
  | "codigo-duplicado"
  | "divergencia-de-dado"
  | "dado-ausente"
  | "decisao-comercial"
  | "imagem"
  | "publicacao";

export type AuditItem = {
  id: string;
  kind: AuditKind;
  status: AuditStatus;
  title: string;
  /** O que foi encontrado, transcrito das fontes. */
  finding: string;
  /** Pergunta para a Dutex; null quando não há o que perguntar. */
  question: string | null;
  /** Como foi resolvido; null enquanto aberto. */
  resolution: string | null;
  /** Impede publicar os produtos afetados enquanto estiver aberto. */
  blocksPublication: boolean;
  products: readonly string[];
  sources: readonly string[];
};

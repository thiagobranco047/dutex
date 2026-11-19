import type { Configuration, LocalizedText, ProductInput, SpecKey, Weight } from "./types.ts";

/** Texto só em português por enquanto. en/es entram quando houver tradução revisada. */
export function pt(text: string): LocalizedText {
  return { pt: text, en: null, es: null };
}

export function weight(raw: string, value: number | null, unit: Weight["unit"], basis: Weight["basis"] = "peca"): Weight {
  return { raw, value, unit, basis };
}

type ConfigurationDraft = Pick<Configuration, "id" | "label"> & Partial<Omit<Configuration, "specs">> & {
  specs?: Partial<Record<SpecKey, string>>;
};

export function config(draft: ConfigurationDraft): Configuration {
  return {
    dimensions: null,
    thickness: null,
    length: null,
    material: null,
    weight: null,
    weightByThickness: null,
    hidden: false,
    internalCode: null,
    sourceFile: null,
    ...draft,
    specs: draft.specs ?? {},
  };
}

type ProductDraft = Pick<ProductInput, "slug" | "categoryId" | "name" | "summary"> & Partial<ProductInput>;

export function product(draft: ProductDraft): ProductInput {
  return {
    alsoIn: [],
    materials: [],
    processes: [],
    description: null,
    features: [],
    uses: [],
    customizable: true,
    configurations: [],
    tableNote: null,
    quoteFields: [],
    sizesKind: "fabricadas",
    status: "rascunho",
    sources: [],
    auditIds: [],
    ...draft,
  };
}

// Gera docs/catalogo-auditoria.md a partir de lib/catalog/audit.ts. Rodar: npm run catalog:report
import fs from "node:fs";
import path from "node:path";
import { allProducts } from "../lib/catalog/index.ts";
import { auditItems } from "../lib/catalog/audit.ts";
import type { AuditKind } from "../lib/catalog/types.ts";

const root = path.resolve(import.meta.dirname, "..");
const kinds: Record<AuditKind, string> = {
  "decisao-comercial": "Decisões comerciais",
  publicacao: "Publicação",
  "codigo-duplicado": "Códigos duplicados ou inconsistentes",
  "divergencia-de-dado": "Divergências de dados",
  "dado-ausente": "Dados ausentes",
  imagem: "Imagens",
};
const name = (slug: string) => allProducts.find((product) => product.slug === slug)?.name.pt ?? slug;
const open = auditItems.filter((item) => item.status === "aberto");

const lines: string[] = [
  "# Catálogo Dutex: auditoria",
  "",
  "Gerado por `npm run catalog:report` a partir de `lib/catalog/audit.ts`. Não edite à mão.",
  "",
  `- Produtos: ${allProducts.length} (${allProducts.filter((p) => p.status === "publicado").length} publicados, ${allProducts.filter((p) => p.status !== "publicado").length} em rascunho)`,
  `- Pendências abertas: ${open.length} (${open.filter((item) => item.blocksPublication).length} bloqueiam publicação)`,
  `- Produtos sem imagem: ${allProducts.filter((p) => p.images.length === 0).map((p) => p.name.pt).join(", ") || "nenhum"}`,
  "",
  "## Perguntas para a Dutex",
  "",
  ...open.filter((item) => item.question).map((item, index) => `${index + 1}. ${item.blocksPublication ? "**[bloqueia]** " : ""}${item.question} _(${item.id})_`),
  "",
];

for (const [kind, title] of Object.entries(kinds)) {
  const items = auditItems.filter((item) => item.kind === kind);
  if (!items.length) continue;
  lines.push(`## ${title}`, "");
  for (const item of items) {
    lines.push(`### ${item.title}`, "");
    lines.push(`- Status: ${item.status}${item.blocksPublication ? " (bloqueia publicação)" : ""}`);
    if (item.products.length) lines.push(`- Produtos: ${item.products.map(name).join(", ")}`);
    lines.push(`- Encontrado: ${item.finding}`);
    if (item.question) lines.push(`- Pergunta: ${item.question}`);
    if (item.resolution) lines.push(`- Resolução: ${item.resolution}`);
    if (item.sources.length) lines.push(`- Fontes: ${item.sources.map((source) => `\`${source}\``).join("; ")}`);
    lines.push("");
  }
}

fs.writeFileSync(path.join(root, "docs/catalogo-auditoria.md"), lines.join("\n"));
console.log(`docs/catalogo-auditoria.md: ${auditItems.length} itens, ${open.length} abertos`);

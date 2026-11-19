import type { QuoteField } from "@/lib/catalog/types";

/** Acrescenta à mensagem do WhatsApp os campos que o cliente deve completar (ex.: "Espessura: "). */
export function withQuoteFields(message: string, fields: readonly QuoteField[], label: (field: QuoteField) => string) {
  if (fields.length === 0) return message;
  return `${message}\n\n${fields.map((field) => `${label(field)}: `).join("\n")}`;
}

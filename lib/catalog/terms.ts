// Tradução dos termos das tabelas de medidas (rótulos, materiais, opções e pesos),
// que em products.ts ficam em português. Frases mais longas primeiro.
// No inglês, a vírgula decimal vira ponto (2,5 mm -> 2.5 mm). No espanhol, mantém a vírgula.

import type { Locale } from "./types.ts";

type Term = [pt: string, en: string, es: string];

const terms: Term[] = [
  ["Carga estática 5000 kg; dinâmica 1500 kg; em porta-palete 1500 kg", "Static load 5000 kg; dynamic 1500 kg; on pallet racking 1500 kg", "Carga estática 5000 kg; dinámica 1500 kg; en rack de pallets 1500 kg"],
  ["Com TNT azul 95 mm ou sem TNT", "With 95 mm blue nonwoven or without nonwoven", "Con TNT azul de 95 mm o sin TNT"],
  ["200, 224 e 240 mm de largura", "200, 224 and 240 mm wide", "200, 224 y 240 mm de ancho"],
  ["esquerda/direita", "left/right", "izquierda/derecha"],
  ["Plástico de engenharia", "Engineering plastic", "Plástico de ingeniería"],
  ["Modelo adesivo", "Adhesive model", "Modelo adhesivo"],
  ["modelo adesivo", "adhesive model", "modelo adhesivo"],
  ["Modelo padrão", "Standard model", "Modelo estándar"],
  ["Para bobina de", "For coil size", "Para bobina de"],
  ["PP copolímero", "PP copolymer", "PP copolímero"],
  ["Polipropileno", "Polypropylene", "Polipropileno"],
  ["Polionda", "Corrugated PP", "Plancha alveolar"],
  ["Chapa ZC", "ZC sheet", "Chapa ZC"],
  ["de largura", "wide", "de ancho"],
  ["rolo de", "roll of", "rollo de"],
  ["com guia", "with guide", "con guía"],
  ["Com guia", "With guide", "Con guía"],
  ["Ø ext.", "OD", "Ø ext."],
  ["Ø int.", "ID", "Ø int."],
  ["Dreno", "Drain", "Dren"],
  ["PEAD", "HDPE", "PEAD"],
  ["Aço", "Steel", "Acero"],
  ["aprox.", "approx.", "aprox."],
  ["kg/pç", "kg/pc", "kg/pza"],
];

/** Traduz um texto de tabela. Sem termo correspondente, o texto fica como está. */
export function localizeTerm(text: string | null, locale: Locale): string | null {
  if (text === null || locale === "pt") return text;
  const column = locale === "en" ? 1 : 2;
  let result = text;
  for (const term of terms) result = result.split(term[0]).join(term[column]);
  // Faixas "2015 a 3285 mm"
  result = result.replace(/(\d) a (\d)/g, locale === "en" ? "$1 to $2" : "$1 a $2");
  if (locale === "en") result = result.replace(/(\d),(\d)/g, "$1.$2");
  return result;
}

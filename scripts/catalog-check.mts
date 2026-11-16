// Testes de integridade do catálogo. Rodar: npm run catalog:check
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { allProducts, categories } from "../lib/catalog/index.ts";
import { auditItems } from "../lib/catalog/audit.ts";
import { productImages } from "../lib/catalog/product-images.ts";
import { productInputs } from "../lib/catalog/products.ts";
import { productTranslations } from "../lib/catalog/translations.ts";
import { localizeTerm } from "../lib/catalog/terms.ts";

const root = path.resolve(import.meta.dirname, "..");
const categoryIds = new Set(categories.map((category) => category.id));

test("slugs de produto são únicos", () => {
  const slugs = allProducts.map((product) => product.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});

test("produtos apontam para categorias existentes", () => {
  for (const product of allProducts) {
    assert.ok(categoryIds.has(product.categoryId), `${product.slug}: categoria ${product.categoryId}`);
    for (const extra of product.alsoIn) assert.ok(categoryIds.has(extra), `${product.slug}: alsoIn ${extra}`);
  }
});

test("toda categoria tem ao menos um produto", () => {
  for (const category of categories) {
    assert.ok(allProducts.some((product) => product.categoryId === category.id), category.id);
  }
});

test("configurações têm id único no produto e arquivo de origem", () => {
  for (const product of allProducts) {
    const ids = product.configurations.map((item) => item.id);
    assert.equal(new Set(ids).size, ids.length, `${product.slug}: ids repetidos`);
    for (const item of product.configurations) assert.ok(item.sourceFile, `${product.slug}/${item.id}: sem sourceFile`);
  }
});

test("pendências citadas nos produtos existem em audit.ts", () => {
  const ids = new Set(auditItems.map((item) => item.id));
  for (const product of allProducts) {
    for (const id of product.auditIds) assert.ok(ids.has(id), `${product.slug}: pendência ${id} não existe`);
  }
  for (const item of auditItems) {
    for (const slug of item.products) {
      assert.ok(allProducts.some((product) => product.slug === slug), `${item.id}: produto ${slug} não existe`);
    }
  }
});

test("nenhum produto publicado tem pendência bloqueante aberta", () => {
  for (const product of allProducts.filter((item) => item.status === "publicado")) {
    const blocking = auditItems.filter((item) => item.status === "aberto" && item.blocksPublication && item.products.includes(product.slug));
    assert.deepEqual(blocking.map((item) => item.id), [], `${product.slug} publicado com pendência bloqueante`);
  }
});

test("imagens do manifesto existem em public/", () => {
  for (const [slug, images] of Object.entries(productImages)) {
    assert.ok(allProducts.some((product) => product.slug === slug), `imagens de produto inexistente: ${slug}`);
    for (const image of images) assert.ok(fs.existsSync(path.join(root, "public", image.src)), image.src);
  }
});

test("textos não usam travessão", () => {
  const files = ["lib/catalog/products.ts", "lib/catalog/categories.ts", "lib/catalog/translations.ts", "lib/catalog/terms.ts", "messages/pt/catalog.json", "messages/en/catalog.json", "messages/es/catalog.json"];
  for (const file of files) {
    const text = fs.readFileSync(path.join(root, file), "utf8");
    assert.ok(!/[\u2013\u2014]/.test(text), `${file} contém travessão`);
  }
});

test("chaves de mensagens do catálogo iguais nos três idiomas", () => {
  const keys = (value: unknown, prefix = ""): string[] =>
    value && typeof value === "object"
      ? Object.entries(value).flatMap(([key, child]) => keys(child, prefix ? `${prefix}.${key}` : key))
      : [prefix];
  const read = (locale: string) => keys(JSON.parse(fs.readFileSync(path.join(root, `messages/${locale}/catalog.json`), "utf8"))).sort();
  assert.deepEqual(read("en"), read("pt"));
  assert.deepEqual(read("es"), read("pt"));
});

test("código interno e nomes de cliente não aparecem nos textos públicos", () => {
  const forbidden = /ZEN S\.?A|CSN|Saeko|Mantex|REF\.\s?\d/i;
  for (const product of allProducts) {
    const texts = [
      product.name.pt,
      product.summary.pt,
      product.description?.pt ?? "",
      ...product.features.map((item) => item.pt),
      ...product.uses.map((item) => item.pt),
      ...product.configurations.flatMap((item) => [item.label, item.dimensions ?? "", item.material ?? "", ...Object.values(item.specs)]),
    ];
    for (const text of texts) {
      assert.ok(!forbidden.test(text), `${product.slug}: "${text}"`);
      for (const item of product.configurations) {
        if (item.internalCode) assert.ok(!text.includes(item.internalCode), `${product.slug}: código interno em "${text}"`);
      }
    }
  }
});

test("todo produto tem tradução en/es com a mesma estrutura do português", () => {
  for (const input of productInputs) {
    const tr = productTranslations[input.slug];
    assert.ok(tr, `${input.slug}: sem tradução`);
    assert.equal(Boolean(tr.description), Boolean(input.description), `${input.slug}: descrição`);
    assert.equal(tr.features?.length ?? 0, input.features.length, `${input.slug}: características`);
    assert.equal(tr.uses?.length ?? 0, input.uses.length, `${input.slug}: aplicações`);
  }
  for (const slug of Object.keys(productTranslations)) {
    assert.ok(productInputs.some((input) => input.slug === slug), `tradução de produto inexistente: ${slug}`);
  }
});

test("termos das tabelas em inglês usam ponto decimal", () => {
  for (const product of allProducts) {
    for (const item of product.configurations) {
      const texts = [item.label, item.dimensions, item.thickness, item.length, item.material, item.weight?.raw ?? null, ...Object.values(item.specs)];
      for (const text of texts) {
        const en = localizeTerm(text ?? null, "en");
        if (en) assert.ok(!/\d,\d/.test(en), `${product.slug}: "${en}"`);
      }
    }
  }
});

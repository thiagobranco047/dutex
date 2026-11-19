# Dutex: site institucional e catálogo

Site da Dutex Industrial (Garuva, SC), desenvolvido pela Lab. 334 Marketing.
Responda em português do Brasil. Escreva "Lab. 334", nunca "LAB334".

## Stack

- Next.js 15 (App Router), React 19, TypeScript strict
- Tailwind CSS v4 (tokens em `app/globals.css`: `primary`, `dark`, `green-accent`, `gray-text`...)
- next-intl com `pt` (padrão, sem prefixo), `en` e `es` (`localePrefix: "as-needed"`)
- lucide-react (ícones), Lenis (scroll suave)
- Formulários: Web3Forms (`NEXT_PUBLIC_WEB3FORMS_KEY`)
- GitHub: `thiagobranco047/dutex`. Deploy na Vercel.

## Estrutura

- `app/[locale]/`: páginas (home, sobre, compliance, dutex-conecta, produtos)
- `components/ui`, `components/layout`, `components/sections`, `components/catalog`
- `lib/data.ts`: navegação, rodapé, contatos. `lib/seo.ts`: URLs, canonical e hreflang.
- `messages/{pt,en,es}/*.json`: textos de interface, registrados em `i18n/request.ts`.

## Catálogo de produtos

- Leia antes de mexer: `docs/catalogo-estrutura.md` (decisões), `docs/catalogo-auditoria.md` (pendências, gerado) e `docs/catalogo-glossario.md` (termos pt/en/es).
- Dados em `lib/catalog/`: `products.ts` (português, fonte), `translations.ts` (en/es), `terms.ts` (termos das tabelas), `categories.ts`, `audit.ts` (pendências), `product-images.ts` (gerado).
- Modelo: Categoria (aplicação) -> Produto (uma página) -> Configuração (linha da tabela de medidas).
- Rotas: `/produtos`, `/produtos/[categoria]`, `/produtos/[categoria]/[produto]`, estáticas.
- Todos os produtos estão em `"rascunho"`: aparecem em dev e com `CATALOG_SHOW_DRAFTS=true` (Preview da Vercel). Para publicar, resolva as pendências bloqueantes em `audit.ts` e troque o status.
- Páginas em en/es só são indexadas com `reviewed: true` em `translations.ts`.
- Ficha técnica: botão com formulário em todo produto. PDF público em `public/fichas-tecnicas/{slug}.pdf`; sem o arquivo, o pedido vai por e-mail para o comercial.
- Imagens: `public/images/produtos/{slug}/NN.webp`, geradas por `scripts/catalog-images.py` a partir de `E:\work\dutex\materiais`. Para trocar uma foto, edite o mapeamento no script e rode `npm run catalog:images`. Renders do Figma (página Produtos) entram na frente das fotos quando salvos em `E:\work\dutex\materiais\_site-catalogo\renders\{slug}\render-NN.png`; no Figma, só os quadros nomeados `{slug}/render-NN` têm exportação ligada.
- Linha de aço (submarca "Dutex aços e perfis"): categoria `acos-e-perfis`. Briefing em `E:\work\dutex\materiais\02_Produtos\Aços e perfis\`. Regra do briefing: nenhum dado técnico entra sem validação da engenharia da Dutex, e os perfis não vão ao ar antes do lançamento.
- Imports relativos em `lib/catalog` usam extensão `.ts` (os scripts rodam direto no Node).

## Comandos

- `npm run dev`, `npm run build`, `npm run typecheck`
- `npm run catalog:check`: testes de integridade do catálogo. Rode após qualquer mudança em `lib/catalog` ou `messages/*/catalog.json`.
- `npm run catalog:report`: regenera `docs/catalogo-auditoria.md`.
- `npm run catalog:images`: regenera as imagens dos produtos.

## Regras

- Nunca use travessão (– ou —): só hífen comum. O teste do catálogo verifica.
- Não invente dados, métricas, números, normas ou resultados. Campo sem fonte fica `null` e vira pendência em `audit.ts`.
- Não publique nomes de clientes, referências de clientes nem códigos internos de desenho (`internalCode` nunca é renderizado).
- Os desenhos técnicos internos (carimbo "proibido reproduzir") não vão para o site.
- Ao mudar textos de interface, atualize os três `messages/*/catalog.json` (o teste compara as chaves).
- Registre decisões que afetam o projeto em `docs/catalogo-estrutura.md`.

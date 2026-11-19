# Catálogo de produtos Dutex: estrutura e inventário

Fonte: desenhos técnicos em `E:\work\dutex\materiais\fichas tecnicas\Fichas técnicas` (50 arquivos: 49 PDFs + 1 foto).
Referência de arquitetura: catálogo da Joinsul (`C:\Users\Usuário\work\projetos\joinsul\src\content\catalog` e `src\components\catalog`).

## Premissas

- Os arquivos são **desenhos de engenharia** (carimbo "proibido reproduzir"), não fichas comerciais. Eles alimentam os dados técnicos, mas **não são publicados nem oferecidos para download**.
- A Dutex vende engenharia aplicada e fabricação sob medida. O catálogo mostra **famílias de solução** com as configurações já produzidas como referência, e o CTA é "solicitar projeto/cotação", não um seletor de SKU.
- Nenhum dado é inventado: campo ausente fica `null`. Divergências vão para `lib/catalog/audit.ts`.
- Nomes de clientes e referências de clientes (ZEN S.A, CSN, "REF. 8426637" etc.) **não aparecem no site**.

## Modelo de dados

`Categoria (aplicação)` → `Produto (família, uma página)` → `Configuração (linha da tabela de medidas)`

- Sem o nível "família" da Joinsul: aqui a família já é o produto.
- Um produto tem uma categoria principal (define a URL) e pode ter `applications[]` extras para o filtro.
- Filtros: busca, aplicação, material, processo de fabricação. Estado na URL (`?q=&aplicacao=&material=&processo=`), como na Joinsul.

## Categorias (por aplicação)

| Ordem | Slug | Nome |
|---|---|---|
| 1 | protecao-de-bobinas | Proteção de bobinas |
| 2 | protecao-de-bordas | Proteção de bordas e cantos |
| 3 | embalagem-e-paletizacao | Embalagem e paletização |
| 4 | infraestrutura-de-cabos | Infraestrutura de cabos |
| 5 | acos-e-perfis | Aços e perfis (antes "Transformação de aço") |

## Inventário (arquivo → produto)

### 1. Proteção de bobinas
| Produto | Configurações (desenho) | Material | Processo | Arquivos |
|---|---|---|---|---|
| Luvas de aço | 125x50x500 (3,75 mm, 8,21 kg); 150x50x500 (3,75 mm, 8,21 kg); 100x100x575 (3 mm, 7,25 kg); 100x100x482 (3 mm, 7,25 kg); 100x70x575,5 (3 mm, 6,64 kg); Ø580/Ø500x150 (3,75 mm, 8,61 a 8,94 kg) | Aço 1006/1010; 1020/A36 (Ø580) | Caldeiraria, solda contínua | 03-GAL02-0023, 0054 (luva), 0076 (x2), 0084, 0085, 0087, 0088; 005-01-20-0101, 0101A, 0101B |
| Anéis cartola | 100x70x482 (3 mm, 5,61 kg) | Aço 1006/1010 | Caldeiraria | 03-GAL02-0086 |
| Colarinhos de proteção | Ø508 (~330 g); Ø610 (~380 g) | PP | Injeção | 03-INJ02-0080, 03-INJ02-0074 |
| Anel plástico | Ø750x880x10 | Plástico de engenharia | a confirmar | 03-GAL02-0054 (anel) |
| Protetor tubular | 90x8x4700 | PP | Extrusão | 03-EXT02-0037 |

### 2. Proteção de bordas e cantos
| Produto | Configurações | Material | Processo | Arquivos |
|---|---|---|---|---|
| Cantoneiras plásticas | 70x40x4500; 135x70x4700; 100x100x6000; 230x130 (0,32 kg); esquerda/direita 102 | PP | Extrusão | 03-EXT03-0032, 0033, 0034; 03-GAL02-0062; 03-EXT05-0035 |
| Cantoneiras plissadas plásticas | 110x70, comprimentos 2200 a 5900 mm (11 itens, 0,677 a 1,817 kg); opção com TNT azul 95 mm | PP | Extrusão + estampagem | 03-EXT02-0067, 03-EXT05-0046, 03-GAL02-0061 |
| Cantoneiras metálicas plissadas | a extrair do desenho | Chapa ZC | Conformação | 03-GAL02-0031 |
| Chapas metálicas para embalagem | a extrair do desenho | Chapa ZC | Corte | 03-GAL02-0030 (2 cópias) |

### 3. Embalagem e paletização
| Produto | Configurações | Material | Processo | Arquivos |
|---|---|---|---|---|
| Colmeias e tabuleiros separadores | Colmeias 310x190 (alturas 50, 90, 100, 110; versão adesiva), 316x200x110; tabuleiros 310x190 #1,30 e 120x190 #1,20 | PP | Extrusão (chapa) + corte CNC | 03-EXT03-0003 a 0007, 0012, 0013, 0017 |
| Placas Saeko 6000 | #2,5 (PP, 260 g/m); #3,5 (polionda, 100 g/m) | PP / polionda | Extrusão | 03-EXT02-0024, 0025 |
| Perfil 120 m | a confirmar função | PP | Extrusão | 03-EXT02-0043 |

### 4. Infraestrutura de cabos
| Produto | Configurações | Material | Processo | Arquivos |
|---|---|---|---|---|
| Dutos corrugados PEAD Condutex | Ø32, Ø40, Ø50, Ø63, Ø90, Ø100, Ø110 + dreno Ø100/Ø110; resistência à compressão 300 a 320 N; guia em poliéster Ø1,5 mm; bobinas de 50 m | PEAD | Extrusão | 03-EXT03-0018 (eletroduto), 03-EXT06-0029 (duto NBR) |
| Placas de proteção mecânica de cabos | 100 mm (93 g/m); 150 mm (140 g/m); 200 mm (180 g/m); MT-200 e MT-215 (2,5 mm, 6 m, 195 g/m) | PP | Extrusão | 03-EXT02-0027, 0029, 0036, 0040, 0041 |

### 5. Transformação de aço
| Produto | Configurações | Material | Processo | Arquivos |
|---|---|---|---|---|
| Blanks | a extrair | ZC | Corte | 03-GAL02-0071 |

### A classificar (precisam de explicação comercial)
- Slitter borracha (03-EXT02-0019): borracha, função não descrita.
- Manta magnética (03-GAL01-0075): 4,94 kg, função não descrita.

### Fora do catálogo
- 011-01-21-0108 "Eixo de fixação da castanha" (máquina de estiragem de luvas): ferramental interno.

## Pendências para o cliente (bloqueiam publicação)

1. **Publicação de itens de cliente**: as peças da pasta ZEN S.A e as luvas com referência de cliente podem aparecer (sem nome do cliente) ou ficam fora?
2. **Códigos duplicados**: 03-GAL02-0076 em duas luvas diferentes (125x50 e 150x50); 03-GAL02-0054 em uma luva Ø580 e no anel Ø750; cantoneira plissada 110x70 com três códigos; Condutex com 03-EXT03-0018 no arquivo e 02-EXT06-0018 no carimbo; colmeia 310x190x50 em 0003 e 0005.
3. **Pesos divergentes** entre desenho e quadro da fábrica (foto "LUVAS EM AÇO"): 150x50x500 = 8,21 kg x 8,49 kg; 100x100x575 = 7,25 kg x 8 kg; 100x70x482 = 5,61 kg x 5,4 kg. Luva 150x50x500 e 125x50x500 com o mesmo peso no desenho.
4. **Nomenclatura**: ref. 1247104 é "luva em aço 100x70x575,5" no desenho e "anel cartola 100x70x575" no quadro da fábrica.
5. **Colmeia 316x200x110**: peso "289.85" kg, provável erro de unidade.
6. Luvas Ø580/Ø500x150: os desenhos 005-01-20-0101/A/B (terceiro, 2020) e 03-GAL02-0054/0087 parecem a mesma peça em versões diferentes. Qual vale?
7. Fotos de produto, texto comercial por família e aplicações (setores) de cada uma.
8. Quais famílias mostram números (peso, resistência) publicamente e quais ficam só "sob consulta".

## Decisões de implementação

### Arquivos
- `lib/catalog/`: `types.ts` (modelo), `categories.ts`, `products.ts` (28 produtos), `audit.ts` (pendências), `search.ts` (busca e filtros, roda no navegador), `server.ts` (entradas traduzidas e checagem da ficha no disco), `seo.ts`, `product-images.ts` (gerado).
- `app/[locale]/produtos/`: listagem (`/produtos`), aplicação (`/produtos/[categoria]`) e produto (`/produtos/[categoria]/[produto]`), todas estáticas (`generateStaticParams` + `dynamicParams = false`).
- `components/catalog/`: `CatalogBrowser`, `ProductCard`, `ProductGallery`, `ConfigurationTable`, `DatasheetRequest`, `Breadcrumbs`.
- `messages/{pt,en,es}/catalog.json`: textos de interface, registrados em `i18n/request.ts`.
- Navegação: "Produtos" entrou no menu (Header e MobileMenu, com `Link` do next-intl) e no rodapé (`lib/data.ts`).

### Comandos
- `npm run catalog:check`: 10 testes de integridade (slugs, categorias, pendências, imagens, travessões, chaves de tradução, nomes de cliente e códigos internos fora do texto público).
- `npm run catalog:report`: gera `docs/catalogo-auditoria.md` a partir de `audit.ts`. Rode depois de resolver pendências.
- `npm run catalog:images`: refaz as imagens a partir de `E:/work/dutex/materiais` (mapeamento em `scripts/catalog-images.py`).
- `npm run typecheck`.
- `tsconfig.json` ganhou `allowImportingTsExtensions` para os scripts rodarem direto no Node (imports com `.ts` em `lib/catalog`).

### Publicação
- Todos os produtos estão com `status: "rascunho"`. Rascunhos aparecem em `npm run dev` e quando `CATALOG_SHOW_DRAFTS=true` (configure no ambiente de Preview da Vercel). Em produção, sem essa variável, só aparecem produtos `"publicado"`.
- Para publicar um produto: resolver as pendências bloqueantes dele em `audit.ts`, trocar o status e rodar `npm run catalog:check` (o teste impede publicar com pendência bloqueante aberta).
- Rascunhos e produtos sem tradução no idioma recebem `noindex` e ficam fora do sitemap.

### Ficha técnica
- Todo produto tem o botão "Baixar ficha técnica", que abre um formulário (nome, e-mail, empresa, telefone opcional e consentimento).
- O envio usa o Web3Forms com a mesma chave do rodapé (`NEXT_PUBLIC_WEB3FORMS_KEY`) e chega no e-mail comercial com produto, página e idioma. Os dados ficam no navegador (localStorage) para preencher os próximos pedidos. Dispara o evento `generate_lead` no GA.
- O PDF esperado é `public/fichas-tecnicas/{slug}.pdf`. Se existir no build, o download começa após o envio; se não, o usuário é avisado de que a equipe enviará por e-mail. Assim o link nunca quebra.
- Evolução prevista: trocar o Web3Forms por uma rota `/api` com CRM ou Resend, sem mudar o componente.

### Imagens
- 57 imagens em WebP (máx. 1400 px) em `public/images/produtos/{slug}/`, a partir de renders do catálogo 2025, fotos do WhatsApp e fotos da fábrica. Origem de cada uma em `lib/catalog/product-images.ts`.
- Folhas de contato para revisão: `E:\work\dutex\materiais\_site-catalogo\folhas-de-contato\`.
- Fotos não identificadas, possíveis imagens de banco e produtos sem foto estão em `audit.ts`.

### Mudanças em relação à proposta inicial
- Entraram produtos que estão na apresentação comercial mesmo sem desenho técnico: berços para bobinas, separador de bobinas, manta protetora multicamadas, paletes plásticos, estrados metálicos, paletes retornáveis, colarinhos rotomoldados e fita de advertência.
- Placas "Saeko" foram incorporadas às placas de proteção mecânica de cabos (mesmo perfil), sem o nome.
- Perfil 120 m e slitter de borracha não viraram produto (ver pendências).
- Dutos Condutex têm duas linhas, Standard (320 N) e NBR (680 N), confirmadas pelos desenhos e pelo catálogo 2022.

## Aços e perfis (briefing v2.4, 13/11/2026)

Fonte: `E:\work\dutex\materiais\02_Produtos\Aços e perfis\Briefing_Dutex_acos_e_perfis.docx` e desenhos `03-GAL02-0092` a `0095` em `fichas tecnicas\Fichas técnicas\perfis\`.

- A categoria "Transformação de aço" virou "Aços e perfis" (`acos-e-perfis`), nome da submarca. Como nada estava publicado, a troca de slug não precisa de redirecionamento.
- Produtos: Perfil U simples, Perfil U enrijecido (Ue), Perfil L, Perfil cartola, Chapas e blanks e Tiras slitadas (slitter). Os perfis vêm primeiro.
- URLs: `/produtos/acos-e-perfis/perfil-u-simples` etc. O briefing propõe `/acos-e-perfis/...`; a página da categoria pode virar a página de linha sem mudar a estrutura (ver pendência `site-arquitetura-briefing`).
- Tabela dos perfis: uma linha por medida, com uma coluna de peso (kg/m) por espessura (`weightByThickness`) e nota "pesos nominais, ±5%" (`tableNote`).
- Medidas que o briefing manda não listar (L 25, 30 e 38 e U 50 x 25, abaixo da largura mínima de tira) ficam no dado com `hidden: true`. Para liberar, remova o `hidden`.
- O 150 x 50 x 17 aparece sem pesos (valor da engenharia incoerente). L e cartola aparecem sem pesos (não informados).
- Para os perfis, a frase da tabela é "medidas da linha, conforme desenho" (`sizesKind: "linha"`), porque a perfiladeira ainda não produziu.
- WhatsApp: os perfis abrem a mensagem com os campos Espessura, Comprimento, Quantidade e Material para o cliente completar (`quoteFields`). Chapas e slitter pedem espessura, material e quantidade.
- Imagens provisórias: seções transversais esquemáticas desenhadas a partir das cotas (`scripts/catalog-sections.py`), até chegarem as fotos da perfiladeira e do produto cortado. `npm run catalog:images` gera as seções e converte tudo.
- Os quatro perfis estão bloqueados para publicação até o lançamento (regra do briefing: nada vai ao ar antes do primeiro pedido da Fase 0). Pendências em `audit.ts`.

## Renders 3D do Figma (19/11/2026)

- Fonte: Figma `dutex`, página Produtos, quadro "Catálogo Dutex - fotos de produtos (atualizadas)".
- Decisões: renders só nos produtos que já existem; cada render fica no produto da linha em que está no Figma; renders entram na frente das fotos atuais.
- Entraram 10 renders: anéis cartola (metálicos, 2), berços (1), cantoneiras plissadas plásticas (2), cantoneiras plissadas metálicas (2), chapas metálicas para embalagem (1) e manta protetora multicamadas (2).
- Ficaram de fora os produtos que só existem no Figma (anéis cartola plásticos, protetor tubular metálico, cantoneiras metálicas, chapas plásticas para embalagem, chapa protetora metálica multicamadas). Pendência `produtos-novos-figma`.
- Arquivos em `E:\work\dutex\materiais\_site-catalogo\renders\{slug}\render-NN.png` (1400 x 1050). `scripts/catalog-images.py` lê essa pasta e põe os renders antes das fotos do MAP.
- Para atualizar: no Figma, exporte (Ctrl+Shift+E) para essa pasta; só os quadros `{slug}/render-NN` têm exportação ligada. Depois rode `npm run catalog:images`.

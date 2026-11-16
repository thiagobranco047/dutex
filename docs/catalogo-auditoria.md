# Catálogo Dutex: auditoria

Gerado por `npm run catalog:report` a partir de `lib/catalog/audit.ts`. Não edite à mão.

- Produtos: 23 (0 publicados, 23 em rascunho)
- Pendências abertas: 35 (8 bloqueiam publicação)
- Produtos sem imagem: Anel de proteção em plástico de engenharia, Separador de bobinas, Manta protetora multicamadas, Paletes plásticos, Placas de proteção mecânica de cabos, Fita de advertência

## Perguntas para a Dutex

1. **[bloqueia]** Essas medidas podem aparecer no site como referência (sem citar o cliente) ou devem sair do catálogo? _(itens-de-cliente)_
2. Para cada um: qual problema resolve, em que setor é usado e qual o diferencial? _(textos-ausentes)_
3. Há fotos ou renders desses produtos? _(imagens-ausentes)_
4. Quais produtos aparecem nessas fotos? As gaiolas fazem parte do portfólio? _(fotos-nao-identificadas)_
5. As imagens de blanks são próprias ou licenciadas? _(imagens-licenca)_
6. **[bloqueia]** A linha de construção civil ainda é vendida? Se sim, entra neste catálogo ou em outro lugar? _(linha-construcao-civil)_
7. Quem produz as fichas públicas (Dutex ou Lab. 334) e com quais dados? _(ficha-tecnica-arquivos)_
8. Qual o código e o peso corretos de cada luva? _(luvas-codigo-0076)_
9. Qual o código correto de cada peça? _(anel-750-codigo)_
10. Qual desenho é o vigente? _(plissada-plastica-codigos)_
11. Qual o código correto? Falta uma medida na tabela? _(plissada-metalica-codigo)_
12. Os dois arquivos são iguais? A instrução de fabricação está atualizada? _(chapa-0030-duplicada)_
13. A diferença entre as duas é só o modelo adesivo? _(colmeia-0003-0005)_
14. Qual o código correto? _(condutex-codigos)_
15. **[bloqueia]** Qual peso vale para cada peça? Ou o site deve omitir o peso? _(luvas-pesos)_
16. Qual o nome correto da peça 100 x 70 x 575? _(nomenclatura-1247104)_
17. Qual desenho vale e quais as diferenças entre as versões? _(luva-580-versoes)_
18. Existe anel cartola em plástico além do de aço? _(anel-cartola-material)_
19. As duas medidas são produzidas? _(tubular-medidas)_
20. **[bloqueia]** Qual faixa de carga vale? _(bercos-capacidade)_
21. Qual o peso correto? _(colmeia-peso)_
22. Quais diâmetros e pesos valem hoje? O nome comercial é Premium ou NBR? _(condutex-catalogo-2022)_
23. **[bloqueia]** Os paletes são fabricados pela Dutex? Os valores de carga têm ensaio? _(paletes-plasticos-dados)_
24. Quais medidas são vendidas hoje? _(fita-medidas)_
25. Quais materiais e faixas de medida podem ser divulgados? _(blanks-tabela)_
26. O render é da cantoneira 70 x 40? _(render-cantoneira-70x70)_
27. Saeko é cliente? As placas são variações da placa de proteção de cabos? _(placas-saeko)_
28. A Dutex fabrica para a Mantex? Existe ensaio em nome da Dutex? _(placas-ensaio-terceiro)_
29. **[bloqueia]** A Dutex fabrica colarinhos por rotomoldagem? Quais medidas? _(colarinho-rotomoldado)_
30. O que é a peça 03-EXT02-0019? _(slitter-borracha)_
31. **[bloqueia]** Para que serve a manta e quais as medidas? _(manta-magnetica)_
32. O perfil é vendido separado? _(perfil-120m)_
33. **[bloqueia]** São produtos de linha ou projetos especiais? Quais medidas e capacidades? _(estrados-e-paletes-retornaveis)_
34. Qual o ano de fundação, o domínio principal e o e-mail de compliance corretos? _(dados-institucionais)_

## Decisões comerciais

### Peças feitas para clientes específicos

- Status: aberto (bloqueia publicação)
- Produtos: Luvas de aço, Anéis cartola, Colmeias separadoras, Tabuleiros separadores
- Encontrado: Parte dos desenhos é de peças de clientes: pasta ZEN S.A (colmeias, tabuleiros, perfil), luvas com referência de cliente (REF. 8426637, 8112039, 1247104, 8112040, 1247107) e "CSN" no nome de uma luva. O site não mostra nomes nem referências de clientes.
- Pergunta: Essas medidas podem aparecer no site como referência (sem citar o cliente) ou devem sair do catálogo?
- Fontes: `fichas tecnicas/Fichas técnicas/ZEN S.A/`; `fichas tecnicas/Fichas técnicas/AÇO/`

### Linha de construção civil (catálogo 2022)

- Status: aberto (bloqueia publicação)
- Produtos: Dutos corrugados PEAD Condutex, Fita de advertência
- Encontrado: O catálogo 2022 traz uma linha para construção civil: Condutex PEAD (Standard e Premium NBR 15715), luvas e tampões para PEAD, dreno, eletrodutos corrugados em PVC (amarelo, laranja, verde, azul e fracionados), luvas de pressão, caixas de passagem 4x2, canaletas, mangueira de nível e fita de advertência. O site atual é só industrial. Entraram no catálogo apenas os dutos PEAD (que têm desenho técnico atual) e a fita de advertência.
- Pergunta: A linha de construção civil ainda é vendida? Se sim, entra neste catálogo ou em outro lugar?
- Fontes: `04_Mídias e Redes Sociais/CATÁLOGO/versão digital/Dutex Catálogo.pdf`

### Placas "Saeko"

- Status: aberto
- Produtos: Placas de proteção mecânica de cabos
- Encontrado: Os desenhos 03-EXT02-0024 (PP #2,5) e 0025 (polionda #3,5) se chamam "Placa Saeko 6000". Têm o mesmo perfil das placas de proteção de cabos (200 mm, abas 130/65). "Saeko" pode ser nome de cliente; no site entraram sem esse nome, dentro das placas de proteção de cabos.
- Pergunta: Saeko é cliente? As placas são variações da placa de proteção de cabos?
- Fontes: `fichas tecnicas/Fichas técnicas/PRODUTO FINAL/03-EXT02-0024 e 0025`

### Relatório de ensaio da placa MT-200 é de outra empresa

- Status: aberto
- Produtos: Placas de proteção mecânica de cabos
- Encontrado: O relatório MAT/ID-371.857/Complementar/23 (Falcão Bauer) tem como interessado a Mantex Indústria de Componentes. O próprio relatório proíbe uso promocional sem autorização. Nenhum resultado foi usado no site.
- Pergunta: A Dutex fabrica para a Mantex? Existe ensaio em nome da Dutex?
- Fontes: `02_Produtos/Linha PP EXT/MT-200 PLAC PROT MEC CB  200MM X 2,5MM 6M/`

## Publicação

### Fichas técnicas públicas para download

- Status: aberto
- Encontrado: Os desenhos técnicos têm o carimbo "proibido reproduzir" e não podem ser oferecidos para download. Cada produto já tem o botão e o formulário; o arquivo esperado é public/fichas-tecnicas/{slug}.pdf. Enquanto o arquivo não existe, o formulário registra o pedido e avisa que a equipe envia a ficha por e-mail.
- Pergunta: Quem produz as fichas públicas (Dutex ou Lab. 334) e com quais dados?

### Tradução dos textos de produto

- Status: aberto
- Encontrado: Interface e categorias estão em pt, en e es. Textos de produto estão só em português; em /en e /es a página cai no português e recebe noindex.

## Códigos duplicados ou inconsistentes

### Mesmo código em duas luvas diferentes

- Status: aberto
- Produtos: Luvas de aço
- Encontrado: 03-GAL02-0076 é usado na luva 125 x 50 x 500 mm e na luva 150 x 50 x 500 mm. As duas têm o mesmo peso no desenho (8,21 kg).
- Pergunta: Qual o código e o peso corretos de cada luva?
- Fontes: `fichas tecnicas/Fichas técnicas/AÇO/03-GAL02-0076 (2 arquivos)`

### 03-GAL02-0054 em duas peças

- Status: aberto
- Produtos: Anel de proteção em plástico de engenharia, Luvas de aço
- Encontrado: O código 03-GAL02-0054 aparece na luva de aço Ø580/Ø500 x 150 (pasta AÇO) e no anel Ø750 x 880 x 10 em plástico de engenharia (pasta PRODUTO FINAL).
- Pergunta: Qual o código correto de cada peça?
- Fontes: `fichas tecnicas/Fichas técnicas/AÇO/03-GAL02-0054`; `fichas tecnicas/Fichas técnicas/PRODUTO FINAL/03-GAL02-0054`

### Cantoneira plissada plástica 110 x 70 com três códigos

- Status: aberto
- Produtos: Cantoneiras plissadas plásticas
- Encontrado: Três desenhos para a mesma peça: 03-EXT02-0067, 03-EXT05-0046 e 03-GAL02-0061. O 0061 tem a tabela de comprimentos e a opção com TNT.
- Pergunta: Qual desenho é o vigente?
- Fontes: `fichas tecnicas/Fichas técnicas/PRODUTO FINAL/`

### Cantoneira plissada metálica: código do arquivo diferente do carimbo

- Status: aberto
- Produtos: Cantoneiras plissadas metálicas
- Encontrado: O arquivo se chama 03-GAL02-0031, mas o carimbo do desenho diz 03-GAL02-0050. Na tabela, o item 12 não existe (pula do 11 para o 13).
- Pergunta: Qual o código correto? Falta uma medida na tabela?
- Fontes: `fichas tecnicas/Fichas técnicas/AÇO/03-GAL02-0031 - CANTONEIRAS METÁLICAS PLISSADAS.pdf`

### Chapa metálica para embalagem em duas pastas

- Status: aberto
- Produtos: Chapas metálicas para embalagem
- Encontrado: 03-GAL02-0030 está nas pastas AÇO e PRODUTO FINAL. As medidas usadas no site vêm da instrução de fabricação (900 a 1500 x 2500 mm, #0,65).
- Pergunta: Os dois arquivos são iguais? A instrução de fabricação está atualizada?
- Fontes: `fichas tecnicas/Fichas técnicas/AÇO/03-GAL02-0030`; `fichas tecnicas/Fichas técnicas/PRODUTO FINAL/03-GAL02-0030`

### Duas colmeias 310 x 190 x 50

- Status: aberto
- Produtos: Colmeias separadoras
- Encontrado: 03-EXT03-0003 e 03-EXT03-0005 têm a mesma medida. O 0005 cita "modelo adesivo" no campo material.
- Pergunta: A diferença entre as duas é só o modelo adesivo?
- Fontes: `fichas tecnicas/Fichas técnicas/ZEN S.A/`

### Dutos Condutex: código do arquivo diferente do carimbo

- Status: aberto
- Produtos: Dutos corrugados PEAD Condutex
- Encontrado: O arquivo 03-EXT03-0018 (linha Standard) tem no carimbo o código 02-EXT06-0018.
- Pergunta: Qual o código correto?
- Fontes: `fichas tecnicas/Fichas técnicas/PRODUTO FINAL/03-EXT03-0018`

## Divergências de dados

### Pesos das luvas: desenho x quadro da fábrica x instrução

- Status: aberto (bloqueia publicação)
- Produtos: Luvas de aço, Anéis cartola
- Encontrado: 150 x 50 x 500 mm: 8,21 kg (desenho), 8,49 kg (quadro da fábrica) e 7,79 kg (instrução de fabricação, ref. 8426637). 100 x 100 x 575 mm: 7,25 kg (desenho) e 8 kg (quadro). Anel cartola 100 x 70 x 482 mm: 5,61 kg (desenho) e 5,4 kg (quadro). Luva 100 x 100 x 482 mm: 7,25 kg (desenho) e 5,37 kg (quadro).
- Pergunta: Qual peso vale para cada peça? Ou o site deve omitir o peso?
- Fontes: `fichas tecnicas/Fichas técnicas/AÇO/`; `fichas tecnicas/Fichas técnicas/AÇO/LUVAS EM AÇO.jpg`; `02_Produtos/Linha Metalmecânica/Luva em aço/Luva em aço.pdf`

### Ref. 1247104: luva ou anel cartola?

- Status: aberto
- Produtos: Luvas de aço, Anéis cartola
- Encontrado: No desenho 03-GAL02-0085 a ref. 1247104 é "luva em aço 100 x 70 x 575,5 mm". No quadro da fábrica é "anel cartola 100 x 70 x 575 mm". O quadro também usa 81048447 para a luva 100 x 100 x 482 mm.
- Pergunta: Qual o nome correto da peça 100 x 70 x 575?
- Fontes: `fichas tecnicas/Fichas técnicas/AÇO/03-GAL02-0085`; `fichas tecnicas/Fichas técnicas/AÇO/LUVAS EM AÇO.jpg`

### Luva Ø580/Ø500 x 150 em várias versões

- Status: aberto
- Produtos: Luvas de aço
- Encontrado: A mesma peça aparece em 005-01-20-0101, 0101A e 0101B (desenhos de terceiro, 2020, para bobinas pintadas e galvanizadas), 03-GAL02-0054 (aço 1020/A36, 8,94 kg, sem pintura) e 03-GAL02-0087 ("CSN", 8,61 kg, material não informado). O site mostra a medida sem peso e sem material.
- Pergunta: Qual desenho vale e quais as diferenças entre as versões?
- Fontes: `fichas tecnicas/Fichas técnicas/AÇO/`

### Anel cartola: plástico ou aço?

- Status: aberto
- Produtos: Anéis cartola
- Encontrado: A apresentação comercial descreve o anel cartola como "produzido em polímero plástico" (linha plástica) e também na linha metalmecânica. O desenho 03-GAL02-0086 é em aço 1006/1010.
- Pergunta: Existe anel cartola em plástico além do de aço?
- Fontes: `produtos/DUTEX INDUSTRIA.pdf`; `fichas tecnicas/Fichas técnicas/AÇO/03-GAL02-0086`

### Protetor tubular: 90 x 8 ou 115 x 7?

- Status: aberto
- Produtos: Protetor tubular
- Encontrado: Desenho 03-EXT02-0037: 90 x 8 x 4700 mm. Instrução de fabricação (ref. 1247018): 115 x 7 x 4700 mm. O site mostra as duas.
- Pergunta: As duas medidas são produzidas?
- Fontes: `fichas tecnicas/Fichas técnicas/PRODUTO FINAL/03-EXT02-0037`; `02_Produtos/Linha PP EXT/PROT. TUBOLAR P BOBINA 115X7X4700MM/`

### Capacidade dos berços para bobinas

- Status: aberto (bloqueia publicação)
- Produtos: Berços para bobinas
- Encontrado: A apresentação comercial diz carga entre 10 e 30 toneladas. A home do site diz bobinas de 3 a 20 toneladas. A capacidade ficou fora da página do produto.
- Pergunta: Qual faixa de carga vale?
- Fontes: `produtos/DUTEX INDUSTRIA.pdf`; `messages/pt/home.json`

### Colmeia 316 x 200 x 110 com peso de 289,85 kg

- Status: aberto
- Produtos: Colmeias separadoras
- Encontrado: O carimbo de 03-EXT03-0017 informa peso de 289.85 kg, provavelmente em gramas. O peso não foi usado.
- Pergunta: Qual o peso correto?
- Fontes: `fichas tecnicas/Fichas técnicas/ZEN S.A/03-EXT03-0017`

### Dutos Condutex: desenhos x catálogo 2022

- Status: aberto
- Produtos: Dutos corrugados PEAD Condutex
- Encontrado: O catálogo 2022 tem DN 25 na linha Standard e DN 100 na linha Premium/NBR, que não estão nos desenhos. Pesos da linha NBR no desenho (6,325 kg no Ø32) diferem do catálogo (5000 g no DN 32). O catálogo chama a linha de "Premium"; o desenho, de "NBR".
- Pergunta: Quais diâmetros e pesos valem hoje? O nome comercial é Premium ou NBR?
- Fontes: `04_Mídias e Redes Sociais/CATÁLOGO/versão digital/Dutex Catálogo.pdf`; `fichas tecnicas/Fichas técnicas/PRODUTO FINAL/03-EXT03-0018 e 03-EXT06-0029`

### Paletes plásticos: validar dados de carga e material

- Status: aberto (bloqueia publicação)
- Produtos: Paletes plásticos
- Encontrado: A apresentação diz "PP de baixa densidade (copolímero)", cargas de 5000 kg estática, 1500 kg dinâmica e 1500 kg em porta-palete, e matéria-prima "com antibactericida". Não há desenho técnico nem ensaio nos materiais.
- Pergunta: Os paletes são fabricados pela Dutex? Os valores de carga têm ensaio?
- Fontes: `produtos/DUTEX INDUSTRIA.pdf`

### Fita de advertência: 10 cm x 100 m ou 50 x 10?

- Status: aberto
- Produtos: Fita de advertência
- Encontrado: O catálogo 2022 traz 10 cm x 100 m. O arquivo em 02_Produtos se chama "Fita de Advertência 50x10".
- Pergunta: Quais medidas são vendidas hoje?
- Fontes: `02_Produtos/FITA DE ADVERTÊNCIA/`

### Tabela de blanks com referências de cliente

- Status: aberto
- Produtos: Chapas e blanks
- Encontrado: O desenho 03-GAL02-0071 lista dezenas de blanks ZC com código de referência (1247xxx). O site resume em faixas por espessura. O site atual cita ZC, FF e FQ e espessuras até 40 mm, mas só há desenho de ZC.
- Pergunta: Quais materiais e faixas de medida podem ser divulgados?
- Fontes: `fichas tecnicas/Fichas técnicas/AÇO/03-GAL02-0071 - BLANK ZC.pdf`

### Dados institucionais divergentes nos materiais

- Status: aberto
- Encontrado: Ano de início: "desde 2010" (catálogo 2022), "desde 2013" (apresentação comercial) e "12+ anos" (site). Domínio: o pedido cita dutex.com.br; o site usa dutex.ind.br (NEXT_PUBLIC_SITE_URL). E-mail de compliance: compliance@dutex.ind.br no rodapé e compliance@dutex.com.br no JSON-LD.
- Pergunta: Qual o ano de fundação, o domínio principal e o e-mail de compliance corretos?
- Fontes: `produtos/DUTEX INDUSTRIA.pdf`; `04_Mídias e Redes Sociais/CATÁLOGO/`; `app/[locale]/layout.tsx`; `lib/data.ts`

## Dados ausentes

### Produtos sem texto comercial

- Status: aberto
- Produtos: Colarinhos de proteção, Colarinhos rotomoldados, Anel de proteção em plástico de engenharia, Cantoneiras plissadas plásticas, Estrados metálicos, Paletes retornáveis, Manta de proteção com ímã, Placas de proteção mecânica de cabos
- Encontrado: Sem descrição nem aplicação em nenhum material: colarinhos de proteção, colarinhos rotomoldados, anel Ø750, cantoneiras plissadas plásticas, estrados metálicos, paletes retornáveis, manta com ímã e placas de proteção de cabos.
- Pergunta: Para cada um: qual problema resolve, em que setor é usado e qual o diferencial?

### Colarinho rotomoldado

- Status: aberto (bloqueia publicação)
- Produtos: Colarinhos rotomoldados
- Encontrado: Existe render "COLARINHO ROTOMOLDAGEM" e fotos de colarinhos laranja com aba, mas nenhum desenho técnico. Rotomoldagem também não aparece entre os processos citados no site.
- Pergunta: A Dutex fabrica colarinhos por rotomoldagem? Quais medidas?
- Fontes: `04_Mídias e Redes Sociais/CATÁLOGO/Catalogo 2025/COLARINHO ROTOMOLDAGEM.png`

### "Slitter borracha" (03-EXT02-0019)

- Status: aberto
- Produtos: Separador de bobinas
- Encontrado: Desenho em borracha sem descrição de uso. Pode ser o separador de bobinas ("cintas de borracha") da apresentação comercial. Não entrou como produto.
- Pergunta: O que é a peça 03-EXT02-0019?
- Fontes: `fichas tecnicas/Fichas técnicas/PRODUTO FINAL/03-EXT02-0019 - SLITTER BORRACHA.pdf`

### Manta magnética

- Status: aberto (bloqueia publicação)
- Produtos: Manta de proteção com ímã
- Encontrado: Desenho 03-GAL01-0075 (4,94 kg) e render "MANTA COM PROTEÇÃO COM IMÃ", sem descrição de uso nem medidas legíveis.
- Pergunta: Para que serve a manta e quais as medidas?
- Fontes: `fichas tecnicas/Fichas técnicas/PRODUTO FINAL/03-GAL01-0075 - MANTA MAGNETICA.pdf`

### Perfil 120 m (03-EXT02-0043)

- Status: aberto
- Produtos: Colmeias separadoras
- Encontrado: Fita extrudada em PP de 1,30 mm, em rolos de 120 m, nas larguras 50, 90, 100, 110 e 190 mm (7,20 a 27,30 kg). As larguras coincidem com as alturas das colmeias, então parece ser a matéria-prima das colmeias. Não entrou como produto.
- Pergunta: O perfil é vendido separado?
- Fontes: `fichas tecnicas/Fichas técnicas/ZEN S.A/03-EXT02-0043 - PERFIL 120 M.pdf`; `02_Produtos/Linha PP EXT/PERFIL 190X1,25 -120M/`

### Estrados metálicos e paletes retornáveis

- Status: aberto (bloqueia publicação)
- Produtos: Estrados metálicos, Paletes retornáveis
- Encontrado: Só há renders no catálogo 2025, sem desenho, medidas ou descrição.
- Pergunta: São produtos de linha ou projetos especiais? Quais medidas e capacidades?
- Fontes: `04_Mídias e Redes Sociais/CATÁLOGO/Catalogo 2025/`

### Eixo de fixação da castanha (011-01-21-0108)

- Status: resolvido
- Encontrado: Peça da máquina de estiragem de luvas (ferramental interno), não é produto.
- Resolução: Fora do catálogo.
- Fontes: `fichas tecnicas/Fichas técnicas/AÇO/011-01-21-0108.pdf`

## Imagens

### Produtos sem foto

- Status: aberto
- Produtos: Anel de proteção em plástico de engenharia, Separador de bobinas, Manta protetora multicamadas, Paletes plásticos, Placas de proteção mecânica de cabos, Fita de advertência
- Encontrado: Sem imagem identificada na pasta de materiais: anel Ø750, separador de bobinas, manta protetora multicamadas, paletes plásticos, placas de proteção de cabos e fita de advertência.
- Pergunta: Há fotos ou renders desses produtos?

### Fotos de produto não identificadas

- Status: aberto
- Encontrado: Fotos com fundo branco sem produto definido: produtos/WhatsApp Image 2026-01-06 at 15.18.08 (4), (10), (13), (14), (15), (16), (17), (20); Catalogo 2025/Fotos/Fotos Garuva 5, 8, 11 e 16; Imagens de produtos/20240412_135342 e 135355 (anéis laranja embalados). Gaiolas (rack aramado, caixa, armário) também não têm produto correspondente.
- Pergunta: Quais produtos aparecem nessas fotos? As gaiolas fazem parte do portfólio?
- Fontes: `materiais/_site-catalogo/folhas-de-contato/`

### Imagens possivelmente de banco

- Status: aberto
- Produtos: Chapas e blanks
- Encontrado: 02_Produtos/chapas e blanks/BLANKS1.jpg, blanks-1024x384.jpg e Chapas blanks/Blanks_01.jpg parecem fotos de banco de imagens. Não foram usadas. Só Chapas_01.jpg entrou no site. Também ficou de fora 1716202925956.jpg (anúncio da LS Modulares).
- Pergunta: As imagens de blanks são próprias ou licenciadas?
- Fontes: `02_Produtos/chapas e blanks/`; `Chapas blanks/`

### Render "CANTONEIRA 70X70"

- Status: aberto
- Produtos: Cantoneiras plásticas
- Encontrado: O render do catálogo 2025 se chama 70 x 70, mas não há desenho de cantoneira 70 x 70 (só 70 x 40).
- Pergunta: O render é da cantoneira 70 x 40?
- Fontes: `04_Mídias e Redes Sociais/CATÁLOGO/Catalogo 2025/CANTONEIRA 70X70.png`

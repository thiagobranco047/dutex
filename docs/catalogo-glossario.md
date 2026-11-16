# Glossário do catálogo (pt / en / es)

Termos técnicos usados nas traduções do catálogo. **Status: a validar com a Dutex.**
Quando um termo for confirmado, atualize `lib/catalog/translations.ts` e `lib/catalog/terms.ts`
e marque `reviewed: { en: true, es: true }` nos produtos revisados (só então as páginas em en/es são indexadas).

| Português | English | Español | Observação |
|---|---|---|---|
| Luva de aço | *(mantido em pt)* "steel sleeve" no texto | *(mantido em pt)* "camisa de acero" no texto | Nome sem equivalente seguro. Confirmar com o comercial como clientes de fora chamam a peça. |
| Anel cartola | *(mantido em pt)* "top-hat ring" no texto | *(mantido em pt)* "anillo tipo sombrero" no texto | Idem. |
| Colarinho de proteção | Protective collar | Collarín de protección | |
| Cantoneira plástica | Plastic edge protector | Cantonera plástica | |
| Cantoneira plissada | Pleated edge protector | Cantonera plisada | |
| Colmeia separadora | Honeycomb divider | Separador tipo colmena | |
| Tabuleiro separador | Layer pad | Tablero separador | |
| Berço para bobinas | Coil cradle | Cuna para bobinas | |
| Slitter (fita de aço) | Slit coil / steel strip | Fleje de acero (slitter) | |
| Chapa ZC | ZC sheet (zinc-coated) | Chapa ZC (cincada) | |
| Polionda | Corrugated PP sheet | Plancha alveolar de PP | |
| PEAD | HDPE | PEAD | |
| Duto corrugado | Corrugated duct | Ducto corrugado | |
| Dreno | Drain | Dren | |
| Fita de advertência | Warning tape | Cinta de advertencia | |
| Placa de proteção mecânica de cabos | Cable mechanical protection board | Placa de protección mecánica de cables | |
| Manta protetora multicamadas | Multilayer protective mat | Manta protectora multicapa | |
| Estrado metálico | Metal skid | Estrado metálico | |
| Palete | Pallet | Pallet | Em es também se usa "tarima" (México). |
| TNT (não-tecido) | Nonwoven | TNT (no tejido) | |
| Caldeiraria | Metal fabrication | Calderería | |

## Regras de formatação

- Inglês: ponto decimal (2.5 mm). Português e espanhol: vírgula (2,5 mm). A conversão é automática em `lib/catalog/terms.ts`.
- URLs ficam em português nos três idiomas nesta fase (`/en/produtos/...`).

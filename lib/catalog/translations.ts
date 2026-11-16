// Traduções en/es dos textos de produto. O português fica em products.ts.
// `reviewed: false` = tradução feita pela Lab. 334, ainda sem revisão técnica da Dutex:
// a página aparece no idioma, mas recebe noindex e fica fora do sitemap.
// Nomes com dúvida de terminologia ficam em português (ver docs/catalogo-glossario.md).
// features e uses seguem a mesma ordem de products.ts (o teste confere a quantidade).

type Pair = { en: string; es: string };

export type ProductTranslation = {
  reviewed: { en: boolean; es: boolean };
  name: Pair;
  summary: Pair;
  description?: Pair;
  features?: Pair[];
  uses?: Pair[];
};

const pending = { en: false, es: false };

export const productTranslations: Record<string, ProductTranslation> = {
  "luvas-de-aco": {
    reviewed: pending,
    name: { en: "Luvas de aço", es: "Luvas de aço" },
    summary: {
      en: "Steel sleeves that protect the edges of steel coils during transport, storage and handling.",
      es: "Camisas de acero que protegen los bordes de bobinas de acero en el transporte, el almacenamiento y la manipulación.",
    },
    description: {
      en: "The main purpose of the steel sleeve is to protect the edges of steel coils. It is a versatile, effective and economical solution to keep the coil intact during transport, storage and handling.",
      es: "La función principal de la camisa de acero es proteger los bordes de las bobinas de acero. Es una solución versátil, eficaz y económica para garantizar la integridad de la bobina durante el transporte, el almacenamiento y la manipulación.",
    },
    features: [
      {
        en: "Made from slit steel strip, rolled, continuously welded and flanged",
        es: "Fabricada a partir de fleje de acero (slitter), calandrada, con soldadura continua y rebordeada",
      },
      { en: "Painted or unpainted options", es: "Opciones con o sin pintura" },
      { en: "Sizes defined according to the customer's coil", es: "Medidas definidas según la bobina del cliente" },
    ],
    uses: [{ en: "Protection and locking of painted and galvanized steel coils", es: "Protección y trabado de bobinas de acero pintadas y galvanizadas" }],
  },
  "aneis-cartola": {
    reviewed: pending,
    name: { en: "Anéis cartola", es: "Anéis cartola" },
    summary: {
      en: "Top-hat shaped rings that protect the edges of steel coils.",
      es: "Anillos con forma de sombrero que protegen los bordes de bobinas de acero.",
    },
    description: {
      en: "The main purpose of the top-hat ring is to protect the edges of steel coils. It is a versatile, effective and economical solution to keep the coil intact during transport, storage and handling.",
      es: "La función principal del anillo tipo sombrero es proteger los bordes de las bobinas de acero. Es una solución versátil, eficaz y económica para garantizar la integridad de la bobina durante el transporte, el almacenamiento y la manipulación.",
    },
    features: [
      { en: "Continuous weld", es: "Soldadura continua" },
      { en: "Painted or unpainted options", es: "Opciones con o sin pintura" },
    ],
  },
  "colarinhos-de-protecao": {
    reviewed: pending,
    name: { en: "Protective collars", es: "Collarines de protección" },
    summary: {
      en: "Injection-molded PP protective collars in Ø 508 and Ø 610 mm diameters.",
      es: "Collarines de protección inyectados en PP, en los diámetros Ø 508 y Ø 610 mm.",
    },
  },
  "colarinhos-rotomoldados": {
    reviewed: pending,
    name: { en: "Rotomolded collars", es: "Collarines rotomoldeados" },
    summary: { en: "Protective collars produced by rotational molding.", es: "Collarines de protección producidos por rotomoldeo." },
  },
  "anel-de-protecao-plastico": {
    reviewed: pending,
    name: { en: "Engineering plastic protection ring", es: "Anillo de protección de plástico de ingeniería" },
    summary: { en: "Engineering plastic ring, Ø 750 x Ø 880 x 10 mm.", es: "Anillo de plástico de ingeniería, Ø 750 x Ø 880 x 10 mm." },
  },
  "protetor-tubular": {
    reviewed: pending,
    name: { en: "Tubular protector", es: "Protector tubular" },
    summary: {
      en: "Extruded PP tubular profile that protects steel slit coils during stacking.",
      es: "Perfil tubular extruido en PP para proteger los flejes de acero (slitters) durante el apilado.",
    },
    description: {
      en: "Used to protect steel slit coils during stacking.",
      es: "Se utiliza para proteger el fleje de acero (slitter) durante el apilado.",
    },
    features: [
      { en: "Extruded PP profile", es: "Perfil extruido en PP" },
      { en: "Bending and torsion test during manufacturing", es: "Ensayo de flexión y torsión en la fabricación" },
    ],
  },
  "bercos-para-bobinas": {
    reviewed: pending,
    name: { en: "Coil cradles", es: "Cunas para bobinas" },
    summary: {
      en: "Galvanized steel cradles with PU lining to hold and transport coils.",
      es: "Cunas de acero galvanizado con revestimiento de PU para acondicionar y transportar bobinas.",
    },
    description: {
      en: "Designed to hold and transport coils. They have a hot-dip galvanized steel body with a PU 80/90 Shore A top lining, developed to absorb impacts and protect the outer wraps of the coil, keeping it stable and safe during transport.",
      es: "Diseñadas para el acondicionamiento y el transporte de bobinas. Tienen cuerpo de acero galvanizado en caliente con revestimiento superior de PU 80/90 Shore A, desarrollado para absorber impactos y proteger las capas externas de la bobina, garantizando estabilidad y seguridad en el transporte.",
    },
    features: [
      { en: "Hot-dip galvanized steel body", es: "Cuerpo de acero galvanizado en caliente" },
      { en: "PU 80/90 Shore A top lining", es: "Revestimiento superior de PU 80/90 Shore A" },
      { en: "Single and multiple cradle designs", es: "Proyectos de cunas individuales y múltiples" },
    ],
    uses: [
      { en: "Road transport", es: "Transporte por carretera" },
      { en: "Rail transport", es: "Transporte ferroviario" },
      { en: "Coil storage", es: "Almacenamiento de bobinas" },
    ],
  },
  "separador-de-bobinas": {
    reviewed: pending,
    name: { en: "Coil separators", es: "Separadores de bobinas" },
    summary: {
      en: "Rubber straps that separate coils and protect their outer wraps.",
      es: "Cintas de caucho para separar bobinas y proteger sus capas externas.",
    },
    description: {
      en: "Rubber straps designed to separate coils. They absorb impacts, separate and protect the outer wraps of the coil, keeping it stable and safe during transport and storage.",
      es: "Cintas de caucho diseñadas para separar bobinas. Absorben impactos, separan y protegen las capas externas de la bobina, garantizando estabilidad y seguridad en el transporte y el almacenamiento.",
    },
  },
  "cantoneiras-plasticas": {
    reviewed: pending,
    name: { en: "Plastic edge protectors", es: "Cantoneras plásticas" },
    summary: {
      en: "Extruded PP edge protectors that shield edges, spread strapping pressure and stabilize loads.",
      es: "Cantoneras extruidas en PP para proteger bordes, distribuir la presión de los flejes y estabilizar cargas.",
    },
    description: {
      en: "A component used in packaging and cargo transport to protect, reinforce and evenly spread pressure on the edges and corners of packed goods. In steel slit coil packaging, it adds an extra layer of protection, applied together with plastic film, cardboard and strapping.",
      es: "Componente usado en embalaje y transporte de cargas para proteger, reforzar y distribuir de forma uniforme la presión en aristas y esquinas de los productos embalados. En el embalaje de flejes de acero (slitters), funciona como una capa extra de protección, aplicada junto con film plástico, cartón y flejes de amarre.",
    },
    features: [
      { en: "Protects edges and corners against dents, chips and breakage", es: "Protección de bordes y esquinas contra abolladuras, astillas y roturas" },
      { en: "Spreads strapping force, preventing marks on the product", es: "Distribución de la fuerza de los flejes, evitando marcas en el producto" },
      { en: "Stabilizes palletized loads", es: "Estabilización de la carga paletizada" },
      { en: "Structural reinforcement for large or heavy packages", es: "Refuerzo estructural en embalajes grandes o con carga elevada" },
    ],
    uses: [
      { en: "Packaging of steel slit coils and coils", es: "Embalaje de flejes y bobinas de acero" },
      { en: "Palletizing and cargo transport", es: "Paletizado y transporte de cargas" },
    ],
  },
  "cantoneiras-plissadas-plasticas": {
    reviewed: pending,
    name: { en: "Pleated plastic edge protectors", es: "Cantoneras plisadas plásticas" },
    summary: {
      en: "110 x 70 mm PP edge protector, stamped along its length to follow the curvature of coils.",
      es: "Cantonera de 110 x 70 mm en PP, estampada a lo largo de la pieza para acompañar la curvatura de las bobinas.",
    },
    features: [
      { en: "Stamped along its length", es: "Estampada a lo largo de la pieza" },
      { en: "Option with 95 mm blue nonwoven (TNT) on both sides or without nonwoven", es: "Opción con no tejido (TNT) azul de 95 mm en ambos lados o sin TNT" },
      { en: "Lengths from 2200 to 5900 mm", es: "Longitudes de 2200 a 5900 mm" },
    ],
  },
  "cantoneiras-plissadas-metalicas": {
    reviewed: pending,
    name: { en: "Pleated steel edge protectors", es: "Cantoneras plisadas metálicas" },
    summary: {
      en: "Zinc-coated sheet edge protectors, pleated to protect the edges of metal coils.",
      es: "Cantoneras de chapa cincada, plisadas para proteger los bordes de bobinas metálicas.",
    },
    description: {
      en: "The main purpose of the pleated steel edge protector is to protect the edges of metal coils. It is a versatile, effective and economical solution to keep materials intact during transport, storage and handling.",
      es: "La función principal de la cantonera plisada metálica es proteger los bordes de bobinas metálicas. Es una solución versátil, eficaz y económica para garantizar la integridad de los materiales durante el transporte, el almacenamiento y la manipulación.",
    },
    features: [
      { en: "0.50 mm zinc-coated sheet", es: "Chapa cincada de 0,50 mm" },
      { en: "140 x 65 mm flanges", es: "Alas de 140 x 65 mm" },
      { en: "Three-step manufacturing: cutting, bending and pleating", es: "Fabricación en tres etapas: corte, doblado y plisado" },
    ],
  },
  "chapas-metalicas-para-embalagem": {
    reviewed: pending,
    name: { en: "Metal packaging sheets", es: "Chapas metálicas para embalaje" },
    summary: {
      en: "Zinc-coated sheets to separate and protect materials in packaging.",
      es: "Chapas cincadas para separar y proteger materiales en el embalaje.",
    },
    description: {
      en: "Metal sheet for packaging, used to separate and protect materials.",
      es: "Chapa metálica para embalajes, utilizada para separar y proteger materiales.",
    },
    features: [
      { en: "0.65 mm zinc-coated sheet", es: "Chapa cincada de 0,65 mm" },
      { en: "Holes drilled to customer specification", es: "Perforación según especificación del cliente" },
      { en: "Deburred corners, no sharp edges", es: "Esquinas desbastadas, sin cantos vivos" },
    ],
  },
  "colmeias-separadoras": {
    reviewed: pending,
    name: { en: "Honeycomb dividers", es: "Separadores tipo colmena" },
    summary: {
      en: "Extruded PP honeycomb dividers to separate, protect and organize parts in packaging.",
      es: "Colmenas de PP extruido para separar, proteger y organizar piezas en el embalaje.",
    },
    description: {
      en: "Organizer dividers made of black extruded plastic polymer, which adds strength and durability. They separate, protect and organize products in packaging, preventing damage during transport, storage and handling.",
      es: "Colmenas organizadoras producidas en polímero plástico extruido de color negro, lo que aporta más resistencia y durabilidad. Se usan para separar, proteger y organizar productos en el embalaje, evitando daños en el transporte, el almacenamiento y la manipulación.",
    },
    features: [
      { en: "Made of solid material", es: "Fabricadas en material macizo" },
      { en: "Custom designs according to customer needs", es: "Proyectos especiales según la necesidad del cliente" },
      { en: "Combine with layer pads for stacking in layers", es: "Se combinan con tableros para apilar en capas" },
    ],
  },
  "tabuleiros-separadores": {
    reviewed: pending,
    name: { en: "Layer pads", es: "Tableros separadores" },
    summary: {
      en: "Extruded PP layer pads that separate layers of honeycomb dividers and allow stacking.",
      es: "Tableros de PP extruido para separar capas de colmenas y permitir el apilado.",
    },
    description: {
      en: "Layer pads made of black extruded plastic polymer, which adds strength and durability. They separate layers of honeycomb dividers, protecting and organizing products in packaging and allowing safe stacking during transport, storage and handling.",
      es: "Tableros producidos en polímero plástico extruido de color negro, lo que aporta más resistencia y durabilidad. Se usan para separar capas de colmenas, protegiendo y organizando los productos en el embalaje y permitiendo el apilado seguro en el transporte, el almacenamiento y la manipulación.",
    },
  },
  "manta-protetora-multicamadas": {
    reviewed: pending,
    name: { en: "Multilayer protective mat", es: "Manta protectora multicapa" },
    summary: {
      en: "Recyclable multilayer mat, supplied in continuous rolls or cut to size, replacing corrugated PP sheets in material protection.",
      es: "Manta multicapa reciclable, en bobina continua o a medida, que sustituye las planchas alveolares de PP en la protección de materiales.",
    },
    description: {
      en: "Developed to replace protective corrugated PP (alveolar) sheets with a recyclable multilayer protective mat, with better dimensional use and lower packaging cost.",
      es: "Desarrollada para sustituir las planchas alveolares de PP de protección por una manta protectora multicapa reciclable, con mejor aprovechamiento dimensional y menor costo de embalaje.",
    },
    features: [
      { en: "Continuous application, supplied in rolls or cut to size", es: "Aplicación continua, suministrada en bobinas o a medida" },
      { en: "Lightweight and easy to handle in-house", es: "Producto liviano, de fácil manipulación interna" },
      { en: "Does not shatter and has no sharp edges", es: "No se quiebra y no tiene puntas cortantes" },
      { en: "Resistant to impact and moisture", es: "Resistente a impactos y humedad" },
      { en: "Recyclable material", es: "Material reciclable" },
      { en: "Rolls take up less storage space than sheets", es: "Las bobinas ocupan menos espacio de almacenamiento que las planchas" },
    ],
  },
  "paletes-plasticos": {
    reviewed: pending,
    name: { en: "Plastic pallets", es: "Pallets plásticos" },
    summary: {
      en: "Polypropylene pallets for export, with no need for phytosanitary treatment.",
      es: "Pallets de polipropileno para exportación, sin necesidad de tratamiento fitosanitario.",
    },
    description: {
      en: "Designed for exporting goods. As an alternative to wooden pallets, they do not require the phytosanitary treatment and fumigation demanded for exports. They are recyclable, durable and easy to clean.",
      es: "Diseñados para la exportación de mercancías. Como alternativa a los pallets de madera, no requieren el tratamiento fitosanitario ni la fumigación exigidos en la exportación. Son reciclables, durables y de fácil higienización.",
    },
    features: [
      { en: "Stackable", es: "Apilables" },
      { en: "No fumigation needed", es: "No requieren fumigación" },
      { en: "Easy to clean", es: "Fácil higienización" },
      { en: "100% recyclable", es: "100% reciclables" },
    ],
  },
  "estrados-metalicos": {
    reviewed: pending,
    name: { en: "Metal skids", es: "Estrados metálicos" },
    summary: { en: "Steel-frame skids for handling and storing loads.", es: "Estrados con estructura metálica para manipulación y almacenamiento de cargas." },
  },
  "paletes-retornaveis": {
    reviewed: pending,
    name: { en: "Returnable pallets", es: "Pallets retornables" },
    summary: { en: "Returnable pallets with a steel frame for industrial loads.", es: "Pallets retornables con estructura metálica para cargas industriales." },
  },
  "manta-magnetica": {
    reviewed: pending,
    name: { en: "Magnetic protective mat", es: "Manta de protección con imán" },
    summary: { en: "Protective mat with a magnetic face.", es: "Manta de protección con cara magnética." },
  },
  "dutos-corrugados-pead": {
    reviewed: pending,
    name: { en: "Condutex HDPE corrugated ducts", es: "Ductos corrugados de PEAD Condutex" },
    summary: {
      en: "HDPE corrugated ducts, in Standard and NBR lines, to protect power, telecom and fiber optic cables.",
      es: "Ductos corrugados de PEAD, en las líneas Standard y NBR, para proteger cables de energía, telecomunicaciones y fibra óptica.",
    },
    description: {
      en: "High-density polyethylene (HDPE) corrugated ducts, resistant to crushing and to installation impacts. They are flexible and can be bent without losing strength. They protect power, telecom and fiber optic cables in indoor, outdoor and underground installations. The line also includes a drain version, slotted along the duct, for underground drainage.",
      es: "Ductos corrugados de polietileno de alta densidad (PEAD), resistentes al aplastamiento y a los impactos de la instalación. Son flexibles y permiten hacer curvas sin perder resistencia. Protegen cables de energía, de telecomunicaciones y de fibra óptica en instalaciones internas, externas y subterráneas. La línea también tiene versión dren, con cortes a lo largo del ducto, para drenaje subterráneo.",
    },
    features: [
      { en: "Standard line: 320 N compression strength", es: "Línea Standard: resistencia a la compresión de 320 N" },
      { en: "NBR line: 680 N compression strength", es: "Línea NBR: resistencia a la compresión de 680 N" },
      { en: "High-tenacity braided polyester pull cord, Ø 1.5 mm", es: "Guía de cuerda de poliéster trenzado de alta tenacidad, Ø 1,5 mm" },
      { en: "50 m coils", es: "Bobinas de 50 m" },
    ],
    uses: [
      { en: "Power cables", es: "Cables de energía" },
      { en: "Telecom and fiber optics", es: "Telecomunicaciones y fibra óptica" },
      { en: "Underground installations", es: "Instalaciones subterráneas" },
      { en: "Underground drainage (drain version)", es: "Drenaje subterráneo (versión dren)" },
    ],
  },
  "placas-de-protecao-mecanica-de-cabos": {
    reviewed: pending,
    name: { en: "Cable mechanical protection boards", es: "Placas de protección mecánica de cables" },
    summary: {
      en: "Extruded PP and corrugated PP boards for mechanical protection of cables.",
      es: "Placas extruidas en PP y plancha alveolar para la protección mecánica de cables.",
    },
  },
  "fita-de-advertencia": {
    reviewed: pending,
    name: { en: "Warning tape", es: "Cinta de advertencia" },
    summary: {
      en: "Buried tape that marks electrical cables and warns against improper excavation.",
      es: "Cinta enterrada que señaliza cables eléctricos y alerta contra excavaciones indebidas.",
    },
    description: {
      en: "The Dutex warning tape is installed underground to warn workers about electrical cabling at the excavation site. It marks the installation and helps protect it against improper excavation.",
      es: "La cinta de advertencia Dutex se instala enterrada para alertar a los trabajadores sobre la existencia de cableado eléctrico en el lugar de la excavación. Señaliza la instalación y ayuda a protegerla contra excavaciones indebidas.",
    },
  },
  "chapas-e-blanks": {
    reviewed: pending,
    name: { en: "Sheets and blanks", es: "Chapas y blanks" },
    summary: {
      en: "Custom-cut sheets and blanks in ZC, FF and FQ, ready for production.",
      es: "Chapas y blanks cortados a medida en ZC, FF y FQ, listos para la producción.",
    },
    description: {
      en: "Steel processed with industrial precision: coils, custom-cut sheets, slit coils and blanks in ZC, FF and FQ, up to 40 mm thick. Raw material ready for your production.",
      es: "Acero transformado con precisión industrial: bobinas, chapas a medida, flejes (slitter) y blanks en ZC, FF y FQ con espesores de hasta 40 mm. Materia prima lista para su producción.",
    },
  },
};

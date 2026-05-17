export type Product = {
  id: string;
  nombre: string;
  artesano: string;
  region: string;
  categoria: string;
  precio: number;
  descripcion: string;
  emoji: string;
  color: string;
};

export const products: Product[] = [
  {
    id: "aguayo-cochabamba",
    nombre: "Aguayo Tejido a Mano",
    artesano: "María Quispe",
    region: "Cochabamba",
    categoria: "Textiles",
    precio: 320,
    descripcion:
      "Aguayo tradicional tejido en telar de cintura con lana de oveja teñida con tintes naturales. Cada pieza toma alrededor de tres semanas de trabajo y refleja los patrones ancestrales del valle alto.",
    emoji: "🧵",
    color: "oklch(0.55 0.16 28)",
  },
  {
    id: "vasija-tarija",
    nombre: "Vasija de Barro Cocido",
    artesano: "Don Felipe Mamani",
    region: "Tarija",
    categoria: "Cerámica",
    precio: 180,
    descripcion:
      "Vasija moldeada a mano y cocida en horno de leña. Ideal para servir agua o como pieza decorativa. Acabado natural sin esmaltes industriales.",
    emoji: "🏺",
    color: "oklch(0.5 0.12 45)",
  },
  {
    id: "chompa-alpaca",
    nombre: "Chompa de Alpaca Baby",
    artesano: "Cooperativa Sajama",
    region: "La Paz",
    categoria: "Ropa",
    precio: 450,
    descripcion:
      "Chompa tejida con fibra de alpaca baby, la más suave del mercado. Diseño contemporáneo con guarda andina en puños y cuello.",
    emoji: "🧥",
    color: "oklch(0.42 0.07 165)",
  },
  {
    id: "charango-potosi",
    nombre: "Charango de Quirquincho",
    artesano: "Luis Condori",
    region: "Potosí",
    categoria: "Música",
    precio: 890,
    descripcion:
      "Charango artesanal con caja de madera de naranjo y diapasón de jacarandá. Sonido brillante, acabado encerado a mano.",
    emoji: "🎶",
    color: "oklch(0.4 0.08 60)",
  },
  {
    id: "joyas-plata",
    nombre: "Aretes de Plata 950",
    artesano: "Taller Killari",
    region: "Sucre",
    categoria: "Joyería",
    precio: 240,
    descripcion:
      "Aretes en plata 950 con motivo de chacana. Trabajo de filigrana hecho pieza por pieza por orfebres sucrenses.",
    emoji: "✨",
    color: "oklch(0.78 0.04 250)",
  },
  {
    id: "mate-coca",
    nombre: "Set de Mate y Bombilla",
    artesano: "Familia Choque",
    region: "Yungas",
    categoria: "Cocina",
    precio: 95,
    descripcion:
      "Mate de calabaza curado a mano, acompañado de bombilla de alpaca. Listo para usar.",
    emoji: "🍵",
    color: "oklch(0.5 0.09 130)",
  },
  {
    id: "sombrero-cholita",
    nombre: "Sombrero Borsalino",
    artesano: "Sombrerería Illimani",
    region: "El Alto",
    categoria: "Accesorios",
    precio: 380,
    descripcion:
      "Sombrero de fieltro estilo borsalino, símbolo de la elegancia chola. Hecho con moldes tradicionales paceños.",
    emoji: "🎩",
    color: "oklch(0.3 0.02 40)",
  },
  {
    id: "miel-amazonia",
    nombre: "Miel de Abeja Nativa",
    artesano: "Comunidad Tacana",
    region: "Beni",
    categoria: "Gourmet",
    precio: 65,
    descripcion:
      "Miel pura de abejas sin aguijón, recolectada en la Amazonía boliviana. Sabor floral y delicado.",
    emoji: "🍯",
    color: "oklch(0.72 0.13 85)",
  },
];

export const categorias = [
  "Todos",
  "Textiles",
  "Cerámica",
  "Ropa",
  "Música",
  "Joyería",
  "Cocina",
  "Accesorios",
  "Gourmet",
];

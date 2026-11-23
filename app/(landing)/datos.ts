// Contenido de la landing que todavía no se edita desde el admin.
// Deuda: los tracks y las empresas pasan a D1 (tablas companies, company_roles y tracks) en el PR 1.2,
// y la agenda al JSON de event_content. Hasta entonces viven aquí. No se inventan datos: lo que no
// está confirmado se muestra como «por anunciar».

export type Empresa = { nombre: string; logo?: string; url?: string };

export type Track = {
  empresa: Empresa | null;
  // Etiqueta corta bajo la empresa (a qué se dedica). Opcional.
  def?: string;
  titulo?: string;
  descripcion?: string;
};

const kapia: Empresa = {
  nombre: "Kapia",
  logo: "/logos/empresas/kapia.svg",
};
const bendingSpoons: Empresa = {
  nombre: "Bending Spoons",
  logo: "/logos/empresas/bending-spoons.svg",
};

export const tracks: Track[] = [
  { empresa: kapia },
  { empresa: bendingSpoons, def: "Apps para millones" },
  { empresa: null },
  { empresa: null },
  { empresa: null },
  { empresa: null },
];

export const empresasCinta: Empresa[] = tracks.flatMap((t) =>
  t.empresa?.logo ? [t.empresa] : [],
);

export type Momento = { hora?: string; titulo: string; vineta: string };
export type Dia = { titulo: string; etiqueta: string; momentos: Momento[] };

const g = (f: string) => `/grabados/agenda/${f}`;

export const agenda: Dia[] = [
  {
    titulo: "Viernes 19",
    etiqueta: "Día 1",
    momentos: [
      { hora: "17:00", titulo: "Acreditación", vineta: g("jarron-flores.webp") },
      { titulo: "Apertura y presentación de los tracks", vineta: g("ave-laurel.webp") },
      { titulo: "Empieza el hacking", vineta: g("torre.webp") },
      { titulo: "Merienda", vineta: g("croissant.svg") },
      { titulo: "Talleres y mentorías", vineta: g("lira.webp") },
      { titulo: "Cena", vineta: g("copa-flores.webp") },
      { titulo: "Cierre del día 1", vineta: g("flor.webp") },
    ],
  },
  {
    titulo: "Sábado 20",
    etiqueta: "Día 2",
    momentos: [
      { titulo: "Apertura de puertas y desayuno", vineta: g("cafe.svg") },
      { titulo: "Sigue el hacking", vineta: g("torre.webp") },
      { titulo: "Comida", vineta: g("pizza.svg") },
      { titulo: "Merienda", vineta: g("croissant.svg") },
      { titulo: "Entrega de proyectos", vineta: g("guirnalda.webp") },
      { titulo: "Presentaciones al jurado", vineta: g("balanza.svg") },
      { titulo: "Entrega de premios", vineta: g("corona-cinta.webp") },
    ],
  },
];

export type Cifra = { n: number; unidad: string; euros?: boolean; texto: string };

export const cifras: Cifra[] = [
  {
    n: 300,
    unidad: "hackers",
    texto:
      "Estudiantes que pasan dos días en el campus de Leganés, en equipos de 1 a 4.",
  },
  {
    n: 2,
    unidad: "días",
    texto:
      "XIX – XX · II · MMXXVII. Dos días seguidos para pasar de la idea a algo que funcione.",
  },
  {
    n: 6,
    unidad: "tracks",
    texto: "Seis empresas proponen un reto cada una y cada equipo elige el suyo.",
  },
  {
    n: 2500,
    unidad: "en premios",
    euros: true,
    texto:
      "Un gran premio de 1250 € al mejor proyecto y el resto, repartido entre los tracks.",
  },
];

export const premio = {
  total: 1250,
  desglose: ["Premio global: 1000 €", "Premio de track: 250 €"],
};

// Inicio del evento, para el contador del hero.
export const inicio = "2027-02-19T09:00:00+01:00";

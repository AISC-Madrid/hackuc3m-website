// Contenido de la landing que todavía no se edita desde el admin: cifras, premio y fecha de inicio.
// Tracks, empresas (tablas de D1) y agenda (event_content.agenda) ya se editan allí. No se inventan datos.

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
      "Un gran premio de 1.250€ al mejor proyecto y el resto, repartido entre los tracks.",
  },
];

export const premio = {
  total: 1250,
  desglose: ["Premio global: 1.000€", "Premio de track: 250€"],
};

// Inicio del evento, para el contador del hero.
export const inicio = "2027-02-19T09:00:00+01:00";

// Euros a la española de la web: punto de millar también con cuatro cifras y sin espacio («1.250€»).
export const euros = (n: number) => String(n).replace(/\B(?=(\d{3})+$)/g, ".") + "€";

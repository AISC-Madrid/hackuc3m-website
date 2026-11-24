// Viñetas de la agenda: catálogo cerrado de public/grabados/agenda/ (cada una con su crédito).
export const VINETAS_AGENDA: Record<string, string> = {
  "jarron-flores.webp": "Jarrón con flores",
  "ave-laurel.webp": "Ave con laurel",
  "torre.webp": "Torre",
  "croissant.svg": "Cruasán",
  "lira.webp": "Lira",
  "copa-flores.webp": "Copa con flores",
  "flor.webp": "Flor",
  "cafe.svg": "Café",
  "pizza.svg": "Pizza",
  "guirnalda.webp": "Guirnalda",
  "balanza.svg": "Balanza",
  "corona-cinta.webp": "Corona con cinta",
};
// hora vacía = «por fijar» en la web.
export type Momento = { hora: string; titulo: string; vineta: string };
export type Dia = { titulo: string; etiqueta: string; momentos: Momento[] };

export type EventContent = {
  date: string;
  venue: string;
  intro: string;
  waitlistOpen: boolean;
  agenda: Dia[];
  faqs: { question: string; answer: string }[];
};

export const initialContent: EventContent = {
  date: "19–20 febrero 2027",
  venue: "EPS · Campus de Leganés",
  intro:
    "Dos días para convertir una idea en algo que funcione. Retos reales de la industria y talento universitario, en HackUC3M.",
  waitlistOpen: true,
  agenda: [
    {
      titulo: "Viernes 19",
      etiqueta: "Día 1",
      momentos: [
        { hora: "17:00", titulo: "Acreditación", vineta: "jarron-flores.webp" },
        { hora: "", titulo: "Apertura y presentación de los tracks", vineta: "ave-laurel.webp" },
        { hora: "", titulo: "Empieza el hacking", vineta: "torre.webp" },
        { hora: "", titulo: "Merienda", vineta: "croissant.svg" },
        { hora: "", titulo: "Talleres y mentorías", vineta: "lira.webp" },
        { hora: "", titulo: "Cena", vineta: "copa-flores.webp" },
        { hora: "", titulo: "Cierre del día 1", vineta: "flor.webp" },
      ],
    },
    {
      titulo: "Sábado 20",
      etiqueta: "Día 2",
      momentos: [
        { hora: "", titulo: "Apertura de puertas y desayuno", vineta: "cafe.svg" },
        { hora: "", titulo: "Sigue el hacking", vineta: "torre.webp" },
        { hora: "", titulo: "Comida", vineta: "pizza.svg" },
        { hora: "", titulo: "Merienda", vineta: "croissant.svg" },
        { hora: "", titulo: "Entrega de proyectos", vineta: "guirnalda.webp" },
        { hora: "", titulo: "Presentaciones al jurado", vineta: "balanza.svg" },
        { hora: "", titulo: "Entrega de premios", vineta: "corona-cinta.webp" },
      ],
    },
  ],
  faqs: [
    {
      question: "¿La preinscripción confirma mi plaza?",
      answer:
        "Todavía no. Al preinscribirte te enviaremos el enlace cuando abramos las inscripciones y tendrás prioridad para apuntarte. La participación se confirmará durante el proceso de inscripción.",
    },
    {
      question: "¿Cuándo y dónde es?",
      answer:
        "El 19 y 20 de febrero de 2027, en la Escuela Politécnica Superior de la Universidad Carlos III de Madrid, Campus de Leganés.",
    },
    {
      question: "¿Qué retos habrá?",
      answer:
        "Ya hay varios retos confirmados. Publicaremos los tracks, las empresas participantes y todos los detalles aquí antes de abrir las inscripciones.",
    },
    {
      question: "¿Cómo puede participar mi empresa?",
      answer:
        "Escríbenos a aisc.asoc@uc3m.es para hablar de patrocinio y retos. Queremos conectar problemas reales con el talento universitario.",
    },
  ],
};

export function validContent(value: unknown): value is EventContent {
  if (!value || typeof value !== "object") return false;
  const c = value as Record<string, unknown>;
  const text = (v: unknown, max = 2000) =>
    typeof v === "string" && v.trim().length > 0 && v.length <= max;
  return (
    text(c.date, 100) &&
    text(c.venue, 200) &&
    text(c.intro) &&
    typeof c.waitlistOpen === "boolean" &&
    Array.isArray(c.agenda) &&
    c.agenda.length >= 1 &&
    c.agenda.length <= 4 &&
    c.agenda.every(
      (d) =>
        d &&
        text(d.titulo, 40) &&
        text(d.etiqueta, 40) &&
        Array.isArray(d.momentos) &&
        d.momentos.length <= 15 &&
        d.momentos.every(
          (m: Record<string, unknown>) =>
            m &&
            text(m.titulo, 80) &&
            typeof m.hora === "string" &&
            /^(|([01]\d|2[0-3]):[0-5]\d)$/.test(m.hora) &&
            typeof m.vineta === "string" &&
            Object.hasOwn(VINETAS_AGENDA, m.vineta),
        ),
    ) &&
    Array.isArray(c.faqs) &&
    c.faqs.length <= 30 &&
    c.faqs.every((f) => f && text(f.question, 200) && text(f.answer))
  );
}

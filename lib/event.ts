export type EventContent = {
  date: string;
  venue: string;
  intro: string;
  waitlistOpen: boolean;
  faqs: { question: string; answer: string }[];
};

export const initialContent: EventContent = {
  date: "19–20 febrero 2027",
  venue: "EPS · Campus de Leganés",
  intro:
    "Dos días para convertir una idea en algo que funcione. Retos reales de la industria y talento universitario, en HackUC3M.",
  waitlistOpen: true,
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
    Array.isArray(c.faqs) &&
    c.faqs.length <= 30 &&
    c.faqs.every((f) => f && text(f.question, 200) && text(f.answer))
  );
}

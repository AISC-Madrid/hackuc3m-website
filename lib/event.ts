// logo: /media/<clave> (subido desde el admin a R2) o /logos/empresas/<fichero> (del repositorio).
export type Empresa = { nombre: string; logo?: string; url?: string };
export type Reto = {
  empresa: Empresa | null;
  def?: string; // etiqueta corta bajo la empresa
  titulo?: string;
  descripcion?: string;
};

export type EventContent = {
  date: string;
  venue: string;
  intro: string;
  waitlistOpen: boolean;
  // Un track por posición, en orden. Sin empresa sale «Por anunciar»; la cinta usa los logos.
  retos: Reto[];
  faqs: { question: string; answer: string }[];
};

export const initialContent: EventContent = {
  date: "19–20 febrero 2027",
  venue: "EPS · Campus de Leganés",
  intro:
    "Dos días para convertir una idea en algo que funcione. Retos reales de la industria y talento universitario, en HackUC3M.",
  waitlistOpen: true,
  retos: [
    { empresa: { nombre: "Kapia", logo: "/logos/empresas/kapia.svg" } },
    {
      empresa: { nombre: "Bending Spoons", logo: "/logos/empresas/bending-spoons.svg" },
      def: "Apps para millones",
    },
    { empresa: null },
    { empresa: null },
    { empresa: null },
    { empresa: null },
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

// Clave de R2 que genera /api/admin/media, o un fichero de public/logos/empresas/.
export const CLAVE_MEDIA = /^logo-[0-9a-f-]{36}\.(png|webp|jpg|svg)$/;
const LOGO = new RegExp(`^/media/${CLAVE_MEDIA.source.slice(1, -1)}$|^/logos/empresas/[a-z0-9-]+\\.(svg|png|webp)$`);

export function validContent(value: unknown): value is EventContent {
  if (!value || typeof value !== "object") return false;
  const c = value as Record<string, unknown>;
  const text = (v: unknown, max = 2000) =>
    typeof v === "string" && v.trim().length > 0 && v.length <= max;
  const url = (v: unknown) => {
    try {
      return typeof v === "string" && new URL(v).protocol === "https:";
    } catch {
      return false;
    }
  };
  const logo = (v: unknown) => typeof v === "string" && LOGO.test(v);
  return (
    text(c.date, 100) &&
    text(c.venue, 200) &&
    text(c.intro) &&
    typeof c.waitlistOpen === "boolean" &&
    Array.isArray(c.retos) &&
    c.retos.length <= 12 &&
    c.retos.every(
      (r) =>
        r &&
        typeof r === "object" &&
        (r.empresa === null ||
          (typeof r.empresa === "object" &&
            text(r.empresa.nombre, 100) &&
            (r.empresa.url === undefined || url(r.empresa.url)) &&
            (r.empresa.logo === undefined || logo(r.empresa.logo)))) &&
        (r.def === undefined || text(r.def, 60)) &&
        (r.titulo === undefined || text(r.titulo, 120)) &&
        (r.descripcion === undefined || text(r.descripcion, 600)),
    ) &&
    Array.isArray(c.faqs) &&
    c.faqs.length <= 30 &&
    c.faqs.every((f) => f && text(f.question, 200) && text(f.answer))
  );
}

import creditos from "@/assets/creditos.json";
import { inline, romano, type Apartado, type Documento } from "@/lib/documento";
import PaginaDocumento from "../documento/documento";

export const metadata = { title: "Créditos · HackUC3M ’27" };

type Credito = { fichero: string; titulo: string; autor: string; fuente: string; licencia: string };

// Grupos de assets/creditos.json por carpeta, en el orden en que aparecen en la web.
const GRUPOS: [string, string, string][] = [
  ["grabados/esquinas/", "Esquineras", "Los roleos con pájaros que abren cada página."],
  ["grabados/laminas/", "Láminas", "Las dos estampas de época de la portada."],
  ["grabados/vinetas/", "Viñetas y remates", "Cartela del premio, laurel, florón y remate."],
  ["grabados/agenda/", "Viñetas de la agenda", "Un grabado pequeño para cada momento."],
  ["grabados/tramas/", "Papeles y tramas", "Flor de lis, verjurado y filigrana."],
  ["grabados/signos/", "Signos de imprenta", "La manecilla que señala."],
  ["campus/", "Skyline del campus", "Los edificios de la EPS, dibujados para esta web."],
  ["logos/", "Logos e iconos", "Logos ajenos, con sus colores originales."],
];

const ficha = (c: Credito) =>
  inline(`**${c.titulo}**. ${c.autor}. ${c.fuente} · ${c.licencia}.`);

type Borrador = Omit<Apartado, "id" | "numeral">;

const apartados: Apartado[] = GRUPOS.flatMap(([prefijo, titulo, glosa]): Borrador[] => {
  const items = (creditos as Credito[]).filter((c) => c.fichero.startsWith(prefijo)).map(ficha);
  return items.length ? [{ titulo, glosa, bloques: [{ t: "ul" as const, items }] }] : [];
})
  .concat(([
    {
      titulo: "Tipografías",
      glosa: "Cinco familias libres, servidas desde esta web.",
      bloques: [
        {
          t: "ul",
          items: [
            "Ibarra Real Nova, para leer y titular",
            "Brygada 1918, para etiquetas y notas",
            "Cinzel, para el nombre y los rótulos",
            "Corinthia, para el ’27 a pluma",
            "Xanh Mono, para las cifras",
          ].map((t) => inline(`**${t}**. Google Fonts · SIL Open Font License 1.1.`)),
        },
      ],
    },
    {
      titulo: "Marcas",
      glosa: "Cada logo es de su titular.",
      bloques: [
        {
          t: "p",
          v: inline(
            "Los logos de AI Student Collective Madrid y de las empresas de los tracks pertenecen a sus titulares y se usan para identificarlos.",
          ),
        },
      ],
    },
  ] satisfies Borrador[]) as Borrador[])
  .map((a, i) => ({ ...a, id: `creditos-${i + 1}`, numeral: romano(i + 1) }));

const doc: Documento = {
  titulo: "Créditos",
  documento: "IV",
  entradilla: "Grabados de dominio público y CC0, con su fuente.",
  vigencia: "Actualizado el 23 · XI · 2026",
  vineta: "flor",
  otro: { href: "/privacidad", titulo: "Privacidad" },
  intro: [
    inline(
      "Todo lo que ilustra esta web son grabados reales de dominio público o CC0, recortados y entintados con la paleta de HackUC3M. Esta es la procedencia de cada uno.",
    ),
  ],
  apartados,
};

export default function Creditos() {
  return <PaginaDocumento doc={doc} />;
}

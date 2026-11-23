// Lector del markdown de las páginas de documento (contenido/*.md). Solo entiende las piezas de la
// plantilla Legal del canvas, para que quien edite el texto no toque diseño y no haga falta una
// dependencia de markdown:
//   cabecera --- clave: valor ---     titulo, documento, entradilla, vigencia, vineta, otro (ruta · título)
//   párrafos antes del primer ##      entradilla larga
//   ## Título                         apartado con numeral romano automático (y entrada del índice)
//   > frase, justo bajo el ##         glosa «En corto» (opcional)
//   ### Subtítulo                     rótulo dentro del apartado
//   - lista · 1. lista                lista con raya · numerada
//   **negrita** · [texto](url)        énfasis · enlace
//   ---  (entre apartados)            florón de separación

export type Inline =
  | { t: "texto"; v: string }
  | { t: "negrita"; v: string }
  | { t: "enlace"; v: string; href: string };

export type Bloque =
  | { t: "p"; v: Inline[] }
  | { t: "h3"; v: string }
  | { t: "ul" | "ol"; items: Inline[][] }
  | { t: "floron" };

export type Apartado = {
  id: string;
  numeral: string;
  titulo: string;
  glosa?: string;
  bloques: Bloque[];
};

export type Documento = {
  titulo: string;
  documento: string;
  entradilla: string;
  vigencia: string;
  vineta: string;
  otro?: { href: string; titulo: string };
  intro: Inline[][];
  apartados: Apartado[];
};

const ROMANOS: [number, string][] = [
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

export function romano(n: number): string {
  let s = "";
  for (const [v, r] of ROMANOS)
    while (n >= v) {
      s += r;
      n -= v;
    }
  return s;
}

export function inline(texto: string): Inline[] {
  const partes: Inline[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let ultimo = 0;
  for (const m of texto.matchAll(re)) {
    if (m.index > ultimo) partes.push({ t: "texto", v: texto.slice(ultimo, m.index) });
    if (m[1] !== undefined) partes.push({ t: "negrita", v: m[1] });
    else partes.push({ t: "enlace", v: m[2], href: m[3] });
    ultimo = m.index + m[0].length;
  }
  if (ultimo < texto.length) partes.push({ t: "texto", v: texto.slice(ultimo) });
  return partes;
}

const OBLIGATORIAS = ["titulo", "documento", "entradilla", "vigencia", "vineta"] as const;

export function leerDocumento(fuente: string, prefijo: string): Documento {
  const m = fuente.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${prefijo}: falta la cabecera --- … ---`);
  const meta: Record<string, string> = {};
  for (const linea of m[1].split("\n")) {
    const kv = linea.match(/^(\w+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim();
  }
  for (const k of OBLIGATORIAS) if (!meta[k]) throw new Error(`${prefijo}: falta «${k}» en la cabecera`);
  let otro: Documento["otro"];
  if (meta.otro) {
    const [href, ...titulo] = meta.otro.split(" · ");
    otro = { href: href.trim(), titulo: titulo.join(" · ").trim() };
  }

  const intro: Inline[][] = [];
  const apartados: Apartado[] = [];
  // Agrupa las líneas en bloques separados por líneas en blanco, sin perder los cambios de tipo.
  const lineas = m[2].split("\n");
  let actual: Apartado | null = null;
  let parrafo: string[] = [];
  let lista: { t: "ul" | "ol"; items: Inline[][] } | null = null;

  const cerrar = () => {
    if (parrafo.length) {
      const v = inline(parrafo.join(" "));
      if (actual) actual.bloques.push({ t: "p", v });
      else intro.push(v);
      parrafo = [];
    }
    if (lista && actual) actual.bloques.push(lista);
    lista = null;
  };

  for (const bruta of lineas) {
    const l = bruta.trim();
    if (!l) {
      cerrar();
      continue;
    }
    let r: RegExpMatchArray | null;
    if ((r = l.match(/^##\s+(.+)$/)) && !l.startsWith("###")) {
      cerrar();
      const n = apartados.length + 1;
      actual = { id: `${prefijo}-${n}`, numeral: romano(n), titulo: r[1], bloques: [] };
      apartados.push(actual);
    } else if ((r = l.match(/^###\s+(.+)$/))) {
      cerrar();
      if (!actual) throw new Error(`${prefijo}: ### antes del primer ##`);
      actual.bloques.push({ t: "h3", v: r[1] });
    } else if ((r = l.match(/^>\s*(.+)$/))) {
      cerrar();
      if (!actual || actual.bloques.length || actual.glosa)
        throw new Error(`${prefijo}: la glosa (>) va justo bajo el ##`);
      actual.glosa = r[1];
    } else if (l === "---") {
      cerrar();
      if (!actual) throw new Error(`${prefijo}: --- antes del primer ##`);
      actual.bloques.push({ t: "floron" });
    } else if ((r = l.match(/^(-|\d+\.)\s+(.+)$/))) {
      if (parrafo.length) cerrar();
      if (!actual) throw new Error(`${prefijo}: lista antes del primer ##`);
      const tipo = r[1] === "-" ? "ul" : "ol";
      if (lista && lista.t !== tipo) cerrar();
      lista ??= { t: tipo, items: [] };
      lista.items.push(inline(r[2]));
    } else {
      if (lista) cerrar();
      parrafo.push(l);
    }
  }
  cerrar();
  if (!apartados.length) throw new Error(`${prefijo}: no hay ningún apartado (##)`);

  return {
    titulo: meta.titulo,
    documento: meta.documento,
    entradilla: meta.entradilla,
    vigencia: meta.vigencia,
    vineta: meta.vineta,
    otro,
    intro,
    apartados,
  };
}

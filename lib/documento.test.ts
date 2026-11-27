import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { inline, leerDocumento, romano } from "./documento.ts";

const ejemplo = `---
titulo: Privacidad
documento: I
entradilla: Tu correo, para HackUC3M.
vigencia: Vigente desde hoy
vineta: torre
otro: /codigo-de-conducta · Código de conducta
---

Entradilla larga
en dos líneas.

## Qué guardamos
> En corto.

Tu correo y **nada más**.

### Cloudflare
Aloja la web.

- uno
- dos [enlace](mailto:a@b.es)

---

## Derechos

1. Acceso.
2. Borrado.
`;

test("lee cabecera, entradilla, apartados, glosa, listas y florón", () => {
  const d = leerDocumento(ejemplo, "privacidad");
  assert.equal(d.titulo, "Privacidad");
  assert.deepEqual(d.otro, { href: "/codigo-de-conducta", titulo: "Código de conducta" });
  assert.deepEqual(d.intro, [[{ t: "texto", v: "Entradilla larga en dos líneas." }]]);
  assert.equal(d.apartados.length, 2);
  const [a, b] = d.apartados;
  assert.equal(a.id, "privacidad-1");
  assert.equal(a.numeral, "I");
  assert.equal(a.glosa, "En corto.");
  assert.deepEqual(
    a.bloques.map((x) => x.t),
    ["p", "h3", "p", "ul", "floron"],
  );
  assert.equal(b.numeral, "II");
  assert.deepEqual(b.bloques[0], {
    t: "ol",
    items: [[{ t: "texto", v: "Acceso." }], [{ t: "texto", v: "Borrado." }]],
  });
});

test("negrita y enlaces en línea", () => {
  assert.deepEqual(inline("a **b** [c](https://x.es) d"), [
    { t: "texto", v: "a " },
    { t: "negrita", v: "b" },
    { t: "texto", v: " " },
    { t: "enlace", v: "c", href: "https://x.es" },
    { t: "texto", v: " d" },
  ]);
});

test("numerales romanos", () => {
  assert.deepEqual([1, 4, 5, 9, 12].map(romano), ["I", "IV", "V", "IX", "XII"]);
});

test("falla con una cabecera incompleta o una glosa fuera de sitio", () => {
  assert.throws(() => leerDocumento("---\ntitulo: X\n---\n## A\n", "x"), /falta/);
  assert.throws(
    () => leerDocumento(ejemplo.replace("> En corto.", "Texto.\n\n> Tarde."), "x"),
    /glosa/,
  );
});

test("los documentos de contenido/ se leen sin errores y no dejan [corchetes]", () => {
  const dir = new URL("../contenido/", import.meta.url);
  for (const f of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
    const fuente = readFileSync(new URL(f, dir), "utf8");
    leerDocumento(fuente, f.replace(".md", ""));
    const sinEnlaces = fuente.replace(/\[[^\]]+\]\([^)]+\)/g, "");
    assert.doesNotMatch(sinEnlaces, /\[[^\]]*\]/, `${f} tiene texto entre corchetes`);
  }
});

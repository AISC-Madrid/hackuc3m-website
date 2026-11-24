import assert from "node:assert/strict";
import { test } from "node:test";
import { initialContent, validContent, type Reto } from "./event.ts";

const con = (retos: Reto[]) => ({ ...initialContent, retos });
const uuid = "0f8fad5b-d9cb-469f-a165-70867728950e";

test("el contenido inicial es válido", () => assert.ok(validContent(initialContent)));

test("logos: solo de R2 (/media) o de public/logos/empresas", () => {
  const logo = (l: string) => validContent(con([{ empresa: { nombre: "X", logo: l } }]));
  assert.ok(logo(`/media/logo-${uuid}.svg`));
  assert.ok(logo("/logos/empresas/kapia.svg"));
  assert.ok(!logo("https://evil.example/x.svg"));
  assert.ok(!logo("/media/../secreto"));
  assert.ok(!logo(`/media/logo-${uuid}.html`));
  assert.ok(!logo("javascript:alert(1)"));
});

test("retos: empresa nula vale; web solo https; campos vacíos no", () => {
  assert.ok(validContent(con([{ empresa: null }])));
  assert.ok(!validContent(con([{ empresa: { nombre: "X", url: "http://x.es" } }])));
  assert.ok(!validContent(con([{ empresa: null, titulo: "" }])));
  assert.ok(!validContent(con(Array.from({ length: 13 }, () => ({ empresa: null })))));
});

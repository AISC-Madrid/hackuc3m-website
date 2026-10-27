// Comprueba que los colores de DESIGN.md, app/globals.css y los emails no se separan.
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const HEX = /#[0-9a-f]{3,8}\b/gi;

function pairs(source, pattern) {
  const found = [...source.matchAll(pattern)].map(([, name, hex]) => [
    name.toLowerCase().replaceAll(" ", "-"),
    hex.toLowerCase(),
  ]);
  assert.ok(found.length > 0, `No hay colores para ${pattern}`);
  assert.equal(new Set(found.map(([name]) => name)).size, found.length);
  return Object.fromEntries(found);
}

const design = read("DESIGN.md");
const table = pairs(
  design.split("\n## Color\n")[1].split("\n## ")[0],
  /^\| ([A-Za-z ]+) \| `(#[0-9a-f]{6})` \|/gim,
);
const palette = new Set(Object.values(table));
const css = read("app/globals.css");
const rootBlock = css.match(/:root \{([^}]*)\}/)[1];

test("el frontmatter de DESIGN.md coincide con su tabla de color", () => {
  const frontmatter = design.split("\n---\n")[0].split("\ncolors:\n")[1];
  const colors = frontmatter.split(/\n\S/)[0];
  assert.deepEqual(pairs(colors, /^ {2}([a-z-]+): "(#[0-9a-f]{6})"/gm), table);
});

test("los tokens de app/globals.css coinciden con DESIGN.md", () => {
  assert.deepEqual(pairs(rootBlock, /--([a-z-]+): (#[0-9a-f]{6});/g), table);
});

test("app/globals.css solo escribe colores literales en :root", () => {
  assert.deepEqual(css.replace(rootBlock, "").match(HEX), null);
});

test("los emails solo usan colores de la paleta", () => {
  const used = read("lib/confirmation-email.ts").match(HEX) ?? [];
  const outside = used.filter((hex) => !palette.has(hex.toLowerCase()));
  assert.deepEqual(outside, []);
});

test("los componentes no escriben colores literales", () => {
  const files = ["app", "lib"].flatMap((dir) =>
    readdirSync(new URL(dir, root), { recursive: true })
      .filter((file) => /\.tsx?$/.test(file))
      .map((file) => join(dir, file)),
  );
  const offenders = files
    .filter((file) => !file.endsWith("confirmation-email.ts"))
    .filter((file) => read(file.replaceAll("\\", "/")).match(HEX));
  assert.deepEqual(offenders, []);
});

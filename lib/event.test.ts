import assert from "node:assert/strict";
import { test } from "node:test";
import { initialContent, validContent } from "./event.ts";

test("el contenido inicial es válido", () => assert.ok(validContent(initialContent)));

test("evento: campos obligatorios y preguntas con texto", () => {
  assert.ok(!validContent({ ...initialContent, date: " " }));
  assert.ok(!validContent({ ...initialContent, waitlistOpen: "sí" }));
  assert.ok(!validContent({ ...initialContent, faqs: [{ question: "¿?", answer: "" }] }));
});

test("agenda: hora vacía o HH:MM, viñeta del catálogo y al menos un día", () => {
  const dia = (m: object) => ({ ...initialContent, agenda: [{ titulo: "Viernes 19", etiqueta: "Día 1", momentos: [m] }] });
  assert.ok(validContent(dia({ hora: "", titulo: "Cena", vineta: "pizza.svg" })));
  assert.ok(validContent(dia({ hora: "09:30", titulo: "Cena", vineta: "pizza.svg" })));
  assert.ok(!validContent(dia({ hora: "25:00", titulo: "Cena", vineta: "pizza.svg" })));
  assert.ok(!validContent(dia({ hora: "", titulo: "Cena", vineta: "../../secreto.svg" })));
  assert.ok(!validContent(dia({ hora: "", titulo: " ", vineta: "pizza.svg" })));
  assert.ok(!validContent({ ...initialContent, agenda: [] }));
});

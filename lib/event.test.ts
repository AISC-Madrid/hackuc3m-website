import assert from "node:assert/strict";
import { test } from "node:test";
import { initialContent, validContent } from "./event.ts";

test("el contenido inicial es válido", () => assert.ok(validContent(initialContent)));

test("evento: campos obligatorios y preguntas con texto", () => {
  assert.ok(!validContent({ ...initialContent, date: " " }));
  assert.ok(!validContent({ ...initialContent, waitlistOpen: "sí" }));
  assert.ok(!validContent({ ...initialContent, faqs: [{ question: "¿?", answer: "" }] }));
});

import assert from "node:assert/strict";
import { test } from "node:test";
import {
  barajar,
  erroresPublicacion,
  validEmpresaPublica,
  validInterno,
  validTrack,
  type EmpresaPublica,
  type Track,
} from "./empresas.ts";

const uuid = "0f8fad5b-d9cb-469f-a165-70867728950e";
const emp = (o: Partial<EmpresaPublica> = {}): EmpresaPublica => ({
  id: 1, nombre: "Kapia", web: null, corta: "", larga: "",
  isotipo: null, isologo: null, enCinta: false, ...o,
});
const trk = (o: Partial<Track> = {}): Track => ({ id: 1, empresaId: null, titulo: "", reto: "", premio: "", ...o });

test("empresa pública: nombre obligatorio, web solo https, logos solo de R2 o del repositorio", () => {
  assert.ok(validEmpresaPublica(emp()));
  assert.ok(!validEmpresaPublica(emp({ nombre: " " })));
  assert.ok(validEmpresaPublica(emp({ web: "https://kapia.es" })));
  assert.ok(!validEmpresaPublica(emp({ web: "http://kapia.es" })));
  assert.ok(validEmpresaPublica(emp({ isotipo: `/media/logo-${uuid}.svg`, isologo: "/logos/empresas/kapia-isologo.svg" })));
  assert.ok(!validEmpresaPublica(emp({ isotipo: "https://evil.example/x.svg" })));
  assert.ok(!validEmpresaPublica(emp({ isologo: `/media/logo-${uuid}.html` })));
  assert.ok(!validEmpresaPublica(emp({ corta: "x".repeat(61) })));
});

test("interno: etapas y papeles de la lista, sin repetir", () => {
  assert.ok(validInterno({ etapa: "perdida" }));
  assert.ok(validInterno({ papeles: ["infra", "jurado"] }));
  assert.ok(!validInterno({ papeles: ["infra", "infra"] }));
  assert.ok(!validInterno({ papeles: ["mecenas"] }));
  assert.ok(!validInterno({ etapa: "ganada" }));
  assert.ok(!validInterno({}));
});

test("publicar: solo empresas confirmadas con track y una empresa por track", () => {
  const conf = new Set([1]);
  assert.equal(erroresPublicacion([emp()], [trk({ empresaId: 1 }), trk({ id: -1 })], conf), null);
  assert.match(erroresPublicacion([emp()], [trk({ empresaId: 2 })], conf)!, /confirmada/);
  assert.match(erroresPublicacion([emp()], [trk({ empresaId: 1 }), trk({ id: 2, empresaId: 1 })], conf)!, /dos tracks/);
  assert.ok(erroresPublicacion([emp()], [], conf));
  assert.ok(!validTrack(trk({ id: 0 })));
});

test("barajar: mismos elementos, sin tocar la lista original", () => {
  const l = [1, 2, 3, 4, 5, 6];
  const b = barajar(l, () => 0);
  assert.deepEqual([...b].sort(), l);
  assert.deepEqual(l, [1, 2, 3, 4, 5, 6]);
  assert.notDeepEqual(b, l);
});

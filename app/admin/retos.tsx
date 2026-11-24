"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import type { Empresa, Reto } from "@/lib/event";

// Tracks y sus empresas, en el orden en que salen en la landing. Un track sin empresa sale «Por anunciar».
export default function Retos({ retos, cambiar }: { retos: Reto[]; cambiar: (r: Reto[]) => void }) {
  const [subiendo, setSubiendo] = useState<number | null>(null);
  const [aviso, setAviso] = useState("");
  const poner = (i: number, r: Reto) => cambiar(retos.map((x, n) => (n === i ? r : x)));
  const empresa = (r: Reto): Empresa => r.empresa ?? { nombre: "" };
  const mover = (i: number, d: number) => {
    const copia = [...retos];
    [copia[i], copia[i + d]] = [copia[i + d], copia[i]];
    cambiar(copia);
  };

  async function subir(i: number, fichero: File) {
    setSubiendo(i);
    setAviso("");
    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": fichero.type },
        body: fichero,
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error);
      poner(i, { ...retos[i], empresa: { ...empresa(retos[i]), logo: data.url } });
    } catch (e) {
      setAviso(e instanceof Error && e.message ? e.message : "No se ha podido subir el logo.");
    } finally {
      setSubiendo(null);
    }
  }

  return (
    <>
      <h2>Tracks y empresas</h2>
      <p>
        En el orden de la web. Deja la empresa vacía para que el track salga «Por anunciar». Las empresas
        con logo salen también en la cinta.
      </p>
      {aviso && <p role="alert">{aviso}</p>}
      {retos.map((r, i) => {
        const e = empresa(r);
        const campo = (k: keyof Empresa, v: string) => poner(i, { ...r, empresa: { ...e, [k]: v } });
        const texto = (k: "def" | "titulo" | "descripcion", v: string) => poner(i, { ...r, [k]: v });
        return (
          <fieldset className="admin-row" key={i}>
            <legend>Track {String(i + 1).padStart(2, "0")}</legend>
            <label htmlFor={`emp-${i}`}>Empresa</label>
            <input id={`emp-${i}`} value={e.nombre} maxLength={100} onChange={(ev) => campo("nombre", ev.target.value)} />
            <label htmlFor={`web-${i}`}>Web (https://, opcional)</label>
            <input id={`web-${i}`} type="url" value={e.url ?? ""} onChange={(ev) => campo("url", ev.target.value)} />
            <label htmlFor={`logo-${i}`}>Logo (SVG, PNG, WebP o JPG; máximo 1 MB)</label>
            {e.logo && <img src={e.logo} alt="" height={48} style={{ display: "block", margin: "4px 0 8px" }} />}
            <input
              id={`logo-${i}`}
              type="file"
              accept="image/svg+xml,image/png,image/webp,image/jpeg"
              disabled={subiendo !== null}
              onChange={(ev) => {
                const f = ev.target.files?.[0];
                if (f) subir(i, f);
                ev.target.value = "";
              }}
            />
            {subiendo === i && <small>Subiendo…</small>}
            {e.logo && (
              <button type="button" className="button secondary compact" onClick={() => campo("logo", "")}>
                Quitar logo
              </button>
            )}
            <label htmlFor={`def-${i}`}>Etiqueta bajo la empresa (opcional)</label>
            <input id={`def-${i}`} value={r.def ?? ""} maxLength={60} onChange={(ev) => texto("def", ev.target.value)} />
            <label htmlFor={`tit-${i}`}>Título del reto (opcional)</label>
            <input id={`tit-${i}`} value={r.titulo ?? ""} maxLength={120} onChange={(ev) => texto("titulo", ev.target.value)} />
            <label htmlFor={`desc-${i}`}>Descripción del reto (opcional)</label>
            <textarea
              id={`desc-${i}`}
              value={r.descripcion ?? ""}
              maxLength={600}
              onChange={(ev) => texto("descripcion", ev.target.value)}
            />
            <div className="admin-actions">
              <button type="button" className="button secondary compact" disabled={i === 0} onClick={() => mover(i, -1)}>
                Subir
              </button>
              <button
                type="button"
                className="button secondary compact"
                disabled={i === retos.length - 1}
                onClick={() => mover(i, 1)}
              >
                Bajar
              </button>
              <button
                type="button"
                className="button secondary compact"
                onClick={() => cambiar(retos.filter((_, n) => n !== i))}
              >
                Eliminar track
              </button>
            </div>
          </fieldset>
        );
      })}
      <button
        type="button"
        className="button secondary compact"
        disabled={retos.length >= 12}
        onClick={() => cambiar([...retos, { empresa: null }])}
      >
        Añadir track
      </button>
    </>
  );
}

// Antes de guardar: empresa sin nombre = sin empresa; los campos vacíos desaparecen.
export function limpiar(retos: Reto[]): Reto[] {
  const v = (s?: string) => (s?.trim() ? s.trim() : undefined);
  return retos.map((r) => ({
    empresa: v(r.empresa?.nombre)
      ? { nombre: v(r.empresa!.nombre)!, url: v(r.empresa!.url), logo: v(r.empresa!.logo) }
      : null,
    def: v(r.def),
    titulo: v(r.titulo),
    descripcion: v(r.descripcion),
  }));
}

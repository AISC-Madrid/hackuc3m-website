"use client";
/* eslint-disable @next/next/no-img-element */
// Panel de organización (DESIGN.md › Panel de organización). Dos maneras de guardar:
// - lo que sale en la web (fichas públicas, logos, cinta, tracks, evento y preguntas) espera a «Publicar cambios»;
// - lo interno (etapa y papeles de cada empresa) se guarda en el momento.
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Empresa, EmpresaInterna, EmpresaPublica, Etapa, Track } from "@/lib/empresas";
import type { EventContent } from "@/lib/event";
import Empresas from "./empresas";
import { Captacion, Evento, Preinscritos, Resumen, type Persona } from "./secciones";
import Tracks from "./tracks";

export type Vista = "resumen" | "captacion" | "empresas" | "tracks" | "personas" | "evento";
const SECCIONES: [Vista, string, string][] = [
  ["resumen", "Resumen", "I · Panel"],
  ["captacion", "Captación", "II · Empresas en conversación"],
  ["empresas", "Empresas", "III · Una ficha por empresa"],
  ["tracks", "Tracks", "IV · Contenido de la web"],
  ["personas", "Preinscritos", "V · Personas"],
  ["evento", "Evento y preguntas", "VI · Contenido de la web"],
];
const ROMANOS = ["I", "II", "III", "IV", "V", "VI"];

const publico = (e: Empresa): EmpresaPublica => ({
  id: e.id, nombre: e.nombre, web: e.web, corta: e.corta, larga: e.larga,
  isotipo: e.isotipo, logotipo: e.logotipo, isologo: e.isologo, enCinta: e.enCinta,
});
type Base = { content: EventContent; empresas: EmpresaPublica[]; tracks: Track[] };
const huella = (c: EventContent, e: EmpresaPublica[], t: Track[]) => JSON.stringify([c, e, t]);

async function pedir<T>(url: string, init?: RequestInit): Promise<T> {
  const r = await fetch(url, init && { ...init, headers: { "Content-Type": "application/json", ...init.headers } });
  if (r.status === 204) return undefined as T;
  const d = (await r.json().catch(() => ({}))) as T & { error?: string };
  if (!r.ok) throw new Error(d.error || "No se ha podido completar.");
  return d;
}

export default function Panel() {
  const [vista, setVista] = useState<Vista>("resumen");
  const [content, setContent] = useState<EventContent | null>(null);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [base, setBase] = useState<Base | null>(null);
  const [empSel, setEmpSel] = useState<number | null>(null);
  const [trackSel, setTrackSel] = useState<number | null>(null);
  const [estado, setEstado] = useState("Cargando…");
  const [guardado, setGuardado] = useState("");
  const [publicando, setPublicando] = useState(false);
  const [aviso, setAviso] = useState(false);

  const cargar = useCallback(async () => {
    const [c, e, p] = await Promise.all([
      pedir<EventContent>("/api/admin/content"),
      pedir<{ empresas: Empresa[]; tracks: Track[] }>("/api/admin/empresas"),
      pedir<Persona[]>("/api/admin/waitlist"),
    ]);
    setContent(c);
    setEmpresas(e.empresas);
    setTracks(e.tracks);
    setPersonas(p);
    setBase({ content: c, empresas: e.empresas.map(publico), tracks: e.tracks });
    setEmpSel((s) => s ?? e.empresas[0]?.id ?? null);
    setTrackSel((s) => (e.tracks.some((t) => t.id === s) ? s : (e.tracks[0]?.id ?? null)));
  }, []);

  useEffect(() => {
    Promise.resolve()
      .then(cargar)
      .then(() => setEstado(""))
      .catch((e) => setEstado(e instanceof Error ? e.message : "No se ha podido cargar el panel."));
  }, [cargar]);

  const sucio = useMemo(
    () => !!base && !!content && huella(content, empresas.map(publico), tracks) !== huella(base.content, base.empresas, base.tracks),
    [base, content, empresas, tracks],
  );

  // Público: solo cambia el estado local; se envía al publicar.
  const cambiarEmpresa = (id: number, cambio: Partial<EmpresaPublica>) =>
    setEmpresas((l) => l.map((e) => (e.id === id ? { ...e, ...cambio } : e)));

  // Interno: se guarda al momento.
  async function cambiarInterno(id: number, cambio: Partial<EmpresaInterna>) {
    setEmpresas((l) => l.map((e) => (e.id === id ? { ...e, ...cambio } : e)));
    if (cambio.etapa && cambio.etapa !== "confirmada") {
      // Fuera de «confirmada» pierde su track (el servidor hace lo mismo).
      const soltar = (t: Track) => (t.empresaId === id ? { ...t, empresaId: null } : t);
      setTracks((l) => l.map(soltar));
      setBase((b) => b && { ...b, tracks: b.tracks.map(soltar) });
    }
    try {
      await pedir(`/api/admin/empresas/${id}`, { method: "PATCH", body: JSON.stringify(cambio) });
      setGuardado(`Guardado automáticamente · ${new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}`);
    } catch (e) {
      setGuardado(e instanceof Error ? `No se ha guardado: ${e.message}` : "No se ha guardado.");
    }
  }

  async function crearEmpresa(etapa: Etapa) {
    try {
      const { id } = await pedir<{ id: number }>("/api/admin/empresas", { method: "POST", body: JSON.stringify({ etapa }) });
      const nueva: Empresa = { id, nombre: "", web: null, corta: "", larga: "", isotipo: null, logotipo: null, isologo: null, enCinta: false, etapa, papeles: [] };
      setEmpresas((l) => [...l, nueva]);
      setBase((b) => b && { ...b, empresas: [...b.empresas, publico(nueva)] });
      setEmpSel(id);
      setVista("empresas");
    } catch (e) {
      setEstado(e instanceof Error ? e.message : "No se ha podido crear la empresa.");
    }
  }

  async function borrarEmpresa(id: number) {
    await pedir(`/api/admin/empresas/${id}`, { method: "DELETE" });
    const soltar = (t: Track) => (t.empresaId === id ? { ...t, empresaId: null } : t);
    setEmpresas((l) => l.filter((e) => e.id !== id));
    setTracks((l) => l.map(soltar));
    setBase((b) => b && { ...b, empresas: b.empresas.filter((e) => e.id !== id), tracks: b.tracks.map(soltar) });
    setEmpSel(empresas.find((e) => e.id !== id)?.id ?? null);
  }

  async function publicar() {
    if (!content) return;
    setPublicando(true);
    setEstado("");
    try {
      await pedir("/api/admin/content", { method: "PUT", body: JSON.stringify(content) });
      await pedir("/api/admin/empresas", { method: "PUT", body: JSON.stringify({ empresas: empresas.map(publico), tracks }) });
      await cargar(); // los tracks nuevos reciben su id
      setAviso(true);
      setTimeout(() => setAviso(false), 3000);
    } catch (e) {
      setEstado(e instanceof Error ? e.message : "No se ha podido publicar.");
    } finally {
      setPublicando(false);
    }
  }

  // Descartar vuelve a lo publicado; lo interno, ya guardado, se conserva.
  function descartar() {
    if (!base) return;
    setContent(base.content);
    setTracks(base.tracks);
    setEmpresas((l) => l.map((e) => ({ ...e, ...base.empresas.find((b) => b.id === e.id) })));
    setEstado("");
  }

  const irAlTrack = (empresaId: number) => {
    const t = tracks.find((x) => x.empresaId === empresaId);
    if (t) setTrackSel(t.id);
    setVista("tracks");
  };
  const abrirEmpresa = (id: number) => {
    setEmpSel(id);
    setVista("empresas");
  };

  const conTrack = tracks.filter((t) => t.empresaId !== null).length;
  const enConversacion = empresas.filter((e) => ["contactada", "reunion", "negociando"].includes(e.etapa)).length;
  const contador: Partial<Record<Vista, string>> = {
    captacion: String(enConversacion),
    empresas: String(empresas.length),
    tracks: `${conTrack}/${tracks.length}`,
    personas: String(personas.length),
  };
  const [, titulo, rotulo] = SECCIONES.find((s) => s[0] === vista)!;

  return (
    <div className="adm">
      <aside className="adm-lado lisdark" aria-label="Panel">
        <a className="adm-marca" href="/admin">
          <img src="/hackuc3m-mark.webp" alt="" width={40} height={40} />
          <span>
            <b>
              HackUC3M<span>’27</span>
            </b>
            <small className="lab" style={{ display: "block", marginTop: 4 }}>
              Organización
            </small>
          </span>
        </a>
        <nav className="adm-nav" aria-label="Secciones">
          {SECCIONES.map(([id, nombre], i) => (
            <button key={id} type="button" className="adm-nv" aria-current={vista === id ? "page" : undefined} onClick={() => setVista(id)}>
              <span className="rn">{ROMANOS[i]}</span>
              <span>{nombre}</span>
              <span className="ct">{contador[id] ?? ""}</span>
            </button>
          ))}
        </nav>
        <div className="adm-prox">
          <p className="lab">Más adelante</p>
          <ul>
            <li>
              Inscripciones <small>diciembre</small>
            </li>
            <li>
              Personas de empresa <small>enero</small>
            </li>
            <li>
              Check-in <small>enero</small>
            </li>
            <li>
              Avisos del evento <small>febrero</small>
            </li>
          </ul>
        </div>
        <div className="adm-quien">
          <p className="lab">Sesión</p>
          <p>Acceso de la organización</p>
          <a className="lnk" href="/" target="_blank">
            Ver la web
          </a>
        </div>
      </aside>

      <div className="adm-cuerpo">
        <header className="adm-cab">
          <div>
            <p className="lab">{rotulo}</p>
            <h1>{titulo}</h1>
          </div>
          <div className="adm-acc">
            <p className="adm-estado">
              <span className={sucio ? "adm-punto hueco" : "adm-punto"} />
              {sucio ? "Hay cambios sin publicar" : "Todo publicado"}
            </p>
            <a className="btn b2 peq" href="/" target="_blank">
              Ver la web
            </a>
          </div>
        </header>

        {estado && (
          <p className="adm-error" role="alert" style={{ margin: "24px 48px 0" }}>
            {estado}
          </p>
        )}

        {content && base && (
          <>
            {vista === "resumen" && <Resumen personas={personas} empresas={empresas} tracks={tracks} ir={setVista} />}
            {vista === "captacion" && <Captacion empresas={empresas} tracks={tracks} abrir={abrirEmpresa} crear={crearEmpresa} />}
            {vista === "empresas" && (
              <Empresas
                empresas={empresas}
                tracks={tracks}
                sel={empSel}
                elegir={setEmpSel}
                cambiar={cambiarEmpresa}
                cambiarInterno={cambiarInterno}
                crear={() => crearEmpresa("confirmada")}
                borrar={borrarEmpresa}
                irAlTrack={irAlTrack}
                guardado={guardado}
                avisar={setEstado}
              />
            )}
            {vista === "tracks" && <Tracks empresas={empresas} tracks={tracks} setTracks={setTracks} sel={trackSel} elegir={setTrackSel} />}
            {vista === "personas" && <Preinscritos personas={personas} avisar={setEstado} />}
            {vista === "evento" && <Evento content={content} setContent={setContent} />}
          </>
        )}

        <div className={sucio ? "adm-guardar on" : "adm-guardar"} role="region" aria-label="Cambios sin publicar" aria-hidden={!sucio}>
          <p>
            <span className="adm-punto" />
            Hay cambios sin publicar. La web no cambia hasta que los publiques.
          </p>
          <div className="adm-acc">
            <button type="button" className="btn b2 peq" onClick={descartar} disabled={publicando} tabIndex={sucio ? 0 : -1}>
              Descartar
            </button>
            <button type="button" className="btn b1 peq" onClick={publicar} disabled={publicando} tabIndex={sucio ? 0 : -1}>
              {publicando ? "Publicando…" : "Publicar cambios"} <span className="ar gl manecilla" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="aviso-w">
          <div className={aviso ? "aviso on" : "aviso"} role="status">
            <span className="lab">Publicado</span>
            Los cambios ya están en la web.
          </div>
        </div>
      </div>
    </div>
  );
}

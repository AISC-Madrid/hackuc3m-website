"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import type { Empresa, Etapa, Track } from "@/lib/empresas";
import { VINETAS_AGENDA, type Dia, type EventContent, type Momento } from "@/lib/event";
import { NOMBRE_ETAPA, PAPEL } from "./empresas";
import type { Vista } from "./panel";

export type Persona = {
  id: number;
  email: string;
  name: string;
  joined_at: string;
  confirmation_sent_at: string | null;
};

const dia = (d: Date) => d.toISOString().slice(0, 10);
const hace = (iso: string, ahora: number) => {
  const min = Math.round((ahora - new Date(iso).getTime()) / 60000);
  if (min < 60) return `hace ${Math.max(1, min)} min`;
  if (min < 1440) return `hace ${Math.round(min / 60)} h`;
  return new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "short" });
};
const ROMANOS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"];

/* ——— I · Resumen ——— */
export function Resumen({ personas, empresas, tracks, ir }: { personas: Persona[]; empresas: Empresa[]; tracks: Track[]; ir: (v: Vista) => void }) {
  const [ahora] = useState(() => Date.now()); // fijo durante la visita: el resumen no se mueve solo
  const hoy = dia(new Date(ahora));
  const ayer = dia(new Date(ahora - 86400000));
  const altas = (d: string) => personas.filter((p) => p.joined_at.slice(0, 10) === d).length;
  const dias = Array.from({ length: 30 }, (_, i) => dia(new Date(ahora - (29 - i) * 86400000)));
  const serie = dias.map(altas);
  const max = Math.max(1, ...serie);
  const conEmpresa = tracks.filter((t) => t.empresaId !== null).length;
  const faltan = tracks.length - conEmpresa;
  const pendientes = personas.filter((p) => !p.confirmation_sent_at).length;
  const confirmadas = empresas.filter((e) => e.etapa === "confirmada").length;
  const fecha = (d: string) => new Date(d).toLocaleDateString("es-ES", { day: "numeric", month: "short" });

  return (
    <div className="adm-zona">
      <section className="adm-cifras damasco" aria-label="Cifras">
        <div className="adm-cifra">
          <p className="lab">Preinscritos</p>
          <b>{personas.length}</b>
          <p className="nota">en total</p>
        </div>
        <div className="adm-cifra">
          <p className="lab">Hoy</p>
          <b>+{altas(hoy)}</b>
          <p className="nota">ayer, {altas(ayer)}</p>
        </div>
        <div className="adm-cifra">
          <p className="lab">Tracks con empresa</p>
          <b>
            {conEmpresa}
            <small>de {tracks.length}</small>
          </b>
          <p className="nota">{faltan ? `faltan ${faltan}` : "todos con empresa"}</p>
        </div>
        <div className="adm-cifra">
          <p className="lab">Empresas</p>
          <b>{confirmadas}</b>
          <p className="nota">confirmadas</p>
        </div>
      </section>

      <section aria-label="Altas por día">
        <div className="adm-bh">
          <h2>Altas por día</h2>
          <p className="lab">Últimos 30 días</p>
        </div>
        <div className="adm-barras" role="img" aria-label={`Altas diarias de los últimos 30 días; hoy, ${serie[29]}`}>
          {serie.map((n, i) => (
            <i key={i} style={{ height: `${(n / max) * 100}%` }} title={`${fecha(dias[i])}: ${n}`} />
          ))}
        </div>
        <div className="adm-eje">
          <span className="lab">{fecha(dias[0])}</span>
          <span className="lab">{fecha(dias[15])}</span>
          <span className="lab">Hoy</span>
        </div>
      </section>

      <div className="adm-dos">
        <section>
          <div className="adm-bh">
            <h2>Últimas altas</h2>
            <button type="button" className="lnk" onClick={() => ir("personas")}>
              Ver todas
            </button>
          </div>
          <ul className="adm-lista">
            {[...personas]
              .sort((a, b) => b.id - a.id)
              .slice(0, 6)
              .map((p) => (
                <li key={p.id}>
                  <span className="n">{p.id}</span>
                  <span className="q">
                    {p.name || "Sin nombre"}
                    <small>{p.email}</small>
                  </span>
                  <time className="lab" dateTime={p.joined_at}>
                    {hace(p.joined_at, ahora)}
                  </time>
                </li>
              ))}
          </ul>
          {personas.length === 0 && <Hueco img="ave-laurel" texto="Todavía no hay preinscritos." />}
        </section>
        <section>
          <div className="adm-bh">
            <h2>Antes de lanzar</h2>
          </div>
          <ul className="adm-tareas">
            <li>
              <span className={faltan ? "adm-punto hueco" : "adm-punto"} />
              <p>
                Tracks sin empresa<small>{faltan ? `${faltan} salen «por anunciar»` : "todos tienen empresa"}</small>
              </p>
              <button type="button" className="lnk" onClick={() => ir("tracks")}>
                Completar
              </button>
            </li>
            <li>
              <span className={pendientes ? "adm-punto hueco" : "adm-punto"} />
              <p>
                Confirmaciones sin enviar<small>{pendientes ? `${pendientes} personas sin el correo de confirmación` : "todas enviadas"}</small>
              </p>
              <button type="button" className="lnk" onClick={() => ir("personas")}>
                Enviar
              </button>
            </li>
            <li>
              <span className="adm-punto" />
              <p>
                Privacidad y código de conducta<small>publicados</small>
              </p>
              <span className="lab">Hecho</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

function Hueco({ img, texto }: { img: string; texto: string }) {
  return (
    <div className="adm-hueco">
      <img src={`/grabados/agenda/${img}.webp`} alt="" />
      <span className="adm-ayuda">{texto}</span>
    </div>
  );
}

/* ——— II · Captación (solo interfaz: la lógica es la de la herramienta de Álvaro) ——— */
const COLUMNAS: Etapa[] = ["contactar", "contactada", "reunion", "negociando", "confirmada"];
const VINETAS = ["jarron-flores", "copa-flores", "guirnalda", "flor", "corona-cinta"];

export function Captacion({ empresas, tracks, abrir, crear }: { empresas: Empresa[]; tracks: Track[]; abrir: (id: number) => void; crear: (e: Etapa) => void }) {
  const de = (e: Etapa) => empresas.filter((x) => x.etapa === e);
  const conTrack = tracks.filter((t) => t.empresaId !== null).length;
  const tarjeta = (x: Empresa) => (
    <button key={x.id} type="button" className="adm-trato" onClick={() => abrir(x.id)}>
      <i className="adm-fil" />
      <b>{x.nombre || "Empresa sin nombre"}</b>
      {(tracks.some((t) => t.empresaId === x.id) || x.papeles.length > 0) && (
        <span className="lab">{[...(tracks.some((t) => t.empresaId === x.id) ? ["Track"] : []), ...x.papeles.map((k) => PAPEL[k][0])].join(" · ")}</span>
      )}
    </button>
  );
  const perdidas = de("perdida");

  return (
    <div className="adm-zona" style={{ gap: 32 }}>
      <div className="adm-papel lismauve" role="note">
        <span className="lab" style={{ color: "var(--plum-deep)" }}>
          Solo interfaz · para Álvaro
        </span>
        <p>
          El embudo usa las mismas fichas de empresa y su estado, que sí se guarda. Importe, contacto, responsable, próximo paso, notas y documentos son de la herramienta de partnerships: hay que
          conectar aquí su lógica y su base de datos.
        </p>
      </div>
      <section className="adm-cifras" aria-label="Cifras de captación">
        <div className="adm-cifra">
          <p className="lab">Tracks cerrados</p>
          <b>
            {conTrack}
            <small>de {tracks.length}</small>
          </b>
        </div>
        <div className="adm-cifra">
          <p className="lab">Confirmadas</p>
          <b>{de("confirmada").length}</b>
        </div>
        <div className="adm-cifra">
          <p className="lab">En conversación</p>
          <b>{de("contactada").length + de("reunion").length + de("negociando").length}</b>
        </div>
        <div className="adm-cifra">
          <p className="lab">Perdidas</p>
          <b>{perdidas.length}</b>
        </div>
      </section>
      <div className="adm-embudo" role="region" aria-label="Embudo de captación" tabIndex={0}>
        <div className="adm-cols">
          {COLUMNAS.map((etapa, k) => {
            const l = de(etapa);
            return (
              <section key={etapa} className="adm-col" aria-label={NOMBRE_ETAPA[etapa]}>
                <div className="adm-col-h">
                  <h3>{NOMBRE_ETAPA[etapa]}</h3>
                  <span>{l.length}</span>
                </div>
                {l.map(tarjeta)}
                {l.length === 0 && <Hueco img={VINETAS[k]} texto="Nada por aquí" />}
                <button type="button" className="lnk" onClick={() => crear(etapa)}>
                  Añadir
                </button>
              </section>
            );
          })}
        </div>
      </div>
      {perdidas.length > 0 && (
        <details className="adm-perdidas">
          <summary>
            <i className="pl" aria-hidden="true" />
            <span className="lab">Perdidas · {perdidas.length}</span>
          </summary>
          <div className="dentro">{perdidas.map(tarjeta)}</div>
        </details>
      )}
      <p className="adm-ayuda">Cada tarjeta abre la ficha de la empresa. Una empresa es una sola ficha, desde el primer contacto hasta el evento.</p>
    </div>
  );
}

/* ——— V · Preinscritos ——— */
export function Preinscritos({ personas, avisar }: { personas: Persona[]; avisar: (m: string) => void }) {
  const [q, setQ] = useState("");
  const [filtro, setFiltro] = useState<"todas" | "enviada" | "pendiente">("todas");
  const [enviando, setEnviando] = useState(false);
  const pendientes = personas.filter((p) => !p.confirmation_sent_at).length;
  const texto = q.trim().toLowerCase();
  const lista = personas
    .filter((p) => filtro === "todas" || (filtro === "enviada") === !!p.confirmation_sent_at)
    .filter((p) => !texto || `${p.name} ${p.email}`.toLowerCase().includes(texto));

  async function enviar() {
    setEnviando(true);
    try {
      const r = await fetch("/api/admin/confirmations", { method: "POST" });
      const d = (await r.json()) as { error?: string; sent?: number; pending?: number };
      avisar(r.ok ? `${d.sent} confirmaciones enviadas. ${d.pending} pendientes en este lote: repite para el siguiente.` : d.error || "No se ha podido enviar.");
    } catch {
      avisar("No se ha podido conectar. Inténtalo de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  function csv() {
    const celda = (v: string | number | null) => `"${String(v ?? "").replace(/^[=+@\-\t\r]/, "'$&").replaceAll('"', '""')}"`;
    const filas = [["Orden", "Email", "Nombre", "Fecha de alta", "Confirmación enviada"], ...personas.map((p) => [p.id, p.email, p.name, p.joined_at, p.confirmation_sent_at])];
    const url = URL.createObjectURL(new Blob(["﻿", filas.map((f) => f.map(celda).join(",")).join("\r\n")], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "hackuc3m-preinscritos.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="adm-zona" style={{ gap: 24 }}>
      <div className="adm-barra">
        <span className="adm-fld adm-buscar">
          <input type="search" aria-label="Buscar por nombre o correo" placeholder="Buscar por nombre o correo" value={q} onChange={(e) => setQ(e.target.value)} />
        </span>
        <div className="adm-seg" role="group" aria-label="Filtrar por confirmación">
          {(
            [
              ["todas", "Todas", personas.length],
              ["enviada", "Enviada", personas.length - pendientes],
              ["pendiente", "Pendiente", pendientes],
            ] as const
          ).map(([id, nombre, n]) => (
            <button key={id} type="button" aria-pressed={filtro === id} onClick={() => setFiltro(id)}>
              {nombre} <small>{n}</small>
            </button>
          ))}
        </div>
      </div>
      <div className="adm-tabla">
        <table>
          <thead>
            <tr>
              {["Nº", "Nombre", "Correo", "Alta", "Confirmación"].map((h) => (
                <th key={h} scope="col" className="lab">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lista.map((p) => (
              <tr key={p.id}>
                <td className="n">{p.id}</td>
                <td>{p.name}</td>
                <td className="m">{p.email}</td>
                <td className="f">{new Date(p.joined_at).toLocaleString("es-ES", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</td>
                <td>
                  <span className="adm-estado">
                    <span className={p.confirmation_sent_at ? "adm-punto" : "adm-punto hueco"} />
                    {p.confirmation_sent_at ? "Enviada" : "Pendiente"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {lista.length === 0 && <Hueco img="ave-laurel" texto={texto ? `Nadie coincide con «${q}».` : "No hay nadie en esta lista."} />}
      </div>
      <div className="adm-barra">
        <p className="lab">
          {lista.length} de {personas.length}
        </p>
        <div className="adm-acc">
          <button type="button" className="btn b2 peq" onClick={enviar} disabled={enviando || pendientes === 0}>
            {enviando ? "Enviando…" : `Enviar confirmaciones pendientes (${pendientes})`}
          </button>
          <button type="button" className="btn b1 peq" onClick={csv}>
            Descargar CSV <span className="ar gl manecilla" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="adm-papel lismauve">
        <span className="lab" style={{ color: "var(--plum-deep)" }}>
          Datos personales
        </span>
        <p className="nota">El CSV lleva nombres y correos. Compártelo solo con quien organiza el evento y bórralo al terminar.</p>
      </div>
    </div>
  );
}

/* ——— VI · Evento y preguntas ——— */
export function Evento({ content, setContent }: { content: EventContent; setContent: (c: EventContent) => void }) {
  const set = (c: Partial<EventContent>) => setContent({ ...content, ...c });
  const faqs = content.faqs;
  const setFaq = (i: number, c: Partial<EventContent["faqs"][number]>) => set({ faqs: faqs.map((f, n) => (n === i ? { ...f, ...c } : f)) });
  const mover = (i: number, d: number) => {
    const l = [...faqs];
    [l[i], l[i + d]] = [l[i + d], l[i]];
    set({ faqs: l });
  };

  return (
    <div className="adm-zona">
      <section>
        <div className="adm-bh">
          <h2>Preinscripción</h2>
          <p className="lab">{content.waitlistOpen ? "Abierta" : "Cerrada"}</p>
        </div>
        <label className="chk">
          <input type="checkbox" checked={content.waitlistOpen} onChange={(e) => set({ waitlistOpen: e.target.checked })} />
          <span className="caja" />
          <span>
            Preinscripción abierta
            <span className="adm-ayuda" style={{ display: "block" }}>
              {content.waitlistOpen ? "El formulario de la web acepta altas. Al cerrarla, la web lo dice y no se pierde nada." : "La web dice que la preinscripción está cerrada."}
            </span>
          </span>
        </label>
      </section>
      <section>
        <div className="adm-bh">
          <h2>El evento</h2>
          <p className="lab">Sale en la web y en los correos</p>
        </div>
        <div className="adm-form">
          <div className="adm-campo">
            <label htmlFor="v-fecha">
              <span className="lab">Fecha</span>
            </label>
            <span className="adm-fld">
              <input id="v-fecha" value={content.date} maxLength={100} onChange={(e) => set({ date: e.target.value })} />
            </span>
          </div>
          <div className="adm-campo">
            <label htmlFor="v-lugar">
              <span className="lab">Lugar</span>
            </label>
            <span className="adm-fld">
              <input id="v-lugar" value={content.venue} maxLength={200} onChange={(e) => set({ venue: e.target.value })} />
            </span>
          </div>
          <div className="adm-campo ancho">
            <label htmlFor="v-intro">
              <span className="lab">Presentación</span>
            </label>
            <span className="adm-fld">
              <textarea id="v-intro" value={content.intro} maxLength={2000} onChange={(e) => set({ intro: e.target.value })} />
            </span>
          </div>
        </div>
      </section>
      <Agenda agenda={content.agenda} cambiar={(agenda) => set({ agenda })} />
      <section>
        <div className="adm-bh">
          <h2>Preguntas frecuentes</h2>
          <button type="button" className="lnk" onClick={() => set({ faqs: [...faqs, { question: "", answer: "" }] })} disabled={faqs.length >= 20}>
            Añadir pregunta
          </button>
        </div>
        <ol className="adm-faq">
          {faqs.map((f, i) => (
            <li key={i}>
              <details open={!f.question}>
                <summary>
                  <span className="rn">{ROMANOS[i]}</span>
                  <span>{f.question || "Pregunta nueva"}</span>
                  <i className="pl" aria-hidden="true" />
                </summary>
                <div className="dentro">
                  <div className="adm-campo">
                    <label htmlFor={`q-${i}`}>
                      <span className="lab">Pregunta</span>
                    </label>
                    <span className="adm-fld">
                      <input id={`q-${i}`} value={f.question} maxLength={200} onChange={(e) => setFaq(i, { question: e.target.value })} />
                    </span>
                  </div>
                  <div className="adm-campo">
                    <label htmlFor={`a-${i}`}>
                      <span className="lab">Respuesta</span>
                    </label>
                    <span className="adm-fld">
                      <textarea id={`a-${i}`} value={f.answer} maxLength={2000} onChange={(e) => setFaq(i, { answer: e.target.value })} />
                    </span>
                  </div>
                  <div className="adm-acc">
                    <button type="button" className="lnk" onClick={() => mover(i, -1)} disabled={i === 0}>
                      Subir
                    </button>
                    <button type="button" className="lnk" onClick={() => mover(i, 1)} disabled={i === faqs.length - 1}>
                      Bajar
                    </button>
                    <button type="button" className="lnk" onClick={() => set({ faqs: faqs.filter((_, n) => n !== i) })}>
                      Eliminar
                    </button>
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

/* Agenda: días con sus momentos (hora, viñeta y texto). Vista previa con el marcado y el CSS de la landing. */
function Agenda({ agenda, cambiar }: { agenda: Dia[]; cambiar: (a: Dia[]) => void }) {
  const setDia = (d: number, c: Partial<Dia>) => cambiar(agenda.map((x, i) => (i === d ? { ...x, ...c } : x)));
  const setMomentos = (d: number, f: (m: Momento[]) => Momento[]) => setDia(d, { momentos: f(agenda[d].momentos) });
  const mover = <T,>(l: T[], i: number, j: number) => {
    const c = [...l];
    [c[i], c[j]] = [c[j], c[i]];
    return c;
  };
  const vinetas = Object.entries(VINETAS_AGENDA);

  return (
    <section>
      <div className="adm-bh">
        <h2>Agenda</h2>
        <button
          type="button"
          className="lnk"
          disabled={agenda.length >= 4}
          onClick={() => cambiar([...agenda, { titulo: "", etiqueta: `Día ${agenda.length + 1}`, momentos: [] }])}
        >
          Añadir día
        </button>
      </div>
      <div className="adm-agenda">
        {agenda.map((d, di) => (
          <div key={di} className="adm-dia">
            <div className="adm-form">
              <div className="adm-campo">
                <label htmlFor={`d-${di}`}>
                  <span className="lab">Día</span>
                </label>
                <span className="adm-fld">
                  <input id={`d-${di}`} value={d.titulo} maxLength={40} placeholder="Viernes 19" onChange={(e) => setDia(di, { titulo: e.target.value })} />
                </span>
              </div>
              <div className="adm-campo">
                <label htmlFor={`de-${di}`}>
                  <span className="lab">Etiqueta</span>
                </label>
                <span className="adm-fld">
                  <input id={`de-${di}`} value={d.etiqueta} maxLength={40} placeholder="Día 1" onChange={(e) => setDia(di, { etiqueta: e.target.value })} />
                </span>
              </div>
            </div>
            <ol className="adm-momentos">
              {d.momentos.map((m, mi) => (
                <li key={mi}>
                  <img src={`/grabados/agenda/${m.vineta}`} alt="" />
                  <span className="adm-fld">
                    <select aria-label={`Viñeta del momento ${mi + 1}`} value={m.vineta} onChange={(e) => setMomentos(di, (l) => l.map((x, i) => (i === mi ? { ...x, vineta: e.target.value } : x)))}>
                      {vinetas.map(([f, n]) => (
                        <option key={f} value={f}>
                          {n}
                        </option>
                      ))}
                    </select>
                    <span className="flecha" aria-hidden="true">
                      ▾
                    </span>
                  </span>
                  <span className="adm-fld">
                    <input type="time" aria-label={`Hora del momento ${mi + 1} (vacía: por fijar)`} value={m.hora} onChange={(e) => setMomentos(di, (l) => l.map((x, i) => (i === mi ? { ...x, hora: e.target.value } : x)))} />
                  </span>
                  <span className="adm-fld">
                    <input aria-label={`Momento ${mi + 1}`} value={m.titulo} maxLength={80} placeholder="Qué pasa" onChange={(e) => setMomentos(di, (l) => l.map((x, i) => (i === mi ? { ...x, titulo: e.target.value } : x)))} />
                  </span>
                  <span className="adm-acc">
                    <button type="button" className="lnk" disabled={mi === 0} onClick={() => setMomentos(di, (l) => mover(l, mi, mi - 1))}>
                      Subir
                    </button>
                    <button type="button" className="lnk" disabled={mi === d.momentos.length - 1} onClick={() => setMomentos(di, (l) => mover(l, mi, mi + 1))}>
                      Bajar
                    </button>
                    <button type="button" className="lnk" onClick={() => setMomentos(di, (l) => l.filter((_, i) => i !== mi))}>
                      Quitar
                    </button>
                  </span>
                </li>
              ))}
            </ol>
            <div className="adm-acc">
              <button
                type="button"
                className="btn b2 peq"
                disabled={d.momentos.length >= 15}
                onClick={() => setMomentos(di, (l) => [...l, { hora: "", titulo: "", vineta: "flor.webp" }])}
              >
                Añadir momento
              </button>
              <button type="button" className="lnk" disabled={agenda.length <= 1} onClick={() => cambiar(agenda.filter((_, i) => i !== di))}>
                Quitar el día
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className="adm-ayuda" style={{ margin: "16px 0 20px" }}>
        Sin hora, en la web sale «por fijar». El orden de los momentos es el de la web.
      </p>
      <div className="pagina adm-previa" aria-hidden="true">
        <section className="agenda" style={{ padding: "24px 0" }}>
          <div className="wrap">
            {agenda.map((d, di) => (
              <div className="dia" key={di}>
                <h3>
                  {d.titulo || "Día sin nombre"}
                  <span className="lab">{d.etiqueta}</span>
                </h3>
                <div className="momentos">
                  {d.momentos.map((m, i) => (
                    <div className="momento" key={i}>
                      <img src={`/grabados/agenda/${m.vineta}`} alt="" />
                      <span className="lab hora">{m.hora || "por fijar"}</span>
                      <span>{m.titulo}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

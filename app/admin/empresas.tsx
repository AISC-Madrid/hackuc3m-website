"use client";
/* eslint-disable @next/next/no-img-element */
import { useState, type CSSProperties } from "react";
import { ETAPAS, PAPELES, type Empresa, type EmpresaInterna, type EmpresaPublica, type Papel, type Track } from "@/lib/empresas";

export const NOMBRE_ETAPA: Record<string, string> = {
  contactar: "Por contactar", contactada: "Contactada", reunion: "Reunión",
  negociando: "Negociando", confirmada: "Confirmada", perdida: "Perdida",
};
export const PAPEL: Record<Papel, [string, string]> = {
  infra: ["Infraestructura", "Créditos, API, cuentas o servidores"],
  jurado: ["Jurado", "Pone personas en el jurado final"],
  patrocinio: ["Patrocinio", "Dinero aparte de un track: premio, comida, material"],
  difusion: ["Difusión", "Promociona el evento o da una charla"],
};
const mask = (url: string) => ({ "--m": `url(${url})` }) as CSSProperties;
const enWeb = (e: Empresa, tracks: Track[]) =>
  e.etapa === "confirmada" && ((e.enCinta && !!e.logotipo) || tracks.some((t) => t.empresaId === e.id));

type Filtro = "todas" | "confirmadas" | "track" | Papel;

type Props = {
  empresas: Empresa[];
  tracks: Track[];
  sel: number | null;
  elegir: (id: number) => void;
  cambiar: (id: number, c: Partial<EmpresaPublica>) => void;
  cambiarInterno: (id: number, c: Partial<EmpresaInterna>) => void;
  crear: () => void;
  borrar: (id: number) => Promise<void>;
  irAlTrack: (empresaId: number) => void;
  guardado: string;
  avisar: (m: string) => void;
};

export default function Empresas(p: Props) {
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const tieneTrack = (e: Empresa) => p.tracks.some((t) => t.empresaId === e.id);
  const pasa: Record<Filtro, (e: Empresa) => boolean> = {
    todas: () => true,
    confirmadas: (e) => e.etapa === "confirmada",
    track: tieneTrack,
    infra: (e) => e.papeles.includes("infra"),
    jurado: (e) => e.papeles.includes("jurado"),
    patrocinio: (e) => e.papeles.includes("patrocinio"),
    difusion: (e) => e.papeles.includes("difusion"),
  };
  const filtros: [Filtro, string][] = [["todas", "Todas"], ["confirmadas", "Confirmadas"], ["track", "Con track"], ...PAPELES.map((x) => [x, PAPEL[x][0]] as [Filtro, string])];
  const lista = p.empresas.filter(pasa[filtro]);
  const e = p.empresas.find((x) => x.id === p.sel);

  return (
    <div className="adm-zona">
      <div className="adm-barra">
        <div className="adm-seg" role="group" aria-label="Filtrar empresas">
          {filtros.map(([id, nombre]) => (
            <button key={id} type="button" aria-pressed={filtro === id} onClick={() => setFiltro(id)}>
              {nombre} <small>{p.empresas.filter(pasa[id]).length}</small>
            </button>
          ))}
        </div>
        <button type="button" className="btn b2 peq" onClick={p.crear}>
          Añadir empresa
        </button>
      </div>
      <div className="adm-ms">
        <section aria-label="Empresas">
          <ol className="adm-orden">
            {lista.map((x) => {
              const visible = enWeb(x, p.tracks);
              const papeles = [NOMBRE_ETAPA[x.etapa], ...(tieneTrack(x) ? ["Track"] : []), ...x.papeles.map((k) => PAPEL[k][0])];
              return (
                <li key={x.id}>
                  <button type="button" className="adm-fila" aria-pressed={x.id === p.sel} onClick={() => p.elegir(x.id)}>
                    <i className="adm-fil" />
                    <span className="lg">
                      {x.isotipo ? <i className="adm-mask" style={mask(x.isotipo)} /> : <span className="adm-ini" aria-hidden="true">{iniciales(x.nombre)}</span>}
                    </span>
                    <span className="q">
                      <b className={x.nombre ? "" : "vacio"}>{x.nombre || "Empresa sin nombre"}</b>
                      <span className="lab">{papeles.join(" · ")}</span>
                    </span>
                    <span className={visible ? "adm-punto" : "adm-punto hueco"} aria-hidden="true" />
                    <span className="sr">{visible ? "Sale en la web" : "No sale en la web"}</span>
                  </button>
                </li>
              );
            })}
          </ol>
          {lista.length === 0 && (
            <div className="adm-hueco">
              <img src="/grabados/agenda/lira.webp" alt="" />
              <span className="adm-ayuda">Ninguna empresa con ese filtro.</span>
            </div>
          )}
          <p className="adm-ayuda" style={{ marginTop: 14 }}>
            Punto lleno: sale en la web. Hueco: guardada, pero oculta.
          </p>
        </section>
        {e ? <Ficha key={e.id} e={e} {...p} /> : <p className="adm-ayuda">Elige una empresa o añade una.</p>}
      </div>
    </div>
  );
}

function iniciales(n: string) {
  return (
    n
      .replace(/[^\p{L} ]/gu, "")
      .trim()
      .split(/\s+/)
      .map((w) => w[0] ?? "")
      .join("")
      .slice(0, 2)
      .toUpperCase() || "·"
  );
}

function Ficha({ e, tracks, empresas, cambiar, cambiarInterno, borrar, irAlTrack, guardado, avisar }: Props & { e: Empresa }) {
  const [borrando, setBorrando] = useState(false);
  const [subiendo, setSubiendo] = useState<string | null>(null);
  const set = (c: Partial<EmpresaPublica>) => cambiar(e.id, c);
  const track = tracks.find((t) => t.empresaId === e.id);

  async function subir(tipo: "isotipo" | "logotipo" | "isologo", f: File) {
    setSubiendo(tipo);
    try {
      const r = await fetch(`/api/admin/media?tipo=${tipo}`, { method: "POST", headers: { "Content-Type": f.type }, body: f });
      const d = (await r.json()) as { url?: string; error?: string };
      if (!r.ok || !d.url) throw new Error(d.error);
      set({ [tipo]: d.url });
      avisar("");
    } catch (err) {
      avisar(err instanceof Error && err.message ? err.message : "No se ha podido subir el logo.");
    } finally {
      setSubiendo(null);
    }
  }

  const logo = (tipo: "isotipo" | "logotipo" | "isologo", nombre: string, uso: string, accept: string) => {
    const url = e[tipo];
    return (
      <div className="adm-logo">
        <div className="adm-logo-v">
          {url ? (
            tipo === "isotipo" ? (
              <span className="marco">
                <i className="adm-mask" style={mask(url)} />
              </span>
            ) : (
              <img src={url} alt="" />
            )
          ) : (
            <span className="adm-ayuda">Falta el {nombre.toLowerCase()}</span>
          )}
        </div>
        <p>
          {nombre}
          <span className="adm-ayuda" style={{ display: "block" }}>
            {uso}
          </span>
        </p>
        <div className="adm-acc">
          <label className="btn b2 peq adm-subir">
            {subiendo === tipo ? "Subiendo…" : url ? `Cambiar ${nombre.toLowerCase()}` : `Subir ${nombre.toLowerCase()}`}
            <input
              type="file"
              accept={accept}
              aria-label={`Subir ${nombre.toLowerCase()}`}
              disabled={subiendo !== null}
              onChange={(ev) => {
                const f = ev.target.files?.[0];
                if (f) subir(tipo, f);
                ev.target.value = "";
              }}
            />
          </label>
          {url && (
            <button type="button" className="lnk" onClick={() => set({ [tipo]: null })}>
              Quitar
            </button>
          )}
        </div>
      </div>
    );
  };

  const cinta = empresas.filter((x) => x.etapa === "confirmada" && x.enCinta && x.logotipo);
  const repetida = Array.from({ length: Math.max(1, Math.ceil(6 / Math.max(1, cinta.length))) }, () => cinta).flat();

  return (
    <section className="adm-ficha" aria-label="Ficha de la empresa">
      <div>
        <div className="adm-bh">
          <h2>{e.nombre || "Empresa nueva"}</h2>
          <p className="lab">{NOMBRE_ETAPA[e.etapa]}</p>
        </div>
        <div className="adm-form">
          <div className="adm-campo">
            <label htmlFor="e-nom">
              <span className="lab">Nombre *</span>
            </label>
            <span className="adm-fld">
              <input id="e-nom" value={e.nombre} maxLength={100} placeholder="Como quiere que aparezca" onChange={(ev) => set({ nombre: ev.target.value })} />
            </span>
          </div>
          <div className="adm-campo">
            <label htmlFor="e-web">
              <span className="lab">Web</span>
              <span className="adm-ayuda">opcional</span>
            </label>
            <span className="adm-fld">
              <input id="e-web" type="url" value={e.web ?? ""} placeholder="https://empresa.com" onChange={(ev) => set({ web: ev.target.value.trim() || null })} />
            </span>
          </div>
          <div className="adm-campo ancho">
            <label htmlFor="e-corta">
              <span className="lab">Descripción corta</span>
              <span className="adm-ayuda">{e.corta.length} / 60 · la etiqueta bajo el nombre en el track</span>
            </label>
            <span className="adm-fld">
              <input id="e-corta" value={e.corta} maxLength={60} placeholder="A qué se dedica, en tres o cuatro palabras" onChange={(ev) => set({ corta: ev.target.value })} />
            </span>
          </div>
          <div className="adm-campo ancho">
            <label htmlFor="e-larga">
              <span className="lab">Descripción larga</span>
              <span className="adm-ayuda">{e.larga.length} / 600 · opcional, para la ficha pública</span>
            </label>
            <span className="adm-fld">
              <textarea id="e-larga" value={e.larga} maxLength={600} placeholder="Qué hace y por qué viene al hackathon" onChange={(ev) => set({ larga: ev.target.value })} />
            </span>
          </div>
        </div>
      </div>

      <div>
        <div className="adm-bh">
          <h2>Logos</h2>
          <p className="lab">1 MB como máximo</p>
        </div>
        <div className="adm-logos">
          {logo("isotipo", "Isotipo", "El símbolo solo. Va en el cuadro del track, teñido de ciruela. SVG o PNG con fondo transparente.", "image/svg+xml,image/png")}
          {logo("logotipo", "Logotipo", "El nombre escrito. Va en la cinta de logos, con sus colores.", "image/svg+xml,image/png,image/webp,image/jpeg")}
          {logo("isologo", "Isologo", "Símbolo y nombre juntos. Acreditaciones, documentos y correos.", "image/svg+xml,image/png,image/webp,image/jpeg")}
        </div>
      </div>

      <div>
        <div className="adm-bh">
          <h2>
            Captación<small>se guarda sola</small>
          </h2>
          <p className="adm-estado" role="status">
            {guardado && <span className="adm-punto" />}
            {guardado}
          </p>
        </div>
        <div className="adm-form">
          <div className="adm-campo">
            <label htmlFor="e-etapa">
              <span className="lab">Estado</span>
              <span className="adm-ayuda">solo las confirmadas pueden tener track</span>
            </label>
            <span className="adm-fld">
              <select id="e-etapa" value={e.etapa} onChange={(ev) => cambiarInterno(e.id, { etapa: ev.target.value as Empresa["etapa"] })}>
                {ETAPAS.map((x) => (
                  <option key={x} value={x}>
                    {NOMBRE_ETAPA[x]}
                  </option>
                ))}
              </select>
              <span className="flecha" aria-hidden="true">
                ▾
              </span>
            </span>
          </div>
          <div className="adm-papel lismauve adm-campo ancho" role="note">
            <span className="lab" style={{ color: "var(--plum-deep)" }}>
              Pendiente de Álvaro
            </span>
            <p>Importe, contacto, responsable, próximo paso, notas y documentos llegan cuando se conecte la herramienta de partnerships.</p>
          </div>
        </div>
      </div>

      <div>
        <div className="adm-bh">
          <h2>Papeles</h2>
          <p className="lab">Se guardan solos · uso interno</p>
        </div>
        <div className="adm-tiene">
          <p>
            Track
            <span className="adm-ayuda" style={{ display: "block" }}>
              {track ? `Tiene un track${track.titulo ? `: ${track.titulo}` : " · reto sin escribir"}` : "No tiene track. Se asigna desde Tracks."}
            </span>
          </p>
          <button type="button" className="lnk" onClick={() => irAlTrack(e.id)}>
            {track ? "Ir al track" : "Asignar un track"}
          </button>
        </div>
        <div className="adm-papeles">
          {PAPELES.map((k) => (
            <label key={k} className="chk">
              <input
                type="checkbox"
                checked={e.papeles.includes(k)}
                onChange={(ev) => cambiarInterno(e.id, { papeles: ev.target.checked ? [...e.papeles, k] : e.papeles.filter((x) => x !== k) })}
              />
              <span className="caja" />
              <span>
                {PAPEL[k][0]}
                <span className="adm-ayuda">{PAPEL[k][1]}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="adm-bh">
          <h2>Cinta de logos</h2>
          <p className="lab">Vista previa con el CSS de la web</p>
        </div>
        <label className="chk" aria-disabled={!e.logotipo}>
          <input type="checkbox" checked={e.enCinta && !!e.logotipo} disabled={!e.logotipo} onChange={(ev) => set({ enCinta: ev.target.checked })} />
          <span className="caja" />
          <span>
            Sale en la cinta de logos
            <span className="adm-ayuda" style={{ display: "block" }}>
              {e.logotipo ? "Usa el logotipo. El orden se baraja en cada visita. Solo salen empresas confirmadas." : "Falta el logotipo: súbelo para poder sacarla en la cinta."}
            </span>
          </span>
        </label>
        {repetida.length > 0 && (
          <div className="pagina adm-previa" aria-hidden="true" style={{ marginTop: 12 }}>
            <section className="cinta">
              <div className="marquee">
                <div className="marquee-track">
                  {[0, 1].map((c) => (
                    <ul key={c}>
                      {repetida.map((x, i) => (
                        <li key={i}>
                          <img src={x.logotipo!} alt="" />
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      <div>
        <div className="adm-bh">
          <h2>Personas</h2>
          <p className="lab">Más adelante</p>
        </div>
        <p className="adm-ayuda">
          Cada empresa tendrá su gente (mentoras, jurado o sin papel). De ahí saldrán las acreditaciones, el jurado de cada track y el check-in. Modelo en docs/modelo-datos.md.
        </p>
      </div>

      {borrando ? (
        <div className="adm-confirmar" role="alertdialog" aria-label="Eliminar empresa">
          <span className="lab" style={{ color: "var(--plum-deep)" }}>
            ¿Eliminar {e.nombre || "esta empresa"}?
          </span>
          <p>Se borran también sus papeles y su track queda sin empresa. No se puede deshacer. Si ya ha habido conversaciones, mejor márcala como perdida.</p>
          <div className="adm-acc">
            <button
              type="button"
              className="btn b1 peq"
              onClick={() => {
                setBorrando(false);
                cambiarInterno(e.id, { etapa: "perdida" });
              }}
            >
              Marcar como perdida <span className="ar gl manecilla" aria-hidden="true" />
            </button>
            <button type="button" className="btn b2 peq" onClick={() => borrar(e.id).catch((err) => avisar(err.message))}>
              Eliminar de todos modos
            </button>
            <button type="button" className="lnk" onClick={() => setBorrando(false)}>
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="adm-pie">
          <button type="button" className="lnk" onClick={() => setBorrando(true)}>
            Eliminar empresa
          </button>
          <span className="adm-ayuda">Lo público se guarda con «Publicar cambios»; estado y papeles se guardan solos.</span>
        </div>
      )}
    </section>
  );
}

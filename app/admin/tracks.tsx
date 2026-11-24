"use client";
import { useMemo, useState, type CSSProperties } from "react";
import { barajar, type Empresa, type Track } from "@/lib/empresas";

const css = (v: Record<string, string | number>) => v as CSSProperties;
const dos = (n: number) => String(n).padStart(2, "0");

type Props = {
  empresas: Empresa[];
  tracks: Track[];
  setTracks: (f: (t: Track[]) => Track[]) => void;
  sel: number | null;
  elegir: (id: number) => void;
};

// Sin orden: la web baraja los tracks en cada visita, porque todas las empresas pagan lo mismo.
export default function Tracks({ empresas, tracks, setTracks, sel, elegir }: Props) {
  const [semilla, setSemilla] = useState(0);
  const porId = new Map(empresas.map((e) => [e.id, e]));
  const t = tracks.find((x) => x.id === sel) ?? tracks[0];
  const set = (c: Partial<Track>) => setTracks((l) => l.map((x) => (x.id === t.id ? { ...x, ...c } : x)));
  // El orden de la vista previa solo cambia al pulsar «Barajar otra vez», no al escribir.
  const ids = tracks.map((x) => x.id).join();
  const orden = useMemo(() => barajar(ids.split(",")), [ids, semilla]); // eslint-disable-line react-hooks/exhaustive-deps

  function anadir() {
    const id = -Date.now();
    setTracks((l) => [...l, { id, empresaId: null, titulo: "", reto: "", premio: "" }]);
    elegir(id);
  }
  function borrar() {
    if (tracks.length <= 1) return;
    const resto = tracks.filter((x) => x.id !== t.id);
    setTracks(() => resto);
    elegir(resto[0].id);
  }

  const emp = t && t.empresaId !== null ? porId.get(t.empresaId) : undefined;
  return (
    <div className="adm-zona">
      <div className="adm-ms">
        <section aria-label="Tracks">
          <div className="adm-bh">
            <h2>Tracks</h2>
            <p className="lab">Sin orden</p>
          </div>
          <ol className="adm-orden" style={{ borderTop: 0 }}>
            {tracks.map((x) => {
              const e = x.empresaId !== null ? porId.get(x.empresaId) : undefined;
              return (
                <li key={x.id}>
                  <button type="button" className="adm-fila" aria-pressed={x.id === t?.id} onClick={() => elegir(x.id)}>
                    <i className="adm-fil" />
                    <span className="lg">{e?.isotipo && <i className="adm-mask" style={css({ "--m": `url(${e.isotipo})` })} />}</span>
                    <span className="q">
                      <b className={x.titulo ? "" : "vacio"}>{x.titulo || "Track por confirmar"}</b>
                      <span className="lab">{e?.nombre || "Sin empresa"}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="adm-acc" style={{ marginTop: 16 }}>
            <button type="button" className="btn b2 peq" onClick={anadir} disabled={tracks.length >= 12}>
              Añadir track
            </button>
          </div>
          <p className="adm-ayuda" style={{ marginTop: 14 }}>
            No hay orden: todas las empresas pagan lo mismo, así que la web baraja los tracks y la cinta en cada visita. El número (01, 02…) es solo la posición en pantalla.
          </p>
        </section>

        {t && (
          <section className="adm-ficha" aria-label="Editar el track">
            <div>
              <div className="adm-bh">
                <h2>{emp ? `Track de ${emp.nombre}` : "Track sin empresa"}</h2>
                <span className="adm-acc">
                  <button type="button" className="lnk" onClick={() => set({ empresaId: null, titulo: "", reto: "", premio: "" })}>
                    Vaciar
                  </button>
                  <button type="button" className="lnk" onClick={borrar} disabled={tracks.length <= 1}>
                    Eliminar track
                  </button>
                </span>
              </div>
              <div className="adm-form">
                <div className="adm-campo ancho">
                  <label htmlFor="t-emp">
                    <span className="lab">Empresa que tiene este track</span>
                    <span className="adm-ayuda">solo empresas confirmadas</span>
                  </label>
                  <span className="adm-fld">
                    <select id="t-emp" value={t.empresaId ?? ""} onChange={(ev) => set({ empresaId: ev.target.value ? Number(ev.target.value) : null })}>
                      <option value="">Sin empresa todavía · sale «Por confirmar»</option>
                      {empresas
                        .filter((e) => e.nombre && e.etapa !== "perdida")
                        .map((e) => {
                          const otro = tracks.some((x) => x.empresaId === e.id && x.id !== t.id);
                          const noConf = e.etapa !== "confirmada";
                          return (
                            <option key={e.id} value={e.id} disabled={otro || noConf}>
                              {e.nombre}
                              {otro ? " · ya tiene un track" : noConf ? " · sin confirmar" : ""}
                            </option>
                          );
                        })}
                    </select>
                    <span className="flecha" aria-hidden="true">
                      ▾
                    </span>
                  </span>
                </div>
                <div className="adm-campo ancho">
                  <label htmlFor="t-tit">
                    <span className="lab">Título del reto</span>
                    <span className="adm-ayuda">{t.titulo.length} / 120</span>
                  </label>
                  <span className="adm-fld">
                    <input id="t-tit" value={t.titulo} maxLength={120} placeholder="Vacío: «Track por confirmar»" onChange={(ev) => set({ titulo: ev.target.value })} />
                  </span>
                </div>
                <div className="adm-campo ancho">
                  <label htmlFor="t-premio">
                    <span className="lab">Premio del track</span>
                    <span className="adm-ayuda">opcional · aún no sale en la web</span>
                  </label>
                  <span className="adm-fld">
                    <input id="t-premio" value={t.premio} maxLength={200} placeholder="Lo que aporta la empresa al ganador del track" onChange={(ev) => set({ premio: ev.target.value })} />
                  </span>
                </div>
                <div className="adm-campo ancho">
                  <label htmlFor="t-reto">
                    <span className="lab">Descripción del reto</span>
                    <span className="adm-ayuda">{t.reto.length} / 600</span>
                  </label>
                  <span className="adm-fld">
                    <textarea id="t-reto" value={t.reto} maxLength={600} placeholder="Vacío: «Publicaremos el reto antes de abrir las inscripciones.»" onChange={(ev) => set({ reto: ev.target.value })} />
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      <section>
        <div className="adm-bh">
          <h2>Así se verá</h2>
          <button type="button" className="lnk" onClick={() => setSemilla((s) => s + 1)}>
            Barajar otra vez
          </button>
        </div>
        {/* El propio marcado y CSS de la sección de tracks de la landing. */}
        <div className="pagina adm-previa" aria-hidden="true">
          <div className="tracks-sec">
            <ol className="retos" style={css({ "--n": tracks.length })}>
              {orden.map((id, i) => {
                const x = tracks.find((y) => String(y.id) === id);
                if (!x) return null;
                const e = x.empresaId !== null ? porId.get(x.empresaId) : undefined;
                return (
                  <li key={id}>
                    <span className="emp">{e?.nombre ?? "Por confirmar"}</span>
                    {e?.corta && <span className="def">{e.corta}</span>}
                    <div className="cab">
                      <span className="nn">{dos(i + 1)}.</span>
                      <span className="logo">{e?.isotipo && <i style={css({ "--logo": `url(${e.isotipo})` })} />}</span>
                    </div>
                    <h3 className="t">{x.titulo || "Track por confirmar"}</h3>
                    <p className="s">{x.reto || "Publicaremos el reto antes de abrir las inscripciones."}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
        <p className="adm-ayuda" style={{ marginTop: 10 }}>
          Mismo marcado y CSS que la web, en el orden al azar que tendrá en una visita. El nombre, la etiqueta y el isotipo vienen de la ficha de la empresa.
        </p>
      </section>
    </div>
  );
}

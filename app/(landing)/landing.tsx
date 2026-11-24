/* eslint-disable @next/next/no-img-element */
// Landing V3 «Los Ilustrados». Las imágenes van con <img> normal: la optimización de next/image en
// Workers pediría Cloudflare Images, y los ficheros ya se optimizan al subirlos.
import type { CSSProperties } from "react";
import type { LogoWeb, TrackWeb } from "@/lib/empresas";
import type { EventContent } from "@/lib/event";
import Pie from "../pie";
import Cabecera from "./cabecera";
import Carril from "./carril";
import Contador from "./contador";
import { cifras, euros, inicio, premio } from "./datos";
import Moneda from "./moneda";
import Preinscripcion from "./preinscripcion";
import { Cohete, Dron, Formula, Icab, Moto } from "./vehiculos-svg";
import "./landing.css";

const css = (vars: Record<string, string | number>) => vars as CSSProperties;

// Cada palabra pasa de malva a tinta al hacer scroll (CSS); sin soporte se lee entera en tinta.
function Leer({ texto }: { texto: string }) {
  return texto.split(" ").map((w, i) => (
    <span key={i}>
      <span className="w" style={css({ "--i": i })}>
        {w}
      </span>{" "}
    </span>
  ));
}

const dosDigitos = (n: number) => String(n).padStart(2, "0");

// Tracks y cinta llegan ya barajados (lib/empresas-db.ts): no hay orden porque todas las empresas pagan lo mismo.
export default function Landing({ event, tracks, cinta: empresasCinta }: { event: EventContent; tracks: TrackWeb[]; cinta: LogoWeb[] }) {
  const cinta = Array.from({ length: Math.max(1, Math.ceil(6 / Math.max(1, empresasCinta.length))) }, () => empresasCinta).flat();
  return (
    <div className="pagina v3">
      <a className="salto" href="#contenido">
        Saltar al contenido
      </a>
      <Cabecera />
      <main id="contenido">
        {/* 1 · Hero: esquineras, gofrado, titular, skyline y contador */}
        <section className="hero">
          <img className="esq izq" fetchPriority="high" src="/grabados/esquinas/hulsen.webp" alt="" width={760} height={768} />
          <img className="esq der" fetchPriority="high" src="/grabados/esquinas/hulsen.webp" alt="" width={760} height={768} />
          <span className="gof" aria-hidden="true">
            <i className="luz" />
            <i className="som" />
            <i className="base" />
          </span>
          <div className="wrap capa">
            <div className="caps fecha">XIX – XX · II · MMXXVII</div>
            <h1 className="wm">
              HackUC3M<span>’27</span>
            </h1>
            <div className="hero-pie">
              <p>El hackathon de la UC3M. Dos días para resolver en equipo retos reales de la industria.</p>
              <a href="#inscripcion" className="btn b1">
                Preinscribirme <span className="ar gl manecilla" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="sky">
            <div className="sky-fila">
              <img src="/campus/edificios/sabatini.svg" alt="Edificio Sabatini" className="sabatini" decoding="async" width={534} height={156} />
              <img src="/campus/edificios/auditorio.svg" alt="Auditorio" className="auditorio" decoding="async" width={399} height={178} />
              <img src="/campus/edificios/biblioteca.svg" alt="Biblioteca" className="biblioteca" decoding="async" width={284} height={189} />
            </div>
            <Carril clase="rocket" style={{ position: "absolute", left: "clamp(8px, 2cqi, 32px)", bottom: 1, width: 44, height: 560 }}>
              <Cohete />
            </Carril>
            <div className="suelo" />
          </div>
          <div className="wrap hero-fin">
            <Contador inicio={inicio} />
            <div className="hero-sep" />
            <p className="hero-donde">
              {event.date}
              <br />
              <span>{event.venue}</span>
            </p>
          </div>
        </section>

        {/* 2 · Cinta de logos */}
        {cinta.length > 0 && (
          <section className="tz cinta" aria-label="Empresas de los tracks">
            <div className="marquee">
              <div className="marquee-track">
                {[0, 1].map((copia) => (
                  <ul key={copia} aria-hidden={copia === 1 || undefined}>
                    {cinta.map((e, i) => (
                      <li key={i}>
                        <img src={e.isologo} alt={copia === 0 && i < empresasCinta.length ? e.nombre : ""} />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 3 · Manifiesto: el globo de Aranjuez y el texto que se lee con el scroll */}
        <section>
          <Carril clase="drone" style={{ height: 120, color: "var(--ink)" }}>
            <Dron />
          </Carril>
          <div className="wrap mani">
            <figure className="lamina">
              <img
                src="/grabados/laminas/globo-aranjuez.jpg"
                alt="Globo Montgolfier elevándose sobre el público en los jardines de Aranjuez, óleo de Antonio Carnicero (1784)"
                width={920}
                height={920}
                loading="lazy"
              />
              <figcaption className="nota">Carnicero, 1784 · Aranjuez, tras el globo de Agustín de Betancourt</figcaption>
            </figure>
            <div>
              <p className="big">
                <Leer texto="Retos de la industria. Talento universitario. Dos días para convertir una idea en algo que funcione." />
              </p>
              <p className="p" style={{ marginTop: 36 }}>
                En equipos de 1 a 4, en la Escuela Politécnica Superior del campus de Leganés.
              </p>
            </div>
          </div>
        </section>

        {/* 4 · Cifras: la banda se queda fija y las cifras cambian de una en una */}
        <section className="cifras-s" aria-label="Cifras">
          <div className="pin lisdark">
            {cifras.map((c, k) => (
              <div className="paso" key={c.unidad} style={css({ "--k": k })}>
                <p className="num">
                  <span className="sr">
                    {c.euros ? euros(c.n) : c.n}
                  </span>
                  <span className={c.euros ? "cnt e" : "cnt"} style={css({ "--n": c.n })} aria-hidden="true" />{" "}
                  <span className="u">{c.unidad}</span>
                </p>
                <p className="exp">{c.texto}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5 · Tracks y gran premio */}
        <section id="tracks" className="tracks-sec">
          <div className="wrap">
            <div className="retos-h">
              <h2 className="h2">Seis tracks. Un gran premio.</h2>
              <div className="reg">
                <p>
                  Seis empresas.
                  <br />
                  Seis problemas reales.
                  <br />
                  Un único gran premio.
                </p>
              </div>
            </div>
          </div>
          <div className="rieles">
            <div className="pin">
              <ol className="retos" style={css({ "--n": tracks.length })}>
                {tracks.map((t, i) => (
                  <li key={i}>
                    {t.empresa?.isologo ? (
                      <img className="marca" src={t.empresa.isologo} alt={t.empresa.nombre} />
                    ) : (
                      <span className="emp">{t.empresa?.nombre ?? "Por confirmar"}</span>
                    )}
                    {t.empresa?.corta && <span className="def">{t.empresa.corta}</span>}
                    <div className="cab">
                      <span className="nn" aria-hidden="true">
                        {dosDigitos(i + 1)}.
                      </span>
                      <span className="logo" aria-hidden="true">
                        {t.empresa?.isotipo && <img src={t.empresa.isotipo} alt="" />}
                      </span>
                    </div>
                    <h3 className="t">{t.titulo || "Track por anunciar"}</h3>
                    <p className="s">{t.reto || "Publicaremos el reto antes de abrir las inscripciones."}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <Carril clase="car" style={{ height: 40, marginTop: 24, color: "var(--ink)" }}>
            <Formula />
          </Carril>
          <div className="premio">
            <div className="wrap">
              <div className="cartela-m">
                <img src="/grabados/vinetas/cartela.webp" alt="" width={700} height={861} loading="lazy" />
                <Moneda total={premio.total} />
              </div>
              <div className="premio-t">
                <span className="premio-laurel" aria-hidden="true" />
                <h3 className="caps">Gran premio final</h3>
                <b className="premio-n">
                  <span className="sr">{euros(premio.total)}</span>
                  <span className="oro-cnt" style={css({ "--n": premio.total })} aria-hidden="true" />
                </b>
                <span className="premio-l">
                  {premio.desglose.map((l, i) => (
                    <span key={l}>
                      {i > 0 && <br />}
                      {l}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 6 · Agenda: fila de momentos con viñeta */}
        <section id="agenda" className="agenda">
          <div className="wrap">
            <h2 className="h2 leer">
              <Leer texto="Dos días, de principio a fin." />
            </h2>
            {event.agenda.map((d) => (
              <div className="dia" key={d.titulo}>
                <h3>
                  {d.titulo}
                  <span className="lab">{d.etiqueta}</span>
                </h3>
                <div className="momentos">
                  {d.momentos.map((m, i) => (
                    <div className="momento" key={i}>
                      <img src={`/grabados/agenda/${m.vineta}`} alt="" loading="lazy" />
                      <span className="lab hora">{m.hora || "por fijar"}</span>
                      <span>{m.titulo}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7 · Inscripción */}
        <section id="inscripcion" className="lisdark inscripcion">
          <div className="wrap split">
            <div>
              <h2 className="titular-cierre">Nos vemos en Leganés.</h2>
              <p className="p" style={{ marginTop: 24, color: "var(--cream)" }}>
                Preinscríbete y tendrás prioridad cuando abramos las inscripciones.
              </p>
            </div>
            <Preinscripcion abierta={event.waitlistOpen} />
          </div>
          <Carril clase="moto" style={{ height: 40, marginTop: 96, color: "var(--cream)" }}>
            <Moto />
          </Carril>
        </section>

        {/* 8 · Empresas */}
        <section id="empresas" className="empresas">
          <div className="wrap split">
            <h2 className="h2 leer">
              <Leer texto="¿Tu empresa quiere un track?" />
            </h2>
            <div className="empresas-t">
              <p className="p">
                Lleva un reto de tu empresa al talento universitario: un track propio, con tu problema real,
                y dos días trabajando codo con codo con los equipos que lo resuelven.
              </p>
              <a
                href="mailto:aisc.asoc@uc3m.es?subject=HackUC3M%20%E2%80%9927%20%C2%B7%20Colaboraci%C3%B3n"
                className="btn b2"
              >
                Contactar
              </a>
            </div>
          </div>
        </section>

        {/* 9 · Preguntas */}
        <section id="preguntas" className="preguntas">
          <div className="wrap split">
            <div>
              <h2 className="h2 leer">
                <Leer texto="Preguntas frecuentes" />
              </h2>
              <figure className="lamina puerta">
                <img
                  src="/grabados/laminas/puerta-alcala.webp"
                  alt="Grabado de la Puerta de Alcalá hacia 1770, con carruajes y paseantes"
                  width={600}
                  height={600}
                  loading="lazy"
                />
                <figcaption className="nota">Puerta de Alcalá · Francesco Sabatini, 1778</figcaption>
              </figure>
            </div>
            <div className="faq">
              {event.faqs.map((f) => (
                <details key={f.question}>
                  <summary>
                    <span>{f.question}</span>
                    <span className="pl" />
                  </summary>
                  <p>{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <Carril clase="icab" style={{ height: 48, color: "var(--ink)" }}>
          <Icab />
        </Carril>
      </main>
      <Pie />
      <div id="avisos" className="aviso-w" />
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
// Plantilla de las páginas de documento (Legal.dc.html del canvas): portada con esquineras y viñeta,
// índice fijo al margen (plegable en móvil), apartados con numeral romano y glosa «En corto»,
// florón entre apartados, remate y bloque de contacto. El texto sale de contenido/*.md.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { CSSProperties, ReactNode } from "react";
import { leerDocumento, type Bloque, type Documento, type Inline } from "@/lib/documento";
import BarraFija from "../barra-fija";
import Pie from "../pie";
import "./documento.css";

// Catálogo cerrado de viñetas: ampliarlo es subir otro grabado con su crédito y darle nombre.
const VINETAS: Record<string, string> = {
  torre: "/grabados/agenda/torre.webp",
  corona: "/grabados/agenda/corona-cinta.webp",
  flor: "/grabados/agenda/flor.webp",
};

export function leer(nombre: string): Documento {
  // Se lee en el build: las páginas de documento son estáticas.
  const fuente = readFileSync(join(process.cwd(), "contenido", `${nombre}.md`), "utf8");
  return leerDocumento(fuente, nombre);
}

const mascara = (src: string) => ({ "--m": `url(${src})` }) as CSSProperties;

function Texto({ partes }: { partes: Inline[] }) {
  return partes.map((p, i) =>
    p.t === "negrita" ? (
      <strong key={i}>{p.v}</strong>
    ) : p.t === "enlace" ? (
      <a key={i} className="lnk" href={p.href}>
        {p.v}
      </a>
    ) : (
      <span key={i}>{p.v}</span>
    ),
  );
}

function Bloques({ bloques }: { bloques: Bloque[] }) {
  return bloques.map((b, i) => {
    switch (b.t) {
      case "p":
        return (
          <p key={i}>
            <Texto partes={b.v} />
          </p>
        );
      case "h3":
        return <h3 key={i}>{b.v}</h3>;
      case "floron":
        return (
          <div key={i} className="floron tz una" role="separator">
            <i style={mascara("/grabados/vinetas/floron.png")} />
          </div>
        );
      default: {
        const Lista = b.t;
        return (
          <Lista key={i}>
            {b.items.map((it, j) => (
              <li key={j}>
                <Texto partes={it} />
              </li>
            ))}
          </Lista>
        );
      }
    }
  });
}

function Indice({ doc }: { doc: Documento }) {
  const lista = (
    <ol>
      {doc.apartados.map((a) => (
        <li key={a.id}>
          <a href={`#${a.id}`}>
            <span>{a.numeral}</span>
            {a.titulo}
          </a>
        </li>
      ))}
    </ol>
  );
  return (
    <nav className="indice" aria-label="Índice">
      <div className="ind-d">
        <p className="lab ind-t">Índice</p>
        {lista}
      </div>
      <details className="ind-m">
        <summary className="lab">
          Índice <span>· {doc.apartados.length} apartados</span>
          <i className="pl" aria-hidden="true" />
        </summary>
        {lista}
      </details>
      {doc.otro && (
        <a className="lnk otro" href={doc.otro.href}>
          {doc.otro.titulo}
        </a>
      )}
    </nav>
  );
}

export default function PaginaDocumento({ doc, children }: { doc: Documento; children?: ReactNode }) {
  const vineta = VINETAS[doc.vineta];
  if (!vineta) throw new Error(`Viñeta desconocida: ${doc.vineta}`);
  return (
    <div className="pagina">
      <a className="salto" href="#contenido">
        Saltar al contenido
      </a>
      <BarraFija />
      <main id="contenido">
        <div className="portada">
          <img className="esq izq" src="/grabados/esquinas/hulsen.webp" alt="" width={760} height={768} />
          <img className="esq der" src="/grabados/esquinas/hulsen.webp" alt="" width={760} height={768} />
          <div className="wrap">
            <i className="vin" aria-hidden="true" style={mascara(vineta)} />
            <p className="caps">Documento {doc.documento} · HackUC3M’27</p>
            <h1>{doc.titulo}</h1>
            <p className="lead">{doc.entradilla}</p>
            <p className="meta lab">{doc.vigencia}</p>
          </div>
        </div>
        <div className="wrap cuerpo">
          <Indice doc={doc} />
          <article>
            {doc.intro.length > 0 && (
              <div className="intro">
                {doc.intro.map((p, i) => (
                  <p key={i}>
                    <Texto partes={p} />
                  </p>
                ))}
              </div>
            )}
            {doc.apartados.map((a) => (
              <section className="sec tz una" id={a.id} key={a.id}>
                <h2>
                  <span className="rn">{a.numeral}</span>
                  {a.titulo}
                </h2>
                {a.glosa && (
                  <p className="glosa">
                    <span className="lab">En corto</span>
                    {a.glosa}
                  </p>
                )}
                <div className="txt">
                  <Bloques bloques={a.bloques} />
                </div>
              </section>
            ))}
            {children}
            <div className="cul tz una" aria-hidden="true">
              <i style={mascara("/grabados/vinetas/remate.png")} />
            </div>
            <aside className="contacto">
              <p className="lab">¿Dudas?</p>
              <p>
                Escríbenos a{" "}
                <a className="lnk" href="mailto:aisc.asoc@uc3m.es">
                  aisc.asoc@uc3m.es
                </a>
                . Contesta una persona de la organización.
              </p>
              {doc.otro && (
                <p className="nota">
                  Lee también ·{" "}
                  <a className="lnk" href={doc.otro.href}>
                    {doc.otro.titulo}
                  </a>
                </p>
              )}
            </aside>
          </article>
        </div>
      </main>
      <Pie />
    </div>
  );
}

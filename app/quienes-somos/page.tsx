/* eslint-disable @next/next/no-img-element */
// «Quiénes somos»: portada de documento, un manifiesto corto y la galería de retratos de la
// organización, al modo de los «Retratos de los españoles ilustres» (1791): óvalo con doble filete,
// foto en duotono de tinta sobre papel y el nombre como pie de lámina. El orden cambia en cada visita.
import type { CSSProperties } from "react";
import { connection } from "next/server";
import { barajar } from "@/lib/empresas";
import BarraFija from "../barra-fija";
import Pie from "../pie";
import "../documento/documento.css";
import "./quienes-somos.css";

export const metadata = { title: "Quiénes somos · HackUC3M ’27" };

// Fotos de aiscmadrid.com/team.php, a 480 px en public/equipo/.
const EQUIPO = [
  { nombre: "Hugo", foto: "hugo" },
  { nombre: "Juanjo", foto: "juanjo" },
  { nombre: "Alfonso", foto: "alfonso" },
  { nombre: "Lauren", foto: "lauren" },
  { nombre: "Álvaro", foto: "alvaro" },
  { nombre: "Marta", foto: "marta" },
  { nombre: "Héctor", foto: "hector" },
  { nombre: "Alejandro", foto: "alejandro" },
];

const css = (vars: Record<string, string | number>) => vars as CSSProperties;

export default async function QuienesSomos() {
  // Dinámica para barajar en cada petición: nadie va primero.
  await connection();
  const equipo = barajar(EQUIPO);
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
            <i className="vin" aria-hidden="true" style={css({ "--m": "url(/grabados/agenda/guirnalda.webp)" })} />
            <p className="caps">La organización · HackUC3M’27</p>
            <h1>Quiénes somos</h1>
          </div>
        </div>

        <section className="wrap qs" aria-label="La organización">
          <p className="qs-mani">
            Somos estudiantes de la UC3M y formamos parte de AI Student Collective Madrid. Organizamos
            HackUC3M porque en el campus hay talento de sobra para resolver retos reales, y dos días
            bastan para demostrarlo.
          </p>

          <div className="galeria tz">
            <ul className="retratos">
              {equipo.map((m, i) => (
                <li key={m.foto} style={css({ "--i": i })}>
                  <figure className="retrato">
                    <span className="ovalo">
                      <span className="foto">
                        <img src={`/equipo/${m.foto}.webp`} alt={`Retrato de ${m.nombre}`} width={480} height={480} />
                      </span>
                    </span>
                    <figcaption>{m.nombre}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>

          <aside className="contacto">
            <p className="lab">¿Hablamos?</p>
            <p>
              Escríbenos a{" "}
              <a className="lnk" href="mailto:aisc.asoc@uc3m.es">
                aisc.asoc@uc3m.es
              </a>
              . Te contesta una de estas caras.
            </p>
          </aside>
        </section>
      </main>
      <Pie />
    </div>
  );
}

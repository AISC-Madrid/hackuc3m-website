import type { CSSProperties } from "react";
import type { TrackWeb } from "@/lib/empresas";

// La lista de tracks. La usan la landing y la vista previa del panel, así que las dos se ven
// igual por construcción.
// - Cada track con empresa es una columna: isologo, etiqueta, numeral y logo. El título y el reto
//   salen solo cuando existen; sin título, el track se nombra solo para lectores de pantalla.
// - Los huecos sin empresa no tienen columna propia: se juntan en una columna de cierre con un
//   grabado, «Y tres tracks más.» y la invitación a las empresas.

const NUMEROS = ["", "un", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];

// Columnas que ocupa la lista: el carril de escritorio calcula con ellas cuánto se desplaza.
export function columnasTracks(tracks: TrackWeb[]) {
  const confirmados = tracks.filter((t) => t.empresa).length;
  return confirmados + (confirmados < tracks.length ? 1 : 0);
}

export default function ListaTracks({ tracks }: { tracks: TrackWeb[] }) {
  const confirmados = tracks.filter((t) => t.empresa);
  const huecos = tracks.length - confirmados.length;
  return (
    <ol className="retos" style={{ "--n": columnasTracks(tracks) } as CSSProperties}>
      {confirmados.map((t, i) => (
        <Columna key={i} n={i + 1} track={t} />
      ))}
      {huecos > 0 && <Cierre huecos={huecos} />}
    </ol>
  );
}

function Columna({ n, track }: { n: number; track: TrackWeb }) {
  const { empresa, titulo, reto } = track;
  if (!empresa) return null;
  return (
    <li>
      {empresa.isologo ? (
        <img className="marca" src={empresa.isologo} alt={empresa.nombre} />
      ) : (
        <span className="emp">{empresa.nombre}</span>
      )}
      {empresa.corta && <span className="def">{empresa.corta}</span>}
      <div className="cab" aria-hidden="true">
        <span className="nn">{`${String(n).padStart(2, "0")}.`}</span>
        <span className="logo">{empresa.isotipo && <img src={empresa.isotipo} alt="" />}</span>
      </div>
      {titulo ? <h3 className="t">{titulo}</h3> : <h3 className="sr">Track {n}: {empresa.nombre}</h3>}
      {titulo && <p className="s">{reto || "Publicaremos el reto antes de abrir las inscripciones."}</p>}
    </li>
  );
}

function Cierre({ huecos }: { huecos: number }) {
  const cuantos = NUMEROS[huecos] ?? String(huecos);
  return (
    <li className="cierre">
      <span className="lab">Próximamente</span>
      <div className="cab" aria-hidden="true">
        <span className="vin" />
      </div>
      <h3 className="mas">
        Y {cuantos} {huecos === 1 ? "track" : "tracks"} más.
      </h3>
      <p className="s">
        <a className="lnk" href="#empresas">
          ¿Tu empresa quiere uno?
        </a>
      </p>
    </li>
  );
}

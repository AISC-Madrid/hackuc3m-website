import type { CSSProperties } from "react";
import type { TrackWeb } from "@/lib/empresas";

// La lista de tracks. La usan la landing y la vista previa del panel, así que las dos se ven
// igual por construcción.
// - Track con empresa: isologo, etiqueta, numeral y logo. Con título, título y reto; sin título,
//   el título va desenfocado («reto por desvelar») y una línea anuncia el reto de la empresa.
// - Track sin empresa: «sellado». Columna en damasco oscuro, numeral en crema y un grabado y un
//   título desenfocados, como algo que ya existe pero aún no se ha desvelado.

// Grabados de la agenda (con crédito en assets/creditos.json): uno distinto en cada track sellado.
const VINETAS = ["lira", "corona-cinta", "ave-laurel", "copa-flores", "guirnalda", "jarron-flores"];

// Columnas que ocupa la lista: el carril de escritorio calcula con ellas cuánto se desplaza.
export function columnasTracks(tracks: TrackWeb[]) {
  return tracks.length;
}

export default function ListaTracks({ tracks }: { tracks: TrackWeb[] }) {
  // Primero los que tienen empresa; los sellados, detrás (lib/empresas-db.ts ya los ordena así).
  const orden = [...tracks].sort((a, b) => Number(a.empresa === null) - Number(b.empresa === null));
  let sellado = 0;
  return (
    <ol className="retos" style={{ "--n": tracks.length } as CSSProperties}>
      {orden.map((t, i) =>
        t.empresa ? <Columna key={i} n={i + 1} track={t} /> : <Sellado key={i} n={i + 1} vineta={VINETAS[sellado++ % VINETAS.length]} />,
      )}
    </ol>
  );
}

function numeral(n: number) {
  return `${String(n).padStart(2, "0")}.`;
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
        <span className="nn">{numeral(n)}</span>
        <span className="logo">{empresa.isotipo && <img src={empresa.isotipo} alt="" />}</span>
      </div>
      {titulo ? (
        <>
          <h3 className="t">{titulo}</h3>
          <p className="s">{reto || "Publicaremos el reto antes de abrir las inscripciones."}</p>
        </>
      ) : (
        // Empresa confirmada, reto aún sellado: el título va desenfocado, como en los sellados.
        <>
          <h3 className="sr">Track {n}: {empresa.nombre}, reto por desvelar</h3>
          <p className="t" aria-hidden="true">
            <span className="velo">Reto por desvelar</span>
          </p>
          <p className="s">El reto de {empresa.nombre}, muy pronto.</p>
        </>
      )}
    </li>
  );
}

function Sellado({ n, vineta }: { n: number; vineta: string }) {
  return (
    <li className="sellado">
      <span className="lab">Por desvelar</span>
      <div className="cab" aria-hidden="true">
        <span className="nn">{numeral(n)}</span>
        <span className="logo">
          <span className="velo">
            <span className="vin" style={{ "--vin": `url(/grabados/agenda/${vineta}.webp)` } as CSSProperties} />
          </span>
        </span>
      </div>
      <h3 className="sr">Track {n}: por desvelar</h3>
      <p className="t" aria-hidden="true">
        <span className="velo">Track por desvelar</span>
      </p>
      <p className="s">Muy pronto.</p>
    </li>
  );
}

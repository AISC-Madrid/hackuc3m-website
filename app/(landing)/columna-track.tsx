import type { CSSProperties } from "react";
import type { TrackWeb } from "@/lib/empresas";

// Grabados de la agenda (ya con crédito en assets/creditos.json) para los huecos: uno distinto en
// cada columna vacía, entintado en malva con máscara.
const VINETAS = ["lira", "corona-cinta", "ave-laurel", "copa-flores", "guirnalda", "jarron-flores"];

// Una columna de la sección de tracks. La usan la landing y la vista previa del panel, así que
// las dos se ven igual por construcción.
// - Con empresa: isologo, etiqueta, numeral y logo. El título y el reto salen solo cuando existen;
//   sin título no se anuncia nada, el track se nombra solo para lectores de pantalla.
// - Sin empresa: «Próximamente», numeral en malva, un grabado en el cuadro del logo y una
//   invitación a las empresas.
export default function ColumnaTrack({ n, track }: { n: number; track: TrackWeb }) {
  const numeral = `${String(n).padStart(2, "0")}.`;
  const { empresa, titulo, reto } = track;

  if (!empresa)
    return (
      <li className="pronto">
        <span className="lab">Próximamente</span>
        <div className="cab" aria-hidden="true">
          <span className="nn">{numeral}</span>
          <span className="logo">
            <span className="vin" style={{ "--vin": `url(/grabados/agenda/${VINETAS[(n - 1) % VINETAS.length]}.webp)` } as CSSProperties} />
          </span>
        </div>
        <h3 className="sr">Track {n}: próximamente</h3>
        <p className="s">
          <a className="lnk" href="#empresas">
            ¿Será el de tu empresa?
          </a>
        </p>
      </li>
    );

  return (
    <li>
      {empresa.isologo ? (
        <img className="marca" src={empresa.isologo} alt={empresa.nombre} />
      ) : (
        <span className="emp">{empresa.nombre}</span>
      )}
      {empresa.corta && <span className="def">{empresa.corta}</span>}
      <div className="cab" aria-hidden="true">
        <span className="nn">{numeral}</span>
        <span className="logo">{empresa.isotipo && <img src={empresa.isotipo} alt="" />}</span>
      </div>
      {titulo ? <h3 className="t">{titulo}</h3> : <h3 className="sr">Track {n}: {empresa.nombre}</h3>}
      {titulo && <p className="s">{reto || "Publicaremos el reto antes de abrir las inscripciones."}</p>}
    </li>
  );
}

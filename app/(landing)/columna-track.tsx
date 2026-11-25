import type { TrackWeb } from "@/lib/empresas";

// Una columna de la sección de tracks. La usan la landing y la vista previa del panel, así que
// las dos se ven igual por construcción.
// - Con empresa: isologo, etiqueta, numeral y logo. El título y el reto salen solo cuando existen;
//   sin título no se anuncia nada, el track se nombra solo para lectores de pantalla.
// - Sin empresa: «Próximamente», numeral en malva y cuadro vacío, en voz baja.
export default function ColumnaTrack({ n, track }: { n: number; track: TrackWeb }) {
  const numeral = `${String(n).padStart(2, "0")}.`;
  const { empresa, titulo, reto } = track;

  if (!empresa)
    return (
      <li className="pronto">
        <span className="lab">Próximamente</span>
        <div className="cab" aria-hidden="true">
          <span className="nn">{numeral}</span>
          <span className="logo" />
        </div>
        <h3 className="sr">Track {n}: próximamente</h3>
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

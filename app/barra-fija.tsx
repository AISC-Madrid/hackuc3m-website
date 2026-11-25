/* eslint-disable @next/next/no-img-element */
// Barra de las páginas interiores (`.top.fija`): isotipo y nombre siempre visibles y el botón de
// preinscripción. La usan las páginas de documento y «Quiénes somos».
import Link from "next/link";

export default function BarraFija() {
  return (
    <header className="top fija">
      <div className="wrap topin">
        <Link href="/" className="marca" aria-label="HackUC3M, inicio">
          <img src="/hackuc3m-mark.webp" alt="" width={46} height={46} />
          <span className="mini" aria-hidden="true">
            HackUC3M<span>’27</span>
          </span>
        </Link>
        <div className="topder">
          <Link href="/#inscripcion" className="btn b1 peq">
            Preinscríbete <span className="ar gl manecilla" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}

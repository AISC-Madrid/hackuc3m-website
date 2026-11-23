"use client";
import { useEffect, useRef, useState } from "react";

// Barra superior. Se esconde al bajar una vez pasado el manifiesto (antes no, para que se vea el
// nombre que aparece junto al isotipo) y vuelve al subir. Con el foco dentro, siempre visible (CSS).
export default function Cabecera() {
  const [oculta, setOculta] = useState(false);
  const ultima = useRef(0);
  useEffect(() => {
    let frame = 0;
    const medir = () => {
      frame = 0;
      const y = window.scrollY;
      if (Math.abs(y - ultima.current) < 6) return;
      const mani = document.querySelector(".mani");
      const limite = mani ? mani.getBoundingClientRect().bottom + y : 1200;
      setOculta(y > ultima.current && y > limite);
      ultima.current = y;
    };
    const alMover = () => {
      if (!frame) frame = requestAnimationFrame(medir);
    };
    window.addEventListener("scroll", alMover, { passive: true });
    return () => {
      window.removeEventListener("scroll", alMover);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <header className={oculta ? "top oculto" : "top"}>
      <div className="wrap topin">
        <a href="#" className="marca" aria-label="HackUC3M, inicio">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hackuc3m-mark.svg" alt="" width={46} height={46} />
          <span className="mini" aria-hidden="true">
            HackUC3M<span>’27</span>
          </span>
        </a>
        <div className="topder">
          <nav aria-label="Navegación principal">
            <a href="#tracks">Tracks</a>
            <a href="#agenda">Agenda</a>
            <a href="#empresas">Empresas</a>
            <a href="#preguntas">Preguntas</a>
          </nav>
          <a href="#inscripcion" className="btn b1 peq">
            Preinscríbete <span className="ar gl manecilla" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
}

"use client";
import { useState } from "react";
import { euros } from "./datos";

// Moneda del gran premio: la misma moneda gofrada del hero, acuñada en oro. Al pasar el ratón
// (CSS) o al pulsar, se da la vuelta y enseña el reverso: el canto estriado y la cifra estampada.
export default function Moneda({ total }: { total: number }) {
  const [vuelta, setVuelta] = useState(false);
  return (
    <button
      type="button"
      className={vuelta ? "moneda vuelta" : "moneda"}
      aria-label="Dar la vuelta a la moneda"
      aria-pressed={vuelta}
      onClick={() => setVuelta((v) => !v)}
    >
      <span className="giro">
        <span className="cara" aria-hidden="true">
          <i className="som" />
          <i className="luz" />
          <i className="base" />
        </span>
        <span className="cara rev">
          <i className="som" aria-hidden="true" />
          <i className="luz" aria-hidden="true" />
          <i className="base" aria-hidden="true" />
          <span className="rev-t">
            <span className="caps">Gran premio</span>
            <b>
              <span className="mas">+</span>
              {euros(total)}
            </b>
            <span className="caps">MMXXVII</span>
          </span>
        </span>
      </span>
    </button>
  );
}

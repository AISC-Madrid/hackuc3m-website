"use client";
import { useState } from "react";
import { euros } from "./datos";

// Moneda del gran premio: al pasar el ratón (CSS) o al pulsar, se da la vuelta y enseña el reverso.
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
        <span className="cara">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/moneda-oro.svg" alt="" width={1000} height={1000} loading="lazy" />
        </span>
        <span className="cara rev">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/moneda-reverso.svg" alt="" width={1000} height={1000} loading="lazy" />
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

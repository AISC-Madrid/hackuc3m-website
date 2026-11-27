"use client";
import { useEffect, useState } from "react";

type Rueda = { cur: string; prev: string; cls: string };

const pad = (v: number) => String(v).padStart(2, "0");

function digitos(objetivo: number) {
  const t = Math.max(0, Math.floor((objetivo - Date.now()) / 1000));
  return (
    pad(Math.min(99, Math.floor(t / 86400))) +
    pad(Math.floor((t % 86400) / 3600)) +
    pad(Math.floor((t % 3600) / 60)) +
    pad(t % 60)
  );
}

const unidades = ["días", "horas", "minutos", "segundos"];

// Contador como numeradora: cada rueda recuerda su dígito anterior y alterna la clase a/b solo
// cuando cambia, lo que reinicia su animación. Al cargar no gira ninguna. Con «reducir movimiento»
// los números cambian sin girar (CSS).
function avanzar(ruedas: Rueda[], hm: string): Rueda[] {
  return ruedas.map((r, i) =>
    hm[i] === r.cur
      ? r
      : { prev: r.cur, cur: hm[i], cls: r.cls === "dg a" ? "dg b" : "dg a" },
  );
}

export default function Contador({ inicio }: { inicio: string }) {
  const objetivo = new Date(inicio).getTime();
  const [ruedas, setRuedas] = useState<Rueda[]>(() =>
    digitos(objetivo)
      .split("")
      .map((c) => ({ cur: c, prev: c, cls: "dg" })),
  );
  useEffect(() => {
    const id = setInterval(
      () => setRuedas((rs) => avanzar(rs, digitos(objetivo))),
      1000,
    );
    return () => clearInterval(id);
  }, [objetivo]);
  return (
    <div className="clock" role="timer" aria-label="Tiempo que falta para el hackathon">
      {unidades.map((u, k) => (
        <div key={u}>
          <span className="v">
            {[0, 1].map((j) => {
              const r = ruedas[k * 2 + j];
              return (
                <span key={j} className={r.cls}>
                  {r.cls !== "dg" && <i aria-hidden="true">{r.prev}</i>}
                  <i suppressHydrationWarning>{r.cur}</i>
                </span>
              );
            })}
          </span>
          <span className="lab">{u}</span>
        </div>
      ))}
    </div>
  );
}

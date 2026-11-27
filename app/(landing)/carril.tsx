"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

// Carril de un vehículo en bucle. El bucle espera a que el carril entre en pantalla, para que la
// primera pasada se vea; sin IntersectionObserver arranca al cargar. Es decorativo: aria-hidden.
export default function Carril({
  clase,
  style,
  children,
}: {
  clase: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visto, setVisto] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setVisto(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setVisto(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={visto ? "lane" : "lane espera"} style={style} aria-hidden="true">
      <span className={`mv ${clase}`}>
        {children}
      </span>
    </div>
  );
}

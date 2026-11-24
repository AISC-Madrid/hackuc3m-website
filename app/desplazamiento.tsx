"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Respaldo de las animaciones ligadas al scroll para navegadores sin `animation-timeline`
// (Firefox y Safari anteriores a la 26). Donde hay soporte no hace nada: manda el CSS.
//
// Pone la clase `sv` en <html> y, en un solo bucle de requestAnimationFrame sobre el scroll pasivo:
// - Cerrojos: añade `.on` (una sola vez) a lo que en CSS nativo usa `lamOn` + `@container style(--on: 1)`.
// - Progresos: escribe variables (--wm, --prof, --cohete, --sube, --e, --c, --mini) que el CSS de
//   `.sv` convierte en transform, opacity o clip-path, y marca `.l` en las palabras ya leídas.
// Con «reducir movimiento» no se activa: todo queda en su estado final, como sin JS.

type Cerrojo = { sel: string; umbral: number; px?: boolean };

// Mismos rangos que el CSS nativo: «entry N%» = N % de lo que puede entrar del elemento.
const CERROJOS: Cerrojo[] = [
  { sel: ".lamina", umbral: 0.4 },
  { sel: ".tz", umbral: 0.15 },
  { sel: ".pie", umbral: 0.7 },
  { sel: ".premio", umbral: 0.4 },
  { sel: ".preguntas", umbral: 0.15 },
  { sel: ".dia", umbral: 0.15 },
  { sel: ".tracks-sec", umbral: 360, px: true },
];

const recorta = (v: number) => Math.min(1, Math.max(0, v));

export default function Desplazamiento() {
  const ruta = usePathname();
  useEffect(() => {
    if (
      CSS.supports("animation-timeline: view()") ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const html = document.documentElement;
    const $ = <T extends Element = HTMLElement>(s: string) => document.querySelector<T>(s);
    const $$ = <T extends Element = HTMLElement>(s: string) =>
      Array.from(document.querySelectorAll<T>(s));

    const pendientes = CERROJOS.flatMap((c) => $$(c.sel).map((el) => ({ el, c })));
    const pagina = $(".pagina");
    const hero = $(".hero");
    const wm = $(".hero .wm");
    const mini = $(".v3 .marca");
    const mani = $(".mani .big");
    const maniLamina = $(".mani .lamina");
    const leer = $$(".leer");
    const cifras = $(".cifras-s");
    const pasos = $$(".cifras-s .paso");
    const rieles = $(".rieles");
    const carril = $(".rieles .retos");

    let frame = 0;
    const medir = () => {
      frame = 0;
      const vh = window.innerHeight;
      const ancho = pagina?.clientWidth ?? window.innerWidth;
      const escritorio = ancho > 820;

      // Cerrojos: se encienden una vez y no se apagan al subir.
      for (let i = pendientes.length - 1; i >= 0; i--) {
        const { el, c } = pendientes[i];
        const r = el.getBoundingClientRect();
        const entrado = vh - r.top;
        const necesita = c.px ? c.umbral : c.umbral * Math.min(r.height, vh);
        if (entrado >= necesita && r.bottom > 0) {
          el.classList.add("on");
          pendientes.splice(i, 1);
        }
      }

      // Hero: el titular encoge al salir y el nombre aparece en la barra; profundidad y cohete.
      if (hero && wm) {
        const r = wm.getBoundingClientRect();
        const p = recorta(-r.top / r.height);
        const rh = hero.getBoundingClientRect();
        hero.style.setProperty("--wm", p.toFixed(3));
        hero.style.setProperty("--prof", recorta(-rh.top / rh.height).toFixed(3));
        hero.style.setProperty("--cohete", recorta(window.scrollY / 700).toFixed(3));
        mini?.style.setProperty("--mini", recorta((p - 0.4) / 0.6).toFixed(3));
      }

      // Palabras que pasan de malva a tinta al leerlas (reversible, como el CSS nativo).
      const palabras = (cont: HTMLElement, paso: number) => {
        const r = cont.getBoundingClientRect();
        const p = (vh - r.top) / (vh + r.height);
        cont.querySelectorAll<HTMLElement>(".w").forEach((w, i) =>
          w.classList.toggle("l", p >= 0.265 + i * paso),
        );
      };
      if (mani) palabras(mani, 0.022);
      leer.forEach((h) => palabras(h, 0.04));

      if (maniLamina) {
        const r = maniLamina.getBoundingClientRect();
        maniLamina.style.setProperty("--sube", recorta((vh - r.top) / (0.4 * (vh + r.height))).toFixed(3));
      }

      // Cifras: en escritorio la banda se queda fija y cambia de cifra cada 50svh; en móvil cada una
      // cuenta al aparecer.
      if (cifras && pasos.length) {
        if (escritorio) {
          const entrado = vh - cifras.getBoundingClientRect().top;
          const tramo = (2 * vh) / pasos.length;
          pasos.forEach((paso, k) => {
            const t = (entrado - 0.7 * vh - k * tramo) / tramo;
            const primero = k === 0;
            const ultimo = k === pasos.length - 1;
            // Como --act en la versión nativa: el scroll solo dice qué cifra toca; el CSS funde por tiempo.
            if (t >= 0) paso.classList.add("on");
            paso.classList.toggle("act", (primero || t >= 0) && (ultimo || t < 1));
          });
        } else {
          pasos.forEach((paso) => {
            const r = paso.getBoundingClientRect();
            if (vh - r.top >= 0.5 * Math.min(r.height, vh)) paso.classList.add("on");
          });
        }
      }

      // Tracks: en escritorio la franja se queda fija y las columnas pasan en horizontal.
      if (rieles && escritorio) {
        const r = rieles.getBoundingClientRect();
        rieles.style.setProperty("--e", recorta((vh - r.top) / vh).toFixed(4));
        rieles.style.setProperty("--c", recorta(-r.top / (r.height - vh)).toFixed(4));
      }
    };
    const alMover = () => {
      if (!frame) frame = requestAnimationFrame(medir);
    };

    // Carrusel de tracks en móvil: el filete sigue al desplazamiento horizontal.
    const alCarril = () => {
      if (!rieles || !carril || (pagina?.clientWidth ?? 0) > 820) return;
      const max = carril.scrollWidth - carril.clientWidth;
      rieles.style.setProperty("--c", (max > 0 ? carril.scrollLeft / max : 0).toFixed(4));
    };

    // Se mide en el mismo fotograma en que entra `sv`: lo que ya está a la vista no se «desdibuja».
    html.classList.add("sv");
    medir();
    alCarril();
    window.addEventListener("scroll", alMover, { passive: true });
    window.addEventListener("resize", alMover, { passive: true });
    carril?.addEventListener("scroll", alCarril, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", alMover);
      window.removeEventListener("resize", alMover);
      carril?.removeEventListener("scroll", alCarril);
      html.classList.remove("sv");
    };
  }, [ruta]);
  return null;
}

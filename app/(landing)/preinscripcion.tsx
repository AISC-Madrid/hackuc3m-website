"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

type Error = { tipo: "mail" | "chk"; texto: string; n: number } | null;

// Preinscripción (POST /api/waitlist). Errores propios en lugar del globo del navegador: el filete
// o la casilla pasan a ciruela, se sacuden y sale una línea en cursiva. Al enviar cae el sello
// «Preinscrito» y sube un aviso durante 3 s.
export default function Preinscripcion({ abierta }: { abierta: boolean }) {
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok">("idle");
  const [error, setError] = useState<Error>(null);
  const [aviso, setAviso] = useState({ texto: "", on: false });
  const temporizador = useRef<ReturnType<typeof setTimeout>>(undefined);
  // El aviso va al final de la página (#avisos): la raíz es container-type y fixed no ancla al viewport.
  // Se monta en el primer envío y el aviso entra un fotograma después, para que se vea la transición.
  const [destino, setDestino] = useState<HTMLElement | null>(null);
  useEffect(() => () => clearTimeout(temporizador.current), []);

  function avisar(texto: string) {
    setDestino(document.getElementById("avisos"));
    clearTimeout(temporizador.current);
    requestAnimationFrame(() => requestAnimationFrame(() => setAviso({ texto, on: true })));
    temporizador.current = setTimeout(() => setAviso((a) => ({ ...a, on: false })), 3200);
  }

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (estado !== "idle") return;
    const form = e.currentTarget;
    const mail = form.elements.namedItem("email") as HTMLInputElement;
    const casilla = form.elements.namedItem("consent") as HTMLInputElement;
    const n = (error?.n ?? 0) + 1;
    if (!mail.validity.valid) {
      setError({
        tipo: "mail",
        texto: mail.value ? "Revisa el correo: parece que falta algo." : "Escribe tu correo.",
        n,
      });
      mail.focus();
      return;
    }
    if (!casilla.checked) {
      setError({ tipo: "chk", texto: "Marca la casilla de privacidad para seguir.", n });
      casilla.focus();
      return;
    }
    setError(null);
    setEstado("enviando");
    try {
      const respuesta = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
        signal: AbortSignal.timeout(20000),
      });
      const datos = (await respuesta.json().catch(() => ({}))) as {
        error?: string;
        message?: string;
      };
      if (!respuesta.ok)
        throw new Error(datos.error || "No hemos podido guardar tu correo. Inténtalo de nuevo.");
      setEstado("ok");
      avisar(datos.message || "Revisa tu correo para confirmar.");
    } catch (err) {
      setEstado("idle");
      setError({
        tipo: "mail",
        texto:
          err instanceof Error && err.name !== "TimeoutError"
            ? err.message
            : "No hay conexión. Inténtalo de nuevo.",
        n,
      });
    }
  }

  if (!abierta)
    return (
      <div className="panel">
        <p className="p" style={{ color: "inherit" }}>
          Las preinscripciones están cerradas. Publicaremos aquí las próximas novedades.
        </p>
      </div>
    );

  const clase = [
    "panel",
    estado === "ok" && "ok",
    error && `err-${error.tipo} ${error.n % 2 ? "e1" : "e2"}`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <form className={clase} noValidate onSubmit={enviar} onInput={() => error && setError(null)}>
        <label className="field">
          <span className="lab">Nombre</span>
          <input type="text" name="name" placeholder="Opcional" autoComplete="given-name" maxLength={100} />
        </label>
        <label className="field mail">
          <span className="lab">Correo</span>
          <input
            type="email"
            name="email"
            placeholder="tu@correo.es"
            autoComplete="email"
            maxLength={254}
            required
            aria-invalid={error?.tipo === "mail" || undefined}
            aria-describedby="preinscripcion-error"
          />
        </label>
        <div className="trampa" aria-hidden="true">
          <label>
            Deja este campo vacío
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <label className="chk">
          <input type="checkbox" name="consent" value="yes" required aria-describedby="preinscripcion-error" />
          <span className="caja" aria-hidden="true" />
          <span>
            He leído la <a className="lnk" href="/privacidad">política de privacidad</a>
          </span>
        </label>
        <p className="err-msg" id="preinscripcion-error" role="alert">
          {error?.texto}
        </p>
        <button type="submit" className="btn b1 envia" disabled={estado === "enviando"}>
          <span className="t1">{estado === "enviando" ? "Enviando…" : "Preinscribirme"}</span>
          <span className="t2" aria-hidden={estado !== "ok"}>
            Te avisaremos
          </span>{" "}
          <span className="ar gl manecilla" aria-hidden="true" />
        </button>
        <span className="sello" aria-hidden="true">
          Preinscrito
        </span>
      </form>
      {destino &&
        createPortal(
          <div className={aviso.on ? "aviso on" : "aviso"} role="status" aria-live="polite">
            <span className="lab">Preinscripción</span>
            {aviso.texto}
          </div>,
          destino,
        )}
    </div>
  );
}

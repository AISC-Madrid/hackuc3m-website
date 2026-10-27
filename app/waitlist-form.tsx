"use client";
import { useState, type FormEvent } from "react";

export default function WaitlistForm({ open }: { open: boolean }) {
  const [state, setState] = useState<"idle" | "pending" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("pending");
    setMessage("");
    const form = new FormData(e.currentTarget);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form)),
        signal: AbortSignal.timeout(20000),
      });
      const result = (await response.json()) as {
        error?: string;
        message: string;
      };
      if (!response.ok)
        throw new Error(
          result.error ||
            "No hemos podido guardar tu email. Inténtalo de nuevo.",
        );
      setState("success");
      setMessage(result.message);
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "No hay conexión. Inténtalo de nuevo.",
      );
    }
  }
  if (!open)
    return (
      <div className="signup-form">
        <h3>Las preinscripciones están cerradas.</h3>
        <p>Publicaremos aquí las próximas novedades.</p>
      </div>
    );
  if (state === "success")
    return (
      <div className="signup-form signup-success" role="status">
        <svg
          aria-hidden="true"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="20" cy="20" r="18" />
          <path d="m12 20 5 5 11-11" />
        </svg>
        <h3>Ya estás preinscrito.</h3>
        <p>{message}</p>
        <span>HackUC3M ’27 · Leganés</span>
      </div>
    );
  return (
    <form onSubmit={submit} className="signup-form">
      <h3>Preinscripción a HackUC3M ’27</h3>
      <label htmlFor="name">
        Tu nombre <span>(opcional)</span>
      </label>
      <input
        id="name"
        name="name"
        autoComplete="given-name"
        maxLength={100}
        placeholder="¿Cómo te llamas?"
      />
      <label htmlFor="email">Tu email</label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        maxLength={254}
        placeholder="tu@email.com"
      />
      <div className="form-trap" aria-hidden="true">
        <label htmlFor="website">Deja este campo vacío</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" value="yes" required />
        <span>
          Quiero recibir el enlace de inscripción y avisos de HackUC3M. Acepto
          la <a href="/privacidad">política de privacidad</a>.
        </span>
      </label>
      <button
        className="button primary"
        disabled={state === "pending"}
        type="submit"
      >
        {state === "pending"
          ? "Guardando tu sitio…"
          : "Preinscribirme con prioridad"}
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M4 12h16m-6-6 6 6-6 6" />
        </svg>
      </button>
      <p className="form-note">
        Te enviaremos el enlace cuando abramos inscripciones. Tendrás prioridad para apuntarte. La preinscripción no confirma una plaza.
      </p>
      <p className="form-message" role="status">
        {message}
      </p>
    </form>
  );
}

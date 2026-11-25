import { readLimitedText } from "@/lib/request";
import { bindings } from "@/lib/cloudflare";
import { readContent } from "@/lib/content";
import { sendConfirmation } from "@/lib/email";
import { sameOrigin } from "@/lib/admin";

export async function POST(request: Request) {
  if (!sameOrigin(request))
    return Response.json({ error: "Solicitud no válida." }, { status: 403 });
  try {
    const body = await readLimitedText(request, 3000);
    if (body === null) return new Response(null, { status: 413 });
    if (body.length > 3000) return new Response(null, { status: 413 });
    let data: Record<string, unknown>;
    try {
      data = JSON.parse(body);
    } catch {
      return Response.json({ error: "Revisa el formulario." }, { status: 400 });
    }
    if (!data || typeof data !== "object")
      return new Response(null, { status: 400 });
    if (data.website) return Response.json({ message: "Solicitud recibida." });
    const email =
      typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
    const name = typeof data.name === "string" ? data.name.trim() : "";
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.length > 254 ||
      name.length > 100 ||
      data.consent !== "yes"
    )
      return Response.json(
        {
          error:
            "Introduce un email válido y acepta la política de privacidad.",
        },
        { status: 400 },
      );
    const env = await bindings();
    if (!(await readContent()).waitlistOpen)
      return Response.json(
        { error: "La lista de espera está cerrada." },
        { status: 409 },
      );
    // Store a short-lived hash, never the visitor's raw IP.
    const ip = request.headers.get("cf-connecting-ip") || "local";
    const bucket = Math.floor(Date.now() / 600000);
    const hash = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(`${ip}:${bucket}`),
    );
    const key = Array.from(new Uint8Array(hash), (b) =>
      b.toString(16).padStart(2, "0"),
    ).join("");
    const now = Math.floor(Date.now() / 1000);
    const rate = await env.DB.prepare(
      "INSERT INTO signup_limits (key, expires_at) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET requests = requests + 1 RETURNING requests",
    )
      .bind(key, now + 600)
      .first<{ requests: number }>();
    if (!rate || rate.requests > 60)
      return Response.json(
        { error: "Demasiados intentos. Vuelve a intentarlo en diez minutos." },
        { status: 429, headers: { "Retry-After": "600" } },
      );
    await env.DB.prepare("DELETE FROM signup_limits WHERE expires_at < ?")
      .bind(now)
      .run();
    const row = await env.DB.prepare(
      "INSERT INTO waitlist (email, name, consent_version) VALUES (?, ?, '2026-10-26') ON CONFLICT(email) DO NOTHING RETURNING id",
    )
      .bind(email, name)
      .first<{ id: number }>();
    // The unique email and immutable joining time preserve priority on retries.
    if (row && env.RESEND_API_KEY) {
      try {
        if (!(await sendConfirmation(row.id, email)))
          console.error("waitlist_confirmation_failed", { id: row.id });
      } catch {
        console.error("waitlist_confirmation_failed", { id: row.id });
      }
    }
    return Response.json({
      message:
        "Hemos guardado tu preinscripción. Te enviaremos el enlace cuando abramos inscripciones y tendrás prioridad para apuntarte. Si ya te habías preinscrito, conservas tu prioridad original.",
    });
  } catch (error) {
    console.error("waitlist_save_failed", {
      type: error instanceof Error ? error.name : "unknown",
    });
    return Response.json(
      {
        error:
          "No hemos podido guardar tu email. Inténtalo de nuevo en unos minutos.",
      },
      { status: 503 },
    );
  }
}

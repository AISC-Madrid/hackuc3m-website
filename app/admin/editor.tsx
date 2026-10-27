"use client";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import type { EventContent } from "@/lib/event";

type Member = {
  id: number;
  email: string;
  name: string;
  joined_at: string;
  confirmation_sent_at: string | null;
};
export default function Editor() {
  const [content, setContent] = useState<EventContent | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [status, setStatus] = useState("Cargando…");
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    Promise.all([fetch("/api/admin/content"), fetch("/api/admin/waitlist")])
      .then(async ([c, m]) => {
        const data = (await c.json()) as EventContent & { error?: string };
        if (!c.ok) throw new Error(data.error);
        setContent(data);
        if (m.ok) setMembers(await m.json());
        setStatus("");
      })
      .catch((e) =>
        setStatus(
          e instanceof Error ? e.message : "No se ha podido cargar el editor.",
        ),
      );
  }, []);
  async function save(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatus("");
    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error);
      setStatus("Cambios publicados. Ya están disponibles en la web.");
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "No se ha podido guardar.");
    } finally {
      setSaving(false);
    }
  }
  async function retryEmails() {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/confirmations", {
        method: "POST",
      });
      const data = (await response.json()) as {
        error?: string;
        sent: number;
        pending: number;
      };
      setStatus(
        response.ok
          ? `${data.sent} confirmaciones enviadas. ${data.pending} pendientes en este lote. Puedes repetir para procesar el siguiente lote.`
          : data.error || "No se ha podido enviar.",
      );
    } catch {
      setStatus("No se ha podido conectar. Inténtalo de nuevo.");
    } finally {
      setSaving(false);
    }
  }
  function exportCSV() {
    const cell = (v: string | number | null) =>
      `"${String(v ?? "")
        .replace(/^[=+@\-\t\r]/, "'$&")
        .replaceAll('"', '""')}"`;
    const csv = [
      ["Orden", "Email", "Nombre", "Fecha de alta", "Confirmación enviada"],
      ...members.map((m) => [
        m.id,
        m.email,
        m.name,
        m.joined_at,
        m.confirmation_sent_at,
      ]),
    ]
      .map((r) => r.map(cell).join(","))
      .join("\r\n");
    const url = URL.createObjectURL(
      new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "hackuc3m-waitlist.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <main className="admin-shell">
      <Link className="text-link" href="/">
        Volver a la web
      </Link>
      <h1>Organización HackUC3M</h1>
      <p role="status">{status}</p>
      {content && (
        <>
          <form onSubmit={save}>
            <h2>Información del evento</h2>
            <label htmlFor="event-date">Fecha</label>
            <input
              id="event-date"
              value={content.date}
              maxLength={100}
              required
              onChange={(e) => setContent({ ...content, date: e.target.value })}
            />
            <label htmlFor="event-venue">Lugar</label>
            <input
              id="event-venue"
              value={content.venue}
              maxLength={200}
              required
              onChange={(e) =>
                setContent({ ...content, venue: e.target.value })
              }
            />
            <label htmlFor="event-intro">Presentación</label>
            <textarea
              id="event-intro"
              value={content.intro}
              maxLength={2000}
              required
              onChange={(e) =>
                setContent({ ...content, intro: e.target.value })
              }
            />
            <label>
              <input
                type="checkbox"
                checked={content.waitlistOpen}
                onChange={(e) =>
                  setContent({ ...content, waitlistOpen: e.target.checked })
                }
              />{" "}
              Lista de espera abierta
            </label>
            <h2>Tracks</h2>
            {content.tracks.map((track, i) => (
              <div className="admin-row" key={i}>
                <label htmlFor={`track-title-${i}`}>Título</label>
                <input
                  id={`track-title-${i}`}
                  value={track.title}
                  maxLength={100}
                  required
                  onChange={(e) =>
                    setContent({
                      ...content,
                      tracks: content.tracks.map((t, n) =>
                        n === i ? { ...t, title: e.target.value } : t,
                      ),
                    })
                  }
                />
                <label htmlFor={`track-description-${i}`}>Descripción</label>
                <textarea
                  id={`track-description-${i}`}
                  value={track.description}
                  maxLength={2000}
                  required
                  onChange={(e) =>
                    setContent({
                      ...content,
                      tracks: content.tracks.map((t, n) =>
                        n === i ? { ...t, description: e.target.value } : t,
                      ),
                    })
                  }
                />
                <button
                  type="button"
                  className="button secondary compact"
                  onClick={() =>
                    setContent({
                      ...content,
                      tracks: content.tracks.filter((_, n) => n !== i),
                    })
                  }
                >
                  Eliminar track
                </button>
              </div>
            ))}
            <button
              type="button"
              className="button secondary compact"
              onClick={() =>
                setContent({
                  ...content,
                  tracks: [...content.tracks, { title: "", description: "" }],
                })
              }
            >
              Añadir track
            </button>
            <h2>Patrocinadores</h2>
            {content.sponsors.map((sponsor, i) => (
              <div className="admin-row" key={i}>
                <label htmlFor={`sponsor-name-${i}`}>Nombre</label>
                <input
                  id={`sponsor-name-${i}`}
                  value={sponsor.name}
                  maxLength={100}
                  required
                  onChange={(e) =>
                    setContent({
                      ...content,
                      sponsors: content.sponsors.map((s, n) =>
                        n === i ? { ...s, name: e.target.value } : s,
                      ),
                    })
                  }
                />
                <label htmlFor={`sponsor-url-${i}`}>Web (https://)</label>
                <input
                  id={`sponsor-url-${i}`}
                  type="url"
                  value={sponsor.url}
                  required
                  onChange={(e) =>
                    setContent({
                      ...content,
                      sponsors: content.sponsors.map((s, n) =>
                        n === i ? { ...s, url: e.target.value } : s,
                      ),
                    })
                  }
                />
                <label htmlFor={`sponsor-logo-${i}`}>
                  Logo, https:// o /archivo.svg <span>(opcional)</span>
                </label>
                <input
                  id={`sponsor-logo-${i}`}
                  value={sponsor.logo ?? ""}
                  maxLength={500}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      sponsors: content.sponsors.map((s, n) =>
                        n === i ? { ...s, logo: e.target.value } : s,
                      ),
                    })
                  }
                />
                <button
                  type="button"
                  className="button secondary compact"
                  onClick={() =>
                    setContent({
                      ...content,
                      sponsors: content.sponsors.filter((_, n) => n !== i),
                    })
                  }
                >
                  Eliminar patrocinador
                </button>
              </div>
            ))}
            <button
              type="button"
              className="button secondary compact"
              onClick={() =>
                setContent({
                  ...content,
                  sponsors: [
                    ...content.sponsors,
                    { name: "", url: "https://" },
                  ],
                })
              }
            >
              Añadir patrocinador
            </button>
            <h2>Preguntas frecuentes</h2>
            {content.faqs.map((faq, i) => (
              <div className="admin-row" key={i}>
                <label htmlFor={`question-${i}`}>Pregunta</label>
                <input
                  id={`question-${i}`}
                  value={faq.question}
                  maxLength={200}
                  required
                  onChange={(e) =>
                    setContent({
                      ...content,
                      faqs: content.faqs.map((f, n) =>
                        n === i ? { ...f, question: e.target.value } : f,
                      ),
                    })
                  }
                />
                <label htmlFor={`answer-${i}`}>Respuesta</label>
                <textarea
                  id={`answer-${i}`}
                  value={faq.answer}
                  maxLength={2000}
                  required
                  onChange={(e) =>
                    setContent({
                      ...content,
                      faqs: content.faqs.map((f, n) =>
                        n === i ? { ...f, answer: e.target.value } : f,
                      ),
                    })
                  }
                />
                <button
                  type="button"
                  className="button secondary compact"
                  onClick={() =>
                    setContent({
                      ...content,
                      faqs: content.faqs.filter((_, n) => n !== i),
                    })
                  }
                >
                  Eliminar pregunta
                </button>
              </div>
            ))}
            <button
              type="button"
              className="button secondary compact"
              onClick={() =>
                setContent({
                  ...content,
                  faqs: [...content.faqs, { question: "", answer: "" }],
                })
              }
            >
              Añadir pregunta
            </button>
            <div className="admin-actions">
              <button
                className="button primary"
                type="submit"
                disabled={saving}
              >
                {saving ? "Publicando…" : "Publicar cambios"}
              </button>
              <Link className="text-link" href="/" target="_blank">
                Ver la web
              </Link>
            </div>
          </form>
          <h2>Lista de espera</h2>
          <p>
            {members.length} personas. El orden original de alta se conserva
            aunque alguien vuelva a apuntarse.
          </p>
          <div className="admin-actions">
            <button
              type="button"
              className="button secondary compact"
              onClick={exportCSV}
            >
              Descargar CSV
            </button>
            <button
              type="button"
              className="button secondary compact"
              disabled={saving}
              onClick={retryEmails}
            >
              Enviar confirmaciones pendientes (5)
            </button>
          </div>
          <small>
            El CSV contiene datos personales. Compártelo solo con las personas
            responsables del evento.
          </small>
          <div className="admin-note">
            Las invitaciones prioritarias se enviarán cuando se defina la fecha
            de apertura y el enlace de inscripción. No se envían correos masivos
            desde este editor.
          </div>
        </>
      )}
    </main>
  );
}

import { authorized, sameOrigin } from "@/lib/admin";
import { bindings } from "@/lib/cloudflare";
import { sendConfirmation } from "@/lib/email";
export async function POST(request: Request) {
  if (!sameOrigin(request) || !(await authorized(request)))
    return Response.json({ error: "No autorizado" }, { status: 403 });
  const env = await bindings();
  if (!env.RESEND_API_KEY)
    return Response.json(
      { error: "Configura RESEND_API_KEY antes de enviar correos." },
      { status: 503 },
    );
  const pending = await env.DB.prepare(
    "SELECT id, email FROM waitlist WHERE confirmation_sent_at IS NULL ORDER BY id LIMIT 5",
  ).all<{ id: number; email: string }>();
  let sent = 0;
  for (const row of pending.results) {
    try {
      if (await sendConfirmation(row.id, row.email)) sent++;
    } catch {
      /* Leave it pending for a retry. */
    }
  }
  return Response.json({ sent, pending: pending.results.length - sent });
}

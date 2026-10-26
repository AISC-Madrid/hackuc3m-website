import { bindings } from "./cloudflare";
export async function sendConfirmation(id: number, email: string) {
  const env = await bindings();
  if (!env.RESEND_API_KEY) return false;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `waitlist-confirmation-${id}`,
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to: [email],
      reply_to: env.ADMIN_EMAIL,
      subject: "Tu preinscripción a HackUC3M ’27",
      text: "Hemos guardado tu preinscripción a HackUC3M ’27. Tendrás prioridad cuando abramos las inscripciones. Te enviaremos el enlace de inscripción a este email cuando abramos las inscripciones. La preinscripción no confirma una plaza; la participación se confirmará durante la inscripción.\n\nPara darte de baja o gestionar tus datos, escribe a aisc.asoc@uc3m.es.\n\nNos vemos en Leganés,\nAISC Madrid",
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) return false;
  await env.DB.prepare(
    "UPDATE waitlist SET confirmation_sent_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') WHERE id = ?",
  )
    .bind(id)
    .run();
  return true;
}

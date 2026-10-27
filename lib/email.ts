import { bindings } from "./cloudflare";
import { confirmationEmail } from "./confirmation-email";
import { readContent } from "./content";
export async function sendConfirmation(id: number, email: string) {
  const env = await bindings();
  if (!env.RESEND_API_KEY) return false;
  const message = confirmationEmail(await readContent());
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
      ...message,
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

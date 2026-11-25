import { bindings } from "./cloudflare";
import { confirmationEmail } from "./confirmation-email";
import { readContent } from "./content";
// Preview versions share the Worker's secrets, so EMAIL_DELIVERY=off is what
// keeps them from sending real email (see the preview env in wrangler.jsonc).
export function emailKey(env: CloudflareEnv) {
  return env.EMAIL_DELIVERY === "off" ? undefined : env.RESEND_API_KEY;
}

export async function sendConfirmation(id: number, email: string) {
  const env = await bindings();
  const key = emailKey(env);
  if (!key) return false;
  const message = confirmationEmail(await readContent());
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
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

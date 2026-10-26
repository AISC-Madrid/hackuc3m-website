import { authorized } from "@/lib/admin";
import { bindings } from "@/lib/cloudflare";
export async function GET(request: Request) {
  if (!(await authorized(request)))
    return Response.json({ error: "No autorizado" }, { status: 401 });
  const { DB } = await bindings();
  const result = await DB.prepare(
    "SELECT id, email, name, joined_at, confirmation_sent_at, invitation_sent_at, registered_at FROM waitlist ORDER BY id LIMIT 10000",
  ).all();
  return Response.json(result.results, {
    headers: { "Cache-Control": "no-store" },
  });
}

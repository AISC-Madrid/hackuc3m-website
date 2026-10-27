import { readLimitedText } from "@/lib/request";
import { authorized, sameOrigin } from "@/lib/admin";
import { readContent, validContent } from "@/lib/content";
import { bindings } from "@/lib/cloudflare";
export async function GET(request: Request) {
  if (!(await authorized(request)))
    return Response.json(
      {
        error:
          "Acceso reservado a la organización. Configura Cloudflare Access para continuar.",
      },
      { status: 401 },
    );
  return Response.json(await readContent(), {
    headers: { "Cache-Control": "no-store" },
  });
}
export async function PUT(request: Request) {
  if (!sameOrigin(request) || !(await authorized(request)))
    return Response.json({ error: "No autorizado" }, { status: 403 });
  if (Number(request.headers.get("content-length")) > 100000)
    return new Response(null, { status: 413 });
  let content: unknown;
  try {
    const body = await readLimitedText(request, 100000);
    if (body === null) return new Response(null, { status: 413 });
    if (body.length > 100000) return new Response(null, { status: 413 });
    content = JSON.parse(body);
  } catch {
    return Response.json({ error: "Contenido no válido" }, { status: 400 });
  }
  if (!validContent(content))
    return Response.json(
      {
        error:
          "Revisa los campos. Los enlaces y logos de patrocinadores deben empezar por https:// (o / para archivos de la web).",
      },
      { status: 400 },
    );
  const { DB } = await bindings();
  await DB.prepare(
    "INSERT INTO event_content (id, content) VALUES (1, ?) ON CONFLICT(id) DO UPDATE SET content = excluded.content, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')",
  )
    .bind(JSON.stringify(content))
    .run();
  return Response.json({ saved: true });
}

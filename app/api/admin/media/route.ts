import { authorized, sameOrigin } from "@/lib/admin";
import { bindings } from "@/lib/cloudflare";
import { readLimitedBytes } from "@/lib/request";

const TIPOS: Record<string, string> = {
  "image/png": "png",
  "image/webp": "webp",
  "image/jpeg": "jpg",
  "image/svg+xml": "svg",
};
const MAX = 1_000_000;

// Sube un logo a R2. El cuerpo es el fichero tal cual; el tipo va en Content-Type.
export async function POST(request: Request) {
  if (!sameOrigin(request) || !(await authorized(request)))
    return Response.json({ error: "No autorizado" }, { status: 403 });
  const tipo = request.headers.get("content-type") ?? "";
  const ext = TIPOS[tipo];
  if (!ext)
    return Response.json({ error: "El logo tiene que ser SVG, PNG, WebP o JPG." }, { status: 415 });
  const bytes = await readLimitedBytes(request, MAX);
  if (!bytes || bytes.byteLength === 0)
    return Response.json({ error: "El logo no puede pasar de 1 MB." }, { status: 413 });
  const key = `logo-${crypto.randomUUID()}.${ext}`;
  const { MEDIA } = await bindings();
  await MEDIA.put(key, bytes, { httpMetadata: { contentType: tipo } });
  return Response.json({ url: `/media/${key}` });
}

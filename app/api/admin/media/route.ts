import { authorized, sameOrigin } from "@/lib/admin";
import { bindings } from "@/lib/cloudflare";
import { pngTieneTransparencia } from "@/lib/empresas";
import { readLimitedBytes } from "@/lib/request";

const TIPOS: Record<string, string> = {
  "image/png": "png",
  "image/webp": "webp",
  "image/jpeg": "jpg",
  "image/svg+xml": "svg",
};
const MAX = 1_000_000;

// Sube un logo a R2. El cuerpo es el fichero tal cual; el tipo va en Content-Type.
// ?tipo=isotipo o logotipo exige SVG o PNG transparente.
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
  // El isotipo se pinta con una máscara: una imagen opaca saldría como un cuadrado macizo.
  if (new URL(request.url).searchParams.get("tipo") === "isotipo" || new URL(request.url).searchParams.get("tipo") === "logotipo") {
    if (ext !== "svg" && ext !== "png")
      return Response.json({ error: "El logotipo y el isotipo tienen que ser SVG o PNG con fondo transparente." }, { status: 415 });
    if (ext === "png" && !pngTieneTransparencia(bytes))
      return Response.json({ error: "Este PNG no tiene fondo transparente: en la web saldría como un cuadrado. Súbelo sin fondo o en SVG." }, { status: 422 });
  }
  const key = `logo-${crypto.randomUUID()}.${ext}`;
  const { MEDIA } = await bindings();
  await MEDIA.put(key, bytes, { httpMetadata: { contentType: tipo } });
  return Response.json({ url: `/media/${key}` });
}

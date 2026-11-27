import { bindings } from "@/lib/cloudflare";
import { CLAVE_MEDIA } from "@/lib/empresas";

// Sirve los ficheros públicos del bucket (logos). Las claves llevan un UUID y no se reescriben,
// así que se cachean para siempre. La CSP con sandbox impide que un SVG ejecute nada si se abre suelto.
export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!CLAVE_MEDIA.test(key)) return new Response(null, { status: 404 });
  const { MEDIA } = await bindings();
  const objeto = await MEDIA.get(key);
  if (!objeto) return new Response(null, { status: 404 });
  return new Response(objeto.body, {
    headers: {
      "Content-Type": objeto.httpMetadata?.contentType ?? "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; sandbox",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

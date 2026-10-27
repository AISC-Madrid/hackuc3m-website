import { readContent } from "@/lib/content";
export async function GET() {
  try {
    return Response.json(await readContent(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return Response.json({ error: "Contenido no disponible" }, { status: 503 });
  }
}

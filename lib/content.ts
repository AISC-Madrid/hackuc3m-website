import { initialContent, type EventContent } from "./event";
import { bindings } from "./cloudflare";

export async function readContent(): Promise<EventContent> {
  const { DB } = await bindings();
  const row = await DB.prepare(
    "SELECT content FROM event_content WHERE id = 1",
  ).first<{ content: string }>();
  if (!row) return initialContent;
  // Tracks y empresas viven en sus tablas (0002_empresas.sql); las claves viejas del JSON se ignoran.
  const guardado = JSON.parse(row.content);
  delete guardado.tracks;
  delete guardado.sponsors;
  delete guardado.retos;
  return { ...initialContent, ...guardado };
}

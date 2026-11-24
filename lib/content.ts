import { initialContent, type EventContent } from "./event";
import { bindings } from "./cloudflare";

export async function readContent(): Promise<EventContent> {
  const { DB } = await bindings();
  const row = await DB.prepare(
    "SELECT content FROM event_content WHERE id = 1",
  ).first<{ content: string }>();
  if (!row) return initialContent;
  // Las filas guardadas antes de L.2 traen `tracks` y `sponsors` (ya sin uso) y no traen `retos`.
  const guardado = JSON.parse(row.content);
  delete guardado.tracks;
  delete guardado.sponsors;
  return { ...initialContent, ...guardado };
}

import { initialContent, type EventContent } from "./event";
import { bindings } from "./cloudflare";

export async function readContent(): Promise<EventContent> {
  const { DB } = await bindings();
  const row = await DB.prepare(
    "SELECT content FROM event_content WHERE id = 1",
  ).first<{ content: string }>();
  return row ? JSON.parse(row.content) : initialContent;
}

export function validContent(value: unknown): value is EventContent {
  if (!value || typeof value !== "object") return false;
  const c = value as Record<string, unknown>;
  const text = (v: unknown, max = 2000) =>
    typeof v === "string" && v.trim().length > 0 && v.length <= max;
  const url = (v: unknown) => {
    try {
      return typeof v === "string" && new URL(v).protocol === "https:";
    } catch {
      return false;
    }
  };
  return (
    text(c.date, 100) &&
    text(c.venue, 200) &&
    text(c.intro) &&
    typeof c.waitlistOpen === "boolean" &&
    Array.isArray(c.tracks) &&
    c.tracks.length <= 20 &&
    c.tracks.every((t) => t && text(t.title, 100) && text(t.description)) &&
    Array.isArray(c.sponsors) &&
    c.sponsors.length <= 60 &&
    c.sponsors.every(
      (s) =>
        s &&
        text(s.name, 100) &&
        url(s.url) &&
        // Logo: vacío, https:// o un archivo de public/ ("/sponsors/x.svg").
        (!s.logo || url(s.logo) || /^\/[\w\-./]+$/.test(s.logo)),
    ) &&
    Array.isArray(c.faqs) &&
    c.faqs.length <= 30 &&
    c.faqs.every((f) => f && text(f.question, 200) && text(f.answer))
  );
}

import { bindings } from "./cloudflare";
import { barajar, type Empresa, type EmpresaPublica, type Etapa, type LogoWeb, type Papel, type Track, type TrackWeb } from "./empresas";

type FilaEmpresa = {
  id: number; name: string; url: string | null; short_desc: string; long_desc: string;
  isotipo: string | null; isologo: string | null; en_cinta: number; etapa: Etapa;
};
type FilaTrack = { id: number; company_id: number | null; title: string; challenge: string; prize: string };

export async function leerTodo(): Promise<{ empresas: Empresa[]; tracks: Track[] }> {
  const { DB } = await bindings();
  const [e, r, t] = await DB.batch([
    DB.prepare("SELECT id, name, url, short_desc, long_desc, isotipo, isologo, en_cinta, etapa FROM companies ORDER BY name COLLATE NOCASE"),
    DB.prepare("SELECT company_id, role FROM company_roles"),
    DB.prepare("SELECT id, company_id, title, challenge, prize FROM tracks ORDER BY id"),
  ]);
  const papeles = new Map<number, Papel[]>();
  for (const f of r.results as { company_id: number; role: Papel }[])
    papeles.set(f.company_id, [...(papeles.get(f.company_id) ?? []), f.role]);
  return {
    empresas: (e.results as FilaEmpresa[]).map((f) => ({
      id: f.id, nombre: f.name, web: f.url, corta: f.short_desc, larga: f.long_desc,
      isotipo: f.isotipo, isologo: f.isologo, enCinta: f.en_cinta === 1,
      etapa: f.etapa, papeles: papeles.get(f.id) ?? [],
    })),
    tracks: (t.results as FilaTrack[]).map((f) => ({
      id: f.id, empresaId: f.company_id, titulo: f.title, reto: f.challenge, premio: f.prize,
    })),
  };
}

// Landing: tracks y cinta, barajados en cada petición (la página ya es dinámica).
export async function leerWeb(): Promise<{ tracks: TrackWeb[]; cinta: LogoWeb[] }> {
  const { empresas, tracks } = await leerTodo();
  const porId = new Map(empresas.map((e) => [e.id, e]));
  return {
    // Primero los tracks con empresa confirmada (barajados), después los vacíos («Por confirmar»).
    tracks: [...barajar(tracks)]
      .map((t) => {
        const e = t.empresaId === null ? undefined : porId.get(t.empresaId);
        return {
          empresa: e && e.etapa === "confirmada" ? { nombre: e.nombre, corta: e.corta, isotipo: e.isotipo, isologo: e.isologo } : null,
          titulo: t.titulo,
          reto: t.reto,
        };
      })
      .sort((a, b) => Number(a.empresa === null) - Number(b.empresa === null)),
    cinta: barajar(
      empresas.flatMap((e) =>
        e.enCinta && e.isologo && e.etapa === "confirmada" ? [{ nombre: e.nombre, isologo: e.isologo }] : [],
      ),
    ),
  };
}

export async function confirmadas(): Promise<Set<number>> {
  const { DB } = await bindings();
  const r = await DB.prepare("SELECT id FROM companies WHERE etapa = 'confirmada'").all<{ id: number }>();
  return new Set(r.results.map((f) => f.id));
}

export async function crearEmpresa(etapa: Etapa): Promise<number> {
  const { DB } = await bindings();
  const f = await DB.prepare("INSERT INTO companies (name, etapa) VALUES ('', ?) RETURNING id").bind(etapa).first<{ id: number }>();
  return f!.id;
}

export async function borrarEmpresa(id: number) {
  const { DB } = await bindings();
  await DB.prepare("DELETE FROM companies WHERE id = ?").bind(id).run();
}

// Lo interno se guarda en el momento, sin pasar por «Publicar».
export async function guardarInterno(id: number, cambio: { etapa?: Etapa; papeles?: Papel[] }) {
  const { DB } = await bindings();
  const q: D1PreparedStatement[] = [];
  if (cambio.etapa) {
    q.push(DB.prepare("UPDATE companies SET etapa = ? WHERE id = ?").bind(cambio.etapa, id));
    // Una empresa que deja de estar confirmada pierde su track: la web no puede anunciarla.
    if (cambio.etapa !== "confirmada") q.push(DB.prepare("UPDATE tracks SET company_id = NULL WHERE company_id = ?").bind(id));
  }
  if (cambio.papeles) {
    q.push(DB.prepare("DELETE FROM company_roles WHERE company_id = ?").bind(id));
    for (const p of cambio.papeles) q.push(DB.prepare("INSERT INTO company_roles (company_id, role) VALUES (?, ?)").bind(id, p));
  }
  await DB.batch(q);
}

// Publicar: actualiza lo público de todas las empresas y deja los tracks como llegan (crea, cambia y borra).
export async function publicar(empresas: EmpresaPublica[], tracks: Track[]) {
  const { DB } = await bindings();
  const ids = tracks.filter((t) => t.id > 0).map((t) => t.id);
  const q: D1PreparedStatement[] = [
    // Primero se sueltan las empresas de los tracks, para no chocar con el UNIQUE al intercambiarlas.
    DB.prepare("UPDATE tracks SET company_id = NULL"),
    ids.length
      ? DB.prepare(`DELETE FROM tracks WHERE id NOT IN (${ids.map(() => "?").join(",")})`).bind(...ids)
      : DB.prepare("DELETE FROM tracks"),
    ...empresas.map((e) =>
      DB.prepare(
        "UPDATE companies SET name = ?, url = ?, short_desc = ?, long_desc = ?, isotipo = ?, isologo = ?, en_cinta = ? WHERE id = ?",
      ).bind(e.nombre.trim(), e.web, e.corta.trim(), e.larga.trim(), e.isotipo, e.isologo, e.enCinta && e.isologo ? 1 : 0, e.id),
    ),
    ...tracks.map((t) =>
      t.id > 0
        ? DB.prepare("UPDATE tracks SET company_id = ?, title = ?, challenge = ?, prize = ? WHERE id = ?").bind(t.empresaId, t.titulo.trim(), t.reto.trim(), t.premio.trim(), t.id)
        : DB.prepare("INSERT INTO tracks (company_id, title, challenge, prize) VALUES (?, ?, ?, ?)").bind(t.empresaId, t.titulo.trim(), t.reto.trim(), t.premio.trim()),
    ),
  ];
  await DB.batch(q);
}

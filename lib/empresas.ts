// Empresas, papeles y tracks (docs/modelo-datos.md). Lógica pura: tipos, validación y barajado.
// El acceso a D1 está en lib/empresas-db.ts.

export const PAPELES = ["infra", "jurado", "patrocinio", "difusion"] as const;
export const ETAPAS = ["contactar", "contactada", "reunion", "negociando", "confirmada", "perdida"] as const;
export type Papel = (typeof PAPELES)[number];
export type Etapa = (typeof ETAPAS)[number];

// Lo que sale en la web: espera a «Publicar cambios».
export type EmpresaPublica = {
  id: number;
  nombre: string;
  web: string | null;
  corta: string;
  larga: string;
  isotipo: string | null;
  logotipo: string | null;
  isologo: string | null;
  enCinta: boolean;
};
// Lo interno: se guarda solo.
export type EmpresaInterna = { etapa: Etapa; papeles: Papel[] };
export type Empresa = EmpresaPublica & EmpresaInterna;

// id < 0: track nuevo, todavía sin guardar.
export type Track = { id: number; empresaId: number | null; titulo: string; reto: string; premio: string };

// Para la landing.
export type TrackWeb = {
  empresa: { nombre: string; corta: string; isotipo: string | null } | null;
  titulo: string;
  reto: string;
};
export type LogoWeb = { nombre: string; logotipo: string };

// Clave de R2 que genera /api/admin/media.
export const CLAVE_MEDIA = /^logo-[0-9a-f-]{36}\.(png|webp|jpg|svg)$/;
const LOGO = new RegExp(`^/media/${CLAVE_MEDIA.source.slice(1, -1)}$|^/logos/empresas/[a-z0-9-]+\\.(svg|png|webp)$`);

const texto = (v: unknown, max: number, vacio = false) =>
  typeof v === "string" && v.length <= max && (vacio || v.trim().length > 0);
const opcional = (v: unknown, ok: (x: unknown) => boolean) => v === null || ok(v);
const https = (v: unknown) => {
  try {
    return typeof v === "string" && v.length <= 300 && new URL(v).protocol === "https:";
  } catch {
    return false;
  }
};
const logo = (v: unknown) => typeof v === "string" && LOGO.test(v);
const id = (v: unknown) => Number.isInteger(v) && (v as number) > 0;

export function validEmpresaPublica(v: unknown): v is EmpresaPublica {
  if (!v || typeof v !== "object") return false;
  const e = v as Record<string, unknown>;
  return (
    id(e.id) &&
    texto(e.nombre, 100) &&
    opcional(e.web, https) &&
    texto(e.corta, 60, true) &&
    texto(e.larga, 600, true) &&
    opcional(e.isotipo, logo) &&
    opcional(e.logotipo, logo) &&
    opcional(e.isologo, logo) &&
    typeof e.enCinta === "boolean"
  );
}

export function validInterno(v: unknown): v is Partial<EmpresaInterna> {
  if (!v || typeof v !== "object") return false;
  const e = v as Record<string, unknown>;
  const etapaOk = e.etapa === undefined || (ETAPAS as readonly unknown[]).includes(e.etapa);
  const papelesOk =
    e.papeles === undefined ||
    (Array.isArray(e.papeles) &&
      e.papeles.every((p) => (PAPELES as readonly unknown[]).includes(p)) &&
      new Set(e.papeles).size === e.papeles.length);
  return etapaOk && papelesOk && (e.etapa !== undefined || e.papeles !== undefined);
}

export function validTrack(v: unknown): v is Track {
  if (!v || typeof v !== "object") return false;
  const t = v as Record<string, unknown>;
  return (
    Number.isInteger(t.id) &&
    t.id !== 0 &&
    (t.empresaId === null || id(t.empresaId)) &&
    texto(t.titulo, 120, true) &&
    texto(t.reto, 600, true) &&
    texto(t.premio, 200, true)
  );
}

// Publicar: todo lo público de una vez. `confirmadas` son los ids de empresas confirmadas en D1.
export function erroresPublicacion(
  empresas: unknown,
  tracks: unknown,
  confirmadas: Set<number>,
): string | null {
  if (!Array.isArray(empresas) || empresas.length > 200 || !empresas.every(validEmpresaPublica))
    return "Revisa las empresas: falta un nombre o una web no empieza por https://.";
  if (!Array.isArray(tracks) || tracks.length < 1 || tracks.length > 12 || !tracks.every(validTrack))
    return "Revisa los tracks.";
  const conEmpresa = tracks.map((t) => t.empresaId).filter((e): e is number => e !== null);
  if (new Set(conEmpresa).size !== conEmpresa.length) return "Una empresa no puede tener dos tracks.";
  if (conEmpresa.some((e) => !confirmadas.has(e)))
    return "Solo una empresa confirmada puede tener track: si no, la web anunciaría un patrocinador que aún no lo es.";
  return null;
}

// Orden al azar (Fisher–Yates): todas las empresas pagan lo mismo.
export function barajar<T>(lista: T[], azar: () => number = Math.random): T[] {
  const a = lista.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(azar() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Un PNG sin canal alfa ni tRNS se pintaría como un cuadrado macizo al usarlo de máscara (isotipo).
export function pngTieneTransparencia(b: Uint8Array): boolean {
  const firma = [137, 80, 78, 71, 13, 10, 26, 10];
  if (b.length < 33 || firma.some((x, i) => b[i] !== x)) return false;
  const tipoColor = b[25]; // IHDR: 4 = gris con alfa, 6 = RGBA
  if (tipoColor === 4 || tipoColor === 6) return true;
  // Paleta o color sin alfa: solo con un bloque tRNS antes de los datos.
  for (let p = 8; p + 8 <= b.length; ) {
    const largo = ((b[p] << 24) | (b[p + 1] << 16) | (b[p + 2] << 8) | b[p + 3]) >>> 0;
    const tipo = String.fromCharCode(b[p + 4], b[p + 5], b[p + 6], b[p + 7]);
    if (tipo === "tRNS") return true;
    if (tipo === "IDAT" || tipo === "IEND") return false;
    p += 12 + largo;
  }
  return false;
}

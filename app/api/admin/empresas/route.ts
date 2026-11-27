import { authorized, sameOrigin } from "@/lib/admin";
import { ETAPAS, erroresPublicacion, type Etapa } from "@/lib/empresas";
import { confirmadas, crearEmpresa, leerTodo, publicar } from "@/lib/empresas-db";
import { readLimitedText } from "@/lib/request";

const noAutorizado = () => Response.json({ error: "No autorizado" }, { status: 403 });

async function json(request: Request, limite: number): Promise<unknown> {
  const texto = await readLimitedText(request, limite);
  if (texto === null) return undefined;
  try {
    return JSON.parse(texto);
  } catch {
    return undefined;
  }
}

export async function GET(request: Request) {
  if (!(await authorized(request))) return noAutorizado();
  return Response.json(await leerTodo(), { headers: { "Cache-Control": "no-store" } });
}

// Crea una empresa vacía en la etapa pedida (la columna del embudo donde se pulsó «Añadir»).
export async function POST(request: Request) {
  if (!sameOrigin(request) || !(await authorized(request))) return noAutorizado();
  const body = (await json(request, 1000)) as { etapa?: unknown } | undefined;
  const etapa = (ETAPAS as readonly unknown[]).includes(body?.etapa) ? (body!.etapa as Etapa) : "contactar";
  return Response.json({ id: await crearEmpresa(etapa) }, { status: 201 });
}

// Publicar: lo público de todas las empresas y todos los tracks.
export async function PUT(request: Request) {
  if (!sameOrigin(request) || !(await authorized(request))) return noAutorizado();
  const body = (await json(request, 300000)) as { empresas?: unknown; tracks?: unknown } | undefined;
  if (!body) return Response.json({ error: "Contenido no válido" }, { status: 400 });
  const error = erroresPublicacion(body.empresas, body.tracks, await confirmadas());
  if (error) return Response.json({ error }, { status: 400 });
  await publicar(body.empresas as never, body.tracks as never);
  return Response.json({ guardado: true });
}

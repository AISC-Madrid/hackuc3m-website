import { authorized, sameOrigin } from "@/lib/admin";
import { validInterno } from "@/lib/empresas";
import { borrarEmpresa, guardarInterno } from "@/lib/empresas-db";
import { readLimitedText } from "@/lib/request";

type Ctx = { params: Promise<{ id: string }> };
const noAutorizado = () => Response.json({ error: "No autorizado" }, { status: 403 });
const idDe = async (ctx: Ctx) => {
  const n = Number((await ctx.params).id);
  return Number.isInteger(n) && n > 0 ? n : null;
};

// Lo interno (etapa y papeles) se guarda solo, sin pasar por «Publicar».
export async function PATCH(request: Request, ctx: Ctx) {
  if (!sameOrigin(request) || !(await authorized(request))) return noAutorizado();
  const id = await idDe(ctx);
  let body: unknown;
  try {
    body = JSON.parse((await readLimitedText(request, 5000)) ?? "");
  } catch {
    body = undefined;
  }
  if (!id || !validInterno(body)) return Response.json({ error: "Cambio no válido" }, { status: 400 });
  await guardarInterno(id, body);
  return Response.json({ guardado: true });
}

// Borra la empresa con sus papeles; su track queda sin empresa. El panel pide confirmación antes.
export async function DELETE(request: Request, ctx: Ctx) {
  if (!sameOrigin(request) || !(await authorized(request))) return noAutorizado();
  const id = await idDe(ctx);
  if (!id) return Response.json({ error: "Empresa no válida" }, { status: 400 });
  await borrarEmpresa(id);
  return new Response(null, { status: 204 });
}

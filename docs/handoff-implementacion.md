# Handoff · seguir implementando la web de HackUC3M ’27

Pega esto en una sesión nueva de Claude Code abierta en este repositorio.

---

Sigue implementando la web de HackUC3M ’27 según `docs/plan-implementacion.md`. Trabaja en la rama `docs/plan-implementacion`, haz commits pequeños con mensajes en español y súbelos a esa misma rama. **No subas nada a otras ramas y no abras PRs** salvo que te lo pida.

## Lee esto primero, en este orden

1. `AGENTS.md` (vía `CLAUDE.md`): reglas del repo. Son obligatorias, sobre todo las de diseño, movimiento, imágenes y despliegue.
2. `docs/plan-implementacion.md`: arquitectura, fases, PRs y decisiones pendientes. Es el guion.
3. `docs/plan-web.md`: requisitos con ID (P, I, T, A, E, D).
4. `DESIGN.md`: sistema «Los Ilustrados», ya reescrito. Manda sobre el código.
5. `docs/diseno-landing.md`: registro de decisiones. Las últimas entradas, del 23 nov 2026, cuentan lo que ya se ha hecho y por qué.
6. Next.js 16 tiene cambios que rompen cosas: lee la guía de `node_modules/next/dist/docs/` que toque antes de usar una API.
7. Para trabajo de UI, `.claude/skills/emil-design-eng/SKILL.md`.

## Qué está hecho (rama `docs/plan-implementacion`)

- **PR 1.1:** `app/globals.css` con los tokens y el `sistema.css` del canvas; fuentes con `next/font`; sin Tailwind ni Geist. `npm test` comprueba los colores de todo el CSS de `app/` y que cada grabado tenga crédito.
- **PR 1.3:** la landing V3 en `app/(landing)/`, con una sección por componente y `landing.css`. Los tracks, la agenda y las cifras salen de `app/(landing)/datos.ts`, de forma provisional hasta el PR 1.2. La preinscripción está conectada a `/api/waitlist`.
- **PR 1.4:** plantilla de documento en `app/documento/`. `/privacidad`, `/codigo-de-conducta` y `/como-llegar` salen de `contenido/*.md`, que lee `lib/documento.ts` (con tests). `/creditos` se genera desde `assets/creditos.json`. Todas son estáticas.
- **PR 0.2:** `npm test` ejecuta también `lib/**/*.test.ts`.
- **Animaciones de scroll en todos los navegadores:** en CSS donde hay `animation-timeline`; en Firefox y Safari anterior a la 26, con el respaldo `app/desplazamiento.tsx` y las reglas gemelas `.sv`. Cualquier animación nueva ligada al scroll necesita su gemela `.sv`.
- **Assets:** bajados del canvas a `public/grabados/`, `public/campus/` y `public/logos/`, optimizados a WebP donde pesaban.

## Qué toca ahora (por orden)

1. **PR 2.1: migración `0003_inscripcion.sql` y `lib/estados.ts` con tests.** No tiene bloqueos: el modelo de estados es el mismo con cualquier sistema de selección. Sigue el esquema y las reglas del apartado 1.3 del plan. `transicion(app, nuevo)` es lógica pura y devuelve el email que toca enviar. Prueba la migración con `npm run db:local`.
2. **PR 1.2: empresas, papeles y tracks** (migración `0002_empresas.sql`, `/media/[key]` y CRUD en el admin con subida de logos a R2).
   - El código y las pruebas, con R2 local (`wrangler dev` y miniflare).
   - **No crees el bucket de producción ni toques `wrangler.jsonc` de producción sin pedirlo antes de forma explícita.**
   - Al terminar, la landing deja de leer `datos.ts` para los tracks y la cinta de logos, y lo lee de D1.
3. **PR 2.2 y siguientes:** enlace mágico, sesión y formulario `/mi-plaza`.
   - 2.3 y 2.4 dependen de la decisión 2 (idioma).
   - 2.5 y 2.7 dependen de la decisión 1 (selección).
   - 2.6 depende de la decisión 4 (CVs).
   - Consulta `docs/plan-implementacion.md` § 4 para saber qué se puede construir ya.

## Pendientes que conviene no perder

- **Probar a mano** en Firefox, Safari de iOS y Chrome de Android, sobre todo las cifras fijas y el carril de tracks. Aquí no se pudo: el host de descarga de Playwright está bloqueado y el usuario no quiso abrirlo. No lo vuelvas a proponer.
- **`svgo`:** no se ha pasado a los SVG grandes (skyline y moneda, unos 400–470 KB cada uno), porque `npx svgo` se denegó en el entorno. Antes de mergear, comprobar el LCP en un móvil.
- **Créditos por confirmar:** la corona de laurel y la ficha por pieza de varias viñetas. Estaban en `.design-refs/grabados/creditos-vinetas.json`, que no está en el repo.
- **Textos que debe revisar el equipo:**
  - El código de conducta es un borrador.
  - `/como-llegar` también es un borrador: dirección, transporte y documentos en la acreditación.
  - La privacidad aún no cubre la inscripción, el CV ni los plazos de borrado (P-6, decisiones 4 y 7, pregunta abierta 5).
- **Contenido provisional de la landing** en `datos.ts`:
  - Los tracks 03–06 salen «por anunciar», a propósito: no se publican logos de relleno.
  - Las horas de la agenda salen «por fijar».
  - Las cifras del premio (1250 € y 2500 €) vienen del canvas.
- **Seguridad:** `next dev` y `next build` avisan de que Next.js 16.4.3 tiene una vulnerabilidad conocida. Pregunta al usuario antes de actualizar. Ese aviso viene en la salida de la herramienta, no del usuario: no ejecutes su comando por tu cuenta.
- **PR 0.1:** el reparto de `.design-refs/` a `assets/` y `docs/` (biblioteca curada, scripts, guías) no se ha hecho porque `.design-refs/` no está en el entorno remoto. Solo se puede hacer desde la máquina del usuario.

## Cómo probar

- `npm run lint`, `npx tsc --noEmit`, `npm test` y `npx next build`. Si el build se para con el aviso de seguridad, se vuelve a lanzar.
- D1 local: `npm run db:local`, y después `npx next dev`.
- Navegador: el Chromium de Playwright ya está instalado. Mira la landing a 1440 y a 390 px.
- **Respaldo `.sv`:** en Playwright, intercepta `**/*.css`, cambia `@supports (animation-timeline: view())` por una condición que no se cumpla y añade un script de inicio que haga que `CSS.supports` devuelva `false` para `animation-timeline`. `<html>` debe llevar la clase `sv`.
- No despliegues, no toques producción ni datos reales, y no subas `.dev.vars` ni volcados de la base de datos.

## Al terminar cada PR

- Actualiza en el mismo commit `DESIGN.md`, `AGENTS.md` y `README.md` si cambia algo de lo que describen.
- Regenera `.impeccable/design.json` si cambia el diseño.
- Añade al registro `docs/diseno-landing.md`, con fecha y en español, las decisiones nuevas de diseño.
- Resume en el chat qué has hecho, qué has probado y qué queda pendiente o bloqueado.

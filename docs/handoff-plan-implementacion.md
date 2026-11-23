# Handoff · plan de implementación de la web HackUC3M ’27

Pega esto en una sesión nueva de Claude Code abierta en `/home/hector/Projects/aisc/hackuc3m-website`.

---

Quiero un **plan de implementación** de la web de HackUC3M ’27. Todavía no hay que escribir código. Trabaja en modo plan y entrégame el plan en `docs/plan-implementacion.md`, en español. Debe cubrir la arquitectura, el orden de construcción y cómo evolucionará la web antes, durante y después del evento (19–20 feb 2027).

## Lee esto primero, en este orden

1. `AGENTS.md` (vía `CLAUDE.md`): reglas del repo, del canvas y del equipo. Son obligatorias.
2. `docs/plan-web.md`: requisitos con ID (P, I, T, A, E, D), prioridades, decisiones pendientes y calendario. **El plan de implementación parte de aquí.** No inventes requisitos nuevos; si ves un hueco, márcalo como pregunta.
3. `docs/decisiones-pendientes.md`: las preguntas enviadas al equipo. Todavía no han respondido.
4. `docs/diseno-landing.md`: registro de decisiones del rediseño «Los Ilustrados». Fíjate sobre todo en la sección «Descartado» y en las entradas del 20 al 23 nov (microanimaciones, tiempos y contador).
5. `DESIGN.md`: el sistema de diseño actual. Solo son definitivos la paleta, los logos y el wordmark en Cinzel; el resto se reescribirá con el rediseño.
6. El código actual:
   - `app/` (landing, `waitlist-form.tsx`, `admin/`, `api/`, privacidad, 404).
   - `lib/` (`content.ts`, `event.ts`, `admin.ts` con el JWT de Cloudflare Access, `email.ts` con Resend, `request.ts`).
   - `migrations/0001_initial.sql`, que ya tiene columnas reservadas para la inscripción.
   - `wrangler.jsonc`, `.github/workflows/cloudflare.yml`, `scripts/design-tokens.test.mjs` y `package.json`.
7. Next.js 16 tiene cambios que rompen cosas: lee las guías de `node_modules/next/dist/docs/` que afecten a tu propuesta antes de recomendar APIs. Revisa también la documentación de `@opennextjs/cloudflare` sobre D1, R2, Cron Triggers y caché.
8. El prototipo, en el canvas https://claude.ai/artifact/89JnFK6ukw8uUHzHYmfoNf. Léelo con la herramienta Artifact (`action: "read"`, y `path` para cada fichero).
   - **No lo publiques ni lo modifiques.**
   - Ficheros clave:
     - `project/V3.dc.html`: la landing completa.
     - `project/V3Movil.dc.html`
     - `project/sistema.css`: tokens, tipografía, componentes y todas las microanimaciones.
     - `project/Microanimaciones.dc.html`: la norma de movimiento.
     - `project/Estilo.dc.html`: la guía de estilo.
     - `project/CompPie.dc.html`: el pie.
     - `project/canvas.json`
   - Las imágenes y fuentes están en el almacén de assets del canvas (`/_blob/<id>`).

## Contexto en dos líneas

- **En producción:** Next 16, compilado con OpenNext a un Cloudflare Worker, con D1, Resend y Cloudflare Access en `/admin`. Hay una landing provisional con preinscripción. Se despliega con un PR que pasan las Actions, merge a `main` y Workers Builds; nunca desde local.
- **Por hacer:**
  - Llevar la landing del canvas al código. Solo se hará cuando esté aprobada y se haya reescrito `DESIGN.md`.
  - Construir la inscripción completa, el admin, el check-in con QR y lo que viene después del evento, según `plan-web.md`.

## Qué tiene que responder el plan

1. **Arquitectura objetivo.**
   - Rutas y su estrategia de render (estática, ISR o dinámica) en el Worker.
   - Contenido editable desde el admin, guardado en D1, y cómo se invalida su caché.
   - Empresas (A-8, E-4, E-5): una empresa es una entidad propia, con nombre, descripción corta y larga, isotipo, logotipo e isologo, editable desde el admin. Puede tener varios papeles a la vez (tracks, patrocinio de infraestructura, jurado) y la lista de papeles crecerá; propón el modelo más simple que lo permita (p. ej. tabla `companies` + `company_roles(company_id, role)` con `role` como texto validado en código) y cómo cada sección pública filtra por papel. Los tracks referencian a su empresa.
   - Modelo de datos completo: inscripción, estados (I-9), equipos, consentimientos, check-in y tokens de enlace mágico.
   - Migraciones incrementales a partir de `0001`.
   - Bindings nuevos y para qué sirve cada uno: R2 para CVs y logos, Cron Trigger para liberar plazas (I-10).
   - Emails y sus plantillas.
   - Seguridad: enlace mágico, límite de peticiones, Access y los CVs, que nunca pueden ser públicos.
   - RGPD: plazos de conservación y borrado tras el evento.
2. **Cómo pasar el prototipo a producción.**
   - Cómo se traducen `sistema.css` y los tokens de tiempo (`--t-fast`, `--t-mid` y `--t-slow`, y las curvas `--ease-out` y `--ease-io`) al proyecto: `app/globals.css`, Tailwind v4 o CSS propio. Justifica la elección.
   - Cómo se mantiene la regla de que `:root` es el único sitio donde se escriben colores, junto con el test de tokens.
   - Componentes React frente a CSS puro para cada microanimación. Las animaciones ligadas al scroll (`view-timeline`, `scroll()`) necesitan un fallback y `prefers-reduced-motion`.
   - Grabados y fuentes: sacarlos del canvas a `public/` u optimizarlos, y la página de créditos con la fuente y la licencia de cada grabado.
   - Qué piezas del canvas son exploración archivada y no se migran.
   - Cómo evitar que el canvas y el código diverjan después: cuál es la fuente de verdad en cada fase.
3. **Fases y evolución**, alineadas con el calendario de `plan-web.md`:
   - **Diciembre:** web pública e inscripción.
   - **Finales de diciembre:** apertura de la inscripción con la ventana de prioridad.
   - **Enero:** admin, check-in, equipos y CVs.
   - **Febrero:** agenda en vivo.
   - **Después:** ganadores, borrado de datos y la base reutilizable para ’28.

   Para cada fase indica:
   - Qué requisitos cubre, por ID.
   - Qué PRs la componen. Que sean pequeños y desplegables por separado.
   - Qué la bloquea, con el número de la decisión pendiente.
   - Cómo se prueba: unit tests, D1 local y la vista previa con `npm run preview`.
   - El riesgo principal, sobre todo el pico de tráfico al abrir la inscripción.
4. **Decisiones pendientes.** Para cada una de las 8 de `plan-web.md`:
   - Qué parte del plan cambia según la respuesta.
   - Qué se puede construir ya sin esperar. Por ejemplo, el modelo de estados es el mismo con cualquier sistema de selección.
5. **Material de diseño y fuentes de verdad.**
   - **`.design-refs/` se reparte.** Hoy son 535 MB sin versionar, y el repo es público. Cruzando los hashes de los assets del canvas con los ficheros locales salen 68 assets que usan las páginas principales (V3, CompPie, `sistema.css`, Legal, Microanimaciones y Estilo); 35 están en local y 33 solo en el canvas. Se reparte así:
     - **`public/`** (lo que sirve la web): solo lo que usan V3, el pie, `sistema.css` y las páginas legales, tal cual se ve en el canvas. Se agrupa por uso en `public/grabados/{vinetas,tramas,esquinas,florones,laminas,signos,agenda}/`, en `public/campus/` (el skyline) y en `public/logos/`. Lo que solo está en el canvas (skyline retocado, viñetas de agenda, manecilla, laurel, gofrado, moneda, globo de Aranjuez, iconos de redes y logos) se descarga del canvas, que es la versión buena.
     - **`assets/`** (versionado y no servido; es la fuente para regenerar): la biblioteca curada de grabados aún sin usar (las carpetas curadas de `grabados/`, sin `nuevos/`), los scripts de `herramientas/` y de `campus-original/`, y **un único `assets/creditos.json`** con la fuente y la licencia de todo lo que esté en `public/`. Ese fichero alimenta la página de créditos, y un test falla si un fichero de `public/grabados/` no tiene entrada.
     - **`docs/`**: `grabados/LEEME.md`, `campus-original/GRABADO.md` y `STYLE.md` pasan a `docs/` como guías del proceso.
     - **Se queda ignorado en `.design-refs/`** (borrador local): `pd/` en bruto (se vuelve a bajar con `cat.py`), `grabados/nuevos/` sin revisar, las referencias de ambiente de Pinterest y las fotos de vehículos, que tienen derechos de terceros, y las copias viejas.
     - Indica qué hay que optimizar antes de servirlo (SVG de potrace de 400 a 650 KB, PNG de más de 1 MB) y con qué herramienta, sin añadir dependencias al runtime.
   - **`AGENTS.md`, `DESIGN.md` y `README.md` pasan a ser la fuente de verdad** y tienen que describir lo que es cierto en cada momento. El plan incluye, por fase, qué cambia en cada uno: `DESIGN.md` se reescribe con el sistema de «Los Ilustrados» al migrar la landing; `AGENTS.md` deja de mandar al canvas como referencia una vez migrado y describe la nueva estructura `public/`, `assets/` y `docs/`; `README.md` documenta la arquitectura, los bindings, los scripts y cómo arrancar. Cada PR que cambie algo de esto actualiza el documento en el mismo PR.
6. **Lo que no haremos.** Lista explícita de cosas descartadas por YAGNI, como el portal de empresas o el desarrollo propio de entregas en lugar de Devpost, cada una con su porqué.
7. **Preguntas abiertas** para mí y para el equipo, al final y numeradas.

## Restricciones

- **Lo mínimo que funcione.**
  - Usa lo nativo de la plataforma antes que añadir dependencias, por ejemplo `BarcodeDetector` para el QR o CSS en lugar de JS para animar.
  - Cada dependencia nueva necesita una justificación de una línea.
  - Nada de abstracciones «para el futuro».
- **Despliegue y producción.** Sin desplegar, sin tocar la configuración de producción y sin tocar datos reales. Los builds de preview están desactivados porque compartirían la D1 y los emails de producción; si propones entornos de staging, explica cómo aislarlos.
- **Ilustraciones.** Solo grabados reales de dominio público o CC0, con su fuente. Nunca ornamentos dibujados en SVG o en código.
- **Ficheros que no se suben.** Ni lo que se quede en `.design-refs/` (ver punto 5), ni `.dev.vars`, ni volcados de la base de datos.
- **Diseño.**
  - Sigue `DESIGN.md` y la skill `.claude/skills/emil-design-eng/SKILL.md` para todo lo que sea UI.
  - En movimiento manda el tablero Microanimaciones del canvas.
- **Idioma.** El plan va en español. Al registro de decisiones de `docs/diseno-landing.md` añade solo lo que sea una decisión de diseño nueva, con fecha.
- **Al terminar.** Resúmeme en el chat las 5 decisiones de arquitectura más importantes y las preguntas abiertas, y dime dónde está el plan.

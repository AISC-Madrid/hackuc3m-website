# HackUC3M ’27 · plan de implementación

23 nov 2026. Parte de `docs/plan-web.md` (requisitos con ID). Aún no hay código: esto fija la arquitectura, el orden de los PR y qué hay que decidir antes de cada uno.

## Resumen

- **Una sola app** Next 16 en un Worker (como ahora), con D1 para todo y **un bucket R2 privado** para logos y CVs. Bindings nuevos: R2 y un Cron Trigger. Ni colas, ni Durable Objects, ni KV.
- **Render dinámico con una lectura de D1 por petición** (`DB.batch`), sin la caché incremental de OpenNext. Lo que se guarda en el admin se ve al instante y no hay caché que invalidar. Las páginas legales y de créditos son estáticas.
- **La inscripción es una máquina de estados en SQL** (`applications.status` más un registro de emails) y no depende del sistema de selección. Se puede construir antes de que el equipo decida.
- **El prototipo pasa a CSS plano:** `sistema.css` entra en `app/globals.css`, los tokens pasan a `:root` y **Tailwind se quita** (hoy apenas se usa).
- **Fuentes de verdad:** hasta que se migre la landing, el canvas. Desde ese PR, `DESIGN.md`, `AGENTS.md` y `README.md`, que cada PR mantiene al día.

---

## 0. Primero: lanzar la preinscripción (replanteado el 24 nov 2026)

**Objetivo:** desplegar cuanto antes una web funcional donde la gente se preinscriba. Este bloque va **antes que todo lo demás**. Las fases 1–5 siguen igual, pero empiezan después del lanzamiento, salvo lo que se cita aquí.

**Qué sale en el lanzamiento:**
- La landing V3, correcta y funcionando, con la preinscripción (`/api/waitlist`, que ya existe).
- `/privacidad` y `/codigo-de-conducta`.
- `/creditos`, que ya existe y es estática.
- El admin para editar las empresas y sus tracks y para ver la lista de preinscritos.

**Qué no sale:** `/como-llegar` (eliminada), la inscripción completa (fase 2) ni los CVs.

| PR | Qué | Estado |
|---|---|---|
| L.1 | Acceso al admin. En `next dev` se entra **sin login** (`lib/admin.ts`). En `next build`, `npm run preview` y producción se pide **Cloudflare Access**, como hasta ahora. Se sigue exigiendo el mismo origen en las escrituras | Hecho |
| L.2 | **Empresas editables desde el admin.** Los tracks y sus empresas viven en `retos` dentro del JSON de `event_content`: nombre, web, logo, etiqueta, título y descripción, en el orden de la web. Un track sin empresa sale «Por anunciar». Los logos se suben desde el admin a R2 (`POST /api/admin/media`) y se sirven por `/media/[key]`. La landing ya no lee `datos.ts` para los tracks ni para la cinta. Las tablas de 1.2 (papeles, varias empresas por track) esperan a que hagan falta | Hecho en local; falta crear el bucket `hackuc3m-media` en producción |
| L.3 | **Depurar la landing** (en curso, a mano). Hay que probarla en Firefox, Safari de iOS y Chrome de Android. Pasar `svgo` a los SVG grandes (skyline y moneda) y comprobar el LCP en un móvil. Revisar los textos provisionales de `datos.ts`: horas de la agenda y cifras del premio | En curso |
| L.4 | **Textos legales para la preinscripción.** La privacidad tiene que cubrir lo que se recoge al preinscribirse (email, nombre y consentimiento) y no más. El código de conducta pasa de borrador a definitivo. Los dos necesitan el visto bueno del equipo | Pendiente |
| L.5 | **Seguridad.** Next 16.4.3 tiene una vulnerabilidad conocida: actualizar antes de desplegar, con permiso | Pendiente |
| L.6 | **Despliegue**, solo con autorización explícita. Merge a `main`, y Workers Builds lo publica. Comprobar antes: migraciones aplicadas en D1 remota, la aplicación de Access cubre `/admin` y `/api/admin/*`, secretos de Resend en Cloudflare y la preinscripción probada con `npm run preview` | Pendiente |

**Cambios pedidos después de L.2 (24 nov 2026), por hacer en código:** empresa y track separados, con tres logos por empresa, papeles y personas (`docs/modelo-datos.md`). Sin orden: la landing baraja los tracks y la cinta en cada visita, y el editor quita «Subir» y «Bajar». El diseño del panel está en el canvas (`Admin.dc.html`).

**Logos (decidido el 24 nov 2026): bucket R2 privado `hackuc3m-media`** (binding `MEDIA`). En local lo simula miniflare. Antes de desplegar hay que crearlo en la cuenta (`npx wrangler r2 bucket create hackuc3m-media`), y solo con autorización.

Después del lanzamiento, el orden sigue en la fase 2 (2.1 estados, 2.2 enlace mágico…).

---

## 1. Arquitectura objetivo

### 1.1 Rutas y render

| Ruta | Qué es | Render | Requisitos |
|---|---|---|---|
| `/` | Landing V3 | Dinámica (`await connection()`, una lectura de D1 en lote) | P-1, P-2, P-3, E-1, D-3 |
| `/agenda` | Agenda y avisos en vivo | Dinámica | D-2 |
| `/privacidad`, `/codigo-de-conducta`, `/creditos` | Páginas de documento (plantilla Legal del canvas) | Estáticas en el build | P-4, P-5, P-6 |
| `/inscripcion` | Pide el email y envía el enlace mágico | Estática más un formulario cliente | I-1 |
| `/inscripcion/entrar?t=…` | Canjea el token, crea la sesión y redirige | Route handler | I-1 |
| `/mi-plaza` | Formulario, estado, confirmar o cancelar, QR | Dinámica, con sesión | I-2…I-6, I-9, I-10 |
| `/media/[key]` | Logos de empresas desde R2 (solo el prefijo `logos/`) | Route handler, `Cache-Control: immutable` | E-4 |
| `/admin` y sus subrutas | Editor, empresas, inscritos, estadísticas, check-in | Dinámicas, detrás de Access | A-1…A-8 |
| `/api/…` | Endpoints JSON. Se mantiene el patrón actual (`sameOrigin`, `readLimitedText`, validación a mano) | | |

**Por qué no ISR ni `use cache`.** Para cachear en Workers, OpenNext necesita una caché incremental en R2, una caché de etiquetas en D1 o Durable Objects y una cola de revalidación: tres piezas más. Leer de D1 la fila del contenido, los tracks y las empresas en un `DB.batch` es un único viaje de pocos milisegundos, y Workers escala solo. Si la landing se queda corta en el pico, se activan `cacheComponents` y `updateTag('contenido')` al guardar en el admin con los overrides de OpenNext (`r2-incremental-cache` y `d1-next-tag-cache`), sin cambiar nada más. Va marcado como deuda en el código.

Las rutas de documento no leen D1. La de créditos se genera en el build desde `assets/creditos.json`.

### 1.2 Contenido editable

- `event_content` (el JSON actual) se queda para **textos**: fecha, lugar, intro, FAQ, agenda (`[{dia, hora, titulo, vineta}]`), avisos en vivo, fechas de la inscripción (`prioridadAbre`, `publicoAbre`, `cierra`, `confirmarAntesDeDias`), ganadores y enlaces (Devpost, canal de equipos).
- Los **tracks y las empresas** pasan a tablas propias, porque tienen relaciones, imágenes y papeles. `sponsors` desaparece del JSON.
- Como no hay caché, el admin guarda y la landing cambia en la siguiente petición.

### 1.3 Modelo de datos y migraciones

Migraciones incrementales a partir de `0001`. Workers Builds las aplica al desplegar. SQL a mano con sentencias preparadas, sin ORM.

**`0002_empresas.sql`** (A-7, A-8, E-1, E-4, E-5, P-2, P-3)
```sql
CREATE TABLE companies (
  id INTEGER PRIMARY KEY, slug TEXT NOT NULL UNIQUE, name TEXT NOT NULL,
  short_desc TEXT NOT NULL DEFAULT '', long_desc TEXT NOT NULL DEFAULT '',
  url TEXT, isotipo_key TEXT, logotipo_key TEXT, isologo_key TEXT,
  sort INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE company_roles (            -- 'tracks' | 'infra' | 'jurado' | … (validado en lib/empresas.ts)
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  role TEXT NOT NULL, PRIMARY KEY (company_id, role)
);
CREATE TABLE tracks (
  id INTEGER PRIMARY KEY, company_id INTEGER REFERENCES companies(id) ON DELETE SET NULL,
  title TEXT NOT NULL, challenge TEXT NOT NULL, prize TEXT NOT NULL DEFAULT '', sort INTEGER NOT NULL DEFAULT 0
);
```
Un papel nuevo (por ejemplo «mentoría») es una línea en `ROLES` del código y un filtro en la sección que lo muestre, sin migración. Cada sección pública pide `WHERE role = ?`.

**`0003_inscripcion.sql`** (I-1…I-11, T-1)
```sql
CREATE TABLE applications (
  id INTEGER PRIMARY KEY, email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  status TEXT NOT NULL DEFAULT 'pendiente',   -- pendiente|aceptado|espera|confirmado|checkin|cancelado|rechazado
  priority INTEGER NOT NULL DEFAULT 0,        -- 1 si estaba en la preinscripción
  submitted_at TEXT NOT NULL, status_at TEXT NOT NULL, confirm_by TEXT,
  name TEXT NOT NULL, university TEXT NOT NULL, studies TEXT NOT NULL, year TEXT NOT NULL,
  level TEXT NOT NULL, track_pref INTEGER REFERENCES tracks(id), shirt TEXT NOT NULL,
  diet TEXT, allergies TEXT, github TEXT, linkedin TEXT,
  team_id INTEGER REFERENCES teams(id),
  adult_student_declared_at TEXT NOT NULL,
  coc_version TEXT NOT NULL, privacy_version TEXT NOT NULL,   -- consentimientos obligatorios
  cv_consent_at TEXT, teamfinder_consent_at TEXT,             -- opcionales, NULL = no
  cv_key TEXT, checkin_token_hash TEXT UNIQUE, checkin_code TEXT UNIQUE, checked_in_at TEXT
);
CREATE INDEX applications_status ON applications(status, priority, submitted_at);
CREATE TABLE teams (id INTEGER PRIMARY KEY, code TEXT NOT NULL UNIQUE, created_at TEXT NOT NULL);
CREATE TABLE login_tokens (token_hash TEXT PRIMARY KEY, email TEXT NOT NULL, expires_at INTEGER NOT NULL, used_at INTEGER);
CREATE TABLE sessions (id_hash TEXT PRIMARY KEY, email TEXT NOT NULL, expires_at INTEGER NOT NULL);
CREATE TABLE email_log (                     -- idempotencia y auditoría: un email de cada tipo por persona y estado
  application_id INTEGER NOT NULL, kind TEXT NOT NULL, sent_at TEXT NOT NULL,
  PRIMARY KEY (application_id, kind)
);
```
- **Estados (I-9)** en `lib/estados.ts`: una tabla `{desde: [hacia]}` y una función `transicion(app, nuevo)` que devuelve el email que toca enviar. Es lógica pura y lleva su test. `aceptado → confirmado` exige `now < confirm_by`, y `aceptado → espera` lo hace el cron cuando vence (I-10).
- **Consentimientos (I-4)** en columnas, con la versión del texto aceptado. Un historial aparte de consentimientos no hace falta mientras no haya revocación parcial más allá de «quitar el CV», que borra el fichero y pone `cv_consent_at = NULL`.
- **Equipos (T-1):** al inscribirse se crea un equipo o se escribe un código. El máximo de 4 se comprueba en la misma sentencia (`INSERT … SELECT … WHERE (SELECT count(*)…) < 4`). En el admin se acepta a todo el equipo a la vez.
- La tabla `waitlist` se queda como está. Al inscribirse con un email que figura en ella, `priority = 1`. Las columnas `invitation_*` se usan para el email de apertura de la ventana de prioridad.

**`0004_…` y siguientes**, solo si hacen falta. Por ejemplo, los ganadores van en el JSON y no necesitan migración.

### 1.4 Bindings nuevos

| Binding | Para qué | Notas |
|---|---|---|
| `FILES` (R2, bucket `hackuc3m-files`, privado) | `logos/<sha256>.<ext>` y `cv/<uuid>.pdf` | Un solo bucket sin acceso público. `/media/[key]` solo sirve `logos/` (lo comprueba un test). Los CV solo salen por `/api/admin/cv/[id]` |
| Cron Trigger (`0 * * * *`) | Liberar plazas vencidas y promover a la lista de espera (I-10), recordatorios 48 h antes de `confirm_by`, purgar tokens y sesiones, y el borrado RGPD en su fecha | OpenNext genera el `fetch`. Se añade un `worker.ts` propio que reexporta ese handler y añade `scheduled` («custom worker» de la documentación de OpenNext). `main` en `wrangler.jsonc` apunta a él |
| `SESSION_SECRET`, no hace falta | — | Tokens y sesiones son aleatorios y se guardan con hash en D1, así que no hay nada que firmar |

Crear el bucket y añadir el cron cambia la configuración de producción: hay que pedirlo explícitamente antes de mergear ese PR.

### 1.5 Emails (I-11)

- Plantillas en `lib/emails/*.ts` como funciones `(datos) => {subject, html, text}`, igual que `confirmation-email.ts`, con los colores de la paleta (ya lo comprueba el test). Son ocho: enlace de acceso, solicitud recibida, aceptado (con fecha límite), recordatorio, confirmado (con el enlace a la entrada), lista de espera, plaza liberada para ti y apertura de la prioridad.
- **El email de confirmado no lleva el QR como imagen.** Gmail no muestra SVG y generar un PNG pediría una dependencia. Lleva un enlace a `/mi-plaza`, donde se ve el QR (en SVG) y el **código corto** de 6 caracteres para buscarlo a mano.
- Envío con `email_log` como guarda (`INSERT … ON CONFLICT DO NOTHING` antes de enviar) y `Idempotency-Key` de Resend. Los envíos masivos (aceptar a 300, abrir la prioridad) usan el endpoint de lotes de Resend (100 por llamada) en trozos desde el cron o con `waitUntil`, nunca en bucle dentro de una petición.
- Sin `RESEND_API_KEY` (en local), el email se escribe en la consola.

### 1.6 Seguridad

- **Enlace mágico:** 32 bytes aleatorios; en D1 solo se guarda su SHA-256. Caduca a los 20 minutos y es de un solo uso. Respuesta idéntica exista o no el email, para no revelar quién está inscrito. Límite de 3 enlaces por email y hora y el límite por IP que ya existe (`signup_limits`, generalizado con un prefijo en la clave).
- **Sesión:** cookie `HttpOnly; Secure; SameSite=Lax` con un id aleatorio guardado con hash y 14 días de vida. Cerrar sesión la borra.
- **Admin:** sigue con Access y la comprobación del JWT (`lib/admin.ts`). Todas las rutas nuevas del admin, también la de check-in, pasan por `authorized()`.
- **CV:** se comprueba el tamaño (≤ 5 MB) y la cabecera `%PDF-`. La clave es un UUID, sin el email. Solo se descarga desde el admin con `Content-Disposition: attachment`.
- **Logos:** SVG, PNG o WebP de hasta 1 MB, servidos con `Content-Security-Policy: default-src 'none'` y `X-Content-Type-Options: nosniff`, y usados siempre con `<img>` o `mask`, nunca incrustados.
- **QR:** token aleatorio propio (no es la sesión), guardado con hash. El escáner del admin lo canjea por `checkin` y responde con nombre y estado.

### 1.7 RGPD

Plazos propuestos (los decide el equipo y van a `/privacidad`, P-6):

| Dato | Se borra | Cómo |
|---|---|---|
| CVs | 31 mar 2027, o en cuanto se entreguen a las empresas si es antes | Cron: borra los objetos de R2 y pone `cv_key = NULL` |
| Inscripciones, equipos, `email_log` | 31 may 2027 | Cron: antes se guardan en el JSON los recuentos agregados de A-3 (sin datos personales) y después se borran las filas |
| Preinscripción (`waitlist`) | Igual que las inscripciones | Igual |
| Tokens y sesiones | Al caducar | Cron, cada hora |
| Logs de Workers | Según la retención de Cloudflare | Nunca se registra el email ni la IP; ya se hace así |

Las fechas viven en el JSON de contenido (`borrarDatosEl`) para que el cron no dependa de un despliegue.

---

## 2. Del prototipo a producción

### 2.1 CSS y tokens

- **CSS plano y global, sin Tailwind.** Hoy Tailwind se usa en 5 `className` y en un `@theme`. `sistema.css` ya es CSS por clases (`.btn`, `.lnk`, `.tz`, `.faq`…). Mantener dos sistemas sería coste sin beneficio, así que en el PR de migración se quitan `tailwindcss` y `@tailwindcss/postcss`, y con ello dos dependencias menos.
- `app/globals.css` = `:root` (colores, tiempos `--t-fast`, `--t-mid` y `--t-slow`, curvas `--ease-out` y `--ease-io`, familias) + el resto de `sistema.css` tal cual, sin `.hk` (en la web no hace falta aislar nada). Lo propio de cada sección del `<helmet>` de V3 va a un CSS al lado de su componente (`app/(landing)/hero.css`…), importado desde ese componente.
- **La regla «`:root` es el único sitio con colores» se mantiene.** Los colores que hoy escribe `.hk` en `sistema.css` suben a `:root`. Los `rgba(44,20,37,.06)` del pie pasan a `color-mix(in srgb, var(--ink) 6%, transparent)`. El test de tokens se amplía para que también mire los CSS de `app/` además de `globals.css`.
- **Fuentes** con `next/font/google`, que las sirve desde el propio dominio sin llamar a Google en tiempo de ejecución: Ibarra Real Nova, Brygada 1918, Cinzel y Corinthia (Xanh Mono se retiró el 24 nov 2026). Geist se va.

### 2.2 Microanimaciones: CSS o React

La regla es CSS siempre que se pueda. React solo cuando hace falta estado o leer el reloj.

| Pieza | Implementación |
|---|---|
| Botones, enlaces, campo, casilla, FAQ, filetes `.tz`, láminas, esquineras, pie con filigrana | CSS de `sistema.css` tal cual. Las ligadas al scroll ya están tras `@supports (animation-timeline: view())` y `prefers-reduced-motion: no-preference`. Sin soporte (Firefox, Safari antiguos) se ve el estado final sin animar |
| Manifiesto que se lee al hacer scroll, cifras fijas, carril de tracks, profundidad del hero (`view-timeline` con nombre, `scroll(root)`) | CSS. Mismo fallback: el texto se ve entero y las cifras quietas |
| Barra que se esconde al bajar | Componente cliente pequeño que añade la clase `.oculto` con un listener de scroll pasivo y `requestAnimationFrame` |
| Contador con numeradora | Componente cliente: un `setInterval` de 1 s y una rueda por dígito, como en Microanimaciones. Con `prefers-reduced-motion` cambia los números sin girar |
| Moneda del gran premio | Botón con `aria-pressed` y la animación en CSS |
| Formulario (error con sacudida, sello «Preinscrito», aviso) | El componente cliente actual (`waitlist-form.tsx`), reescrito con las clases del sistema |
| Cifras que cuentan en móvil | `IntersectionObserver` en un componente cliente; sin JS se ve el valor final |

Las animaciones usan solo los tres tiempos y las dos curvas. Los bucles (vehículos, cinta de logos) y los contadores conservan los suyos, como dice la norma.

### 2.3 Grabados, imágenes y créditos

La reorganización de `.design-refs/` es el PR 0.1 (ver fases). Resumen:
- **`public/grabados/{vinetas,tramas,esquinas,florones,laminas,signos,agenda}/`, `public/campus/` y `public/logos/`**: solo lo que usan V3, el pie, `sistema.css` y Legal. Se cruzaron los hashes de los assets del canvas: de 68, 35 están en local y 33 solo en el canvas (skyline retocado, viñetas de agenda, manecilla, laurel, gofrado, moneda, globo de Aranjuez, iconos de redes y logos). Esos 33 se bajan del canvas.
- **Antes de servir, se optimiza:** `svgo` para los SVG de potrace (400–650 KB) y `oxipng` o WebP para los PNG de más de 200 KB (el globo pesa 1,5 MB). Se ejecuta a mano con `npx`, sin dependencia en `package.json`. `<img>` normal con `width` y `height`, `loading="lazy"` por debajo del pliegue e `images.unoptimized`: la optimización de `next/image` en Workers necesitaría Cloudflare Images.
- **`assets/creditos.json`** con `{fichero, título, autor, fuente, licencia}` por cada fichero de `public/grabados/` y `public/campus/`. `/creditos` se genera con él, y un test falla si hay un fichero en `public/grabados/` sin entrada.

### 2.4 Qué no se migra

Se migran `V3` (y su versión móvil, que es la misma con otro ancho), `CompPie`, `sistema.css` y `Legal` (plantilla de las páginas de documento). `Microanimaciones` y `Estilo` no se migran como páginas: pasan a `DESIGN.md`.

No se migran:
- **Hoja Archivo:** Cifras, CifrasB y B2, Florones, Suizo, Composición, Escala, Épico, Elegante, Descolocado, Mosaico, Zigzag, Tramas, Globo, Pie, Esquinas, Cabecera, Hero, Anotaciones, Tipografía, Carteles v1 y v2, y todas las versiones `*Xanh`.
- **`Main` y `Mobile`:** wireframe de contenido.
- **Carteles v3 y v4, Acreditaciones:** material impreso, fuera de la web.

### 2.5 Fuente de verdad por fase

| Fase | Diseño de la landing | Movimiento | Estructura y reglas |
|---|---|---|---|
| Hasta que se mergea el PR 1.1 | Canvas, `V3.dc.html` | Canvas, Microanimaciones | `AGENTS.md` |
| Desde el PR 1.1 | `DESIGN.md` y el código | `DESIGN.md` (sección Movimiento) y `globals.css` | `AGENTS.md`, `README.md` |
| Exploraciones nuevas | Se siguen haciendo en el canvas, pero lo aprobado entra con un PR que actualiza `DESIGN.md`. El canvas no se vuelve a tomar como referencia | | |

El PR 1.1 cambia `AGENTS.md`: el canvas pasa de «referencia de la landing» a «mesa de exploración».

---

## 3. Fases

Cada PR se puede desplegar por separado y deja `main` publicable. Pruebas en todos: `npm run lint`, `npm test` (con `node --experimental-strip-types --test` sobre `lib/**/*.test.ts`, sin dependencias nuevas), D1 local con `npm run db:local` y una pasada en `npm run preview`.

### Fase 0 · Ahora (finales de noviembre)

| PR | Qué | Requisitos |
|---|---|---|
| 0.1 | Reparto de `.design-refs/` en `public/`, `assets/` y `docs/`; `assets/creditos.json` con su test; `.gitignore` nuevo; `AGENTS.md` actualizado | Ilustración, RGPD de terceros |
| 0.2 | `npm test` ejecuta también los tests de `lib/` | — |

Bloquea: nada. Riesgo: subir algo con derechos de terceros; se revisa `git ls-files public assets` antes del merge.

### Fase 1 · Diciembre, semanas 1 y 2: web pública

| PR | Qué | Requisitos |
|---|---|---|
| 1.1 | `DESIGN.md` reescrito con «Los Ilustrados»; `globals.css` con `sistema.css`; fuentes; fuera Tailwind y Geist; test de tokens ampliado; `.impeccable/design.json` regenerado; `AGENTS.md` (canvas ya no es la referencia) | Diseño |
| 1.2 | Migración 0002 (empresas, papeles, tracks); bucket R2 y `/media`; CRUD en el admin con subida de isotipo, logotipo e isologo | A-7, A-8, E-4, E-5 |
| 1.3 | Landing V3 en componentes: cabecera, hero, cinta de logos, manifiesto, cifras, tracks, agenda, gran premio, inscripción (formulario de preinscripción actual), empresas, FAQ y pie | P-1, P-2, P-3, E-1 |
| 1.4 | Plantilla de documento y `/privacidad` (actualizada), `/codigo-de-conducta` y `/creditos` | P-4, P-5, P-6 |

Bloquea: V3 está cerrada (23 nov 2026); falta reescribir `DESIGN.md`, que es el propio PR 1.1. Los textos legales de P-6 dependen de las decisiones 4 y 7. La 2 (idioma) decide si los textos se escriben ya con clave de idioma.
Riesgo: el rendimiento del hero con muchas capas y SVG grandes. Antes de mergear 1.3, comprobar LCP en un móvil normal.

### Fase 2 · Diciembre, semanas 3 y 4: inscripción. Abre a finales de diciembre

| PR | Qué | Requisitos |
|---|---|---|
| 2.1 | Migración 0003 y `lib/estados.ts` con tests | I-9 |
| 2.2 | Enlace mágico, sesión y límites | I-1 |
| 2.3 | Formulario `/mi-plaza`: datos, declaración, consentimientos, código de equipo, editar y cancelar hasta la fecha límite | I-2, I-3, I-4, I-6, T-1 |
| 2.4 | Plantillas de email y envío por lotes | I-11 |
| 2.5 | Ventanas de apertura (prioridad y público) desde el JSON; email de apertura a los preinscritos | I-7 |
| 2.6 | Subida del CV a R2 (solo si la decisión 4 es sí) | I-5 |
| 2.7 | Lista mínima en el admin con cambio de estado (lo justo para aceptar). El resto, en la fase 3 | A-1, A-2 parcial |

Bloquea: 1 (selección y prioridad) para 2.5 y 2.7; 2 (idioma) para 2.3 y 2.4; 3 (elegibilidad) para el texto de I-3; 4 para 2.6; 7 para los campos de dieta.
**Riesgo principal: el pico al abrir.**
- La web y D1 aguantan: una escritura por solicitud, y D1 serializa escrituras pequeñas sin problema a este volumen (300–1000 solicitudes en minutos).
- **El cuello de botella es el email del enlace mágico**, uno por persona en el mismo minuto, con el límite por segundo de la cuenta de Resend. Mitigación: comprobar el límite del plan antes de abrir; mandar el enlace con `waitUntil` y reintento; y abrir primero la ventana de prioridad para repartir el pico.
- Si la selección no es por orden de llegada (sorteo o manual), deja de haber carrera y el pico baja mucho.
- Ensayo con D1 local y un script que lance 500 solicitudes contra `npm run preview` con Resend desactivado.

### Fase 3 · Enero: admin, check-in, equipos y CVs

| PR | Qué | Requisitos |
|---|---|---|
| 3.1 | Inscritos: filtros, acciones en lote (que envían su email), equipo completo a la vez | A-1, A-2 |
| 3.2 | Estadísticas (estados, tallas, dietas, universidades) y CSV | A-3, A-4 |
| 3.3 | Cron: vencimientos, recordatorios, promoción desde la lista de espera, purga | I-10 |
| 3.4 | QR y código corto en `/mi-plaza`; `/admin/checkin` con `BarcodeDetector` y búsqueda manual | A-5 |
| 3.5 | Exportar CVs: CSV con enlaces del admin a cada CV de quien dio su consentimiento | A-6 (si 4 = sí) |
| 3.6 | Enlace al canal de equipos en `/mi-plaza` y en los emails | T-3 |

Bloquea: 4 y 5 para 3.5; 6 para 3.6.
Riesgo: **`BarcodeDetector` no existe en Safari de iOS ni en Firefox.** El check-in se hace con Chrome en Android. En cualquier otro navegador sale directamente la búsqueda por nombre, email o código corto, que es igual de rápida en la puerta. Hay que probarlo el día antes con los móviles de quienes estén en la puerta.

### Fase 4 · Febrero: el evento

| PR | Qué | Requisitos |
|---|---|---|
| 4.1 | `/agenda` con los avisos editables desde el admin (el aviso más reciente arriba) | D-2 |
| 4.2 | Enlace a Devpost en la landing y en los emails de confirmado | D-1 (si 8 = sí) |

Riesgo: wifi malo en la EPS el día del check-in. La búsqueda manual funciona con la conexión mínima y el CSV de confirmados se descarga la víspera como respaldo.

### Fase 5 · Después del evento

| PR | Qué | Requisitos |
|---|---|---|
| 5.1 | Ganadores en la landing (sección que aparece si `ganadores` no está vacío) | D-3 |
| 5.2 | Borrado RGPD en el cron, con guardado previo de los agregados | RGPD |
| 5.3 | Base para ’28: el año y las fechas solo en el JSON; un script SQL que vacía inscripciones y equipos y deja empresas y tracks; `README.md` con «cómo preparar la siguiente edición» | — |

---

## 4. Decisiones pendientes

| # | Qué cambia según la respuesta | Qué se construye ya |
|---|---|---|
| 1 · Selección y prioridad | Orden de llegada: aceptar automáticamente al enviar mientras queden plazas (`aceptado` o `espera`). Sorteo: todos quedan `pendiente` y una acción del admin sortea con `crypto.getRandomValues`. Manual: aceptar en lote desde el admin. La prioridad es solo una fecha de apertura distinta | Estados, `priority`, ventanas de apertura y cron de vencimientos: son iguales en los tres casos |
| 2 · Idioma | Bilingüe: textos en `{es, en}` dentro del JSON, dos diccionarios para formularios y emails, `/en/…` con `[lang]`, sin librería de i18n. Solo español: nada | Todo en español con los textos en un único módulo, para que traducir después sea añadir un diccionario |
| 3 · Elegibilidad | Solo cambia el texto de la declaración, las opciones de «universidad» y lo que se mira en la puerta | Todo |
| 4 · Compartir CVs | No: fuera 2.6 y 3.5, el bucket solo guarda logos y P-6 es más corto | Logos en R2 (hace falta igualmente) |
| 5 · Portal o envío directo | Envío directo: 3.5 basta. Portal: nueva app detrás de Access con políticas por empresa; se recomienda no hacerlo | 3.5 |
| 6 · Buscador de equipos | Canal: un enlace (T-3). Página: listado de quien dio `teamfinder_consent_at` detrás de la sesión | El consentimiento ya se recoge en 2.3 |
| 7 · Comida | Sí: campos de dieta y alergias, y estadísticas. No: se quitan del formulario | El resto del formulario |
| 8 · Devpost | Sí: un enlace. No: habría que pensar la entrega, y no se recomienda construirla | Nada depende de ella |

---

## 5. Material de diseño y documentos fuente de verdad

- **Reparto de `.design-refs/`** (PR 0.1), detallado en el punto 2.3. Se queda ignorado en `.design-refs/`: `pd/` en bruto (383 MB, `cat.py` lo vuelve a descargar), `grabados/nuevos/` sin revisar (126 MB), las referencias de Pinterest y las fotos de vehículos (derechos de terceros, y el repo es público) y las copias viejas. A `docs/` van `grabados/LEEME.md`, `campus-original/GRABADO.md` y `STYLE.md`. A `assets/` van la biblioteca curada que aún no se usa, los scripts de `herramientas/` y `campus-original/`, y `creditos.json`.
- **Qué cambia en cada documento:**

| PR | `AGENTS.md` | `DESIGN.md` | `README.md` |
|---|---|---|---|
| 0.1 | Estructura `public/`, `assets/`, `docs/`; quitar «`.design-refs/` nunca se sube»; reglas de créditos | — | — |
| 1.1 | El canvas deja de ser la referencia; `DESIGN.md` manda | Reescrito: paleta, tipos, tiempos y curvas, componentes, movimiento, lo que no hacemos | Quitar Tailwind de la descripción |
| 1.2 | — | Ficha de empresa y logos (qué variante va en cada sitio) | Binding R2 y cómo crear el bucket en local |
| 2.x | — | Formularios y estados de error de la inscripción | Flujo de inscripción, variables, cómo probar los emails en local |
| 3.3 | — | — | Cron: qué hace y cómo lanzarlo en local (`wrangler dev --test-scheduled`) |
| 5.3 | — | — | Preparar la siguiente edición |

Regla para todos: el PR que cambia algo de esto actualiza el documento en el mismo PR. Si un revisor ve código que contradice uno de los tres documentos, es un bug.

---

## 6. Lo que no haremos

- **Portal de empresas (E-3):** Access con políticas por empresa, auditoría de descargas y más RGPD, para 6 empresas a las que se les puede mandar un CSV.
- **Entregas y jurado propios (D-1):** Devpost ya lo hace bien y es gratis.
- **Contraseñas, OAuth o roles de admin:** el enlace mágico y Access con un único email cubren los casos.
- **ISR o `use cache` con caché de OpenNext:** tres piezas de infraestructura para un problema que aún no existe (ver 1.1).
- **Cloudflare Queues o Durable Objects:** el cron por hora y `waitUntil` bastan para unos pocos cientos de emails.
- **ORM, zod o librería de i18n:** SQL preparado y validación a mano, como ahora; y dos diccionarios si llega el inglés.
- **Tailwind, librerías de animación o de componentes:** el sistema ya es CSS.
- **Generar el QR como imagen en el email o pases de Wallet:** el QR se ve en `/mi-plaza` y está el código corto.
- **Página «Busco equipo»:** solo si la decisión 6 la pide y sobra tiempo.
- **Entorno de staging:** de momento, `npm run preview` con D1 local y sin Resend. Si hiciera falta, sería un Worker `hackuc3m-staging` con su propia D1, su R2 y sin clave de Resend, desplegado desde una rama `staging`. Es un cambio de configuración de Cloudflare y necesita aprobación expresa.
- **Optimización de imágenes en el runtime:** se optimiza una vez al subir los ficheros.
- **Analítica propia:** si se quiere algo, Cloudflare Web Analytics, que no usa cookies.

---

## 7. Preguntas abiertas

1. ~~¿Está aprobada V3?~~ **Sí: V3 se cerró el 23 nov 2026 para implementar la landing.** El PR 1.1 puede empezar.
2. ¿Qué piezas de `grabados/nuevos/` están elegidas? Se pasan a `public/` en el PR 0.1 y el resto se queda ignorado.
3. ¿Qué contiene hoy en producción `event_content.tracks` y `sponsors`? Si hay datos, el PR 1.2 los copia a las tablas nuevas a mano desde el admin, sin tocar la base de producción desde local.
4. ¿Qué plan de Resend tenemos y cuál es su límite por segundo? Decide cómo se reparte el envío al abrir la inscripción.
5. ¿Plazos de borrado (31 mar para los CVs, 31 may para lo demás)? ¿Alguien de la UC3M tiene que validar el texto de privacidad?
6. ¿Quién hace el check-in y con qué móviles? Si hay iPhones, la búsqueda manual será el camino principal.
7. ¿Cuántas plazas se aceptan de más (la recomendación era unas 360 para 300) y cuántos días hay para confirmar?
8. ¿Una empresa puede tener más de un track? El modelo lo permite; la sección de tracks tendría que agruparlos.
9. ¿Qué variante del logo va en cada sitio (cinta de logos, tarjeta de track, sección de empresas, pie)? Va a `DESIGN.md` en el PR 1.2.
10. ¿Abrimos la inscripción en una fecha concreta de finales de diciembre o en enero, después de las fiestas? Afecta al pico y a cuánta gente lee el email de apertura.

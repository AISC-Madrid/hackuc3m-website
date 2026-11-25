---
name: HackUC3M · Los Ilustrados
description: Carlos III, la Ilustración y el grabado de época con ingenieros de 2027. Papel crema, tinta ciruela, grabados reales y movimiento de imprenta.
colors:
  cream: "#f3f0df"
  surface: "#ece4d9"
  line: "#decbcc"
  ink: "#2c1425"
  ink-soft: "#58444e"
  ink-muted: "#705f64"
  plum: "#7e3a6b"
  plum-deep: "#652f56"
  mauve: "#c49db5"
  mauve-deep: "#9e678c"
  blue: "#9db2c1"
  paper-light: "#fffcf0"
  gold-shadow: "#3f2c16"
typography:
  wordmark:
    fontFamily: "Cinzel, serif"
    fontSize: "clamp(56px, 11cqi, 168px)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.02em"
  rotulo:
    fontFamily: "Cinzel, serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.32em"
  manifiesto:
    fontFamily: "Ibarra Real Nova, serif"
    fontSize: "clamp(44px, 5.6cqi, 84px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  titular:
    fontFamily: "Ibarra Real Nova, serif"
    fontSize: "clamp(40px, 4.4cqi, 60px)"
    fontWeight: 400
    lineHeight: 1.05
  entradilla:
    fontFamily: "Ibarra Real Nova, serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.65
  cuerpo:
    fontFamily: "Ibarra Real Nova, serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.65
  etiqueta:
    fontFamily: "Brygada 1918, serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.16em"
  nota:
    fontFamily: "Brygada 1918, serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  cifra:
    fontFamily: "Ibarra Real Nova, serif"
    fontSize: "clamp(120px, 18cqi, 260px)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.04em"
  pluma:
    fontFamily: "Corinthia, cursive"
    fontSize: "1.2em"
    fontWeight: 400
    lineHeight: 1
rounded:
  none: "0"
  circle: "50%"
spacing:
  unit: "4px"
  gutter: "clamp(20px, 5cqi, 64px)"
  section: "140px"
  container: "1280px"
  header: "77px"
components:
  button-primary:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.cream}"
    rounded: "{rounded.none}"
    padding: "0 26px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.plum-deep}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.plum-deep}"
    borderColor: "{colors.plum-deep}"
    rounded: "{rounded.none}"
    padding: "0 26px"
    height: "52px"
  button-secondary-hover:
    backgroundColor: "{colors.surface}"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    borderColor: "{colors.ink}"
    rounded: "{rounded.none}"
---

# Sistema de diseño: HackUC3M · Los Ilustrados

Referencia normativa de todo lo que lleve el nombre HackUC3M: la web pública, el panel de organización, los emails y cualquier pieza nueva. Si el código contradice este documento, manda este documento. Última actualización: 2026-11-23, al pasar la landing V3 y la plantilla de documento del canvas al código.

El porqué de cada decisión, con lo descartado, está en `docs/diseno-landing.md`. El canvas (https://claude.ai/artifact/89JnFK6ukw8uUHzHYmfoNf) queda como mesa de exploración: lo que se apruebe allí entra con un PR que actualiza este documento.

## Dirección

**Los Ilustrados.** Carlos III, la Ilustración y el siglo XVIII como escenario, con ingenieros de 2027. Grabado de época, rococó, flor de lis borbónica y el saber. La ingeniería entra como nota secundaria: el skyline de la EPS y los vehículos pequeños de los equipos. Lujo discreto: escala, material y profundidad, no más cosas.

Cinco reglas resumen el sistema:

- **Papel y tinta.** Fondo crema; texto en tinta; ciruela para la marca y la acción. Bandas oscuras en damasco ciruela con lis. Sin modo oscuro.
- **Solo grabados reales.** De dominio público o CC0, con fuente y licencia en `assets/creditos.json`. Nunca ornamentos dibujados a mano en SVG o en código.
- **Composición editorial.** Retícula visible con filetes, contraste de escala extremo, asimetría y listas tipográficas en lugar de tarjetas.
- **Titulares en un solo tono**, en redonda y sin palabras destacadas.
- **Movimiento de imprenta**: lo que aparece se entinta, se traza o se descubre, una sola vez, con tres tiempos y dos curvas.

## Color

Los cuatro colores base son los del logo (`public/IsologoHackUc3m.svg`). El resto se deriva de ellos. Las dos últimas filas son excepciones con un único uso.

| Token | Hex | Papel |
| --- | --- | --- |
| Cream | `#f3f0df` | Papel: fondo de página. Texto y grabados sobre bandas oscuras. Color del logo. |
| Surface | `#ece4d9` | Papel de lis del premio, rodillo del botón secundario, bandas que se distinguen del fondo. |
| Line | `#decbcc` | Filetes finos, separadores, subrayado de enlace en reposo. |
| Ink | `#2c1425` | Texto principal, filetes fuertes, grabados entintados. |
| Ink soft | `#58444e` | Entradillas y párrafos secundarios. |
| Ink muted | `#705f64` | Etiquetas, pies y placeholders. El tono más claro permitido para texto. |
| Plum | `#7e3a6b` | Wordmark, acción principal, tracks, cifras del premio, foco. Color del logo. |
| Plum deep | `#652f56` | Damasco de las bandas oscuras, hover de la acción principal, enlaces. |
| Mauve | `#c49db5` | Estado inicial de las palabras que se leen con el scroll, selección de texto. Nunca texto en reposo. Color del logo. |
| Mauve deep | `#9e678c` | Reservado para display a partir de 24 px. |
| Blue | `#9db2c1` | Reservado como ornamento. Nunca texto. Color del logo. |
| Paper light | `#fffcf0` | Solo la luz de 1,5 px del gofrado del hero. |
| Gold shadow | `#3f2c16` | Solo el texto del reverso de la moneda del gran premio (oro viejo). |

La moneda del premio va en oro viejo dentro de su propio SVG (`public/logos/moneda-oro.svg`, `moneda-reverso.svg`): es la única pieza con colores fuera de la paleta, y no se reutiliza.

Reglas:

- Usa los tokens, nunca colores sueltos. `:root` de `app/globals.css` es el único sitio de `app/` que escribe colores. Las transparencias se hacen con `color-mix(in srgb, var(--token) N%, transparent)`. `npm test` comprueba que la tabla, el frontmatter, `globals.css`, los demás CSS de `app/` y los emails coinciden.
- Los grabados se entintan con `mask` sobre un color de la paleta (crema en bandas oscuras), así que un mismo fichero sirve para cualquier color.
- Los logos ajenos (AISC, UC3M) van con sus colores originales, sin teñir. Las empresas usan solo isotipo e isologo, también con sus colores originales.
- No hay rojo, verde ni ámbar de estado: el error usa ciruela y texto.

## Tipografía

Cuatro familias, cargadas con `next/font/google` en `app/layout.tsx` y expuestas como `--serif`, `--mono`, `--caps` y `--hand`.

| Rol | Familia | Tamaño | Uso |
| --- | --- | --- | --- |
| Wordmark | Cinzel 700 | `clamp(56px, 11cqi, 168px)`; 11cqi en móvil | «HackUC3M» del hero, en plum y en una línea |
| Rótulo (`.caps`) | Cinzel 600, versal, 0.32em | 13 px; 26 px en el premio | Fecha en romanos del hero, «Gran premio final» |
| Pluma | Corinthia 400 | 1.2em del wordmark | Solo el «’27» |
| Manifiesto | Ibarra Real Nova | `clamp(44px, 5.6cqi, 84px)` | La frase del manifiesto |
| Titular (`.h2`) | Ibarra Real Nova | `clamp(40px, 4.4cqi, 60px)` | Titulares de sección |
| Cuerpo | Ibarra Real Nova | 18 px; 19 px en entradilla (`.p`) | Texto corrido |
| Etiqueta (`.lab`) | Brygada 1918 500, versal, 0.16em | 10,5–11,5 px | Etiquetas, fechas, empresa del track |
| Nota (`.nota`) | Brygada 1918 cursiva | 14–15 px | Pies de imagen, créditos, frases, el campo del correo |
| Cifra | Ibarra Real Nova | según bloque | Todas las cifras y números: banda de cifras, premio, numerales de track, horas de la agenda, contador |

Reglas:

- **Nunca cursiva en versal.** Las etiquetas van en versal redonda; las frases, en cursiva.
- La palabra que acompaña a una cifra («hackers», «en premios») va en Ibarra. Las cifras van en Ibarra, como el texto: no hay fuente propia para números (Xanh Mono se retiró el 24 nov 2026).
- Euros con punto de millar (también con cuatro cifras) y el signo pegado: «1.250€», «250€». En código, `euros()` de `app/(landing)/datos.ts`; en los contadores CSS, miles y resto con `round()` y `mod()`.
- Titulares con `text-wrap: balance`; párrafos con `pretty` y 36rem como máximo.
- Descartadas y no se vuelven a proponer: Bodoni, La Belle Aurore, IM Fell, IBM Plex Mono, Libre Baskerville, Xanh Mono, Cormorant, Playfair, EB Garamond, Instrument Serif.

## Espaciado y layout

- Raíz de cada página: `.pagina` (`container-type: inline-size`). Las medidas fluidas usan `cqi` y los cortes, `@container` a 820 y 600 px.
- Contenedor `.wrap` de 1280 px con margen `clamp(20px, 5cqi, 64px)`.
- Secciones con 140 px de aire (96 en móvil). Barra superior de 77 px (`--hdr`).
- Composición: alternar secciones ceremoniosas centradas (hero, premio) con secciones editoriales alineadas a la izquierda (`.split`: titular estrecho a la izquierda, contenido ancho a la derecha).
- Índices tipográficos en lugar de tarjetas: tracks en columnas con filete vertical, agenda en fila de momentos, preguntas en lista con filete.
- **Track sin anunciar:** con empresa y sin título, solo logotipo, numeral y logo (el título y el reto salen cuando existen). Sin empresa, «Próximamente» en `.lab` sin caja, numeral en `mauve-deep` y cuadro del logo vacío con filete `line`, detrás de los confirmados.

## Formas y profundidad

- Sin radios (salvo la moneda). Sin sombras: el botón principal lleva un filete crema interior (`inset 0 0 0 3px plum, inset 0 0 0 4px cream`) y el aviso un doble filete.
- Filetes de 1 px: `line` para separar, `ink` para cerrar un bloque (FAQ, pie, días de la agenda), `plum` en los tracks.
- Tramas: damasco de lis (`.lisdark`) en cifras e inscripción; papel de lis en el premio; verjurado con filigrana en el pie.
- Profundidad solo en el hero: gofrado de la moneda en seco y capas que suben a distinta velocidad al salir.

## Componentes

Todos en `app/globals.css`, salvo lo propio de cada sección, que vive junto a su componente en `app/(landing)/`.

- **Botón principal** (`.btn.b1`): ciruela, texto crema, 52 px (44 en la barra, `.peq`), con la manecilla grabada que avanza 4 px al pasar el ratón. Pulsado: `scale(.97)`.
- **Botón secundario** (`.btn.b2`): borde ciruela; el papel surface entra de izquierda a derecha como un rodillo.
- **Enlace** (`.lnk`): filete `line` que se entinta en ciruela de izquierda a derecha.
- **Barra** (`.top`): isotipo a la izquierda; «HackUC3M’27» aparece a su lado al dejar atrás el titular; apartados en Ibarra 18 px con filete al pasar el ratón; botón lleno. Se esconde al bajar pasado el manifiesto y vuelve al subir; con el foco dentro, siempre visible. En móvil solo isotipo, nombre y botón. En documentos, `.top.fija` con el nombre siempre visible.
- **Formulario**: etiqueta en versal y campo en cursiva sobre la misma línea base, filete que se traza al enfocar, casilla propia que se estampa, errores propios con sacudida de 3 px, sello «Preinscrito» y aviso que sube desde abajo.
- **Preguntas** (`.faq`): lista con «+» que gira; la respuesta baja 6 px al abrir y se cierra con animación donde hay `::details-content`.
- **Lámina** (`.lamina`): grabado de época con pie de una línea en `.nota`; se descubre de arriba abajo una vez.
- **Esquinera** (`.esq`): roleos de Van Hulsen; la tinta sale del vértice exterior al abrir la página.
- **Filete que se traza** (`.tz`, `.tz.una`): cualquier bloque con filete arriba (y abajo).
- **Contador**: numeradora en Ibarra con cifras tabulares; cada rueda gira solo cuando cambia su dígito.
- **Pie** (`app/pie.tsx`): colaboradores (AISC y UC3M sin teñir), correo, cómo llegar, privacidad, código de conducta, Instagram y LinkedIn (tinta → ciruela), créditos y «Volver arriba» con la manecilla girada.

## Movimiento

La norma es el tablero Microanimaciones; aquí está resumida.

- **Tres tiempos y dos curvas.** `--t-fast` 200 ms (ratón y pulsación), `--t-mid` 450 ms (aviso, preguntas, moneda, error), `--t-slow` 900 ms (láminas, filetes, esquineras, entrada). `--ease-out` para entrar y responder; `--ease-io` para mover en pantalla. Solo los bucles y los contadores (1,1–1,2 s) llevan sus propias duraciones: la cinta de logos va a 40 s por vuelta, lineal, y se para bajo el ratón.
- **Una sola vez.** Lo que aparece con el scroll se dispara con `animation-timeline: view()` y un «cerrojo»: `--on` pasa a 1 y la transición de vuelta espera 99999 s, así que no se deshace al subir.
- **CSS antes que JS.** Solo hay JS para la barra que se esconde, el contador, la moneda, el formulario, para no arrancar los vehículos hasta que su carril entra en pantalla y para el respaldo de abajo.
- **En todos los navegadores.** Lo ligado al scroll va en CSS tras `@supports (animation-timeline: view())` y `prefers-reduced-motion: no-preference` (Chrome, Edge, Safari 26+). Donde no hay `animation-timeline` (Firefox, Safari anteriores), `app/desplazamiento.tsx` pone la clase `sv` en `<html>` y reproduce los mismos gestos: añade `.on` a cada bloque al entrar (el cerrojo) y escribe variables de progreso que el CSS de `.sv` convierte en transform, opacity o clip-path. Un único bucle de `requestAnimationFrame` sobre un scroll pasivo; sin consultas `@container style()`, que Firefox no tiene. Toda regla nativa nueva lleva su gemela `.sv`.
- Con «reducir movimiento» no se activa nada y se ve el estado final. Cerrar una pregunta con animación (`::details-content`) solo existe en Chrome; en el resto se cierra al instante.
- Hover solo con ratón (`hover: hover and pointer: fine`); en táctil responde `:active`. Con «reducir movimiento» no hay desplazamientos ni bucles.
- Anima `opacity`, `transform`, `translate`, `clip-path`, `mask` y propiedades registradas. Nunca layout.

## Grabados, imágenes y créditos

- Servidos desde `public/grabados/{vinetas,tramas,esquinas,laminas,signos,agenda}/`, `public/campus/` (skyline) y `public/logos/`.
- Cada fichero de `public/grabados/` tiene su entrada en `assets/creditos.json` (`fichero`, `titulo`, `autor`, `fuente`, `licencia`); `npm test` falla si falta.
- Se optimizan una vez al subirlos (WebP para PNG grandes, `svgo` para SVG de potrace), sin optimización en el runtime. `<img>` con `width` y `height`, y `loading="lazy"` por debajo del pliegue.
- Logos de empresa de relleno (Meta, Apple…) no se publican: un hueco sin logo es mejor que una marca que no participa.

## Accesibilidad

- Foco visible: 2 px ciruela con 3 px de separación.
- Zonas táctiles de 44 px como mínimo.
- Las cifras que cuentan tienen su valor final en un `.sr` y el contador animado con `aria-hidden`.
- Grabados decorativos con `alt=""`; láminas con texto alternativo descriptivo.
- Enlace «Saltar al contenido» al principio de cada página.

## Marca y logos

Archivos en `public/`: `IsologoHackUc3m.svg`, `IsotipoHackUc3m.svg` y `hackuc3m-mark.svg` (moneda), `LogotipoHackUc3m.svg`, `ImagotipoHackUc3m.svg`, `charlie.svg`. Lockup de AISC en `public/logos/aisc-lockup.png` y logo de la UC3M en `public/logos/uc3m.png`. Wordmark «HackUC3M» en Cinzel ciruela con el «’27» a pluma en tinta.

- Nunca apliques `filter`, cambies colores, estires ni recortes un logo propio o ajeno.
- No afirmes ser «el primer» ni «el oficial» hackathon.

## Páginas de documento

`/privacidad`, `/codigo-de-conducta` y `/creditos` comparten la plantilla `app/documento/` (Legal.dc.html del canvas). Son estáticas y su texto sale de `contenido/*.md`, así que quien edite el texto no toca diseño; `/creditos` se genera desde `assets/creditos.json`.

- **Barra fija** (`.top.fija`): isotipo y nombre siempre visibles, y el botón de preinscripción. Se vuelve a la portada con el logo.
- **Portada**: esquineras de Van Hulsen a 150 px (84 en móvil), una viñeta sobre el título, rótulo «Documento I · HackUC3M’27», título en Ibarra 64 px (40 en móvil), entradilla en cursiva y vigencia en `.lab`. El texto entra en cascada como el hero; la viñeta, quieta.
- **Índice** al margen, fijo, con numerales romanos en Cinzel y el filete que se traza al pasar el ratón; en móvil, plegable y pegado bajo la barra.
- **Apartado** (`##`): numeral romano automático, texto a 38rem y glosa «En corto» (`>`) al margen en Brygada cursiva con filete ciruela; en móvil, entre el título y el texto. `###` es un rótulo en versal; las listas llevan raya ciruela o numeral en Ibarra.
- **Florón** (`---`) entre apartados y **remate** al final, quietos (sin animación). Cierra un bloque de contacto sobre papel de lis malva.
- **Viñetas**: catálogo cerrado en `app/documento/documento.tsx` (`torre`, `corona`, `flor`). Ampliarlo es añadir un grabado con su crédito y darle nombre.
- Sin textos entre corchetes: `npm test` falla si un `.md` de `contenido/` los tiene.

## Panel de organización

Diseño aprobado el 24 nov 2026 en el canvas (`Admin.dc.html`) y pasado a código en `app/admin/` (`admin.css`, que importa también `landing.css` para las vistas previas). Es Los Ilustrados en modo herramienta: los mismos tokens, tipos, filetes y gestos, más densos y sin grabados grandes. Modelo de datos en `docs/modelo-datos.md`.

- **Estructura:** barra lateral en damasco de lis oscuro (`plum-deep` con la trama de lis, texto crema y numerales romanos en crema al 78 %) y zona de trabajo sobre crema. Cada pantalla abre con rótulo, titular de 44 px y el estado de publicación. En móvil el menú pasa a una fila con scroll horizontal.
- **Cifras:** banda de cuatro cifras en Ibarra 64 px. En el resumen va sobre damasco de seda (ciruela sobre `plum-deep`); en el resto, clara, entre filetes de tinta. No se animan al cargar: el panel se ve a diario.
- **Lista con ficha:** a la izquierda, filas de 68 px con isotipo, nombre y papeles en `.lab`; a la derecha, la ficha. La fila elegida lleva fondo `surface`, el filete superior trazado (el gesto del track), y se marca con `aria-pressed`. Un punto lleno u hueco dice si sale en la web, con su texto oculto para lectores.
- **Embudo de captación:** columnas separadas por filete ciruela, como los tracks; cabecera en Cinzel versal con el recuento. Cada tarjeta lleva nombre, contacto, importe, etiqueta «Track», responsable en un cuadro con su inicial y el próximo paso; un paso vencido lleva la fecha en ciruela sobre crema invertida. «Perdidas» se pliega debajo con el «+» de las preguntas.
- **Campos:** etiqueta `.lab` encima y campo sobre `surface` al 55 % con filete de tinta que se traza en ciruela al enfocar. Los grupos dentro de un formulario llevan un subtítulo en Cinzel versal.
- **Dos maneras de guardar:** lo que se ve en la web espera a la **barra de publicar** (tinta, pegada abajo, sube en `--t-mid` y se va en `--t-fast`) y confirma con el aviso de doble filete. Lo interno se guarda solo y lo dice en una línea de estado.
- **Papel de aviso:** notas fijas (datos personales, «solo interfaz») sobre papel de lis malva con doble filete; el texto lleva su propio fondo crema.
- **Botones segmentados:** filtros en un grupo con filete `ink-muted`; el pulsado va en tinta con texto crema y lleva `aria-pressed`.
- **Huecos vacíos:** una viñeta pequeña de la agenda (56 px) con una frase en cursiva; se levanta 3 px al pasar el ratón.
- **Borrar:** nunca con un diálogo del navegador. Un bloque de doble filete en la propia ficha propone la alternativa (marcar como perdida) antes de borrar.
- **Vistas previas:** usan el marcado y el CSS reales de la landing (tracks, cinta y agenda); nada aproximado.
- **Barra lateral** fija a la altura de la ventana: siempre se ve entera.
- **Botones de icono (`Ico`, `.adm-ico`):** solo en el panel y solo para acciones repetidas en cada fila: subir, bajar y eliminar. Son de 36 px, con filete `--line`, trazo de 1,5 px en `currentColor`, y eliminar en `--plum` al pasar el ratón. El nombre va siempre en `aria-label` y `title`. Las acciones únicas, como «Quitar el día» o «Vaciar», siguen siendo texto.
- **Tamaños de herramienta:** el panel es más denso que la landing. Enlaces y botones pequeños a 16 px (como `.btn.peq`), filtros, contadores y textos secundarios de lista a 15 px, ayudas en cursiva a 13,5 px. El cuerpo sigue a 17–18 px y los titulares a 28 y 44 px.

## 404

Sigue en `app/interior.css` (solo la 404) con los tokens y las fuentes del sistema.

## Emails

Los clientes de correo no soportan variables CSS: los emails (`lib/confirmation-email.ts`) escriben en línea los hex de la tabla. Es la única excepción a «nunca colores sueltos», y `npm test` comprueba que solo usan colores de la paleta.

## Lo que no hacemos

- Patente o plano como tema principal; marcas de registro, de corte o coordenadas.
- Rehacer la landing como libro, gaceta o real cédula.
- Una palabra del titular en cursiva y de otro color.
- Tarjetas con sombra, degradados, glassmorphism, iconos genéricos, emojis.
- Ornamentos dibujados en SVG o en código, o geometría «perfecta» donde debería haber grabado.
- Rayos, destellos, degradados de oro, giros 3D al entrar o bucles en el premio.
- Signos de imprenta que casi nadie sabe leer (solo queda la manecilla).
- JS para animar con el scroll donde el navegador ya lo hace en CSS (el respaldo de `.sv` solo corre donde no hay `animation-timeline`).
- Pies de imagen largos o en versal.
- Teñir logos ajenos.
- Inventar patrocinadores, retos, premios, cifras o fotos.

## Checklist para cualquier pieza nueva

- [ ] Solo tokens; `npm test` pasa.
- [ ] Tipos de la tabla; nunca cursiva en versal; cifras en Ibarra.
- [ ] Grabados reales con crédito en `assets/creditos.json`.
- [ ] Tres tiempos, dos curvas; una sola vez; fallback y «reducir movimiento».
- [ ] Foco visible, zonas táctiles ≥ 44 px, textos alternativos.
- [ ] Patrón reutilizable nuevo → añadido aquí y a `app/globals.css`.

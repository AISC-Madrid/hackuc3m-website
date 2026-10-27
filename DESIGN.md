---
name: HackUC3M
description: Sistema visual claro de HackUC3M, construido sobre los colores del logo (crema, ciruela, malva y azul).
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
typography:
  display:
    fontFamily: "Cinzel, serif"
    fontSize: "clamp(3rem, 8vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "0.025em"
  display-mobile:
    fontFamily: "Cinzel, serif"
    fontSize: "clamp(2rem, 9.5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "0.025em"
  facts:
    fontFamily: "Cinzel, serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.025em"
  title:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(2rem, 5vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  subhead:
    fontFamily: "Geist, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  heading:
    fontFamily: "Geist, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  lead:
    fontFamily: "Geist, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Geist, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  small:
    fontFamily: "Geist, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  email-display:
    fontFamily: "Georgia, serif"
    fontSize: "28px"
    fontWeight: 700
    letterSpacing: "1px"
  email-body:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  pill: "9999px"
  field: "12px"
  panel: "12px"
spacing:
  unit: "4px"
  control-gap: "16px"
  panel-padding: "32px"
  section: "96px"
  container: "1024px"
components:
  button-primary:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
    padding: "12px 28px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.plum-deep}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.plum}"
    borderColor: "{colors.mauve}"
    rounded: "{rounded.pill}"
    padding: "12px 28px"
    height: "48px"
  button-secondary-hover:
    borderColor: "{colors.plum}"
  input:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    borderColor: "{colors.mauve-deep}"
    rounded: "{rounded.field}"
    padding: "12px 14px"
    height: "48px"
  panel:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.line}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel-padding}"
---

# Sistema de diseño: HackUC3M

Esta es la referencia normativa para todo lo que lleve el nombre HackUC3M: la web pública, el panel de organización, los emails y cualquier pieza nueva. Si el código contradice este documento, manda este documento. Última actualización: 2026-10-27.

## Dirección

HackUC3M es claro, cálido y universitario. La paleta sale del propio logo, la moneda: crema, ciruela, malva y un azul grisáceo. La voz propia la ponen el wordmark en Cinzel y una línea fina degradada de ciruela a malva; todo lo demás es Geist, limpio y legible.

Cuatro reglas resumen el sistema:

- **Fondo crema siempre.** No hay modo oscuro, ni fondos negros, ni blanco puro como fondo de página.
- **Los colores del logo, cada uno con un papel.** Ciruela para la marca y la acción, malva para el detalle, azul como ornamento. Nada fuera de la paleta.
- **Plano.** La estructura la dan el espacio, las líneas finas y los fondos tonales. Sin brillos, sin glassmorphism, sin sombras difuminadas.
- **Cinzel es la firma, no la interfaz.** Solo para el wordmark y la línea de datos clave.

## Color

Los cuatro colores base son los del logo (`public/IsologoHackUc3m.svg`). El resto se deriva de ellos: la tinta es ciruela oscurecida y los neutros son tinta o malva mezclados sobre crema.

| Token | Hex | Papel |
| --- | --- | --- |
| Cream | `#f3f0df` | Fondo de página y de campos. La única superficie base. Color del logo. |
| Surface | `#ece4d9` | Bandas y paneles que deben distinguirse del fondo (malva al 14 % sobre crema). |
| Line | `#decbcc` | Separadores y bordes de paneles de 1 px (malva al 45 % sobre crema). |
| Ink | `#2c1425` | Texto principal (ciruela al 35 % de luminosidad). |
| Ink soft | `#58444e` | Párrafos secundarios y entradillas. |
| Ink muted | `#705f64` | Metadatos, notas, pies, placeholders. El tono más claro permitido para texto. |
| Plum | `#7e3a6b` | Wordmark, acción principal, enlaces, iconos de acento, foco. Color del logo. |
| Plum deep | `#652f56` | Hover de la acción principal y mensajes de error. |
| Mauve | `#c49db5` | Borde del botón secundario, subrayados, selección de texto, línea de marca. Nunca texto. Color del logo. |
| Mauve deep | `#9e678c` | El año «'27» del hero y el borde de los campos de formulario. Solo texto display. |
| Blue | `#9db2c1` | Ornamento: el rombo «◆» entre datos, puntos de estado. Nunca texto. Color del logo. |

Contraste medido sobre crema: ink 14,9:1 · ink soft 7,8:1 · ink muted 5,2:1 · plum 6,8:1 · plum deep 8,8:1 · mauve deep 3,8:1 · mauve 2,1:1 · blue 1,9:1. Crema sobre plum: 6,8:1. Ink sobre mauve: 7,2:1.

Reglas:

- Usa los tokens, nunca hex sueltos. Los tokens viven en el `:root` de `app/globals.css` (y como colores de Tailwind vía `@theme inline`) con exactamente los valores de esta tabla. `npm test` comprueba que la tabla, el frontmatter, `globals.css` y el email coinciden.
- No inventes colores ni grises neutros. Si de verdad hace falta un tono nuevo, derívalo de la paleta, añádelo aquí y en `globals.css` en el mismo cambio.
- Mauve deep solo como texto a partir de 24 px. Mauve y blue nunca como texto.
- Los colores rojo, verde o ámbar de «error / éxito / aviso» no existen: los estados se comunican con texto e iconos, y el error usa plum deep.
- El único degradado del sistema es la **línea de marca**: 1 px de alto, `linear-gradient(90deg, transparent, plum, mauve, transparent)`. No uses degradados en fondos, botones, tarjetas ni texto.
- Selección de texto: fondo mauve, texto ink.

## Tipografía

Dos familias, cargadas con `next/font/google` en `app/layout.tsx`:

- **Cinzel** (`--font-cinzel`): el wordmark «HackUC3M '27» (hero y pie) y la línea de datos clave (fecha ◆ lugar). Nada más.
- **Geist** (`--font-geist-sans`): todo lo demás, incluidos los `h1` de páginas interiores.

| Rol | Familia | Tamaño | Peso | Interlineado | Tracking | Uso |
| --- | --- | --- | --- | --- | --- | --- |
| Display | Cinzel | `clamp(3rem, 8vw, 4.5rem)` | 700 | 1.05 | 0.025em | Wordmark del hero |
| Display móvil | Cinzel | `clamp(2rem, 9.5vw, 3rem)` | 700 | 1.05 | 0.025em | Wordmark por debajo de 650 px |
| Datos clave | Cinzel | 18 px | 400 | 1.4 | 0.025em | Fecha ◆ lugar; wordmark del pie |
| Título | Geist | `clamp(2rem, 5vw, 2.75rem)` | 600 | 1.15 | -0.02em | `h1` de páginas interiores |
| Titular | Geist | `clamp(1.75rem, 3.5vw, 2.5rem)` | 600 | 1.15 | -0.02em | `h2` de sección |
| Subtítulo | Geist | 24 px | 600 | 1.3 | -0.01em | `h2` de páginas interiores, mensajes de estado |
| Encabezado | Geist | 20 px | 600 | 1.3 | -0.01em | `h3`, títulos de panel |
| Entradilla | Geist | 18 px | 400 | 1.6 | 0 | Primer párrafo de un bloque |
| Cuerpo | Geist | 16 px | 400 | 1.65 | 0 | Texto corrido |
| Pequeño / UI | Geist | 14 px | 400–500 | 1.5 | 0 | Botones, navegación, notas, etiquetas |

Reglas:

- No hay más tamaños que los de esta tabla. Si hace falta otro, añádelo aquí primero.
- El wordmark siempre en una línea.
- Cinzel lleva tracking positivo (es una capitular romana). Nunca tracking negativo, nunca párrafos, nunca botones ni navegación.
- Tamaño mínimo: 14 px. Campos de formulario a 16 px (evita el zoom en móvil).
- Titulares con `text-wrap: balance`; párrafos con `text-wrap: pretty` y 36rem de ancho como máximo.
- Jerarquía por tamaño y peso, no por color: un titular es ink entero, sin segundas líneas en gris.
- Sin etiquetas en mayúsculas espaciadas encima de los titulares (eyebrows/kickers): el titular se sostiene solo, y si el contexto importa va en la entradilla.

## Espaciado y layout

- Unidad base de 4 px. Escala en uso: 4, 8, 12, 16, 24, 32, 40, 48, 64, 96.
- Contenedor `.wrap` centrado de 1024 px como máximo. Margen lateral de 40 px en escritorio, 28 px por debajo de 900 px y 24 px por debajo de 650 px.
- Secciones: 96 px de espacio vertical (`.section-space`), 64 px en móvil. Las secciones se separan con una línea `line` (`.section-rule`).
- Mobile first: diseña a 390 px, luego 650 y 1024. Las dos columnas (`.split`) colapsan a una por debajo de 650 px.
- El hero es centrado: wordmark, entradilla (que dice qué es y dónde), línea de marca, datos clave, acciones y estado. Sin emblema: el símbolo ya está en la cabecera.

## Bordes, formas y profundidad

- Bordes de 1 px. Las listas (FAQ, tracks) se separan con líneas, no con tarjetas.
- Radios: píldora (`9999px`) para botones; 12 px para campos y paneles. No hay otros radios.
- Sin sombras, sin `backdrop-filter`, sin brillos radiales. Un panel se distingue por su fondo y su borde, no por elevación.
- Panel sobre crema: fondo surface. Panel dentro de una banda surface: fondo crema.
- Iconos de línea a 16–24 px en el color del texto que acompañan (o plum si son el acento del bloque). Solo pon una flecha si el elemento es un enlace.

## Componentes

### Botones (`.button`)

- **Principal** (`.button.primary`): fondo plum, texto crema, píldora, 48 px de alto, Geist 14 px peso 500. Hover: plum deep.
- **Secundario** (`.button.secondary`): fondo transparente, borde mauve, texto plum. Hover: borde plum.
- **Compacto** (`.compact`): 44 px de alto, para la cabecera y el panel de organización.
- Pulsado: `scale(0.97)`. Deshabilitado: 60 % de opacidad, sin escala.
- Una sola acción principal visible por pantalla: la de la cabecera es secundaria.
- **Enlace de texto** (`.text-link`): plum, peso 500, subrayado mauve con 4 px de offset que pasa a plum en hover.

### Formularios

- Etiqueta visible siempre encima del campo (Geist 14 px, peso 500, ink). Opcionales con «(opcional)» en ink muted.
- Campo: fondo crema, borde mauve deep (3,8:1, visible como límite del control), radio 12 px, 16 px de texto, 48 px de alto. Hover y focus: borde plum, más el anillo de foco global.
- Checkbox de 18 px con `accent-color: var(--plum)`.
- Errores en texto plum deep junto al formulario, anunciados por un live region; nunca solo con color. El éxito sustituye el formulario por un mensaje de estado con icono.

### Secciones y paneles

- Sección estándar: `.split` con el titular a la izquierda y el contenido a la derecha.
- Banda destacada (preinscripción): fondo surface a ancho completo, con líneas arriba y abajo; el formulario va en un panel crema.
- Panel: radio 12 px, borde `line`, 32 px de padding (24 px en móvil).

### Firmas de marca

- **Línea de marca** (`.brand-rule`): solo en el hero, entre la entradilla y los datos clave.
- **Datos clave** (`.event-facts`): fecha y lugar en Cinzel, separados por un rombo «◆» en blue.
- **Wordmark**: «HackUC3M» en plum; en el hero, el año «'27» en mauve deep. En el pie, el wordmark entero en plum.

### Navegación y pie

- Cabecera: línea `line` inferior, isotipo de 48 px a la izquierda, enlaces Geist 14 px en ink soft (hover ink con subrayado plum que crece de izquierda a derecha), botón secundario compacto a la derecha.
- Pie: línea `line` superior, wordmark en Cinzel, Geist 14 px en ink muted, enlaces con hover plum.

## Movimiento

- Curva única: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`.
- Color y borde: 200 ms. Pulsado de botón: 160 ms.
- Anima solo `opacity`, `transform` y color. Nunca layout, nunca `filter: blur`.
- Sin animaciones de entrada en la carga, sin animaciones en bucle, sin parallax, sin revelados al hacer scroll.
- `prefers-reduced-motion: reduce` desactiva transiciones, animaciones y el scroll suave.

## Accesibilidad

- Foco siempre visible: contorno de 2 px en plum con 3 px de offset. No lo quites sin un sustituto equivalente.
- Zonas táctiles de 44 px como mínimo; 48 px en llamadas a la acción.
- Controles solo-icono con nombre accesible. Imágenes e iconos decorativos con `alt=""` o `aria-hidden`.
- Enlace «Saltar al contenido» al principio de cada página pública.
- Idioma `es`, `color-scheme: light`.

## Marca y logos

Archivos en `public/`: `IsologoHackUc3m.svg` (moneda + texto), `IsotipoHackUc3m.svg` y `hackuc3m-mark.svg` (moneda), `LogotipoHackUc3m.svg` (texto), `ImagotipoHackUc3m.svg`. AISC Madrid: `public/aisc/Property1=AISCLockupColor.svg`.

- Usa siempre las versiones en color: el fondo es crema.
- Nunca apliques `filter`, cambies colores, estires, rotes ni recortes un logo.
- Isotipo en cabecera a 48 px (40 px en móvil). Lockup de AISC a 120–160 px de ancho.
- No afirmes ser «el primer» ni «el oficial» hackathon.

## Emails

Los clientes de correo no soportan variables CSS: los emails (`lib/confirmation-email.ts`) escriben en línea los hex de la tabla de color. Es la única excepción a «nunca hex sueltos», y `npm test` comprueba que solo usan colores de la paleta. Mismo sistema: fondo surface, tarjeta crema, wordmark plum en Georgia (Cinzel no está disponible en email), texto ink, botón plum en píldora y Arial como sans.

## Lo que no hacemos

Patrones que hacen que una página parezca generada y que este sistema excluye:

- Fondos oscuros o modo oscuro.
- Brillos radiales detrás del hero, tarjetas con degradado, glassmorphism, sombras de color.
- Titulares que entran con desenfoque, elementos que flotan o «respiran» en bucle.
- Una paleta paralela de grises o tonos casi iguales definidos elemento a elemento.
- Texto de 9–12 px para metadatos.
- Etiquetas en mayúsculas espaciadas encima de un titular («eyebrows»), en píldora o sin ella.
- Bloques de CSS que sobrescriben reglas anteriores en lugar de cambiarlas.
- Titulares a dos tonos (primera línea oscura, segunda gris).
- Iconos decorativos inventados (cubos apilados, destellos) y flechas en elementos que no son enlaces.
- Rejillas de tarjetas idénticas con icono + título + frase.
- Inventar patrocinadores, retos, premios, cifras o fotos.

## Checklist para cualquier pieza nueva

- [ ] Fondo crema; solo colores de la tabla, vía tokens. `npm test` pasa.
- [ ] Cinzel solo en el wordmark y los datos clave; el resto en Geist.
- [ ] Tamaños de la tabla de tipografía, ninguno por debajo de 14 px; texto secundario no más claro que ink muted.
- [ ] `npx impeccable detect app lib` y `npx impeccable detect <url local>` sin hallazgos nuevos.
- [ ] Botones en píldora, una acción principal visible, 48 px de alto (44 px compactos).
- [ ] Bordes de 1 px; radios de 12 px o píldora; sin sombras ni degradados (salvo la línea de marca).
- [ ] Foco visible, zonas táctiles ≥ 44 px, `prefers-reduced-motion` respetado.
- [ ] Si has creado un patrón reutilizable, añádelo a este documento.

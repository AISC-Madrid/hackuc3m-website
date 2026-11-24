# Cómo diseñar (cómo lo quiere el equipo)

Normas de trabajo para cualquier pieza de diseño: web, canvas, redes o cartelería. No sustituye a `DESIGN.md` (los valores) ni a `docs/diseno-landing.md` (el registro de decisiones): dice **cómo** trabajar. Léelo antes de diseñar.

## 1. Revisar antes de publicar

Nada se sube al canvas (ni a ningún artifact) sin haberlo visto renderizado.

- Renderiza cada pieza y **mírala** (captura) antes de publicar. Para el canvas sirve el Chromium sin interfaz de Playwright (`~/.cache/ms-playwright/chromium_headless_shell-*/…/chrome-headless-shell --screenshot`) sobre una copia HTML de la pieza con las imágenes en local.
- Comprueba, pieza a pieza:
  - Nada **desborda**: ni el texto se sale de su columna o del lienzo, ni un grabado se corta donde no toca, ni un titular choca con otro elemento.
  - La retícula está **bien estructurada**: márgenes iguales, alineaciones que se ven, aire entre bloques.
  - Los textos de ejemplo tienen la longitud real (un titular de tres líneas, no de una).
- Si algo se ve mal, se arregla antes de subir. Mejor subir menos piezas y bien que muchas a medias.

## 2. Viñetas: todas, y variadas

- Usa **todo el catálogo**, no siempre las mismas cinco. Fuentes: `.design-refs/grabados/` (`vinetas/`, `remates-y-florones/`, `nuevos/V10–V19`, `esquinas-y-roleos/`), `.design-refs/pd/florones/` (d_*, g_*, v_*) y los florones de imprenta entintados de `pd/c_fleurons` (hierros de «Art of Bookbinding» recortados uno a uno, cabeceras, bandas de rosas). En el canvas están subidas y a la vista en la mesa `RedesSerie` (muestrario).
- Cada pieza lleva varias viñetas distintas (capitular, separador, pie) y **no se repiten en piezas seguidas**. Si hacen falta más, se buscan y entintan más (Commons, solo DP/CC0, con su crédito).

## 3. Grabados

- **Descartados para piezas nuevas:** Minerva, la lechuza/búho (Bewick y la de vuelo como protagonista) y el hombre de Vitruvio.
- **Gustan:** el astrolabio (instrumento a línea), la Puerta de Alcalá, el campus (Sabatini, Auditorio, Biblioteca).
- **Grabado en crema sobre fondo oscuro, con cuidado:** un grabado tonal (retratos, animales, paisajes) invertido en crema parece un negativo y se ve mal. Solo funciona con grabados de línea limpia (instrumentos, láminas técnicas, arquitectura a línea). Por defecto, grabado en tinta o ciruela sobre papel claro.

## 4. Composición: cartel suizo, con variedad

- La dirección para redes y cartelería es la **composición del cartel suizo** (retícula, asimetría, escala extrema, mucho aire), con nuestros tipos y grabados, sin Helvética y sin rayas ni retícula visible (ver registro).
- No repetir una sola estructura: proponer **retículas y composiciones distintas** (columnas desiguales, módulos, titular que corta la página, bandera a la izquierda, rotación de 90°, escalonado, gran cifra, imagen recortada al borde…), no la misma plantilla con otro fondo.
- La «columna» con el astrolabio gustó: es una de las estructuras, no la única.

## 5. Cómo proponer

- Pocas propuestas, bien acabadas y distintas entre sí, antes que muchas parecidas.
- Las tramas de la guía (todas) se pueden usar como campo de color, no como papel de fondo con una hoja encima (eso parece plantilla).
- Apunta cada decisión o rechazo en `docs/diseno-landing.md`, con fecha.

## 6. Kit para el equipo

El estilo de redes se reparte como kit en `.design-refs/kit-carteles/` (se sube comprimido al Drive del hackathon). Si cambia una regla de estilo, una plantilla o la lista de grabados, actualiza también `kit-carteles/SKILL.md` y vuelve a generar el zip.

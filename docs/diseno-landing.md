# Diseño de la landing · decisiones y criterios

Documento vivo con lo que vamos decidiendo para la landing de HackUC3M ’27 (19–20 feb 2027, EPS Leganés). Recoge el porqué de cada cosa para que otra sesión pueda continuar sin repetir errores. Cuando algo pase a ser norma de la web, se lleva a `DESIGN.md`.

- Canvas de diseño (Claude Design): https://claude.ai/artifact/89JnFK6ukw8uUHzHYmfoNf
  - `Estilo.dc.html`: guía de estilo
  - `Texto.dc.html`: comparativa de fuentes de texto (ya decidida)
  - `Main.dc.html` / `Mobile.dc.html`: wireframe de la landing
- Referencias visuales: `.design-refs/` (no se sube al repo). Grabados procesados: `.design-refs/grabados/`.

## Fijo desde el principio

- Paleta de `DESIGN.md` (cream, surface, line, ink, ink-soft, ink-muted, plum, plum-deep, mauve, mauve-deep, blue). No se añaden colores.
- Logos de `public/` (moneda de Carlos III, isotipo, logotipo).
- Wordmark «HackUC3M» en Cinzel, color plum.

## Dirección: «Los Ilustrados»

Carlos III, la Ilustración y el siglo XVIII como escenario, con ingenieros de 2027. Grabado de época, rococó, flor de lis borbónica y el saber (lechuza, libros, Minerva, Vitruvio). La ingeniería entra como nota secundaria: un toque de lámina de patente, cotas o espiral áurea, el skyline de la EPS y los vehículos pequeños.

## Tipografía (decidida)

| Uso | Fuente | Notas |
|---|---|---|
| Wordmark y números de sección | Cinzel 600–700 | Versalitas con tracking amplio en rótulos. Nunca en párrafos. |
| Texto y titulares | Ibarra Real Nova | Letra de Joaquín Ibarra, impresor de Carlos III (Quijote de 1780). Cifras lining. |
| Etiquetas, fechas, anotaciones | Xanh Mono 400 | 11–13 px, mayúsculas. Monoespaciada con remates de pluma (elegida el 15 nov 2026 frente a Courier Prime, Cutive Mono, Spectral SC, Cormorant SC e Ibarra en versalitas). |
| Contador | Xanh Mono | Monoespaciada, para que los dígitos no bailen al cambiar. |
| «’27» a pluma | Corinthia | Solo el ’27 del hero y, como mucho, una firma. Meddon también gustó. |

## Énfasis en titulares

No hay. Los titulares van en un solo tono, en redonda y sin ninguna palabra destacada. Se descartaron la cursiva de color y sus seis sustitutos (portada a gran escala, versal en Cinzel, capitular, llamada de nota, florones y subrayado malva) el 15 nov 2026.

## Ilustración

- **Solo grabados reales** de dominio público o CC0 (Wikimedia Commons), recortados y entintados con la paleta: tinta `#2c1425` o ciruela `#7e3a6b` sobre transparente; crema para bandas oscuras. Guardar fuente y licencia de cada uno (habrá página de créditos).
- **Nada dibujado «a mano» por Claude** (SVG de ornamentos, lechuzas, globos, filetes rococó…): queda feo y se nota. Tampoco SVG geométricos «perfectos» para cosas que deberían ser grabado (p. ej. la espiral áurea): se nota que es código.
- Grabados grandes (manos de Miguel Ángel, Minerva, lechuza de Bewick): gustan, pero llaman mucho la atención. Usar con mucha moderación o recortados.
- **Faltan y son prioridad:**
  - Grabados **pequeños** tipo icono/viñeta para esquinas y huecos. Referencia: la lechuza pequeña volando de `.design-refs/detalles y texturas/`.
  - **Viñetas y marcos**: mitad rococó/edad moderna (flores, hojas, cintas, papeles doblados) y mitad marco de patente o documento. Encontradas, no programadas.
  - Un grabado real de **espiral áurea** (p. ej. un nautilus).
  - Más **tramas** de fondo además de la flor de lis.

- **Vectorizar referencias**: las imágenes de `.design-refs/detalles y texturas/to_svg/` se pasan a SVG con potrace (umbral + `potrace -s`, color de tinta) para conservar el trazo imperfecto y escalar sin pixelar. SVG resultantes en `.design-refs/grabados/svg/`. Su licencia es desconocida (Pinterest): verificar o sustituir antes de publicar.

## Fondos

- Grano de papel sutil sobre cream.
- Trama de florón (`.design-refs/grabados/trama-floron-dark.png`): florón de imprenta de `f_florones.png` en espejo y a medio paso, plum sobre plum-deep, tesela de 100 px. Fondo de las propuestas A y B del gran premio (artboard Premio.dc.html, 15 nov 2026), en lugar de la lis.
- Trama de flor de lis: gusta mucho. Tres variantes: surface + lis en line (pausas), cream + lis malva (detrás de una pieza única) y damasco plum-deep + lis plum (bandas oscuras). Cuidado: la lis no puede salir cortada en el borde de la tesela.

## Composición (ideas sacadas de `.design-refs/reticula y composicion` y `tipografia y jerarquia`)

Objetivo: que la página parezca maquetada por un diseñador editorial, no la típica landing de bloques centrados apilados (título, subtítulo, tres tarjetas, repetir).

1. **Retícula visible con filetes.** Columnas separadas por líneas verticales finas y bloques compartimentados como una ficha impresa (manifiesto en tres columnas, carta de Dearboleda, etiqueta del whiskey con campos «NAME / BATCH NO.»). Ejemplo: los datos clave del evento como una ficha (fecha · lugar · plazas · precio) con etiquetas en mono y valores en serifa.
2. **Contraste de escala extremo.** Titular o cifra enorme junto a texto mono diminuto (Incomplete Manifesto, «1——06» de Submerged Sonata). Nada de tamaños medios por todas partes.
3. **Asimetría.** Alternar secciones ceremoniosas centradas (hero, gran premio, cierre) con secciones editoriales alineadas a la izquierda y columnas de anchos distintos (Blumenbach: número · etiqueta · texto ancho · tabla).
4. **Cabecera corrida por sección.** Una franja fina con metadatos en 3–4 columnas (como el brand book «Brand Kit · Identity system · 2024 · page 4»): «HackUC3M ’27 · II · Los retos · 6 empresas».
5. **Índices y listas numeradas en vez de tarjetas.** Tracks, agenda y FAQ como índice tipográfico (número alineado, título, página o hora a la derecha), igual que el «INDEX» del periódico EXTRA.
6. **La imagen rompe la retícula.** Un grabado que se sale de su columna, queda detrás de un titular o sangra hasta el borde (Build Smarter, The Misty, Social Impact Capital con grabados que abren y cierran la página).
7. **Viñetas pequeñas como puntuación.** Iconos grabados diminutos en esquinas, junto a un horario o cerrando un bloque (la web de boda «The Day» con iconitos por momento).

## Sellos

Gustan (efecto de tinta gastada), pero son secundarios: dos como mucho. Matasellos de fecha junto al contador y «Preinscrito» al enviar el formulario. Revisar siempre que el texto no se salga del sello.

## Descartado (no volver a proponer)

- Patente o plano como tema principal; marcas de registro y de corte; coordenadas.
- Bodoni como letra principal (ilegible en tamaños pequeños) y La Belle Aurore.
- Filtro de «tinta corrida» simulada sobre las letras.
- IM Fell como letra principal.
- Pie de página de «inventores / patentado».
- Tarjetas con sombra, degradados, glassmorphism, iconos genéricos, emojis.
- IBM Plex Mono para las anotaciones (15 nov 2026).
- Rehacer la landing como un libro (portada, índice, capítulos con glosas, lámina, colofón), como gaceta o como real cédula: demasiado conceptual (15 nov 2026).
- Una palabra del titular o rótulo en cursiva y de otro color («Un gran *premio*» en ciruela): señal de web hecha con IA. Titulares en un solo tono y en redonda. Llevado a `DESIGN.md` › Lo que no hacemos (15 nov 2026).

## Wireframe (decisiones de contenido)

- Hero: «HackUC3M» + «’27» a pluma → explicación breve → botones «Preinscribirme» y «Quiero colaborar» → skyline (Sabatini, Auditorio, Biblioteca; estáticos, sin animación de dibujo) → contador de días, horas, minutos y segundos.
- Cohete en el hero, sale entre el Sabatini y el Auditorio y sube con el scroll.
- Vehículos pequeños y animados repartidos por la landing (dron más rápido, Formula Student, moto, iCab). Genéricos, sin rasgos de ningún equipo. La locomotora, descartada.
- Banda de logos de empresas bajo el hero.
- Seis tracks y un único gran premio (sin premio por track).
- Las cifras necesitan impacto. Gusta «Retos de la industria. Talento universitario.» (en un solo tono, sin cursiva de color).
- Tracks: lista en vez de tarjetas (v3). Pie: sin wordmark gigante (v3); el resto del pie sigue pendiente.

## Estado actual (15 nov 2026)

- Guía de estilo en el canvas (`Estilo.dc.html`, revisión 04–05): I concepto · II tinta y papel (lis) · III tipos · IV grabados grandes · IV·b viñetas pequeñas · IV·c marcos, remates y esquinas · IV·d referencias vectorizadas · V notas de ingeniero · VI sellos · VII componentes · VIII lo que no hacemos · créditos.
- Assets: subidos al canvas (`/_blob/…`) y copiados en `.design-refs/grabados/` (PNG entintados, `svg/` vectorizados, `creditos-vinetas.json`). Las viñetas/marcos están a ~330 px: bajar originales a resolución completa cuando se elijan.
- Herramientas en `.design-refs/herramientas/`: `cs.py` (búsqueda en Wikimedia Commons), `cat.py` (descarga por categoría de Commons, solo PD/CC0), `ink.sh` y `proc2.sh` (quitar papel y entintar con ImageMagick). Vectorizar: umbral con ImageMagick + `potrace -s --color '#2c1425'`. Commons limita mucho las descargas grandes (429): ir despacio y usar miniaturas de la API.
- Categorías útiles de Commons: Vignette, Cul-de-Lampe, Fleurons, Typographic ornaments, Endpieces (book illustration), Ornamental borders in books, Graphic frames, Nautilus illustrations, Line art of owls. Para ornamento con pájaros: búsquedas en neerlandés (Rijksmuseum, CC0), p. ej. «Bladranken met vogels».
- **v3 (`V3.dc.html`, 15 nov 2026): la v1 con estilo y cambios inspirados en Social Impact Capital.** Decidido:
  - Cabecera: enlaces a la izquierda, isotipo en el centro, «Preinscríbete» a la derecha.
  - Hero: fecha en romanos encima del wordmark («XIX – XX · II · MMXXVII»); grabados alrededor del titular (esquineras de roleos, lechuza en vuelo) y skyline debajo; contador discreto en Xanh Mono.
  - Manifiesto: Vitruvio (SVG vectorizado) a la izquierda y el texto a la derecha, con la animación de la v1 (las palabras pasan de malva a tinta al hacer scroll).
  - Cifras: se mantienen las bandas fijas oscuras (damasco plum-deep), sin notas de «previstas». Un grabado en crema por banda: 300 hackers → lechuza en vuelo (elegida por Claude, por confirmar); 2 días → velero; 6 retos → manos de «La creación de Adán» en crema (`grabados/manos-crema.png`; antes Minerva y, antes, espiral áurea; cambiada el 15 nov 2026); [X €] → libros (`grabados/libros.png`).
  - Sin banda panorámica nueva (no gustó).
  - Retos: lista tipo Social Impact Capital (nombre enorme en versal, filete encima, etiquetas a la derecha) en lugar del carrusel. Viñeta a la derecha del encabezado (ahora «Laurel y sol»).
  - Gran premio: se queda, con la cifra dentro de la corona de laurel sobre la trama de lis malva.
  - Agenda: fila de momentos por día (hora, viñeta y texto), como la web de boda «The Day».
  - Pie: sin el wordmark gigante.
  - Animación (15 nov 2026), solo con CSS de scroll (`animation-timeline`), sin JS y desactivada con `prefers-reduced-motion`: el wordmark del hero se encoge y aparece en pequeño en la cabecera fija (sustituye al isotipo); el cohete sube con el scroll; las palabras del manifiesto pasan de malva a tinta; Vitruvio y los grabados de las cifras suben al entrar; las cifras cuentan hacia arriba y cada banda fija tapa a la anterior. Los vehículos siguen en bucle. Sin soporte del navegador, todo se ve en su estado final. Se ve en el canvas con Play a pantalla completa.
- **v2 «El libro» (`Libro.dc.html`): DESCARTADA (15 nov 2026).** Reinventaba la página entera y no gustó. Se vuelve a la v1 (`Main.dc.html`) con cambios puntuales, tomando como referencia principal la web de Social Impact Capital (`.design-refs/webs or motions/b54b…jpg`). Lo que sigue describe la v2 solo como registro: Diagnóstico de la v1: se ve hecha con IA por la estructura (manifiesto que se colorea con el scroll, cifras fijas que cuentan, tracks en carrusel horizontal, agenda que se rellena, wordmark gigante cortado en el pie), no por el estilo. La v2 trata la landing como un libro de la Real Imprenta: portada (hero con pie de imprenta y contador en Xanh Mono) → «Con el concurso de» (empresas) → índice → capítulos con cabecera corrida, número romano, texto y columna de glosas al margen → lámina tipo Encyclopédie con los vehículos numerados (Fig. 1–5) → almanaque (agenda en dos columnas) → «Lista de suscriptores» (preinscripción en marco de documento) → colofón como pie. Sin animaciones de scroll. Alternativas planteadas y no elegidas: Gaceta de Leganés (periódico) y Real Cédula (decreto).
- Siguiente paso previsto: elegir qué grabados se quedan y aplicar el estilo al wireframe (`Main.dc.html`) con la composición editorial de arriba; después, reescribir `DESIGN.md`, `app/globals.css` y `.impeccable/design.json`.

## Pendiente

- Pie de página (el actual no convence).
- Movimiento y transiciones (se pensará después).
- Composición y jerarquía de la página: que no parezca la típica web hecha con IA.
- Fechas (19–20 vs 20–21 feb) y logo de la UC3M.
- **V3, 15 nov 2026:** se elimina la sección «Cómo llegar» (y su enlace de la cabecera). El vehículo autónomo que iba en bucle debajo de ella pasa a una franja entre las FAQ y el pie.
- **V3, 15 nov 2026:** el cohete va pegado a la izquierda del skyline. Ya no se repite en bucle: está oculto al cargar y solo aparece y sube al hacer scroll (`scroll(root)`, primeros 700 px).
- **V3, 15 nov 2026:** el cohete queda oculto en navegadores sin animación por scroll (antes se quedaba quieto en el suelo).
- **V3, cifras (15 nov 2026), propuesta:** los números suben desde detrás de una línea mientras cuentan, sincronizados con la entrada de cada banda (`view-timeline` de la banda, no del número). Para que no quede sosa, sacado de las referencias (manifiesto numerado «01. 02. 03.», etiqueta de whisky «Nº 0091/1000»): cabecera en mono «Nº I … de IV» sobre filete crema y el texto de la cifra dentro de un campo con filete. Libros y globo vectorizados con potrace (`grabados/svg/libros-crema.svg`) porque el único original en Commons («Quill, inkwell, books and globe.jpg», DP) mide 471 px.
- **V3, cifras (15 nov 2026):** no gusta que las bandas fijas se tapen unas a otras al hacer scroll. Ahora la sección se queda fija y las cuatro cifras pasan en horizontal (`transform: translateX`, ligado al scroll), con una pausa en cada una mientras su número cuenta desde 0. «2.500 €» también cuenta (de 100 en 100). Se quita el efecto de que el número suba. En móvil, o sin soporte del navegador, las bandas van apiladas, sin solaparse.
- **Formulario (15 nov 2026):** no gusta el correo en Ibarra (la @ queda enorme). El campo pasa a Xanh Mono, como la etiqueta «Correo».
- **V3, cifras (15 nov 2026), revisión:** los números no deben ir ligados al scroll. Al aparecer cada cifra, cuenta de 0 a su valor en un tiempo fijo (~0,6 s): el scroll solo dispara la cuenta (CSS con `@container style()` y una transición de `--v`). Tampoco gusta el carrusel en horizontal (`translateX`): ahora las cuatro cifras están en el mismo sitio y cambian con un fundido y una escala (0,94 → 1) cuando el scroll llega a cada paso.
- **Cabecera (15 nov 2026):** se oculta al bajar y vuelve a aparecer al subir (pequeño script en el componente; con el foco del teclado dentro, siempre visible).
- **Tracks (15 nov 2026):** en la web se habla de «tracks», no de «retos» (menú, sección, cifras, agenda, FAQ y bloque de empresas). Cada fila: logo de la empresa a la izquierda con su nombre debajo; a la derecha del todo, el nombre del track en grande y la descripción debajo, alineados a la derecha (en móvil, todo a la izquierda). Las etiquetas «Reto/Empresa» desaparecen.
- **Tracks (15 nov 2026):** el hueco del logo es cuadrado (112 px, con filete). De relleno van los logos de Meta, Apple, Amazon, Netflix, Google y Microsoft (Simple Icons, en tinta). Son solo placeholders: hay que quitarlos antes de enseñar la web fuera del equipo.
- **Tracks (15 nov 2026):** Kapia y Bending Spoons están confirmadas y van como tracks 01 y 02, con sus logos reales (sacados de sus webs y pasados a tinta). Los otros cuatro siguen siendo placeholders (Meta, Apple, Amazon, Google). Cada fila lleva en su esquina inferior izquierda una esquina de marco grabada: «Hoekornament met Hercules met pijl en boog» (Rijksmuseum, BI-1934-1775-51-7, CC0, vía Wikimedia Commons), recortada y entintada en `#2c1425` (`grabados/esq_hercules.png`). Sustituye a la esquinera del hero, que no gustó repetida. Se quitó la rama suelta bajo la lista.
- **Tracks (15 nov 2026):** la esquina de cada fila pasa a ser una voluta de acanto que aportó el usuario, volteada en vertical para que haga de esquina inferior izquierda y entintada (`grabados/esq_voluta.png`, 110 px de ancho). Sustituye a la de Hércules. **Falta saber la fuente y la licencia** para la página de créditos.
  - Después, girada 90° en sentido horario y luego invertida en horizontal (`grabados/esq_voluta2.png`): queda horizontal, con la voluta cayendo a la derecha; 200 px de ancho.
  - Al final, espejada sobre un eje vertical, de izquierda a derecha (`grabados/esq_voluta4.png`): el brazo largo va arriba y la voluta cae por la izquierda. Ojo: cuando el usuario dice «invertir verticalmente» quiere decir espejar sobre un eje vertical.
  - Se deshace la inversión horizontal: vuelve `grabados/esq_voluta2.png` (girada 90° en sentido horario y espejada sobre el eje vertical). El brazo largo va arriba y la voluta cae por la derecha. Esta es la versión vigente.
  - Girada después 180° (`grabados/esq_voluta5.png`): el brazo largo va abajo y la voluta sube por la izquierda, como esquina inferior izquierda. Esta es la versión vigente.

- **Tracks (15 nov 2026), rehechos a lo «Incomplete Manifesto»** (`.design-refs/reticula y composicion/981bf…jpg`): columnas separadas por un filete vertical en ciruela. Cada columna lleva el nombre de la empresa en una etiqueta Xanh Mono sobre ciruela, el numeral enorme «01.» en Ibarra, estirado en vertical (más alto y estrecho, `scaleY(1.7)`) con el logo a su derecha dentro de un cuadro con filete (tan alto como el numeral, logo centrado y entintado en ciruela con máscara CSS), el título en versal Ibarra 700 entre dos filetes, y la descripción en Xanh Mono de 15 px. Todo en ciruela, y el texto en tinta. Junto al titular de la sección va un filete con tres líneas en mono. En escritorio, la franja se queda fija y las seis columnas (tres por pantalla) pasan en horizontal al hacer scroll normal (`translateX` ligado a `view-timeline`). Ya entran desplazándose: mientras la franja sube desde abajo, las columnas llegan desde la derecha (`translate` de 45cqi a 0 en el rango `entry`) y, una vez fija, siguen con `transform` en el rango `contain`. Antes subían en vertical, como un scroll normal, hasta quedarse fijas. En móvil, o sin soporte, se desplazan con el dedo, con scroll-snap. Se quitan la viñeta del encabezado y la voluta de cada fila.

## Gran premio (15 nov 2026)

- Moneda de Carlos III (`public/coin.svg` + `public/charlie.svg`) recoloreada en **dorado** encima de la corona de laurel. Excepción pedida a la paleta, solo para el premio: oro `#c99a2e`, oro claro `#f6e3a0`, oro oscuro `#8a6420`, sombra `#4a2e0c`.
- Primera versión (rayos de gloria girando, brillo que recorre la moneda, cifra con degradado dorado, giro 3D al entrar, contador): **rechazada por parecer hecha con IA**. Nada de rayos, destellos, degradados de oro, sombras, giros ni contadores.
- Segunda versión con ficha de tres casillas debajo (Para · Decide · Entrega): rechazada, no gustó.
- Versión actual: damasco plum-deep y oro plano (`#c99a2e`). Se lee como una frase: «Como gran premio final,» · corona con la moneda · «1250 €» · «al mejor proyecto…». La cifra cuenta de 0 a 1250 € una sola vez al entrar en pantalla y se queda fija (no va ligada al scroll ni se escala); es el único movimiento. Las cuatro cifras de la banda oscura hacen lo mismo: cuentan una vez al aparecer y no vuelven a 0 al subir.
- Propuestas en el artboard `Premio.dc.html`, todas sobre papel de lis. Rechazadas: A real cédula, B moneda gigante, C gabinete; descartadas al elegir: D anverso y reverso, F manos de la Creación.
- **Elegida (15 nov 2026): E · cartela rococó.** Grabado real `cartela.png` en ciruela con la moneda de oro dentro (moneda colocada por el usuario: 45,7 % del ancho de la cartela, centro en 44,8 % / 43,3 %). A la derecha «Gran premio final» en Cinzel grande (26 px), «1250 €» enorme en ciruela con la cuenta de 0 al aparecer, y la frase bajo un filete. Fondo: papel de lis. Ya está en V3; en móvil se apila. La moneda va en oro viejo (menos saturado: canto #B9933F, campo #E3CB8A, sombra #3F2C16) porque el oro brillante se veía artificial.
- Animación del premio (una sola vez al llegar, no se deshace al subir): la cartela se entinta de abajo arriba, la moneda cae y se asienta con un ligero rebote, el laurel se abre desde el centro, el número carga de 0 a 1250 € y entra la frase. Chispa interactiva: al pasar el ratón o pulsar, la moneda se da la vuelta y enseña el reverso (oro viejo, «Gran premio · 1250 € · MMXXVII»). Sin rayos, brillos ni bucles.
- Corona de laurel recuperada, pequeña y en ciruela, encima de «Gran premio final». Alineada a la izquierda quedaba descolocada; ahora la columna del texto va centrada y el laurel corona el título de forma simétrica. Probado y descartado: laurel al pie de la cartela o en su cresta (se pierde entre el grabado). La animación del premio gustó tal cual.
- Grabados recolocados (15 nov 2026): lechuza de Bewick en el manifiesto («Retos de la industria»); Vitruvio en crema en la cifra «300 hackers»; lechuza volando en ciruela en el FAQ, en espejo y girada -10° para que vuele hacia las preguntas. La lechuza volando ya no está en el hero; está en la agenda y en el FAQ.
- Corona de laurel vectorizada con potrace (`.design-refs/grabados/o_corona.png` → SVG) porque el PNG de 328 px se pixelaba al ampliarlo. El original es pequeño, así que el trazo sale grueso; si hay un escaneo mejor, revectorizar.

- 2026-11-16 · Agenda (temporal, sin pasar al equipo): ambos días con el mismo número de momentos (7+7). Viñetas grabadas de comida: café = desayuno, croissant = merienda, pizza = comida del sábado, balanza = jurado. SVG en `.design-refs/grabados/svg/` (potrace, #2c1425).

- 2026-11-16 · Cifras: la versión de V3 (cuatro pantallas fijas, una cifra gigante por paso) se ve recargada. Propuestas en el artboard `Cifras.dc.html`: A ficha de etiqueta (cuatro casillas con filetes, sobre crema), B una cifra manda (300 enorme y las otras tres pequeñas con filete, banda oscura de una sola pantalla y sin fijar), C índice con puntos guía junto al manifiesto, D frase anotada (las cifras dentro de una frase con su nota en mono debajo). Pendiente de elegir.
- 2026-11-16 · Cifras: gusta la **B** (una cifra manda). Le faltaba el aire rococó / *old money*. Hay tres variantes en el artboard `CifrasB.dc.html` (interactivo, con botón «Repetir»), cada una con un ornamento y una animación sacados de la imprenta, no de las animaciones típicas de una web: B1 lámina (doble filete y cuatro volutas en las esquinas) + numeradora (cada cifra gira como una rueda; las unidades dan más vueltas que las centenas); B2 remate y cul-de-lampe alrededor del 300 + entintado de abajo arriba (de malva a crema) y las cifras pequeñas se estampan como un sello; B3 roleos con pájaros que se salen de la banda, corona de laurel y filete Oxford (grueso y fino) + tipos móviles (cada dígito cae en su sitio, uno tras otro). Grabados nuevos subidos al canvas: `esq_voluta5`, `o_cabecera`, `o_cul2`, `e_esquina` y `o_corona`, teñidos en crema con máscara CSS.
- 2026-11-16 · Cifras: **elegida la B2** (remate y cul-de-lampe alrededor del 300, entintado de abajo arriba y las cifras pequeñas estampadas). La columna derecha (cifra · filete vacío · etiqueta en mono) queda sosa, pero sin recargar el diseño. Tres alternativas en `CifrasB2.dc.html`: R1 florones (tres bloques centrados de cifra y palabra, separados por el mismo cul-de-lampe en pequeño, que rima con la izquierda), R2 tabla de tres (columnas con filete, «Nº II–IV» en Cinzel, filete Oxford arriba y abajo) y R3 frase («Durante 2 días, con 6 tracks…», con las cifras en el mismo tono y estampadas). Pendiente de elegir.
- 2026-11-16 · Cifras: **B2-R1 pasada a V3**. Sustituye a las cuatro pantallas fijas: una banda oscura de lis de una pantalla, sin fijar. Se enciende una sola vez al entrar (`view()` + cerrojo de 99999 s). Sin soporte o con movimiento reducido, se ve el estado final. Los prototipos (`Cifras`, `CifrasB`, `CifrasB2`) quedan apartados en una fila de exploraciones bajo V3.
- 2026-11-16 · Cifras: **no gustan las viñetas** del remate y del cul-de-lampe (`o_cabecera`, `o_cul2`, de «The Five Little Pigs» y de W. G. Stables). Se prueban florones de encuadernación (Commons, DP, láminas de «Art of Bookbinding») en el artboard `Florones.dc.html`: F1 Derome (rococó, s. XVIII), F2 Grolier (con trama de líneas) y F3 Venecia (macizos). Recortes en `.design-refs/pd/florones/` (fuente en `CREDITOS.txt`). Pendiente de elegir; después se cambia en V3.
- 2026-11-16 · Cifras: **elegidos los florones venecianos (F3)** y pasados a V3: ramo (`v_ramas`) sobre el 300, acanto (`v_acanto`) debajo y florón pequeño (`v_mini`) entre las cifras de la derecha. El segundo florón de la derecha va girado 180°, así que los dos se miran.

- 2026-11-16 · Guía de estilo (`Estilo.dc.html`, revisión 06): reescrita para recoger solo lo que usa V3. Queda: I tinta y papel (con el oro viejo de la moneda como única excepción) · II tipos (Xanh Mono también en formularios) · III grabados en uso (esquinera de roleos, cartela con moneda, corona de laurel, florones venecianos, lechuza en vuelo, skyline y las doce viñetas de la agenda) · IV componentes · V movimiento · VI lo que no hacemos · créditos. Se eliminan por no usarse: Minerva, manos, Vitruvio, lechuzas de Bewick y Aldrovandi, libros y globo, nautilus, marcos y cabeceras, referencias vectorizadas sin licencia (IV·d), notas de ingeniero (llamadas y cota) y sellos. Siguen en `.design-refs/` por si vuelven. Pendiente: fuente y licencia de la moneda y la corona de laurel.

- 2026-11-16 · `.design-refs/grabados/` reorganizada por uso en carpetas (`protagonistas`, `cartelas-y-marcos`, `esquinas-y-roleos`, `vinetas`, `remates-y-florones`, `tramas-lis`, `signos`, `svg`) con un `LEEME.md` que traduce las rutas antiguas citadas en este registro. Nuevo: familia de **signos de imprenta** (manecilla ☞ ☜, hedera ❦, asterismo ⁂, «***», pilcrow, obelo, doble obelo, sección) como SVG en `grabados/signos/`. Pendiente: decidir con el equipo dónde se usan (manecilla = acción; resto, viñetas de lista, marcadores de FAQ y notas) y si se sustituyen ☞ y ❦ por escaneos de época.

- 2026-11-16 · Guía de estilo (`Estilo.dc.html`, revisión 07): nueva lámina **IV · Signos de imprenta** (manecilla ☞ ☜, hedera ❦, asterismo ⁂, «***», asterisco, pilcrow, obelo, doble obelo, sección) con ejemplos de uso (viñetas de lista, llamada a la acción con manecilla, notas al pie, separadores). Se renumeran Componentes (V), Movimiento (VI) y Lo que no hacemos (VII). Los SVG están subidos al canvas. Sin cambios en V3: los signos aún son propuesta.

## Preferencias temporales (18 nov 2026) · por confirmar con el equipo

Recogidas de la conversación; no son decisiones cerradas. Cuando se elija lo que se queda, se pasan a V3, a la guía de estilo y a `DESIGN.md`.

- **Dirección de composición:** gusta el «Incomplete Manifesto» (con su letra elegante), el cartel de Torino y el estilo suizo en cómo coloca las cosas, **pero sin Helvética** ni nada que choque con la identidad de Carlos III. Se prefiere **quiet luxury** al suizo puro. Lo que falla hoy es la orquestación: colocación, retícula y jerarquía.
- **Búsqueda de referencias:** solo en Pinterest (las webs de galerías no convencen). Término que funcionó: `editorial poster grid serif mono`. Las referencias elegidas están en `.design-refs/composicion-espacio/` (favorita: «The Misty», `esteme gustamucho.jpg`). Lo que gusta de ellas: **la diferencia de importancia por tamaño**.
- **Cifras y gran premio:** las cifras actuales de V3 siguen sin convencer. Se quiere escala extrema y «grito». Artboards: `Suizo` (rechazado en la parte de rejilla), `Composicion`, `Escala` (se ve poco épico) y **`Epico`** (cifras gigantes, letra gruesa, color de la paleta como fondo; cartela con moneda solapada al «1250 €»). `Epico` **rechazado (18 nov 2026)**: letra gruesa y bloques de color (malva, azul) desencajan con el resto, pierde el quiet luxury y la elegancia. Se mantiene la escala, que es lo que daba fuerza, pero con la letra fina de siempre y el papel de siempre: nuevo artboard **`Elegante`** (catálogo centrado, lista numerada, damasco y gran premio con cartela), con animación suave de entrada.
- **Retícula y filetes:** **no gustan** las rayas ni la retícula visible. Las composiciones se organizan por escala, vacío y color, sin líneas.
- **Grabados:** se **reducen a viñetas pequeñas**. Se queda la **cartela del premio**, y las esquineras tipo Torino (ramas con aves) se quieren buscar, no dibujar. Lo grande es la cifra, no el grabado.
- **Estilo:** se acepta que el rococó (ornamentado) y el minimalismo son un oxímoron; el equilibrio es pocos ornamentos de época bien situados, con el resto muy contenido.
- **Animación:** se cree que le falta movimiento al scroll y a la aparición. En `Epico` se prueba: cada banda se enciende una vez al entrar (el número sube entintado y se asienta; «300» y «1250» cuentan desde 0; la frase entra detrás; la cartela se entinta y la moneda cae). Solo CSS de scroll, con cerrojo para que no se deshaga al subir, y sin movimiento reducido todo aparece ya en su sitio. Pendiente de verlo en el canvas con Play.
- **Material del evento (credenciales, lanyard, roll-up, cheques, señalética, cartelería):** se hizo una V1 en la guía de estilo y se **deshizo** (el resultado no gustó). Se retomará más adelante en un artboard propio, no en la guía.
- **Guía de estilo:** se añadieron en la rev. 08 los bloques «Por qué» (qué elegimos, por qué y qué aporta a la imagen), el glosario de grabado y viñeta, los 5 grabados con más impacto y un moodboard con Social Impact Capital como referencia principal (más Intrie, la web de boda, Torino, Incomplete Manifesto, Dearboleda y el bloque del rococó). Los signos de imprenta se aplicaron a V3 (manecilla ☞ en «Preinscribirme», hedera ❦ al cerrar cada día de la agenda, pilcrow ¶ en las FAQ).

- **Cifras, elección temporal (18 nov 2026):** de `Mosaico` y `Zigzag` se elige el **zigzag en damasco** (`Zigzag.dc.html`, variante B), con una cuadrícula por fila para que las cifras ocupen su celda sin huecos. «300» y «2.500 €» pesan lo mismo (300 px) y «6 tracks» y «2 días» van en segundo plano; los textos en mono de 12 px; imágenes de contexto como placeholder, a rellenar. En la fila 3 el texto de los tracks va a la izquierda del todo (texto, imagen, «6»), y «2», su texto y su imagen a continuación, para que no se confunda con el de los días. Aún por confirmar con el equipo y por pasar a V3.

- **Carteles (18 nov 2026):** los carteles v1 (`Carteles`: escalonado, cuadrícula con titular cortado, imagen enorme) se descartan: «sosos», la letra no destaca y el fondo no llama la atención. Se archivan. Nueva idea: **para la web, una sola línea; para cartelería, más fondos, tramas y formatos de titular**. Añadido a la guía de estilo (rev. 09, lámina VII · Cartelería): ocho fondos (damasco de lis, lis malva, lis de línea, malva con puntos, rayas de damasco, rayado fino, damasco liso, crema) y seis formatos de titular (tres tamaños con doble impresión, cinta inclinada, relleno y contorno, versal espaciado, cortado por la cuadrícula, etiqueta de diccionario). Carteles v2 (`CartelesV2`): 1 damasco, 2 malva con cinta, 3 crema con rayas, 4 para empresas. **Los carteles también se enseñan en las empresas**: el cuarto capta empresas para un track (contacto `aisc.asoc@uc3m.es`, beneficios como placeholders).
- **Lechuza (18 nov 2026):** se quita la lechuza en vuelo de todos los artboards (guía, V3 y exploraciones). Ya no se usa.
- **Canvas (18 nov 2026):** el canvas tiene dos hojas: **Principal** (guía, wireframes, V3, Zigzag y Carteles v2) y **Archivo · lo descartado** (rondas de cifras, Suizo, Composición, Escala, Épico, Elegante, Descolocado, Mosaico y Carteles v1), con una nota que resume por qué se descartó cada una.

- 2026-11-18 · **Tipografía secundaria: Libre Baskerville sustituye a Xanh Mono** en anotaciones, etiquetas, créditos, pies, campos de formulario y texto pequeño. No convencía la mono para todo; se buscó una serifa de lujo discreto («old money») que se lea bien pequeña. Artboard `Tipografia.dc.html` con ocho candidatas (Sorts Mill Goudy, Libre Caslon, Old Standard TT, EB Garamond, Libre Baskerville, Bodoni Moda, Instrument Serif y la mono actual) y doce iniciales ornamentales (Cinzel Decorative, Bodoni y Playfair en cursiva, Pinyon, Imperial, Petit Formal, Monsieur La Doulaise…). **Xanh Mono se queda solo para el contador** (y cifras grandes, si las hay). Las versiones con Xanh Mono de V3, Acreditaciones, Zigzag, Carteles v3 y v4 y Estilo pasan a la hoja «Archivo» (`*Xanh.dc.html`). Pendiente: elegir la mayúscula ornamental («con vuelta», como Cigra o las cursivas de Bodoni); Cigra no está en Google Fonts y habría que revisar su licencia. Pendiente pasar a `DESIGN.md` y `app/globals.css`.

- 2026-11-18 · **Signos de imprenta fuera, salvo la manecilla (☞ ☜).** Hedera, asterismo, tres asteriscos, asterisco, pilcrow, obelo, doble obelo y sección se eliminan: son iconos que no aportan, porque hoy casi nadie sabe interpretarlos. La manecilla se queda porque señala y se entiende sola. En V3 se quitan las hederas al cierre de cada día y el pilcrow de las preguntas; en Carteles v3 el asterismo bajo el titular de la «Real cédula»; en la guía, la lámina IV pasa a ser solo la manecilla. Siguen en `.design-refs/` por si vuelven.

- 2026-11-18 · **Libre Baskerville siempre en cursiva** (anotaciones, etiquetas, créditos, pies y campos). Solo se carga la cursiva (`ital@1`); el contador sigue en Xanh Mono, derecho. Aplicado en V3, Acreditaciones, Zigzag, Carteles v3 y v4 y la guía de estilo.

- **Tramas (18 nov 2026), exploración:** para tener más fondos y detalles sin dibujar nada, artboard `Tramas.dc.html` (hoja Principal, fila de exploraciones) con siete familias sacadas de escaneos reales (DP/CC0), entintadas a una tinta y teñidas con máscara, cada una en versión web (discreta) y cartel (fuerte): I tipos de adorno (sembrado de florón veneciano y frisos de hierros), II papel de guardas (mármol peinado 1720–70 y papel de engrudo), III orla de billete (assignat de 1792; muestra floja, falta un billete del Banco de San Carlos), IV verjurado y filigrana (como papel del hero), V damasco de seda (Cooper Hewitt, s. XVIII), VI cielo de grabado (Piranesi, sustituiría al rayado con CSS de la cartelería) y VII ruedas y cenefas (separadores en lugar de filetes). Reglas propuestas: una trama por banda en la web y de bajo contraste, cada trama con su sitio, nada dibujado con código. Assets en `.design-refs/grabados/tramas/` (créditos en `CREDITOS.txt`). Pendiente de elegir.

- 2026-11-18 · **Tracks: segunda cajita bajo la del nombre de la empresa.** Fondo blanco, filete ciruela de 1 px y texto en ciruela (Libre Baskerville cursiva, 14 px), con una definición de lo que hace la empresa en un máximo de 4 palabras, mejor 3 («Apps para millones», «Comercio y nube»). Los textos son de ejemplo y hay que confirmarlos con cada empresa; el de Kapia está por rellenar.

- 2026-11-18 · **Tracks, cajita de definición (ajuste):** fondo transparente (toma el del fondo de la banda, no blanco), pegada a la del nombre de la empresa sin hueco, y la letra pasa de 14 a 12 px.
- **Acreditaciones y cheques con tramas (18 nov 2026), exploración:** nuevo artboard `AcreditacionesTramas.dc.html`, junto a `Acreditaciones`. Misma estructura; la lis se cambia por una trama por rol (hacker: damasco de seda; mentor: papel de engrudo; organización: sembrado de florones), con un friso o cordón bajo la fecha. Dos reversos: mármol peinado con etiqueta crema y papel verjurado con filigrana. Cheques: el rayado hecho con CSS del marco pasa a damasco de ramos (gran premio) o engrudo (track), con verjurado dentro (y filigrana solo en el gran premio) y el filete de la cabecera cambiado por el cordón de laurel o el friso de tulipas. Pendiente de elegir.

- 2026-11-18 · **Ramas de contenido cerradas: alumni de la UC3M y personajes que dan nombre a los edificios del campus de Leganés.** Se investigaron como posible material de identidad y se descartan. Motivo: ninguna aporta nada reconocible a simple vista ni dibujable (los alumni son fundadores de startups y cargos sin imagen asociada; los nombres de los edificios no dicen nada rápido a quien no los conoce). Criterio para futuras ideas de identidad: debe poder reconocerse visualmente de un vistazo. Como mucho, una frase suelta de contexto («de aquí salieron Graphext, Capchase o Ienai Space») en patrocinadores, nunca una sección.

- 2026-11-18 · **Idea pendiente de decidir: las obras de Carlos III en Madrid como material visual** (Puerta de Alcalá, Cibeles, Paseo del Prado, Jardín Botánico, Observatorio). Se reconocen sin explicación y encajan con «Carlos III, la Ilustración y el siglo XVIII». Condición: solo grabados reales de dominio público o CC0, con fuente y licencia en los créditos. Enlace posible con el campus: el edificio Sabatini lleva el nombre del arquitecto de Carlos III (autor de la Puerta de Alcalá); **por verificar antes de publicarlo**. Sin artboard todavía.

- 2026-11-19 · **Pie de V3: logos y redes reales.** «Organizan» pasa a «Colaboradores» y cambia los placeholders por a los logos de AISC (lockup negro) y de la UC3M (acrónimo y nombre, Wikimedia Commons, CC BY-SA 4.0), con sus colores originales, sin teñir (19 nov, a petición), y enlazados a aiscmadrid.com y uc3m.es. Redes: solo Instagram (`@aisc_madrid`) y LinkedIn (AI Student Collective Madrid) de AISC, con los iconos de Simple Icons (CC0); **X/Twitter se quita de momento**.

- 2026-11-19 · **Imagen del manifiesto: el globo de Aranjuez.** Antonio Carnicero, *Ascensión de un globo Montgolfier en Aranjuez* (1784, Museo del Prado), dominio público vía Wikimedia Commons. Encaja con Carlos III y la Ilustración, y el globo es «una idea que funciona». Artboard `Globo.dc.html` (hoja Principal, fila de exploraciones) con cuatro tratamientos: A color recortado en cuadrado, B blanco y negro, C tinta `#2c1425` sobre papel `#f3f0df`, D cuadro entero apaisado a todo el ancho. En V3 va la **C (tinta)** de forma provisional, por coherencia con los grabados entintados. Pendiente de elegir.

- 2026-11-19 · **Cifras vuelven a ir con scroll (provisional, diseño pendiente).** Sustituye a la banda B2-R1 en V3. La banda oscura se queda fija ocupando el 70 % de abajo de la pantalla (deja ver arriba el final del manifiesto) y, al hacer scroll, la cifra cambia de una en una como en la versión del 15 nov (fundido y escala 0,96 → 1, cada medio alto de pantalla). Cada paso lleva la cifra y una frase que la explica: 300 hackers, 2 días, 6 tracks, 2.500 € en premios; las frases son placeholders entre corchetes. Sin cuenta desde 0 y sin grabados hasta decidir el diseño. Solo CSS de scroll; en móvil, sin soporte o con movimiento reducido, las cuatro se apilan. B2-R1 sigue en `CifrasB2.dc.html`.

- 2026-11-19 · **Cifras: sin JavaScript.** Se planteó bloquear el scroll de la página mientras pasan las cifras (banda pegada abajo al bajar y arriba al subir, sin que se mueva lo demás). Se descarta: necesita JS y se pelea con la inercia del trackpad, el móvil y el teclado. Se queda la versión solo con CSS: banda fija en el 70 % de abajo, aunque lo de arriba siga moviéndose. Alternativa CSS disponible si molesta: banda a pantalla completa.

- 2026-11-19 · **Cifras: cuentan al aparecer, como el gran premio.** Cada cifra carga de 0 a su valor (1,2 s) cuando su paso llega, con el mismo cerrojo de 99999 s del premio, así que no se deshace al subir. «2.500 €» pasa a «2500 €» (sin punto, igual que el «1250 €» del premio) porque el contador de CSS no pone separador de miles.

- 2026-11-19 · **El efecto del manifiesto pasa a más titulares.** «Dos días, de principio a fin.» (agenda), «¿Tu empresa quiere un track?» y «Preguntas frecuentes»: cada palabra pasa de malva a tinta al hacer scroll, igual que el manifiesto. Solo CSS; sin soporte o con movimiento reducido se ven en tinta.

- 2026-11-19 · **Pie de foto del globo:** «Carnicero, 1784 · Aranjuez, tras el globo de Agustín de Betancourt», en una línea, en minúscula (sin el versal de `.lab`). Betancourt no participó en el vuelo de Aranjuez: el globo del cuadro es el del francés Bouclé (junio de 1784), y en 1784 Betancourt se fue a París. Lo suyo fue el 29 de noviembre de 1783, en la Casa de Campo del infante don Gabriel, ante la Corte (DBE de la RAH). Se dice «uno de los primeros» porque la primacía se discute con la prueba de Viera y Clavijo del 15 de diciembre de 1783. Arreglado de paso: la cuenta de las cifras encogía los números (la regla de la unidad, `.num span`, alcanzaba al contador).

- 2026-11-19 · **FAQ: grabado de la Puerta de Alcalá** en el hueco de imagen. *Vista de la Puerta de Alcalá*, dibujo de José Gómez de Navia y grabado de Esteban Boix (ca. 1770), Museo de Historia de Madrid, Inv. 1904, vía Memoria de Madrid (dominio público). Sin marco ni leyenda, entintado en `#2c1425` sobre transparente y recortado en cuadrado sobre la puerta. El original descargable es pequeño (600 × 422 px): a 300 px se ve bien; para tamaños grandes habría que buscar una copia mayor o vectorizar. Créditos en `.design-refs/grabados/protagonistas/puerta-alcala-CREDITOS.txt`.
  Pie: «Puerta de Alcalá · Francesco Sabatini, 1778» (Sabatini la terminó en 1778; también se le cita como Francisco Sabatini).

- 2026-11-20 · **Guía de estilo, revisión 10, alineada con la V3 actual.** Nuevo bloque «Estado» bajo los principios (decidido · provisional · pendiente). Tipos: Libre Baskerville siempre en cursiva y Xanh Mono solo en el contador (fila propia); las cifras grandes van en Ibarra; nuevo paso «Pie de imagen». Papeles: la lis de línea solo en el premio, el damasco en cifras e inscripción y la lis malva sin uso en V3. Grabados: fuera los florones venecianos (ya no están en V3; quedan para cartelería y tramas) y entran las **láminas de época** (globo de Aranjuez, tratamiento C provisional, y Puerta de Alcalá), con reglas de lámina, pie de una línea y logos ajenos sin teñir. Componentes: paso de la banda de cifras, lámina con pie y pie de página (Colaboradores y redes). Movimiento: cuenta de 1,2 s con cerrojo, efecto malva → tinta también en agenda, empresas y FAQ, banda fija al 70 % y sin JS de scroll. «Lo que no hacemos» suma signos de imprenta ilegibles, JS para el scroll, pies largos o en versal y teñir logos ajenos. Créditos: globo, Puerta de Alcalá, logo de la UC3M (CC BY-SA 4.0) y Simple Icons (CC0).

- 2026-11-20 · **Guía de estilo: fuera la lámina «Cartelería», entran las «Tramas».** La lámina VII ya no enseña los ocho fondos ni los seis formatos de titular de cartel; ahora recoge las siete familias del artboard `Tramas.dc.html` (tipos de adorno, papel de guardas, orla de billete, verjurado y filigrana, damasco de seda, cielo de grabado, ruedas y cenefas). Cada familia aparece en dosis web y cartel, con fuente, uso y avisos, más sus tres reglas y un bloque «Por qué». Las tramas siguen por elegir: en V3 solo está la lis. Créditos de las tramas añadidos.

- 2026-11-20 · **Exploración: microanimaciones de los componentes** (artboard `Microanimaciones.dc.html`, interactivo, fila de exploraciones de la hoja Principal). Quince propuestas en cinco grupos, cada una con duración, curva y porqué: pulsar (botón principal con manecilla que avanza, secundario que se entinta con clip-path, enlace, copiar correo con fundido y desenfoque), formularios (filete del campo que se traza, casilla que se estampa, envío con sello «Preinscrito»), contenido (FAQ, viñetas de agenda, track, cinta de logos que se para al pasar el ratón), cabecera y avisos (entrar 240 ms y salir 200 ms; aviso que sube desde abajo) y cifras y premio (contador como numeradora, cuenta de 0 a n, moneda y lámina que se descubre de arriba abajo). Reglas: menos de 300 ms salvo lo que se ve una vez, ease-out fuerte, ease-in-out para mover en pantalla, hover solo con ratón y «reducir movimiento» sin desplazamientos. Pendiente de elegir.

- 2026-11-20 · **Microanimaciones pasadas a V3.** Del artboard `Microanimaciones.dc.html`:
  - El botón secundario se entinta con clip-path (220 ms) y el subrayado de los enlaces se rellena de ciruela (240 ms).
  - Al enfocar el campo del correo se traza su filete ciruela; la casilla de privacidad pasa a ser propia y se marca como un sello.
  - Al enviar, el botón dice «Te avisaremos», cae el sello «Preinscrito» y sube un aviso desde abajo durante 3 s. El correo y la casilla pasan a ser obligatorios.
  - La respuesta de las FAQ aparece bajando 6 px; las viñetas de la agenda se levantan con el ratón; en los tracks se traza un filete sobre el numeral.
  - La cabecera entra en 240 ms y se va en 200 ms; el contador cambia solo el dígito que cambia, como una numeradora.
  - La moneda gira en 520 ms con ease-in-out.
  - El globo y la Puerta de Alcalá se descubren de arriba abajo una sola vez (900 ms, con cerrojo).
  - Los hover solo se activan con ratón. Con «reducir movimiento» se quitan los desplazamientos.
  - Nota técnica: la raíz de V3 es `container-type`, así que `position: fixed` no se ancla a la pantalla. El aviso va dentro de un `sticky` de alto 0 al final de la página.
  - No se pasa «copiar el correo»: el enlace del pie sigue siendo mailto.

- 2026-11-20 · **Pie menos soso: colofón.**
  - Como al final de un libro, el pie empieza con un remate de acanto real en ciruela (florón veneciano de «Art of Bookbinding», DP).
  - El remate se entinta de abajo arriba una sola vez al llegar, con el mismo cerrojo que las láminas.
  - Debajo va una línea de imprenta: «HackUC3M ’27 · Compuesto en Ibarra Real Nova · Leganés, MMXXVII».
  - Abajo a la derecha, «Volver arriba» con la manecilla girada hacia arriba, que sube 4 px al pasar el ratón.
  - Los iconos de Instagram y LinkedIn pasan de tinta a ciruela al pasar el ratón.
- 2026-11-20 · **Colofón del pie: descartado.**
  - No aportaba y rompía el quiet luxury. Lo que se buscaba eran detalles en los extremos.
  - En su lugar, las esquineras de roleos del hero (Van Hulsen) se repiten en las dos esquinas de abajo del pie, en espejo y a 120 px: la página se cierra con el mismo grabado que la abre.
  - En móvil no se muestran.
  - Se mantienen «Volver arriba» con la manecilla y el cambio de color de los iconos de las redes.
- 2026-11-20 · **Pie: fuera las esquineras de abajo** (no gustaron).
- 2026-11-20 · **Pie: propuestas de trama con un gesto al final del scroll** (artboard `Pie.dc.html`).
  - **A · Cenefa que se traza:** un cordón de laurel de rueda sustituye al filete superior y se traza de izquierda a derecha.
  - **B · Filigrana a contraluz:** el pie va en papel verjurado al 6 % y a la derecha asoma la marca de agua.
  - **C · Sembrado que sube:** el pie pasa a surface y el sembrado de florón sube desde abajo.
  - En V3, el gesto se dispararía una sola vez cuando el pie entra en pantalla, solo con CSS.
  - Pendiente de elegir.
- 2026-11-20 · **Pie elegido: B · filigrana a contraluz, pasada a V3.**
  - El pie va en papel verjurado al 6 %.
  - A la derecha, la filigrana (ciruela al 14 %) asoma una sola vez al entrar el pie en pantalla, en 1,2 s, con el cerrojo de siempre. Sin soporte del navegador o con movimiento reducido se ve ya puesta.
  - La línea de créditos («Grabados de dominio público y CC0 · …») pasa a minúscula, sin el versal de `.lab`: en ese contexto no convencía.
- 2026-11-20 · **Todas las cifras y números en Xanh Mono.**
  - Cambia en V3 la banda de cifras, el 1250 € del premio y el del reverso de la moneda, los numerales de los tracks («01.») y las horas de la agenda. El contador ya iba en Xanh Mono.
  - La palabra que acompaña a la cifra («hackers», «en premios») sigue en Ibarra. Las fechas dentro de una frase y los números romanos, no.
  - Recogido en la guía de estilo: estado, lámina II · Tipos (fila «Cifras y números»), escala, bloque «Por qué», componente de cifra y «Lo que no hacemos».

### 2026-11-20 · Filetes que se trazan al aparecer

- Todos los filetes, separadores y divisores de V3 se trazan una sola vez al entrar en pantalla, con el mismo gesto que el subrayado de los enlaces del pie (que gustó por lo bien que encaja con una página llena de líneas): horizontales de izquierda a derecha, verticales de arriba abajo, 0,9 s con ease-in-out y los de una serie (momentos de la agenda, columnas de tracks, preguntas) en cascada de 70 ms.
- Afecta a: banda de empresas, premio, títulos de día y momentos de la agenda, columnas de tracks, FAQ y pie. El borde original queda transparente, así que nada se mueve; sin soporte de CSS de scroll o con «reducir movimiento», las líneas se ven ya dibujadas.
- Añadido como regla de movimiento en la guía de estilo (Estilo, lámina VI).

### 2026-11-20 · Nueva esquinera: colibrí y abeja

- Las esquinas de la cabecera dejan los roleos con pájaros de Van Hulsen y pasan a una esquinera del s. XIX de hiedra con colibrí y abeja (la izquierda tal cual y la derecha en espejo), entintada en ciruela. Archivo: `.design-refs/grabados/esquinas-y-roleos/esq_colibri.png`.
- Pendiente: la imagen viene de las referencias de ambiente y no tiene fuente registrada. Antes de llevarla a producción hay que localizar el original y confirmar que es de dominio público.
- Actualizado en la guía de estilo (pieza 2 del top 4).

### 2026-11-20 · Entrada de la cabecera y tamaño de la esquinera

- La esquinera del colibrí pasa a `clamp(110px, 17cqi, 270px)`, pegada al borde (1cqi). Es el máximo que admite sin que la abeja toque la «H» ni el «’27» (comprobado a 1440 y 1024 px). A 360 px chocaba.
- Entrada al abrir la página, una sola vez: las esquineras se descubren desde su vértice (clip-path, 1,4 s) y la fecha, el título, la entradilla, los botones, el skyline y el reloj suben 14 px y aparecen en cascada (700 ms, de 0,15 a 0,8 s). Solo opacidad, translate y clip-path; el wordmark conserva su animación de scroll. Con «reducir movimiento», todo aparece ya en su sitio.

### 2026-11-20 · Vuelve la esquinera de roleos

- Se descarta la esquinera del colibrí: vuelven los roleos con pájaros de Van Hulsen a su tamaño anterior (máx. 220 px, porque el asset solo mide 209 px). Se mantiene la animación de entrada; ahora las esquinas se descubren desde su vértice exterior. `esq_colibri.png` se queda en `.design-refs` por si se recupera, con la licencia aún sin confirmar.

### 2026-11-20 · Esquineras de Van Hulsen sin cortes (exploración)

- La esquinera actual es un recorte recto de 209 px y deja roleos cortados en el borde. Nuevo artboard `Esquinas.dc.html` con tres recortes de la lámina original a 3840 px (Esaias van Hulsen, «Bladranken met bloemen en vogels», 1616, Rijksmuseum RP-P-1890-A-15384, CC0). Están hechos a mano siguiendo los tallos para que cada pájaro, flor y roleo quede entero:
  - A · Espiral y golondrina: vertical.
  - B · Espiral: sin la golondrina, más compacta.
  - C · Pájaro en la rama: horizontal, los dos pájaros se miran.
- Quitar automáticamente todo lo que toca el borde no sirve: la lámina está unida por los tallos y se lleva la rama entera.
- Para no pisar el titular, a 1440 px caben entre 160 y 180 px de ancho.
- Archivos en `.design-refs/grabados/esquinas-y-roleos/esq_hulsen_{A,B,D}.png`. El script del recorte está en `pd/src_esq/hulsen/poli.sh`.

### 2026-11-20 · Esquineras de Van Hulsen con forma de esquina (exploración, segunda ronda)

- La primera ronda (espiral, espiral con golondrina, pájaro en la rama) se rechaza: no tenía forma de esquina, las piezas eran pequeñas y el pájaro en la rama no gustó.
- Nueva ronda en `Esquinas.dc.html`, sacada de la lámina original a 3840 px. Se siguen los dos bordes de las esquinas superiores de la lámina para que cada pieza tenga forma de L, recortada a mano por los tallos:
  - A · Esquina derecha: arriba, el pájaro en la rama, la flor y la espiral; por el lado, el pájaro colgado y la golondrina.
  - B · Esquina derecha larga: la A más el pájaro posado sobre su roleo.
  - C · Esquina izquierda: el dragón alado arriba y la garza sobre el ramo por el lado.
- En las maquetas van a 340–380 px y el titular baja 66 px (padding superior de 130 px) para quedar dentro del marco.
- Archivos: `.design-refs/grabados/esquinas-y-roleos/esq_hulsen_L1/L2/L3.png`.

### 2026-11-20 · Elegida la esquinera B y V3 en móvil

- Se elige la **B · Esquina derecha larga**: la esquina superior derecha de la lámina de Van Hulsen más el pájaro posado. Va en V3 a `clamp(150px, 26.4cqi, 380px)`, la izquierda en espejo, y la cabecera tiene más aire arriba (`padding-top: clamp(64px, 9cqi, 130px)`) para que el titular quede dentro del marco. Se mantiene la animación de entrada.
- **Móvil:** nuevo artboard `V3Movil.dc.html` (390 px) que importa V3, así que hay un solo código y responde por ancho (container queries). Arreglos en V3 para ≤600 px:
  - Cabecera: esquineras al 30 % del ancho, padding superior de 104 px y titular a 11cqi para que quepa en una línea. Se quita el filete vertical entre reloj y fecha.
  - Manifiesto: tenía `padding: 140px 0`, que anulaba el margen lateral del contenedor; ahora es `padding-block`. Texto grande a 9,6cqi y pies de lámina que pueden partirse.
  - El resto (cifras apiladas, tracks en carrusel, premio, agenda en dos columnas, formulario, FAQ y pie) ya funcionaba.

### 2026-11-22 · Cabecera: apartados de la barra superior (exploración)

- No convence cómo se ven los apartados de la barra. Van en Libre Baskerville cursiva de 13 px en versal, la letra de las notas, así que se leen como un pie de foto; falta Empresas, y el botón en hueco se pierde entre las esquineras.
- Nuevo artboard `Cabecera.dc.html` con la actual y cuatro propuestas sobre el arranque real de la cabecera:
  - A · Índice numerado: versalitas de Ibarra con números romanos en Cinzel ciruela, doble filete y botón lleno.
  - B · Cabecera de libro: fecha y lugar a la izquierda; apartados en cursiva con puntos y la preinscripción como texto con manecilla, sin cajas.
  - C · Marca a la izquierda: sello y nombre a la izquierda, apartados en Ibarra y botón lleno a la derecha.
  - D · Simétrica: sello en el centro, más grande, con dos apartados a cada lado en Cinzel espaciada y doble filete.
- En todas, el filete se traza al pasar el ratón, como en los enlaces del pie. Se añade «Empresas» y «FAQ» pasa a «Preguntas».
- 2026-11-22 · **Elegida la C (marca a la izquierda), con un cambio.** Arriba solo va el isotipo, sin el nombre. Cuando el titular sale de pantalla, «HackUC3M’27» aparece a su lado como logotipo; antes sustituía al isotipo, ahora lo acompaña. A la derecha van los apartados en Ibarra 18 px (Tracks, Agenda, Empresas, Preguntas), con el filete que se traza al pasar el ratón, y el botón lleno con manecilla. En móvil se ocultan los apartados, como antes, y también la manecilla del botón; el nombre baja a 17 px para que quepa junto al botón. Añadido como componente en la guía de estilo (lámina V).

### 2026-11-22 · Microanimaciones, segunda vuelta

- **Barra superior:** no se esconde al bajar hasta dejar atrás el manifiesto. Antes se escondía a los 120 px, justo cuando aparecía el nombre junto al isotipo, y no se veía.
- **Formulario:**
  - El error deja de ser el globo del navegador (`novalidate`). El filete del correo, o la casilla, pasa a ciruela, se sacude 3 px y aparece una línea en cursiva: «Escribe tu correo», «Revisa el correo…» o «Marca la casilla…». Se borra al escribir.
  - Se corrige un fallo que venía de antes: el runtime ignora `onsubmit="return false"`, así que un envío correcto recargaba la página y se perdían el sello y el aviso. Ahora el botón cancela el envío.
- **Tiempos del sistema:** pasan de unas diez duraciones a tres tokens: `--t-fast` 200 ms (ratón y pulsación), `--t-mid` 450 ms (aviso, preguntas, moneda, error) y `--t-slow` 900 ms (láminas, filetes, esquineras, entrada). Y dos curvas: `--ease-out` y `--ease-io`. Los bucles y los contadores van aparte. Regla añadida a la guía de estilo (lámina VI).
- **Primera pantalla:** los segundos del reloj cambian sin efecto, solo animan minutos y horas. La entrada en cascada se comprime: de 0,1 a 0,5 s.
- **Premio:** la coreografía pasa de ~2,9 s a ~1,7 s; la frase final entra a 1,25 s en lugar de 2,4 s.
- **Móvil:**
  - Lo que responde al pasar el ratón responde al tocar (`:active`).
  - Las cifras apiladas cuentan de 0 a su valor al aparecer.
- **Preguntas:** también se cierran con animación (`::details-content`, Chrome 131+; en el resto, cierre instantáneo).
- **Tracks:** un filete ciruela bajo el carril marca cuánto queda. En escritorio sigue al scroll; en móvil, al carrusel.

### 2026-11-22 · Cabecera: primera impresión premium (exploración)

- La cabecera se ve algo vacía. Se descartan las ideas de rellenar con contenido (portada de libro, ficha técnica, viñeta, sello de lacre, logos de apoyo): la primera impresión tiene que ser premium y de élite, y no hay que repetir lo de otras secciones. El camino es escala, material y profundidad, no más cosas.
- Nuevo artboard `Hero.dc.html`:
  - A · Escala: titular de 204 px que llena el ancho, «’27» cayendo sobre la M, esquineras a 230 px; fecha, entradilla y un solo botón en una línea bajo un filete.
  - B · Gofrado en seco: la moneda del isotipo estampada en el papel sin tinta, con 1,5 px de luz y de sombra. La máscara se ha sacado de los trazos del propio isotipo.
  - C · Profundidad: al hacer scroll, las esquineras suben 90 px, el titular 36 px y el skyline baja 24 px.
  - D · Las tres juntas.
- Asset del gofrado: `/_blob/15fa66751b401acf321883f6261af6eb`.
- 2026-11-22 · **Se juntan las tres en V3, con el titular y la fecha como estaban** (sin la escala de la A). De la A queda la fila final: un filete, la entradilla a la izquierda y un solo botón a la derecha; «Quiero colaborar» sale de la cabecera, porque las empresas ya tienen «Empresas» en la barra. El gofrado de la moneda va detrás del titular (`min(600px, 48cqi)`; en móvil, al 92 % del ancho) y no llega al skyline. Profundidad al salir con el scroll: esquineras −90 px, texto −36 px, gofrado −18 px. El skyline se queda quieto: al bajarlo tapaba la fecha del reloj. Se usa `translate`, que no pisa el espejo de la esquinera ni el encogido del titular. Recogido en la guía de estilo.
- 2026-11-22 · **Arreglos:**
  - **Tiempos rotos desde la versión 316.** Al pasar a tokens, la sustitución automática reescribió la propia definición (`--t-fast:var(--t-fast)`, `--t-slow:var(--t-slow)`), que quedó vacía. Todo lo que usaba esos tiempos dejó de animarse: las láminas del manifiesto y del FAQ aparecían de golpe («popean»), y tampoco iban la entrada de la cabecera, los filetes ni los subrayados. Ahora vuelven a ser 200 y 900 ms.
  - **El titular no encogía con el scroll desde que se añadió la entrada (20 nov):** una regla más específica le pisaba la animación. Corregido.
  - **Profundidad:** no se notaba (10 px tras 400 px de scroll). Ahora va por `exit-crossing`, con esquineras −220 px, texto −90 px y gofrado −40 px: tras 400 px de scroll, unos 79, 32 y 14 px.
- 2026-11-22 · **Esquineras: la entrada «popeaba»** con un recorte rectangular duro (`clip-path`). Ahora la tinta se extiende desde el vértice exterior con borde difuminado de 180 px: una máscara radial cuyo radio (`--r`, propiedad registrada) crece de 0 a 760 px en 1,3 s. Animar `mask-size` dejaba bordes rectos a mitad del revelado. La imagen se pide con `fetchpriority="high"` para que no llegue tarde.

## 22 nov 2026 · Auditorio: tono por cara

- El usuario vio el grabado del auditorio «falso monótono» en los tres bloques grandes de la izquierda: todas las hiladas iguales y homogéneas. Referencia: la foto del auditorio desde la plaza.
- Ahora cada cara tiene su tono y un degradado dentro:
  - Frontal (la de «uc3m»): iluminada, más abierta arriba y más cerrada junto al voladizo.
  - Lateral: en sombra, con línea más gruesa y oscureciéndose hacia abajo.
  - Torre: la más clara.
  - Bajo el voladizo: trama cruzada solo hacia el fondo, deshecha hacia delante.
- Algunas hiladas se cortan en ladrillos para que no parezcan rectas de regla.
- Descartado: cruzar la cara lateral (formaba una rejilla mecánica) y cortar muchas juntas (parecían líneas discontinuas).
- Detalle técnico en `.design-refs/campus-original/GRABADO.md`. En el canvas, `/_blob/2e734c37ab40e6e220ec257aefcebeb3` (V3 y Main).
- Mismo día: el usuario pidió quitar las rayas extra que oscurecían encima del ladrillo (la capa intercalada de la lateral, la trama cruzada bajo el voladizo y la franja del rincón de la torre) porque se veían mal. Queda solo el tono y el degradado de cada cara. Canvas: `/_blob/4daa12a9950cd1dfd61624670c725094`.
- Mismo día: la franja oscura bajo el voladizo hacía moiré al verse pequeña. Sus rayas (y las de la cara lateral) llevan ahora separación irregular. Canvas: `/_blob/e84fe77e8557525658f53247f7425df6`.
- Mismo día, deshecho: la separación irregular se veía peor; en pequeño ya no parecía ladrillo. Vuelve `/_blob/4daa12a9950cd1dfd61624670c725094`.
- Mismo día: bajo el voladizo, menos líneas y más gruesas (quita el moiré en pequeño), con extremos desiguales y algún corte de ladrillo para que no haya dos iguales. Elegidas por el usuario las propuestas 2 y 3; descartado variar el grosor a lo largo de cada línea. Canvas: `/_blob/ea8e02bca91dbd08b244eeceadd6b0f7`.
- Mismo día: el usuario señaló que los bordes del voladizo deberían ser lo más oscuro y aclararse hacia el centro; los extremos desiguales hacían lo contrario. Ahora las líneas llegan a los bordes y son más gruesas en sus extremos que en el centro. Sin cortes de ladrillo en esta cara. Canvas: `/_blob/419d12127738ad91c5be8afd26868dcf`.
- Mismo día: voladizo con líneas algo más finas y partidas en ladrillos, manteniendo el borde más oscuro que el centro. Canvas: `/_blob/fcf50a8f4c792faa6f16e87d8f97eb5e`.

## 22 nov 2026 · Anotaciones: buscar sustituta de Libre Baskerville

- El usuario no está convencido con Libre Baskerville en la letra pequeña. En pequeño le recuerda a los documentos de Word de principios de los 2010: se ve viejo y cutre. Quiere algo clásico, pero clásico de lujo, no de Word.
- Condición nueva: **nada de las fuentes típicas de las webs hechas con IA**. Fuera Cormorant, Playfair, EB Garamond, Bodoni Moda, Instrument Serif y la propia Libre Baskerville.
- Diagnóstico: lo que más envejece es usar la cursiva para todo, también en versal. Las casas de lujo etiquetan en versal redonda espaciada y dejan la cursiva para las frases.
- Artboard `Anotaciones.dc.html`, con la letra pequeña de V3 a tamaño real (contador, pie de grabado, agenda, etiquetas de tracks, frase, formulario, aviso). Opciones:
  - 0 · Actual.
  - A · Ibarra Real Nova sola, en versal espaciada y cursiva.
  - B · Castoro.
  - C · Brygada 1918.
  - D · Forum en las etiquetas, con la cursiva de Ibarra.
  - E · IM Fell, tipos de 1680.
- Primera tanda descartada antes de enseñarla por ser típica de la IA: Bodoni Moda, EB Garamond con versalitas, Cormorant Garamond y Marcellus SC.
- 2026-11-22 · **Elegida Brygada 1918** para la letra pequeña. Sustituye a Libre Baskerville en todos los artboards activos: V3 (y su versión móvil), guía de estilo, acreditaciones (con y sin tramas), carteles v3 y v4, y las exploraciones archivadas de esta etapa.
  - Etiquetas, fechas y etiquetas de track en versal redonda 500, de 10,5 a 11,5 px, espaciadas .16 em.
  - Frases, pies de imagen, avisos y el campo del correo siguen en cursiva.
  - Regla: nunca cursiva en versal.
  - Quedan sin tocar las piezas que documentan la tipografía anterior: el archivo con Xanh Mono, `Tipografia.dc.html`, `Anotaciones.dc.html` y el texto de Cabecera, que describe cómo estaba.
  - Pendiente pasar a `DESIGN.md` y `app/globals.css`, cuando la landing llegue al código.
- 2026-11-22 · **Limpieza del canvas.** Las exploraciones ya aplicadas a V3 pasan a la hoja Archivo, en una fila nueva titulada «Archivo · exploraciones de V3 ya aplicadas»: Zigzag, Tramas, Globo, Microanimaciones, Pie, Esquineras, Cabecera, Hero y Anotaciones.
  - En Principal quedan V3, V3 móvil, la guía de estilo, el wireframe original (Main y Mobile), Carteles v3 y v4 y las acreditaciones.
- 2026-11-22 · **Preinscripción: nombre opcional.** Campo «Nombre» antes del correo, con «Opcional» de placeholder (`autocomplete="given-name"`, máximo 100 caracteres, como en la API). El error del correo solo marca el campo del correo (`.field.mail`). «Política de privacidad» de la casilla pasa a ser enlace. También en la guía de estilo (lámina V). El formulario de la web actual (`app/waitlist-form.tsx`) ya lo tenía.
- 2026-11-22 · **Plantilla de páginas legales (`Legal.dc.html`, hoja Principal, a la izquierda de V3 móvil).** Una maqueta para `/privacidad` y `/codigodeconducta`, y para las que vengan (bases, créditos). Portada con las esquineras de Van Hulsen, rótulo «Documento I/II», título en Ibarra 112 px, entradilla en cursiva y fecha de vigencia. Debajo, índice fijo a la izquierda con numerales romanos y el enlace al otro documento; cada apartado lleva numeral, título, texto a 38 rem y una glosa «En corto» en el margen (Brygada cursiva, filete ciruela). Se cierra con contacto sobre la lis, «Lee también» y el pie de V3. La barra muestra siempre isotipo y nombre, «Volver a la portada» y el botón. Privacidad usa el texto de la web actual; el código de conducta es un borrador pendiente de revisar con el equipo (el distintivo de la organización está por definir). El pie de V3 enlaza ya a las dos rutas.
- 2026-11-22 · **Plantilla legal, rehecha para cargarse desde markdown** (`Legal.dc.html`, 2560 px: fuente `.md`, escritorio 1440 y móvil 390 por cada página). Quien edite el texto no toca diseño. Piezas: cabecera YAML (`titulo`, `documento`, `entradilla`, `vigencia`, `vineta`, `otro`), párrafos antes del primer `##` (entradilla larga), `##` (apartado con numeral romano automático e índice), `>` justo bajo el `##` (glosa «En corto», opcional), `###` (rótulo en Brygada versal), `-` (lista con raya ciruela), `1.` (lista numerada en Xanh Mono), `**negrita**`, enlaces, y `---` entre apartados (florón grabado). Al final van solos el remate (cul-de-lampe) y el bloque de contacto.
  - **Viñetas:** una por documento, sobre el título, elegida por nombre (`vineta: torre`) de un catálogo cerrado. Ahora: `torre` (privacidad; Voltaire, «La Pucelle d’Orléans», 1780), `corona` (conducta; Houat, «Les Marrons», 1844), florón `o_cul2` y remate `o_cul3`, todas de Commons y dominio público (créditos en `grabados/creditos-vinetas.json`). Ampliar el catálogo es subir otro grabado con su crédito y darle nombre.
  - **Móvil:** una columna; barra con isotipo, nombre y botón (sin «Volver a la portada»); índice plegable arriba sobre surface; la glosa va entre el título del apartado y el texto; esquineras a 104 px.
  - En privacidad, los derechos pasan a lista numerada y los servicios a subapartados (Cloudflare, Resend). La fecha de vigencia queda sin el número de versión, que partía la línea en móvil.
- 2026-11-22 · **Plantilla legal, ajustes.** La barra ya no lleva «Volver a la portada»: se vuelve pulsando el logo; quedan isotipo, nombre y botón. La portada pierde protagonismo: título de 112 a 64 px (40 en móvil), entradilla de 28 a 22 px, viñeta de 150 a 96 px de ancho, esquineras de 240 a 150 px y menos aire arriba y abajo. En móvil, el índice plegado se queda fijo bajo la barra al bajar (`position: sticky`, con la lista abierta limitada al 60 % de la pantalla y desplazable). En escritorio el índice va siempre abierto al margen. En el artboard, el móvil es un teléfono de 390 × 844 que se desplaza por dentro para verlo.
- 2026-11-22 · **Coherencia: un sistema compartido en lugar de copias.** La plantilla legal copiaba a mano estilos de V3 y se quedaba sin las microanimaciones decididas. Ahora todo lo común vive en `project/sistema.css`: tokens (en la clase `.hk`, que llevan las raíces de V3 y de cada documento), tipos, botones (rodillo del secundario, flecha que avanza, pulsación), enlaces (filete que se entinta), barra (`.top`, y `.top.fija` para documentos con el nombre siempre visible), formulario (filete al enfocar, sello, error con sacudida), preguntas (abre y cierra), esquineras (la tinta sale del vértice), filetes que se trazan (`.tz`, y `.tz.una` si solo hay filete arriba), láminas que se descubren, pie (verjurado y filigrana) y las versiones táctiles y de «reducir movimiento». V3 ya no repite esas reglas; solo guarda las suyas (hero, cifras, tracks, agenda, vehículos). El pie es un componente, `CompPie.dc.html`, que importan V3 y la plantilla (`<dc-import name="CompPie">`). La plantilla legal usa ahora los mismos botones y enlaces animados, la entrada de las esquineras, la portada en cascada con el «entra» del sistema, los filetes de cada apartado que se trazan, el florón y el remate que se descubren como las láminas, el «+» de las preguntas en el índice móvil y un filete ciruela al pasar por cada entrada del índice. Regla nueva en `AGENTS.md`: toda página enlaza `sistema.css` y usa sus clases; un patrón aprobado para más de una página se mueve allí.
- 2026-11-23 · **Arreglo: Móvil v3 salía sin estilos** tras el cambio a `sistema.css`: importa V3, pero su cabecera no enlazaba la hoja común. Ahora la enlaza (y carga las fuentes). Regla: cualquier artboard que importe otro también enlaza `sistema.css`.

## 23 nov 2026 · Formulario: tamaños de etiqueta y campo

- La cursiva del campo (19 px) doblaba a la etiqueta en versal (11 px) y se veían de dos sistemas distintos. Ahora el campo va a 15 px sin espaciado extra, y etiqueta y texto comparten línea base (`align-items: baseline`). Cambio en `sistema.css`, así que vale para V3, V3 móvil y cualquier formulario.

## 23 nov 2026 · Contador, tiempos unificados y norma de microanimaciones

- **Contador arreglado.** En V3 no hacía de numeradora: el dígito nuevo solo aparecía con un fundido corto y el anterior no salía, así que no se notaba. Ahora es como en el artboard Microanimaciones: solo gira la rueda del dígito que cambia (horas y minutos); el anterior sale por arriba y el nuevo entra desde abajo, en `--t-fast` con `--ease-out`. Al cargar no gira ninguna y los segundos siguen sin efecto. Se corrige también la decena de horas, que alternaba con un contador que no coincidía con el cambio de dígito. El dígito que sale lleva `aria-hidden`.
- **Repaso del resto de microanimaciones de V3** (con navegador sin interfaz): botones, enlaces, campo, error con sacudida, casilla, sello y aviso, preguntas, filetes, láminas, moneda, barra que se esconde, esquineras y pie funcionan.
- **Tiempos: no estaban del todo unificados.** `sistema.css` usaba los tokens salvo la pulsación (160 ms) y las esquineras (1300 ms); V3 tenía tiempos sueltos en el premio y en la banda de cifras. Ahora todo usa `--t-fast` / `--t-mid` / `--t-slow`: pulsación 200 ms; esquineras 900 ms con `--ease-io`; premio (cartela y laurel lento, moneda y frases medio); cifras (300 y remates lento, sellos rápido, florones medio). Siguen aparte los bucles, los contadores (1,1–1,2 s) y los retardos de cada coreografía.
- **Microanimaciones vuelve a la hoja Principal como norma**, bajo el pie compartido: se sigue en toda página nueva. Sus especificaciones y su tabla se reescriben con los tres tiempos y las dos curvas, y su propio CSS usa los mismos tokens que `sistema.css`. «Copiar el correo» queda marcado como no aplicado. La guía de estilo enlaza a ella.
- 2026-11-23 · **El contador seguía pareciendo roto:** lo que se ve todo el rato son los segundos, y cambiaban sin efecto (decisión del 22 nov, que se revierte). Ahora giran todas las ruedas, también segundos y días, con la misma numeradora de 200 ms.

## 23 nov 2026 · V3 cerrada para implementar

- El usuario da por cerrada `V3.dc.html` para llevar la landing al código. A partir de aquí lo aprobado de la landing se implementa según `docs/plan-implementacion.md` (fase 1); los cambios nuevos se exploran en el canvas y entran con un PR que actualiza `DESIGN.md`.

## 23 nov 2026 · La landing pasa al código (PR 1.1 y 1.3)

- `sistema.css` entra en `app/globals.css` y los estilos propios de V3 en `app/(landing)/landing.css`. Tailwind y Geist se quitan. Fuentes con `next/font/google`. Desde aquí, `DESIGN.md` (reescrito) y el código son la referencia; el canvas queda como mesa de exploración.
- Dos colores nuevos en la tabla, con un único uso cada uno: `paper-light` (#fffcf0, la luz del gofrado) y `gold-shadow` (#3f2c16, el texto del reverso de la moneda). Antes estaban sueltos en V3. Las transparencias pasan a `color-mix`.
- **No se publican los logos de relleno** (Meta, Apple, Amazon, Google). Los tracks 03–06 salen como «Por anunciar», con el cuadro del logo vacío; la cinta de logos solo lleva Kapia y Bending Spoons.
- **Sin textos entre corchetes en la web.** Lo que en V3 era `[…]` se sustituye por texto prudente que no promete nada sin decidir: las horas sin fijar dicen «por fijar»; las explicaciones de las cifras no mencionan grado/máster ni que sea gratis (decisión 3 pendiente); el bloque de empresas no menciona CVs (decisión 4) y pierde el enlace al dossier, que no existe.
- Los vehículos dejan de ser enlaces (iban a `#`): son decorativos, con su nombre al pasar el ratón.
- El pie todavía no enlaza a `/codigo-de-conducta` ni a `/creditos` (llegan en el PR 1.4); la línea de créditos queda sin enlace.
- Imágenes: los PNG grandes pasan a WebP (verjurado y filigrana reducidos a 800 y 600 px, ya que se ven al 6 y 14 %). Los SVG de potrace (skyline, moneda, viñetas de comida) siguen sin pasar por `svgo`: queda pendiente.
- Créditos en `assets/creditos.json`, sacados de la guía de estilo. **Faltan**: la fuente de la corona de laurel y el detalle por pieza de las viñetas de la agenda (estaban en `.design-refs/grabados/creditos-vinetas.json`, que no está en el repo).

## 23 nov 2026 · Páginas de documento en el código (PR 1.4)

- La plantilla `Legal.dc.html` pasa a `app/documento/` y la usan `/privacidad`, `/codigo-de-conducta`, `/como-llegar` y `/creditos`. El texto sigue en markdown (`contenido/*.md`) con las mismas nueve piezas; lo lee un lector propio de 150 líneas (`lib/documento.ts`, con tests), sin dependencia de markdown.
- Rutas con guiones (`/codigo-de-conducta`, como en el plan), no `/codigodeconducta` como en el canvas.
- Las viñetas «torre» y «corona» del catálogo son los mismos ficheros que dos viñetas de la agenda, así que se reutilizan. Se añaden «jarron» (Cómo llegar) y «flor» (Créditos), también de la agenda. Florón y remate entran en `public/grabados/vinetas/`.
- Código de conducta: se quita «[distintivo por definir]»; queda «Habla con cualquier persona de la organización». Sigue siendo el borrador del canvas, pendiente de revisar con el equipo.
- Privacidad: el texto del canvas, que es el de la web anterior. Todavía no cubre la inscripción, el CV ni los plazos de borrado (P-6): dependen de las decisiones 4 y 7 y de la pregunta abierta 5, y se añadirán cuando se construya la inscripción.
- Cómo llegar (nuevo, sin artboard): dirección de la EPS, Cercanías C-5, Metrosur y autobús, y qué traer (portátil, cargador, documento de identidad y carné). Borrador para que el equipo lo revise; el aula y la entrada se publicarán más adelante.
- Créditos: generados desde `assets/creditos.json`, agrupados por carpeta, más tipografías (SIL OFL) y una nota de marcas. El skyline entra como dibujo propio. La corona de laurel y la ficha por pieza de varias viñetas siguen «por confirmar».
- El pie enlaza ya a Cómo llegar, Código de conducta y Créditos.

## 23 nov 2026 · Animaciones de scroll en todos los navegadores

- Pedido: que las animaciones ligadas al scroll funcionen en Firefox y en todos los navegadores de PC y móvil, no solo en Chrome.
- Diagnóstico: Firefox y Safari anteriores a la 26 no tienen `animation-timeline` ni consultas `@container style()`, así que hasta ahora veían todo quieto en su estado final.
- Solución: `app/desplazamiento.tsx`, que solo actúa donde no hay `animation-timeline`. Pone `sv` en `<html>`, añade `.on` a cada bloque al entrar (el mismo cerrojo de una sola vez) y escribe el progreso del scroll en variables CSS. Cubre titular que encoge y nombre en la barra, profundidad del hero, cohete, palabras que se leen, globo que sube, cifras fijas que cuentan, carril de tracks (escritorio y móvil), premio, filetes, láminas, florón, remate y filigrana del pie. Mismos tiempos y curvas; en Chrome no cambia nada.
- Se cambia la regla «sin JS de scroll»: el JS solo corre como respaldo.
- Probado en Chromium emulando un navegador sin `animation-timeline` (escritorio 1440 y móvil 390) y en modo nativo. No se pudo abrir un Firefox real en el entorno de trabajo: falta probarlo a mano en Firefox, Safari de iOS y Chrome de Android.
- Única diferencia que queda: cerrar una pregunta con animación (`::details-content`) solo existe en Chrome; en el resto se cierra al instante.

- 2026-11-23 · **Fuera `/como-llegar`.** Se había colado en la plantilla de documento y no hay que implementarla: se borran la página, `contenido/como-llegar.md`, el enlace del pie y la viñeta «jarron» del catálogo.
- 2026-11-23 · **Viñetas quietas en los documentos** (privacidad, código de conducta y créditos, que comparten plantilla). La viñeta de la portada ya no entra en cascada con el texto, y el florón y el remate dejan de descubrirse al hacer scroll (fuera también su gemela `.sv`). Los filetes `.tz` y la entrada del texto se mantienen.
- 2026-11-24 · **Tracks nivelados.** Las columnas comparten filas con `subgrid` (empresa, etiqueta, numeral y logo, título, descripción): una etiqueta de más o un título más largo ya no descuadran las demás columnas. En móvil, el carrusel deja 40 px debajo para el filete de avance, que antes pisaba la descripción. También en V3 del canvas.
- 2026-11-24 · **Fuera Xanh Mono.** Todas las cifras (banda de cifras, premio y reverso de la moneda, numerales de los tracks, horas de la agenda, contador, 404 y listas numeradas de los documentos) pasan a Ibarra Real Nova, la fuente principal. El contador y las cifras que cuentan usan cifras tabulares para que no bailen. Se deja de cargar la fuente y desaparece `--num`. Xanh Mono pasa a descartadas. Aplicado también en V3 y en la guía de estilo del canvas.
- 2026-11-24 · **Euros como «1.250€».** Punto de millar también con cuatro cifras y sin espacio entre el número y el signo; el espacio se veía raro. Cambia la banda de cifras («2.500€»), el premio, el desglose, el reverso de la moneda y la frase de cifras. Los contadores en CSS parten el número en miles y resto, así que al contar pasan por «0.137€», como una numeradora. También en V3 y en la guía de estilo del canvas.
- 2026-11-24 · **Euros al contar: el punto solo desde 1000.** Al empezar a contar se ve «0€», «137€», «999€» y el punto entra en «1.000€»; antes salía «0.000€». Se hace con estilos de contador (`@counter-style`) que dejan vacío el trozo que no toca.
- 2026-11-24 · **Sin Puerta de Alcalá en móvil.** En las preguntas frecuentes, la lámina solo ocupaba sitio entre el titular y la lista; se oculta por debajo de 820 px.
- 2026-11-24 · **Nombre de la barra centrado.** «HackUC3M’27» se baja 0,18em: Cinzel es casi todo versal y su tinta quedaba unos 4 px más alta que el isotipo y el botón.

- 2026-11-24 · **Panel de organización: propuesta en el canvas** (`Admin.dc.html`, hoja Principal). Es Los Ilustrados en modo herramienta: barra lateral en damasco de lis oscuro, banda de cifras del resumen en damasco de seda, avisos sobre papel de lis malva y viñetas de la agenda en los huecos. Usa los gestos de Microanimaciones: pulsar, rodillo del botón secundario, filete que se entinta, campo que se traza, casilla que se estampa, aviso que sube, cinta lineal y filete del track. Lo que se ve a diario no se anima al cargar (cifras quietas).
- 2026-11-24 · **Empresa y track son cosas distintas: la empresa tiene el track.** Hay empresas sin track: infraestructura (créditos de API, cuentas), jurado, patrocinio o difusión. Las empresas tienen personas (mentoras, jurado o sin papel). Modelo en `docs/modelo-datos.md`.
- 2026-11-24 · **Tres logos por empresa:** isotipo (cuadro del track, teñido), logotipo (el nombre solo) e isologo (cinta de logos, acreditaciones, documentos y correos).
- 2026-11-24 · **La vista previa del admin tiene que ser idéntica a la web:** copia el CSS de `landing.css` a 1440 px, sin aproximaciones.
- 2026-11-24 · **Sin orden entre empresas:** todas pagan lo mismo, así que los tracks y la cinta salen al azar en cada visita. El admin no tiene «subir» ni «bajar».
- 2026-11-24 · **Captación dentro del admin:** la herramienta de partnerships de Álvaro se rediseña como pestaña del panel, con los mismos campos que tenía (estado, importe, track, contacto con cargo, correo, teléfono y LinkedIn, responsable, próximo paso con fecha, notas y documentos), dentro de la ficha de empresa. Es solo interfaz: Álvaro conecta su lógica y su base de datos.
- 2026-11-24 · **Cinta de logos a 40 s por vuelta**, como en el código; la norma de Microanimaciones decía 18 s y se corrige (manda el código). En el mismo tablero, `--t-fast` y `--t-slow` se referían a sí mismos y anulaban sus duraciones; arreglado.
- 2026-11-24 · **Revisión del panel aplicada.**
  - Lo interno se guarda solo; «Publicar» queda para lo que sale en la web.
  - Solo las empresas confirmadas pueden tener track.
  - Borrar una empresa pide confirmación y propone marcarla como perdida.
  - «Perdida» se pliega bajo el embudo para que quepa a 1440 px.
  - Arreglos de lógica: «Añadir» crea la empresa en la etapa de su columna e «Ir al track» abre el de la empresa.
  - Los tracks se pueden eliminar y tienen un campo de premio.
  - El isotipo solo admite SVG o PNG transparente.
  - La cinta no se puede marcar sin isologo.
  - Accesibilidad: foco visible al subir logos, textos ocultos para el punto de «sale en la web» y la inicial del responsable, numerales del menú en crema al 78 % (6:1) y `aria-pressed` en las listas.
  - «Patrocinio» queda definido como dinero aparte de un track.
- 2026-11-24 · Panel documentado en DESIGN.md (apartado «Panel de organización») y en la guía de estilo; `.impeccable/design.json` regenerado.
- 2026-11-24 · **Panel pasado a código** (`app/admin/`): las vistas previas de tracks y cinta usan el marcado y el CSS reales de la landing, en vez de una copia. El estilo antiguo del admin sale de `interior.css`, que queda solo para la 404.
- 2026-11-24 · **Cifras: el fundido ya no va ligado al scroll.** Si se dejaba de bajar a mitad del cambio, la cifra se quedaba medio transparente. Ahora el scroll solo decide qué cifra toca (`--act`, sin valores intermedios; `.act` en el respaldo) y el fundido con escala va por tiempo (entra en `--t-mid`, sale en `--t-fast`), como ya se hacía con la cuenta. Descartados: imantar el scroll a cada cifra (`scroll-snap`, se nota secuestrado) y acortar el fundido (solo encoge la zona trabada).
- 2026-11-24 · Vehículos sin bocadillo al pasar el ratón; el iCab cruza sin pararse a mitad.
- 2026-11-24 · **Redes: mesa nueva «Redes» en el canvas.** Logos para redes: avatar de LinkedIn e Instagram = la medalla (isotipo) sobre crema; el apilado (ciruela sobre crema, o crema sobre ciruela) firma publicaciones y no sirve de avatar porque a 40 px no se lee. Medidas: logo de página 400 × 400, portada 1128 × 191 entregada a 4×, fondo de perfil 1584 × 396, avatar de Instagram 320 × 320. Los seis banners que había (medalla + edificio + logotipo) quedan de referencia; el banner se rehace **sobre fondo claro con una trama real** y **sin medalla** (ya sale en el avatar, justo debajo), con el cuarto izquierdo libre porque lo tapa el logo de la página. Cinco propuestas por elegir: A papel de tina (verjurado + filigrana, Sabatini), B sembrado de florón con los tres edificios, C damasco con cartela y fecha, D cielo de Piranesi (habría que vectorizarlo), E lis con cordones de laurel y Auditorio.
- 2026-11-24 · **Hoja Principal del canvas por bandas:** arriba Web (landing V3, documentos, guía, wireframe, panel), debajo Diseño impreso (carteles y acreditaciones) y al final Diseño de redes.
- 2026-11-24 · **Redes: banner elegido (F).** Los tres edificios en fila de la propuesta B, la **medalla** a la derecha donde iba el logotipo y el fondo de damasco de seda de la C (line sobre crema). Se invierte el reparto de logos: el **avatar pasa a ser el logotipo apilado** (ciruela sobre crema) y la medalla va en el banner, porque el logotipo ya se ve en la foto de perfil. Regla: logotipo en el avatar, medalla en el banner, nunca los dos en la misma pieza de cabecera.
- 2026-11-24 · **Redes cerrado.** Foto de perfil: el **logo C**, apilado en crema sobre ciruela (no el de crema). Portada: la F, con el damasco **en mosaico a 640 px** y no estirado a todo el ancho, porque estirado 11 veces se emborronaba. Archivos en `.design-refs/linkedin/final/` (`banner-linkedin-4512x764.png`, `avatar-apilado-ciruela-800.png` y su SVG). En el canvas, la mesa «Redes» de Principal queda solo con lo definitivo; los banners de partida y las propuestas A–E pasan al Archivo («RedesArchivo»).
- 2026-11-24 · **Banner de LinkedIn v2** (en LinkedIn perdía calidad y el logo de la página tapaba la Biblioteca). El damasco pasa a **manchas planas** (alfa umbralizado al 8 %, color a medio camino entre crema y line, `#e8ddd5`): el grano del escaneo era lo que ensuciaba el JPEG de LinkedIn. Los edificios bajan a 72 u y empiezan al 27 % del ancho. Se exporta a **2× (2256 × 382)** con Lanczos, en lugar de 4×, para que LinkedIn reduzca menos. Prueba de avatar C con lis (`lis-damasco` sobre plum-deep): entera, con cartela lisa o en orla, por elegir.
- 2026-11-24 · **Redes: elegidos el avatar C1** (apilado crema sobre plum-deep con la lis de la banda oscura en todo el fondo; `avatar-lis-a-entera.png`) y **la portada v2** (`banner-linkedin-2256x382.png`). Descartados el C liso, el de cartela y el de orla: en estos dos últimos las lis quedan cortadas en el borde.
- 2026-11-24 · **Piezas de redes, primera ronda** (mesa «RedesPiezas» en Principal, por elegir). Plan acordado: 1) imagen OG de la web (cuando se elija, entra en la PR), 2) plantillas de publicación 4:5, 3) historias, 4) portadas de destacadas; el marco «Voy a HackUC3M» y la portada del evento de LinkedIn se dejan para después. A petición, los fondos usan **todas las tramas de la guía**, una por pieza: verjurado + filigrana (OG A), damasco plano (OG B), lis oscura + cordón (OG C), lis malva (anuncio), sembrado + frisos (empresa), mármol, papel de lis y engrudo (carrusel), cielo de Piranesi, orla de billete y damasco de ramos (historias), papel de lis y lis oscura (destacadas). Regla propuesta: el texto siempre sobre papel liso, nunca directamente sobre la trama.
- 2026-11-24 · **Imagen al compartir la web (OG): la A.** El inicio de la web en 1200 × 630: verjurado al 6 % y filigrana en malva, esquineras de Van Hulsen (la izquierda reflejada y la derecha tal cual, como en el hero; en la maqueta estaban al revés), fecha en Cinzel, «HackUC3M» con el ’27 en Corinthia, entradilla en Brygada cursiva y los tres edificios sobre su filete. Va en `app/opengraph-image.png` con su `.alt.txt`, y `metadataBase` apunta a hackuc3m.com. Publicaciones e historias de la primera ronda: **rechazadas** («no me gustan nada»); hay que hablar la dirección antes de rehacerlas. Además, usar todo el catálogo de viñetas pequeñas (`.design-refs/grabados/`, `pd/florones/`, V10–V19), no siempre las mismas cinco.
- 2026-11-24 · **Publicaciones e historias v2: cartel suizo.** Lo que fallaba en la v1: parecían plantilla, tipografía y jerarquía flojas, pocos grabados y repetidos, «no se sienten especiales». Ninguna de las direcciones ofrecidas (portada de libro, lámina, gaceta, cromos) convence; se pide **composición de cartel suizo**. Las historias siguen la misma idea y **algunas empiezan con una animación**. Propuesta (mesa `RedesPublicaciones`): retícula invisible y asimétrica, un solo elemento enorme en Ibarra, un grabado protagonista distinto en cada pieza recortado por el borde (Puerta de Alcalá, lechuza de Bewick, astrolabio, Minerva, Vitruvio, esfera armilar, capiteles), la trama como campo de color en un módulo y no como fondo, viñetas pequeñas del catálogo como puntuación, y una ficha fija en las cuatro esquinas (wordmark, nº de pieza, fecha, web) que hace serie. Carrusel panorámico de 3240 px en el que titular y Vitruvio cruzan de una página a otra. Historias animadas: apertura (el campo de lis se recoge, sube la palabra, se entinta el grabado) y cuenta atrás (la cifra cuenta y se entinta la esfera), con las curvas de la web.
- 2026-11-24 · **Redes: gusta mucho la «columna»** (pieza de track de la v2: columna de mármol con el astrolabio en crema y el texto al lado). Se desarrolla como serie en la mesa `RedesSerie`: preinscripción abierta, aviso, empresas que participan (grupo de seis logos) y una empresa que se suma, **sin hablar aún de tracks**; y sus historias (la columna se tumba en franja arriba; preinscripción y empresa abren con animación). Cada pieza cambia de trama de columna (damasco de ramos, engrudo, mármol, cielo), de grabado en crema (Puerta de Alcalá, lechuza, Minerva, astrolabio, esfera, manos) y lleva **tres viñetas distintas**. A petición («más viñetas, más variedad»), se entintan y suben ~48 viñetas nuevas: hierros de encuadernación de «Art of Bookbinding» recortados uno a uno, cabeceras y bandas de rosas (Commons, DP), florones, espirales, rizos, lira, copa, jarrón, torre y frisos V11–V14.
- 2026-11-24 · **Redes, serie v2 (cuatro retículas).** Crítica de la v1 de la serie: «se ve feo», desborda, grabados en crema invertidos se ven mal (salvo el astrolabio, que es de línea); fuera **Minerva, la lechuza y Vitruvio**. Se pide revisar todo antes de publicar y proponer **otras estructuras de cartel suizo**. Nueva `RedesSerie`: A columna con astrolabio (preinscripción, la que gustó, revisada), B titular girado «Aviso» a lo largo del borde, C retícula de módulos (empresas, seis logos), D banda horizontal de damasco con el nombre de la empresa. Grabados en tinta o ciruela sobre papel (capiteles y lámina astronómica de la Encyclopédie). Las normas de trabajo quedan en `docs/como-disenar.md`.
- 2026-11-24 · **Kit de carteles para el equipo** (`.design-refs/kit-carteles/` y `kit-carteles.zip`, para subir al Drive del hackathon). Gustan las retículas de la serie v2 y el carrusel panorámico. El kit lleva `SKILL.md` (instrucciones de estilo para cualquier chat o como skill de Claude), cinco plantillas HTML a tamaño real (A columna, B titular girado, C módulos, D banda, E carrusel panorámico), 72 viñetas y 12 grabados permitidos en tinta/ciruela/crema, 10 tramas compuestas a dos tonos, edificios, logos, catálogo de muestras y créditos. Recursos pretintados en PNG/WebP (sin máscaras CSS) para que las plantillas funcionen abiertas desde el disco.
- 2026-11-24 · **Redes ≠ carteles.** Los carteles gustan, pero no son lo mejor para un post. Respuestas: no hay fotos (todo gráfico), tono «mismo estilo, más directo», prioridad feed de Instagram, historias y LinkedIn. Mesa `RedesSocial`: perfil simulado (cuadrícula 3:4, alterna claro/oscuro, tríptico de lanzamiento «HackUC3M ’27» sobre el campus en la última fila), publicaciones de una idea con titular o cifra de 150–620 px (anuncio «Ya puedes apuntarte.», 300 hackers, 2 días, 2.500 € en premios, empresa que se suma), carrusel panorámico «¿Qué es un hackathon?», cuatro historias (aviso, encuesta, cuenta atrás, compartir) con hueco de sticker, y LinkedIn 1200 × 627 (anuncio, empresas). En redes la firma es solo «HackUC3M ’27» arriba a la izquierda. Plantillas en `kit-carteles/redes/`.
- 2026-11-24 · **Tracks: el logotipo abre la columna (propuesta B).** El logotipo de la empresa, en ciruela y a 22 px de alto, sustituye a la etiqueta con el nombre, porque el isotipo solo no identifica a Kapia ni a Happy Robot. La etiqueta de abajo (lo que hace la empresa) pasa a ser la etiqueta rellena que antes llevaba el nombre. Sin logotipo, la columna conserva la etiqueta con el nombre. Descartadas: logotipo dentro de la etiqueta (A), al pie con «Con» (C), cuadro del logo en dos partes (D) y etiqueta más logotipo al pie (E). El logotipo se tiñe con máscara, así que en el admin exige SVG o PNG con fondo transparente, como el isotipo.
- 2026-11-25 · **Logos de empresa: solo isotipo e isologo, con sus colores originales.** Se retira el logotipo (campo, archivos y columna de la base de datos) y se deja de teñir con máscara. En la columna del track, el isologo ocupa el sitio del logotipo (propuesta B) y el cuadro lleva el isotipo. Los originales de las tres marcas son monocromos: Kapia `#100D0C`, Bending Spoons y Happy Robot negro.
- 2026-11-25 · **Tracks sin anunciar, en voz baja.** Un track con empresa confirmada pero sin título ya no dice «Track por anunciar» ni «Publicaremos el reto…»: enseña solo logotipo, etiqueta, numeral y logo, y el título y el reto aparecen cuando se escriben en el panel. Los huecos sin empresa vuelven a salir detrás de los confirmados, como «Próximamente»: etiqueta en versal tinta suave sin caja (en lugar de la caja ciruela), numeral en malva oscuro y cuadro del logo vacío con filete `line`. Así la sección sigue teniendo seis columnas, como dice el titular. La columna es un único componente (`app/(landing)/columna-track.tsx`) que usan la landing y la vista previa del panel. Descartado: ocultar los huecos (la sección se quedaba en tres columnas bajo «Seis tracks») y mantener el rótulo «Track por anunciar» en los confirmados (parecía que faltaba la empresa).

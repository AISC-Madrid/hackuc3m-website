# HackUC3M ’27: plan de la web

Última actualización: 15 de noviembre de 2026. Documento de trabajo para retomar la planificación.

## Contexto

- Evento: **19–20 de febrero de 2027**, EPS · Campus de Leganés (UC3M, Madrid). Dos días, sin dormir allí.
- Organiza AISC. Al admin se entra con el email común `aisc.asoc@uc3m.es`; no hacen falta roles ni más cuentas.
- 300 participantes, solo mayores de 18.
- 6 tracks, cada uno patrocinado por una empresa con su reto y su premio.
- Habrá merch, así que se pide la talla de camiseta.

## Estado actual de la web

- Landing (`app/event-page.tsx`), preinscripción con prioridad (`app/waitlist-form.tsx`, `app/api/waitlist`), editor en `/admin` (fecha, lugar, intro, tracks, sponsors como texto, FAQ, estado de la lista de espera, exportar CSV, enviar confirmaciones), privacidad (`/privacidad`) y página 404.
- Stack: Next.js 16 compilado con OpenNext a un Cloudflare Worker. D1 (SQLite) como base de datos y Resend para los emails.
- `/admin` y `/api/admin/*` están detrás de Cloudflare Access. El backend comprueba el JWT.
- La tabla `waitlist` (`migrations/0001_initial.sql`) ya tiene columnas reservadas para la inscripción: `invitation_token_hash`, `invitation_expires_at`, `invitation_sent_at`, `registered_at`.
- Despliegue: PR → GitHub Actions valida → merge a `main` → Cloudflare Workers Builds aplica las migraciones y despliega. Nada se despliega desde local.
- Builds de preview desactivados: compartirían la D1 y los emails de producción.

## Requisitos

Prioridades: **Imprescindible** · **Debería** · **Opcional**. **[TBD]** = pendiente de decidir (ver la sección de decisiones).

### Web pública
| ID | Requisito | Prioridad |
|---|---|---|
| P-1 | Landing con qué es, fecha, lugar, agenda de los dos días, FAQ y contacto. Todo editable desde el admin | Imprescindible |
| P-2 | Sección de los 6 tracks: empresa, logo, reto y premio de cada uno | Imprescindible |
| P-3 | Logos de sponsors enlazados a su web (ahora salen como texto; hay que poder subir imágenes) | Imprescindible |
| P-4 | Página "Cómo llegar a Leganés" y qué traer | Debería |
| P-5 | Página `/codigo-de-conducta` | Imprescindible |
| P-6 | Actualizar la privacidad con los datos de inscripción, el CV y cuánto tiempo se guardan | Imprescindible |
| P-7 | Web en español e inglés **[TBD]** | Opcional |

### Inscripción
| ID | Requisito | Prioridad |
|---|---|---|
| I-1 | Acceso por enlace mágico enviado al email, sin contraseña (reutiliza `invitation_token_hash`) | Imprescindible |
| I-2 | Formulario: nombre, universidad, estudios y curso, nivel de experiencia, track preferido, talla de camiseta, alergias y dieta (solo si se da comida), GitHub/LinkedIn | Imprescindible |
| I-3 | Declaración de ser mayor de 18 y estudiante **[TBD: graduados, solo UC3M o también de fuera]**. Se comprueba en la puerta con el carnet | Imprescindible |
| I-4 | Consentimientos separados: código de conducta y privacidad (obligatorios), compartir el CV y mostrar el perfil para buscar equipo (opcionales) | Imprescindible |
| I-5 | Subir el CV en PDF de forma privada. Necesita R2, el almacenamiento de ficheros de Cloudflare (binding nuevo) | Debería (depende de E-2) |
| I-6 | El participante puede editar su inscripción o cancelar su plaza hasta una fecha límite | Debería |
| I-7 | Ventana de prioridad: los preinscritos se inscriben unos días antes que el resto **[TBD]** | Imprescindible |
| I-8 | Sistema de selección **[TBD]** | Imprescindible |
| I-9 | Estados: pendiente → aceptado / lista de espera → confirmado → check-in, además de cancelado y rechazado | Imprescindible |
| I-10 | Confirmación de asistencia con fecha límite. Si alguien no confirma, su plaza pasa sola al siguiente de la lista de espera (tarea programada del Worker) | Imprescindible |
| I-11 | Emails: solicitud recibida, aceptado, recordatorio de confirmar, confirmado (con QR), lista de espera, plaza liberada | Imprescindible |

### Equipos
| ID | Requisito | Prioridad |
|---|---|---|
| T-1 | Código de equipo opcional (de 1 a 4 personas) para que acepten a todo el equipo junto | Debería |
| T-2 | Página "Busco equipo" con los perfiles que lo autorizaron **[TBD]** | Opcional |
| T-3 | Canal externo (Discord o WhatsApp) para formar equipos | Debería |

### Admin
| ID | Requisito | Prioridad |
|---|---|---|
| A-1 | Lista de inscritos con filtros por estado, universidad y track | Imprescindible |
| A-2 | Cambiar el estado de uno o de varios a la vez, lo que envía el email correspondiente | Imprescindible |
| A-3 | Estadísticas: cuántos hay en cada estado, tallas (para el pedido de merch), dietas y universidades | Imprescindible |
| A-4 | Exportar a CSV | Imprescindible |
| A-5 | Check-in escaneando el QR con la cámara del móvil (`BarcodeDetector` nativo), más búsqueda manual | Imprescindible |
| A-6 | Exportar los CVs de quienes dieron consentimiento | Opcional (depende de E-2) |
| A-7 | Editar los tracks, la agenda y los sponsors, ampliando el editor actual | Imprescindible |
| A-8 | Crear, editar y borrar empresas desde el admin, con sus datos (E-4) y sus papeles (E-5) | Imprescindible |

### Empresas
| ID | Requisito | Prioridad |
|---|---|---|
| E-1 | Cada track muestra la información de su empresa (P-2) | Imprescindible |
| E-2 | Acceso a CVs **[TBD]** | Opcional |
| E-3 | Portal propio para empresas, detrás de Cloudflare Access como `/admin` **[TBD]** | Opcional |
| E-4 | Ficha de empresa: nombre, descripción corta, descripción larga, isotipo, logotipo e isologo (imágenes subidas a R2) | Imprescindible |
| E-5 | Una empresa tiene uno o varios papeles: dueña de tracks (sale en la sección de tracks), patrocinadora de infraestructura, jurado. La lista de papeles debe poder crecer sin rehacer el modelo | Imprescindible |

### Durante y después del evento
| ID | Requisito | Prioridad |
|---|---|---|
| D-1 | Entrega de proyectos y jurado. Recomendación: Devpost, sin desarrollo propio **[TBD]** | Debería |
| D-2 | Página de agenda y avisos en vivo, editable desde el admin | Debería |
| D-3 | Ganadores en la landing después del evento | Opcional |

### Generales
- **RGPD**: consentimiento claro, plazo de conservación, borrar los datos y CVs tras el evento, y los CVs nunca accesibles públicamente.
- **Carga**: aguantar el pico al abrir las inscripciones. Ya hay un límite de peticiones.
- **Móvil primero**: el check-in y la mayor parte del tráfico serán desde el móvil.
- **Accesibilidad básica y sigue `DESIGN.md`**.

## Decisiones pendientes

Preguntas enviadas al equipo; su efecto en cada PR está en `docs/plan-implementacion.md` § 4. Faltan las respuestas.

| # | Decisión | Recomendación | Bloquea |
|---|---|---|---|
| 1 | Selección: revisión manual, orden de llegada o sorteo. ¿Días de prioridad para los preinscritos? | Mixto: unos días de prioridad para preinscritos, después orden de llegada, aceptar ~360 para 300 plazas y lista de espera automática | I-7, I-8, I-10, A-2 |
| 2 | Idioma: español e inglés o solo español | Decidirlo antes de construir formularios y emails. Si hay dudas, estructura bilingüe y publicar solo en español | P-7, I-2, I-11 |
| 3 | ¿Solo estudiantes o también recién graduados? ¿Solo UC3M o también de fuera? | Estudiantes de cualquier universidad + graduados en el último año, comprobado con el carnet | I-3 |
| 4 | ¿Compartimos CVs con las empresas (solo de quien acepte)? | Sí, con consentimiento expreso | E-2, I-5, A-6 |
| 5 | Si hay CVs: portal para empresas o se los pasamos nosotros. Cuidado con el RGPD | Pasarlos nosotros, exportados desde el admin; portal solo si lo piden | E-3 |
| 6 | Buscador de equipos en la web o un canal (WhatsApp/Discord) solo para eso | Canal externo; la página "Busco equipo" solo si sobra tiempo | T-2, T-3 |
| 7 | ¿Se da comida? (no se ha preguntado aún) | Si la hay, preguntar alergias y dieta | I-2 |
| 8 | ¿Devpost para entregas y jurado? (no se ha preguntado aún) | Sí | D-1 |

## Calendario propuesto

| Cuándo | Qué |
|---|---|
| Noviembre | Cerrar las decisiones 1–5 y 7 |
| Diciembre | Web pública (P-1 a P-6) e inscripción completa (I) |
| Finales de diciembre | Abrir la inscripción: primero la ventana de preinscritos, después el público general |
| Enero | Admin completo, check-in con QR, equipos y CVs |
| Febrero | Agenda en vivo y avisos; evento el 19–20 |

## Siguiente paso

Recoger las respuestas del equipo, actualizar la sección de decisiones y empezar por la inscripción (I-1, I-2, I-4, I-7 a I-11). Cada cambio va en una rama con su PR.

## Referencias

- [MLH Hackathon Organizer Guide](https://guide.mlh.io/) y [MLH Community Values](https://guide.mlh.io/overview/mlh-community-values): código de conducta con casilla obligatoria en el registro.
- [HackAssistant registration](https://github-redirect.dependabot.com/HackAssistant/registration) (origen: HackUPC): registro, ayudas de viaje, check-in con QR.
- [HackMIT 2019 Admissions](https://medium.com/hackmit-stories/hackmit-2019-admissions-7af48484ba98): admisión por sorteo.
- [Devfolio features](https://devfolio.co/blog/devfolios-stack-of-features/): revisión de solicitudes, entregas y jurado.

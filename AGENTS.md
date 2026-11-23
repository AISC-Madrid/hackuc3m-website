<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Design system

- Read `DESIGN.md` before any UI, admin or email change and follow it; when code disagrees with it, `DESIGN.md` wins. Its colour table and frontmatter are the normative tokens, and `app/globals.css` `:root` is the only place that writes colours (emails excepted). Change both in the same commit and run `npm test`, which fails when they drift. Add new reusable patterns to `DESIGN.md`.
- For every UI change, also read and apply [Emil Design Engineering](.claude/skills/emil-design-eng/SKILL.md) before planning and when reviewing the result. Its interaction and motion principles apply within `DESIGN.md`'s values; it does not authorise new motion, dependencies or effects beyond the task. Vendored from `emilkowalski/skills` at `2d22863` (MIT); update it by copying upstream, not by editing it here.
- After a design change, regenerate `.impeccable/design.json` from `DESIGN.md` so the Impeccable skill does not reintroduce a retired direction.

## Landing: code, canvas and references

The landing redesign ("Los Ilustrados") is in the code since 23 nov 2026 (`app/(landing)/`). **`DESIGN.md` and the code are the reference for the landing**; the Claude Design canvas is now an exploration table, and anything approved there reaches `app/` through a PR that also updates `DESIGN.md`.

- **Decision log first.** `docs/diseno-landing.md` records every design decision, rejected idea and the reason for each. Read it before proposing anything for the landing, and append each new decision or preference there, dated, in Spanish.
- **Document pages** (`/privacidad`, `/codigo-de-conducta`, `/como-llegar`, `/creditos`) use the template in `app/documento/`; edit their text in `contenido/*.md`, not in the components. Changing a legal text (privacy, code of conduct) needs the team's approval.
- **Shared styles** live in `app/globals.css` (tokens in `:root`, buttons, links, header, form, FAQ, footer, corner engravings, drawn rules `.tz`, plates `.lamina` and the motion rules). What is unique to a section stays in `app/(landing)/landing.css`. Every page root uses `.pagina` (`container-type: inline-size`) so `cqi` units and `@container` queries work.
- **Motion:** only the timing tokens (`--t-fast` 200 ms, `--t-mid` 450 ms, `--t-slow` 900 ms) and the two curves (`--ease-out`, `--ease-io`); only loops and counters keep their own durations. Scroll-linked motion stays in CSS behind `@supports (animation-timeline: view())` and `prefers-reduced-motion: no-preference`.
- **Images:** served from `public/grabados/{vinetas,tramas,esquinas,laminas,signos,agenda}/`, `public/campus/` and `public/logos/`. Each file in `public/grabados/` needs an entry in `assets/creditos.json`. Optimise once when adding them (WebP for large PNGs, `svgo` for potrace SVGs); engravings are tinted with a CSS `mask` over a palette colour.
- **Canvas (exploration only):** https://claude.ai/artifact/89JnFK6ukw8uUHzHYmfoNf (Artifact of the Design type, files under `project/`). `V3.dc.html` is the prototype the code was built from; `Microanimaciones.dc.html` the motion board; `Estilo.dc.html` the style guide. Explorations get their own artboard and, once decided, move to the «Archivo» page. Other people edit the canvas too: re-read a file before republishing it, never resend an old copy. Assets live in its asset store as `/_blob/<id>`; download them into `public/` when they reach the code.
- **`.design-refs/`** (gitignored, never commit it) holds the visual references and the working material:
  - `reticula y composicion/`, `tipografia y jerarquia/`, `webs or motions/`, `detalles y texturas/`: mood references (Pinterest and the like). They are for inspiration only, not for publishing. `detalles y texturas/to_svg/` holds the ones that were vectorised.
  - `grabados/`: engravings ready to use, sorted by use into subfolders (see its `LEEME.md`), cut out and inked in `#2c1425` (ink) or `#7e3a6b` (plum) on transparent. `svg/` holds potrace vectorisations and `creditos-vinetas.json` the source and licence of each one.
  - `pd/`: raw public-domain downloads from Wikimedia Commons, one folder per search (`c_<name>/` plus a `.json` of metadata and a contact-sheet `.png`). `pd/florones/` holds the bookbinding fleurons used in the figures band (credits in `CREDITOS.txt`).
  - `herramientas/`: `cs.py` (Commons search), `cat.py <name> "<Category>"` (downloads a Commons category, PD/CC0 only, into `pd/`), `ink.sh` and `proc2.sh` (remove the paper and ink with ImageMagick). To vectorise, threshold with ImageMagick and then run `potrace -s --color '#2c1425'`.
  - `campus-original/`: EPS skyline buildings and vehicles, with `GRABADO.md` (engraving guide, Sabatini is the reference) and the hatching scripts. `STYLE.md` and the vehicle photos (`cohete.png`, `formula-*.png`…) are the drawing brief for the skyline SVGs in `public/campus/`.
- **Illustration rules:**
  - Only real engravings that are public domain or CC0, recorded with their source and licence (there will be a credits page). Never ornaments drawn by hand in SVG or code.
  - Commons rate-limits original files (HTTP 429). Download thumbnails in its standard widths (330, 500, 960, 1280 px), slowly. For a sharp result at large sizes, vectorise.

## Team workflow

Work on a feature branch and open a pull request. GitHub Actions validates pull requests. Production deployment runs through Cloudflare Workers Builds, connected to this GitHub repository and its `main` branch. Do not deploy from a local CLI, change production settings, or modify production data without an explicit request for that specific action. Keep credentials in Cloudflare or GitHub secrets; never commit `.dev.vars`, local database files, or exports.

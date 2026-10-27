<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Design system

- Read `DESIGN.md` before any UI, admin or email change and follow it; when code disagrees with it, `DESIGN.md` wins. Its colour table and frontmatter are the normative tokens, and `app/globals.css` `:root` is the only place that writes colours (emails excepted). Change both in the same commit and run `npm test`, which fails when they drift. Add new reusable patterns to `DESIGN.md`.
- For every UI change, also read and apply [Emil Design Engineering](.claude/skills/emil-design-eng/SKILL.md) before planning and when reviewing the result. Its interaction and motion principles apply within `DESIGN.md`'s values; it does not authorise new motion, dependencies or effects beyond the task. Vendored from `emilkowalski/skills` at `2d22863` (MIT); update it by copying upstream, not by editing it here.
- After a design change, regenerate `.impeccable/design.json` from `DESIGN.md` so the Impeccable skill does not reintroduce a retired direction.

## Team workflow

Work on a feature branch and open a pull request. GitHub Actions validates pull requests. Production deployment runs through Cloudflare Workers Builds, connected to this GitHub repository and its `main` branch. Do not deploy from a local CLI, change production settings, or modify production data without an explicit request for that specific action. Keep credentials in Cloudflare or GitHub secrets; never commit `.dev.vars`, local database files, or exports.

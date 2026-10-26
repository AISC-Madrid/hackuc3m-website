<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Team workflow

Work on a feature branch and open a pull request. Production deployment runs through the GitHub workflow after changes reach `main`. Do not deploy from a local CLI, change production settings, or modify production data without an explicit request for that specific action. Keep credentials in Cloudflare or GitHub secrets; never commit `.dev.vars`, local database files, or exports.

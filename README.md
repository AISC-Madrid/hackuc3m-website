# HackUC3M ’27

Spanish event site, organizer editor, and priority waitlist. Cloudflare Workers via OpenNext; Cloudflare D1 stores content and waitlist membership. Resend sends confirmations. The confirmed event is **19–20 February 2027, EPS · Campus de Leganés**.

## Local development

Use Node.js 22+ and `npm ci`, then:

```sh
npm run db:local
npm run dev
```

The public page is `/`, the editor is `/admin`, and privacy information is `/privacidad`. Local D1 data lives in `.wrangler/`, separate from production. `npm run preview` builds and runs in the Workers runtime. `npm run build` and `npm run lint` check the application.

## Team workflow and deployment

Use a feature branch, push it to GitHub, and open a pull request. The workflow in `.github/workflows/cloudflare.yml` runs lint and the full Cloudflare build for every PR. Merging into `main` runs the same checks, applies D1 migrations, and deploys that commit from GitHub Actions using the existing `Production` environment. A PR or feature-branch push does not deploy to production.

Before the first GitHub deployment, add `CLOUDFLARE_API_TOKEN` to **GitHub → Settings → Environments → Production → Environment secrets**. Use a Cloudflare token scoped to the AISC account with Workers Scripts Edit, D1 Edit, Account Settings Read, and Workers Routes Edit / Zone Read for `hackuc3m.com`. The workflow fails explicitly if the token is missing. Keep the Resend key in the existing Cloudflare Worker secret; GitHub does not need it to build.

For team review, configure branch protection on `main` to require the `Lint and Cloudflare build` check and the team's chosen review rules. No branch protection rules are changed automatically by this project.

## Cloudflare

The project is configured for the AISC Cloudflare account (`aisc.asoc@uc3m.es`). The `hackuc3m` D1 database is already created in Western Europe. Version database changes in `migrations/`; the GitHub production job applies them. Generate binding types after changing configuration with `npm run cf:typegen`. Use `npm run build:cloudflare` to validate locally and `npm run preview` for the local Workers runtime. Local development and review must not modify production.

`hackuc3m.com/*` is configured as a Worker route in `wrangler.jsonc`. Its DNS record must have the Cloudflare proxy enabled. The direct Worker address is https://hackuc3m.aisc-asoc.workers.dev.

## Organizer access

The editor API denies all access until configured. Create a Cloudflare Access self-hosted application covering **both** `hackuc3m.com/admin*` and `hackuc3m.com/api/admin/*`; allow only `aisc.asoc@uc3m.es` using email one-time PIN. Put the Access team hostname (e.g. `your-team.cloudflareaccess.com`, without `https://`) and application AUD into `ACCESS_TEAM_DOMAIN` and `ACCESS_AUD` in `wrangler.jsonc`, then submit the change through a PR. The backend validates the signed Access JWT, issuer, audience, expiry, algorithm, and organizer email. Forging the email header does not grant access. No local authentication bypass is provided.

The editor publishes date, venue, introduction, tracks, sponsor names/links, FAQs and waitlist status. It exports waitlist membership as CSV in original signup order. Confirmed sponsors are rendered as text links until logo management is added.

## Resend

In the AISC Resend account, verify **hackuc3m.com** using the DNS records Resend provides. Store a sending API key as a Worker secret; never commit it:

```sh
wrangler secret put RESEND_API_KEY
```

The sender is `HackUC3M <hola@hackuc3m.com>`; replies go to `aisc.asoc@uc3m.es`. Add the key to `.dev.vars` only for local email testing. Without the key, signups are still saved and confirmations remain pending. The editor can send pending confirmations in batches of five after configuration. These are real sends; they should be used only for consenting waitlist members. Resend idempotency keys reduce duplicate delivery on retries.

## Priority and registration

Each normalized email has one record. Repeated submissions preserve its original ID and timestamp. The database stores consent version and email status. Signup requests are limited to 60 per IP-derived ten-minute bucket; raw IPs are not stored. The form also has a honeypot, same-origin validation, server validation and a waitlist-open check.

The list records eligibility for priority; registration itself is a future flow. Before opening it, decide the early-access window and connect registration to verified email membership (or hashed invitation tokens). Columns are reserved for invitation tokens, expiry, invitation delivery, and registration. Do not infer a confirmed event place from waitlist membership. No registration invitations are sent automatically.

Before public launch, the organizer should confirm the final privacy contact/retention wording and complete email and Access configuration. No email key, signing secret or personal waitlist export belongs in Git.

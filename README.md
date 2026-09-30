# PayRelief

PayRelief helps people in financial hardship ask their lenders for relief, such as deferments or lower payments. Signed-in users can:

- record the lenders they owe money to ("counterparties"), either by typing them in or by uploading a statement that Claude reads,
- describe their hardship situation,
- generate a script for negotiating with a lender,
- have an AI voice agent (NLPearl) call their bank for them, and follow the call's status live,
- send a hardship notification email from their own Gmail account.

The site also has marketing pages for debtors, credit counselors and lenders.

> **Status:** early-stage / prototype. Several integrations are still stubs or run in sandbox mode. Read [Known gaps](#known-gaps--handoff-notes) before building on anything.

---

## Tech stack

| Area            | Choice                                                               |
| --------------- | -------------------------------------------------------------------- |
| Framework       | Next.js 16 (App Router), React 19, TypeScript                        |
| Styling / UI    | Tailwind CSS v4, shadcn/ui (Radix primitives) in `src/components/ui` |
| Forms           | react-hook-form + zod                                                |
| Auth & database | Supabase (Auth, Postgres with RLS, Realtime)                         |
| AI              | Anthropic Claude API (statement extraction)                          |
| Voice calls     | NLPearl outbound call API + webhook                                  |
| Email           | Gmail API through Google OAuth (one-time `gmail.send` consent)       |
| Bank linking    | Plaid (**sandbox**; not wired into any live flow yet)                |
| Hosting         | Vercel + Vercel Analytics (see [Deployment](#deployment))            |
| Package manager | **pnpm** (`pnpm-lock.yaml` is the lockfile of record)                |

---

## Getting started

### Prerequisites

- Node.js 22.13+ (the minimum for pnpm 11)
- pnpm 11+. `pnpm-workspace.yaml` uses the pnpm 11 `allowBuilds` setting to approve dependency build scripts. Enable it with `corepack enable pnpm` or install it globally.
- Access to the project's Supabase instance, or your own instance (see [Database](#database))
- API credentials for the services listed under [Environment variables](#environment-variables)
- Docker Desktop, only if you want to run Supabase locally

The commands in this README work on macOS, Linux and Windows (PowerShell or Git Bash).

### Install and run

```bash
pnpm install
cp .env.example .env   # then fill in the values (see Environment variables)
pnpm dev
```

On Windows Command Prompt (cmd.exe), use `copy .env.example .env` instead of `cp`.

Then open <http://localhost:3000>.

| Script       | What it does                                                                       |
| ------------ | ---------------------------------------------------------------------------------- |
| `pnpm dev`   | Starts the dev server                                                              |
| `pnpm build` | Builds for production (type errors are **ignored**, see below)                     |
| `pnpm start` | Serves the production build                                                        |
| `pnpm lint`  | Runs ESLint with Next's `core-web-vitals` + TypeScript rules (`eslint.config.mjs`) |

### Environment variables

`.env` is git-ignored. `.env.example` lists every variable with comments on where to find each value. Get the real values from the outgoing team through a password manager or secrets vault, never by committing them. These are the variables the code reads:

| Variable                               | Used by                                                   | Notes                                     |
| -------------------------------------- | --------------------------------------------------------- | ----------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`             | Supabase clients, middleware                              |                                           |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Browser/server Supabase clients                           |                                           |
| `SUPABASE_URL`                         | `api/update-call`                                         | Same value as `NEXT_PUBLIC_SUPABASE_URL`  |
| `SUPABASE_SERVICE_ROLE_KEY`            | `api/update-call`, `api/auth/google/*`                    | Admin key that bypasses RLS. Server only  |
| `SUPABASE_SECRET_KEY`                  | `api/make-call`                                           | Admin key that bypasses RLS. Server only  |
| `NEXT_PUBLIC_APP_URL`                  | Google OAuth callback redirects                           | e.g. `http://localhost:3000`              |
| `ANTHROPIC_API_KEY`                    | `lib/anthropic-client.ts` (read by the SDK automatically) |                                           |
| `NLPEARL_ACCOUNT_ID`                   | `api/make-call`                                           |                                           |
| `NLPEARL_SECRET_KEY`                   | `api/make-call`                                           |                                           |
| `NLPEARL_PEARL_ID`                     | `api/make-call`                                           | ID of the NLPearl outbound agent          |
| `GOOGLE_CLIENT_ID`                     | `api/auth/google/*`                                       |                                           |
| `GOOGLE_CLIENT_SECRET`                 | `api/auth/google/*`                                       |                                           |
| `GOOGLE_REDIRECT_URI`                  | `api/auth/google/*`                                       | Must point to `/api/auth/google/callback` |
| `PLAID_CLIENT_ID`                      | `lib/plaid-client.ts`                                     | Sandbox credentials                       |
| `PLAID_SECRET`                         | `lib/plaid-client.ts`                                     | Sandbox credentials                       |

The local `.env` also has `POSTGRES_*`, `SUPABASE_JWT_SECRET` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, which the Vercel ↔ Supabase integration adds automatically. The application code does not use them.

---

## Project structure

```
src/
├── app/
│   ├── page.tsx                    # Home / landing page
│   ├── (auth)/                     # login, signup, verify-email
│   ├── (app)/
│   │   ├── dashboard/              # Signed-in app (sidebar layout)
│   │   │   ├── page.tsx            #   Call Records (live via Supabase Realtime)
│   │   │   ├── counterparties/     #   Add / upload / delete lenders
│   │   │   ├── situation/          #   Hardship situation wizard
│   │   │   ├── generate/           #   Negotiation script wizard
│   │   │   ├── settings/           #   Placeholder ("Coming soon")
│   │   │   └── support/            #   Placeholder ("Coming soon")
│   │   ├── deferment-notification/ # Start an AI call to a bank
│   │   ├── notify/                 # Send a hardship email through the user's Gmail
│   │   ├── profile/
│   │   ├── for-debtors/ for-counselors/ for-lenders/   # Marketing pages
│   │   └── test/                   # Scratch page, safe to delete
│   ├── actions/                    # Server actions (banks, counterparties, situations)
│   └── api/                        # Route handlers (see API routes)
├── components/
│   ├── ui/                         # shadcn/ui primitives (generated, see components.json)
│   ├── sections/                   # Page sections, grouped by audience
│   ├── layout/                     # navbar, footer
│   └── auth/AuthGuard.tsx          # Client-side redirect when the session ends
├── context/                        # AuthProvider, CallRecordsProvider
├── hooks/
├── lib/
│   ├── supabase/                   # client.ts (browser), server.ts, proxy.ts (middleware session)
│   ├── auth/protected-paths.ts     # Single list of auth-protected routes
│   ├── anthropic-client.ts, plaid-client.ts
│   ├── statement-extraction.ts     # zod schema for Claude's structured output
│   └── bank-matching.ts            # Matches an extracted institution to the `banks` table
├── types/nlpearl-call-webhooks.ts
└── proxy.ts                        # Next.js middleware: refreshes the Supabase session, guards routes
```

### Auth

Supabase Auth with cookie sessions via `@supabase/ssr`. `src/proxy.ts` refreshes the session on every request and redirects signed-out users away from the paths in `lib/auth/protected-paths.ts` (right now `/dashboard` and `/deferment-notification`). `AuthGuard` handles the same redirect on the client if the session ends while a page is open. To protect a new route, add it to `PROTECTED_PATHS`.

### API routes

| Route                                     | Method | Purpose                                                                                                                              |
| ----------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `/api/make-call`                          | POST   | Creates an NLPearl outbound lead to call the user's bank and inserts a `call_records` row                                            |
| `/api/update-call`                        | POST   | **NLPearl webhook.** Updates the matching `call_records` row with status, outcome and summary                                        |
| `/api/counterparties/extract-statement`   | POST   | Sends an uploaded statement (PDF/PNG/JPEG, ≤15 MB, kept in memory only) to Claude and returns extracted fields plus the matched bank |
| `/api/auth/google`                        | POST   | Stores the pending email in `oauth_state` and returns the Google consent URL                                                         |
| `/api/auth/google/callback`               | GET    | Exchanges the code, sends the email through Gmail, then redirects back                                                               |
| `/api/auth/confirm`                       | GET    | Supabase email verification (OTP token hash)                                                                                         |
| `/api/link`, `/api/exchange-public-token` | POST   | Plaid Link token creation and exchange (sandbox, unused by the UI)                                                                   |
| `/api/test`                               | GET    | Hello-world test route, safe to delete                                                                                               |

---

## Database

The app uses these Supabase tables:

| Table            | Purpose                                                                        |
| ---------------- | ------------------------------------------------------------------------------ |
| `counterparties` | A user's lenders (RLS: owner only)                                             |
| `situations`     | One hardship situation per user (RLS: owner only)                              |
| `call_records`   | AI call history; the dashboard subscribes to it through Realtime               |
| `banks`          | Bank directory with deferment phone numbers and hours, filtered on `is_active` |
| `oauth_state`    | Short-lived (10 min) nonce plus pending email for the Gmail OAuth flow         |

The schema lives in `supabase/migrations/`:

- `20260306142838_create_signups_table.sql`: waitlist table from an earlier experiment
- `20260930083909_remote_schema.sql`: baseline of every other table, RLS policy and the Realtime publication, pulled from the live database
- `20260930092614_drop_signups_table.sql`: drops the waitlist table after the feature was removed

All three have been applied to the production database. Don't delete or edit migrations that have already been applied, including the waitlist pair. The remote migration history records them, and the CLI refuses to run if local files don't match it. Check sync status with `pnpm supabase migration list`.

`supabase/seed.sql` loads the `banks` reference data. To run a full local copy (needs Docker):

```bash
pnpm supabase start      # local Supabase stack
pnpm supabase db reset   # applies the migrations, then seed.sql
```

Make future schema changes as migrations (`pnpm supabase migration new <name>`), not in the dashboard, so the repo stays the source of truth.

---

## Deployment

The project was originally scaffolded with [v0](https://v0.app) and deploys on Vercel. **Every merge to `main` deploys automatically.** Transfer the Vercel project access and the production environment variables along with the repo. v0 isn't needed for further development; the repo is the source of truth.

External services that need production configuration:

- **NLPearl:** the Pearl's webhook URL must point at `https://<domain>/api/update-call`.
- **Google Cloud OAuth client:** authorized redirect URI `https://<domain>/api/auth/google/callback`. The `gmail.send` scope is sensitive, so Google must verify the app before non-test users can use it.
- **Supabase Auth:** site URL and redirect URLs must include the production domain.

---

## Known gaps / handoff notes

Listed roughly by priority.

**Security**

- `/api/update-call` does not authenticate its caller. Anyone who knows a `pearlId` and `leadId` can overwrite a call record. Add NLPearl signature or shared-secret verification.
- `/api/exchange-public-token` logs the Plaid `access_token` to the console and does not store it (see its `TODO`).

**Incomplete features**

- **Script generation is mocked.** `requestScript()` in `dashboard/generate/_components/ScriptResultStep.tsx` returns a template after a fake delay. Nothing calls Claude yet.
- `/api/make-call` sends a **hard-coded caller name ("John Doe")** and account type (`"Credit"`) to NLPearl.
- Plaid runs in sandbox with a hard-coded `client_user_id` and is not used by any page. There's a commented-out Plaid Link integration in `components/sections/deferment/deferment-hero.tsx`.
- Dashboard **Settings** and **Support** pages are placeholders.
- `/api/auth/confirm` redirects failures to `/auth/auth-code-error`, which does not exist.

**Code health**

- `next.config.mjs` sets `typescript.ignoreBuildErrors: true`, so type errors don't fail the build. `pnpm tsc --noEmit` currently passes with no errors, so this can be removed to catch new type errors.
- `pnpm lint` reports existing findings (25 errors, 30 warnings), mostly unescaped `'` in JSX text, unused variables, and `setState` calls inside effects. None of them block the build. There are no automated tests.
- ESLint is pinned to v9 because `eslint-plugin-react`, bundled with `eslint-config-next`, doesn't support ESLint 10 yet (it crashes with `getFilename is not a function`). Upgrade once `eslint-config-next` supports v10.
- Supabase admin credentials are inconsistent: `make-call` uses `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SECRET_KEY`, while `update-call` and the Google routes use `SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`. Pick one pair.
- `/test` and `/api/test` are leftover scratch routes.
- The statement extraction model is hard-coded in `api/counterparties/extract-statement/route.ts`.

---

## Resources

- [Next.js docs](https://nextjs.org/docs) · [Supabase SSR auth guide](https://supabase.com/docs/guides/auth/server-side/nextjs) · [shadcn/ui](https://ui.shadcn.com)
- [Anthropic API docs](https://docs.claude.com) · [NLPearl docs](https://developers.nlpearl.ai) · [Plaid docs](https://plaid.com/docs)

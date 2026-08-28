# AGENT.md — AG Appliance Service

Guidance for AI coding agents (Claude Code, Cursor, Copilot, etc.) working in this repository.
**Author / maintainer:** Avijit Ghosh

## Project

- Single-page marketing + booking website for **AG Appliance Services, Kolkata**
  (AC, refrigerator, geyser, microwave, mixer grinder, induction, PCB/electrical repair).
- Design reference: `../mockup/ag-appliance-mockup-v3.html` (light) and `-v3-dark.html`.
- Brand palette: charcoal `#121212`, copper `#B8712F`, copper-2 `#D4924A`, gold `#E8B25C`,
  cream `#FBF8F3`. Font: Poppins.

## Stack

| Area       | Choice                                                                    |
| ---------- | ------------------------------------------------------------------------- |
| Framework  | Next.js **16.3.3**, App Router, React 19, TypeScript                      |
| Styling    | Tailwind CSS v4 (`src/app/globals.css`) + shadcn/ui (`src/components/ui`) |
| State      | Zustand stores in `src/store/`                                            |
| Validation | Zod — schemas in `src/lib/validations/`, env in `src/lib/env.ts`          |
| Database   | MongoDB via Mongoose — `src/lib/db/mongoose.ts`, models in `src/models/`  |
| Hosting    | Vercel (`vercel.json`, region bom1) + Docker for self-hosting             |
| Lint       | ESLint 9 flat config (`eslint.config.mjs`) + Prettier                     |
| Hooks      | Husky (`.husky/`) → lint-staged, commitlint (Conventional)                |
| Container  | `Dockerfile` (standalone prod), `Dockerfile.dev`, compose                 |
| Logging    | `src/lib/logger.ts` → `logs/app.log`, `logs/error.log`                    |

## Layout

```
src/
  app/            # routes (App Router). page.tsx, layout.tsx, api/*/route.ts
  lib/            # logger, db/mongoose.ts, env.ts, validations/*.ts (zod), utils.ts (cn)
  models/         # Mongoose schemas/models (PascalCase, one per file)
  store/          # Zustand stores (useXxxStore.ts) — UI state only
  hooks/          # React Query hooks (use-xxx.ts) — server state
  components/     # UI components; components/ui = shadcn (don't hand-edit heavily)
public/           # static assets
logs/             # runtime logs (git-ignored except .gitkeep / app.log seed)
```

## Architecture map

- **Public site**: `src/app/page.tsx` (Server Component) → `getSiteContent()` (`src/lib/content/get-content.ts`)
  → section components in `src/components/site/*`. Styles: `src/styles/site.css` (mockup CSS scoped
  under `.site`; keep selectors, don't rewrite in Tailwind — the design is the spec).
- **Content model**: Zod schemas in `src/lib/validations/content.ts` → Mongoose models in
  `src/models/*` → defaults/seed in `src/lib/content/defaults.ts`. Adding a field = add it to the Zod
  schema, the defaults, the site component and (if editable) `ITEM_FIELDS` in
  `components/dashboard/section-editor.tsx`.
- **API**: `src/lib/api-helpers.ts` (`handle`, `requireUser`, `parseBody`, `ok`, `revalidateSite`).
  Every admin mutation calls `revalidateSite()` so the ISR'd home page refreshes.
- **Auth**: `src/auth.ts` (Auth.js v5 credentials, JWT) + `src/proxy.ts` route guard. Roles:
  `owner` (approve users) / `admin`. Statuses: `pending` → `active` / `disabled`.
- **Dashboard**: `src/app/dashboard/*` pages are thin; logic lives in `src/components/dashboard/*`
  with React Query hooks from `src/hooks/use-admin.ts`.

## Rules for agents

1. **TypeScript only** — no `.js`/`.jsx` in `src/`. Prefer `interface` over `type` for objects.
2. Use `import type` / inline type imports; ESLint enforces `consistent-type-imports`.
3. Run `npm run lint && npm run typecheck && npm run format:check` before finishing a task.
   Commits are blocked by Husky if lint-staged fails.
4. Server Components by default; add `"use client"` only when the component needs state,
   effects, or browser APIs.
5. Never `console.log` in app code — use `logger` from `@/lib/logger` (server) instead.
6. Do not edit `next-env.d.ts`, `package-lock.json` by hand, or files under `.next/`.
7. Keep `README.md` and this file in sync when adding scripts, env vars, or services.
8. Commit messages follow Conventional Commits (`feat:`, `fix:`, `chore:` …).
9. Environment variables: document every new one in `.env.example`. Public ones must be
   prefixed `NEXT_PUBLIC_`.
10. Do not commit `.env`, logs, or build output.
11. Add UI primitives with `npx shadcn@latest add <name>` rather than hand-writing them; compose
    them into feature components outside `components/ui`.
12. Every API route touching the DB must `await connectDB()` first and reuse models from
    `src/models/` (guarded with `models.X ?? model(...)` for hot reload).
13. Zustand stores are client-only — never import them in Server Components.
14. Fetch server data with React Query hooks in `src/hooks/` (via `apiFetch`), never with raw
    `fetch` + `useEffect`; keep query keys in a `xxxKeys` factory. Zustand is for UI state only.
15. Validate all external input (request bodies, search params, env) with Zod schemas from
    `src/lib/validations/`; use `safeParse` and return 422 with `fieldErrors()` on failure.

## Useful commands

```bash
npm run dev            # http://localhost:3000
npm run build && npm start
npm run lint / lint:fix
npm run format / format:check
npm run typecheck
docker compose up --build web                    # production image
docker compose --profile dev up --build web-dev  # dev with hot reload
```

# AG Appliance Service

Website for **AG Appliance Services, Kolkata** — reliable home-appliance repair
(AC, refrigerator, geyser, microwave, mixer grinder, induction, PCB/electrical).

**Author:** Avijit Ghosh

Built with [Next.js](https://nextjs.org) **16.3.3** (App Router), React 19, TypeScript,
Tailwind CSS v4, [shadcn/ui](https://ui.shadcn.com), [Zustand](https://zustand.docs.pmnd.rs),
MongoDB ([Mongoose](https://mongoosejs.com)), [Zod](https://zod.dev) validation, [TanStack Query](https://tanstack.com/query) data fetching. Deployed on
[Vercel](https://vercel.com).

---

## Requirements

- Node.js ≥ 20 (project developed on Node 24)
- npm ≥ 10
- Docker + Docker Compose (optional, for containerised runs)

## Getting started

```bash
npm install
cp .env.example .env      # adjust values if needed
npm run dev               # → http://localhost:3000
```

## Scripts

| Script                 | What it does                                                 |
| ---------------------- | ------------------------------------------------------------ |
| `npm run dev`          | Start dev server with hot reload                             |
| `npm run build`        | Production build (standalone output)                         |
| `npm run start`        | Serve the production build                                   |
| `npm run lint`         | ESLint over the whole project                                |
| `npm run lint:fix`     | ESLint with auto-fix                                         |
| `npm run format`       | Prettier — write                                             |
| `npm run format:check` | Prettier — check only (CI friendly)                          |
| `npm run typecheck`    | `tsc --noEmit`                                               |
| `npm run check`        | lint + typecheck + format:check                              |
| `npm run prepare`      | Installs Husky git hooks (runs on npm install)               |
| `npm run db:seed`      | Seed MongoDB with the mockup content (`-- --force` to reset) |
| `npm run db:up/down`   | Start / stop MongoDB container (optional)                    |
| `npm run vercel:*`     | link, env pull, preview, deploy (see Vercel)                 |

## What's inside

| Part          | Where                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------- |
| **Website**   | `/` — single page, pixel-matched to `../mockup/ag-appliance-mockup-v3(.dark).html`       |
| **API**       | `/api/*` public (bookings, enquiries, content, health) · `/api/admin/*` (auth required)  |
| **Dashboard** | `/dashboard` — banners, menus, page content, settings, bookings, enquiries, users        |
| **Auth**      | `/login`, `/register` — Auth.js credentials; first account = owner, others need approval |

### Content model (MongoDB)

| Collection     | Purpose                                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `sitesettings` | business name, phone, WhatsApp, email, hours, logo, social, SEO                                                                 |
| `menus`        | `header`, `footerQuick`, `footerServices` link lists                                                                            |
| `banners`      | hero slides (heading, accent, text, CTAs, image, trust badges)                                                                  |
| `sections`     | one doc per section key: stats, services, serviceCategories, why, steps, video, testimonials, gallery, brands, areas, faqs, cta |
| `bookings`     | service requests from the website booking dialog                                                                                |
| `enquiries`    | contact-form messages                                                                                                           |
| `users`        | dashboard accounts (`owner` / `admin`, `pending` / `active` / `disabled`)                                                       |

All shapes are defined once with Zod in `src/lib/validations/content.ts` and reused by the
Mongoose models, API routes, dashboard editors and the site components. `npm run db:seed`
loads the approved mockup copy (`src/lib/content/defaults.ts`); `-- --force` resets to it.

### Local MongoDB (Compass)

`.env` points at a local `mongod`: `MONGODB_URI=mongodb://127.0.0.1:27017`, `MONGODB_DB=ag_appliance`.
Open the same URI in MongoDB Compass to browse the collections. (Docker Compose also ships a
`mongo` service if you prefer a container.)

### Dashboard accounts

1. Visit `/register` — the **first** account becomes the active **owner**.
2. Every later registration is created as `pending`; the owner approves it under
   **Dashboard → Users**.
3. `AUTH_SECRET` in `.env` signs the session JWT (`openssl rand -base64 32`).

### Theming

Brand colours live in `src/app/globals.css` as shadcn tokens (`--primary` = copper …) and as
Tailwind utilities (`bg-brand-copper`, `text-brand-gold`, …). The public page uses
`src/styles/site.css` — the mockup's CSS ported 1:1 and scoped under `.site`, with dark mode
driven by the `dark` class on `<html>` (next-themes).

## Stack details

### Tailwind CSS v4 + shadcn/ui

- Tailwind v4 is configured CSS-first in `src/app/globals.css` (no `tailwind.config`).
- shadcn/ui is initialised (`components.json`, base colour _neutral_, CSS variables, lucide icons).
  Components live in `src/components/ui/` — installed: `button`, `card`, `input`, `label`,
  `textarea`, `badge`, `sonner`. Add more with `npx shadcn@latest add <name>`.
- `cn()` helper: `src/lib/utils.ts`.

### Zustand (state)

- `src/store/useBookingStore.ts` — booking-form draft (persisted to `localStorage`), submit state.
- `src/store/useUiStore.ts` — theme + mobile nav.
- Stores are client-only; import them inside `"use client"` components.

### MongoDB (Mongoose)

- Connection helper: `src/lib/db/mongoose.ts` → `await connectDB()` (cached across hot reloads and
  serverless invocations).
- Models: `src/models/Booking.ts` (example schema with validation).
- API: `GET/POST /api/bookings`.
- Local database: `npm run db:up` (starts the `mongo` service from `docker-compose.yml`) and set
  `MONGODB_URI=mongodb://root:example@localhost:27017` in `.env`. For production use a MongoDB
  Atlas URI.

### Zod (validation)

- `src/lib/validations/booking.ts` — `bookingInputSchema` used by `POST /api/bookings`; the same
  schema can be reused client-side for form validation. `fieldErrors()` flattens issues to
  `{ field: message }`.
- `src/lib/env.ts` — validates `process.env` at startup; import `env` instead of `process.env`.

### TanStack React Query (server state)

- `src/lib/query-client.ts` — `getQueryClient()` (per-request on server, singleton in browser).
- `src/components/providers/query-provider.tsx` — `QueryProvider` (+ Devtools in dev), mounted in
  `src/app/layout.tsx`.
- `src/lib/api-client.ts` — `apiFetch<T>()` typed wrapper that throws `ApiError` (status, fields).
- `src/hooks/use-bookings.ts` — `useBookings()` / `useCreateBooking()` with `bookingKeys` factory.
- ESLint runs `@tanstack/eslint-plugin-query` (exhaustive query keys, stable query client…).

Rule of thumb: **Zustand** for client/UI state, **React Query** for anything fetched from the API.

## Code quality

- **ESLint 9** flat config in [`eslint.config.mjs`](eslint.config.mjs): Next.js core-web-vitals +
  TypeScript (type-aware), React/hooks, import ordering, unused-imports, code-smell rules
  (complexity, max-depth, no-nested-ternary, eqeqeq …) and Prettier integration.
- **Prettier** config in [`.prettierrc`](.prettierrc) (Tailwind class sorting plugin enabled).
- **Husky** hooks in [`.husky/`](.husky/):
  - `pre-commit` → `lint-staged` (ESLint `--fix --max-warnings=0` + Prettier on staged files)
  - `commit-msg` → `commitlint` (Conventional Commits)

## Docker

```bash
# Production image (multi-stage, non-root, healthcheck on /api/health)
docker compose up --build web
# or
docker build -t ag-appliance-service . && docker run -p 3000:3000 ag-appliance-service

# Development with hot reload (source bind-mounted)
docker compose --profile dev up --build web-dev
```

Logs from the container are persisted to `./logs` via a bind mount.

## Vercel

Config: [`vercel.json`](vercel.json) (framework `nextjs`, region `bom1` — Mumbai, security headers)
and [`.vercelignore`](.vercelignore). The Vercel CLI is a dev dependency.

```bash
npx vercel login              # once
npm run vercel:link           # link this folder to a Vercel project
npm run vercel:env            # pull project env vars into .env.local
npm run vercel:preview        # preview deployment
npm run vercel:deploy         # production deployment (vercel --prod)
```

Set these Environment Variables in the Vercel dashboard (Project → Settings → Environment
Variables): `MONGODB_URI`, `MONGODB_DB`, `LOG_LEVEL`, `NEXT_PUBLIC_SITE_URL`,
`NEXT_PUBLIC_BUSINESS_NAME`, `NEXT_PUBLIC_PHONE`. On Vercel the filesystem is read-only except
`/tmp`, so set `LOG_DIR=/tmp/logs` there (console output is captured by Vercel Logs anyway).

Connecting the GitHub repo in the Vercel dashboard gives automatic preview deployments per PR and
production deploys on `main`.

## Logging

`src/lib/logger.ts` writes newline-delimited JSON to `logs/app.log` (all levels) and
`logs/error.log` (errors only). Control with `LOG_LEVEL` (`error|warn|info|debug`) and
`LOG_DIR` in `.env`.

```ts
import { logger } from "@/lib/logger";
logger.info("Booking created", { bookingId });
```

## Project structure

```
ag-appliance-service/
├── src/
│   ├── app/
│   │   ├── page.tsx         # public single-page website
│   │   ├── (auth)/          # /login, /register
│   │   ├── dashboard/       # admin UI (sidebar layout)
│   │   └── api/             # public + admin route handlers, auth
│   ├── components/site/     # website sections (hero, services, gallery, faqs…)
│   ├── components/dashboard # editors, tables, sidebar
│   ├── components/auth/     # login/register forms
│   ├── components/ui/       # shadcn/ui components
│   ├── components/providers # QueryProvider
│   ├── hooks/               # React Query hooks (use-bookings.ts)
│   ├── lib/                 # logger, db/mongoose, env (zod), validations/, utils (cn)
│   ├── models/              # Mongoose models
│   └── store/               # Zustand stores
├── public/                  # static assets
├── logs/                    # runtime logs
├── .husky/                  # git hooks
├── Dockerfile               # production image
├── Dockerfile.dev           # dev image
├── docker-compose.yml       # web, web-dev, mongo
├── vercel.json
├── components.json          # shadcn/ui
├── eslint.config.mjs
├── .prettierrc
├── AGENT.md                 # instructions for AI coding agents
└── README.md
```

## License

Private — © 2026 AG Appliance Services. All rights reserved.

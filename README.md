# ag-appliance-services

> Personal portfolio site for **Avijit Ghosh** — a modern, animated, single-page
> portfolio built with Next.js 16, React 19 and Tailwind CSS 4.

A fast, accessible, dark-first portfolio that showcases experience, skills,
projects, services and a blog. Content is served through a React Query data
layer (with simulated latency) so loading states and skeletons behave like a
real API-backed app.

---

## Tech stack

| Area          | Technology |
| ------------- | ---------- |
| Framework     | [Next.js 16](https://nextjs.org) (App Router) |
| UI runtime    | React 19.2 |
| Language      | TypeScript 5 |
| Styling       | Tailwind CSS 4, `tw-animate-css`, custom CSS (`src/styles`) |
| Components    | [shadcn/ui](https://ui.shadcn.com) on `@base-ui/react`, `lucide-react` icons |
| Data / state  | [TanStack React Query 5](https://tanstack.com/query) |
| Theming       | `next-themes` (dark default, class strategy) |
| Sliders       | [Swiper 14](https://swiperjs.com) |
| Animations    | AOS (scroll reveal), custom cursor, preloader |
| Notifications | `sonner` |
| Fonts         | Space Grotesk + IBM Plex Mono via `next/font` |

---

## Project structure

```
src/
├── app/                      # App Router routes
│   ├── layout.tsx            # Root layout: fonts, metadata, providers, chrome
│   ├── page.tsx              # Home (single-page portfolio, section-composed)
│   ├── providers.tsx         # React Query + next-themes providers
│   ├── not-found.tsx         # 404
│   ├── globals.css
│   └── blog/
│       ├── page.tsx          # Blog listing
│       └── [slug]/page.tsx   # Blog article (statically generated)
├── components/
│   ├── home/                 # Hero, About, Services, Stats, Skills, Experience,
│   │                         #   Projects, Education, Workflow, Features,
│   │                         #   Testimonials, BlogSlider, Contact
│   ├── layout/               # Header, footer, cursor, preloader, to-top, chrome
│   ├── blog/                 # Listing, post card, article content
│   ├── common/               # AOS provider, counter, animated headings
│   └── ui/                   # shadcn/ui primitives
├── lib/
│   ├── api.ts                # Fake API (wraps static data with a delay)
│   ├── types.ts              # Shared TypeScript types
│   ├── utils.ts              # cn() and helpers
│   ├── data/                 # Static content: portfolio, posts, site, footer
│   └── hooks/                # React Query hooks + UI hooks
└── styles/                   # portfolio.css, responsive.css
public/assets/                # Images and background videos
```

### How the data layer works

All content is static and lives in [`src/lib/data/`](src/lib/data/). The
[`api.ts`](src/lib/api.ts) module wraps that data in a ~700 ms `delay()` to
simulate a network round-trip, and React Query hooks in
[`src/lib/hooks/use-portfolio-data.ts`](src/lib/hooks/use-portfolio-data.ts)
consume it — so skeletons and loading states behave like a real backend. There
is no external API or database.

### Routes

| Path           | Description |
| -------------- | ----------- |
| `/`            | Home — all portfolio sections on one page |
| `/blog`        | Blog listing |
| `/blog/[slug]` | Blog article — pre-rendered via `generateStaticParams` |

---

## Getting started (local development)

**Prerequisites:** Node.js 20+ (Node 22 LTS recommended) and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### npm scripts

| Script          | Description |
| --------------- | ----------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Production build (emits `.next/standalone`) |
| `npm run start` | Serve the production build |
| `npm run lint`  | Run ESLint |

---

## Running with Docker

The app ships with a production-ready, multi-stage Docker setup that uses
Next.js `output: "standalone"` for a small runtime image (no full
`node_modules` in the final layer), running as a non-root user.

### Using Docker Compose (recommended)

```bash
# Build and run
docker compose up --build

# Run in the background
docker compose up -d

# Stop and remove
docker compose down
```

The app is served at [http://localhost:3000](http://localhost:3000).

### Using Docker directly

```bash
# Build the image
docker build -t ag-appliance-services .

# Run the container
docker run --rm -p 3000:3000 ag-appliance-services
```

### Docker setup details

| File                 | Purpose |
| -------------------- | ------- |
| `Dockerfile`         | 3-stage build: `deps` → `builder` → `runner` |
| `.dockerignore`      | Keeps build context small; excludes secrets & artifacts |
| `docker-compose.yml` | One-command build/run with healthcheck & restart policy |

**Configurable environment variables** (already defaulted in the image):

| Variable                  | Default   | Description |
| ------------------------- | --------- | ----------- |
| `PORT`                    | `3000`    | Port the server listens on |
| `HOSTNAME`                | `0.0.0.0` | Bind address |
| `NODE_ENV`                | `production` | Runtime environment |
| `NEXT_TELEMETRY_DISABLED` | `1`       | Disables Next.js telemetry |

To override the Node base image at build time:

```bash
docker build --build-arg NODE_VERSION=20-alpine -t ag-appliance-services .
```

---

## Deployment

The standalone output can be deployed to any Node host or container platform.
After `npm run build`, the self-contained server lives at
`.next/standalone/server.js` (with `public/` and `.next/static/` copied
alongside it — the Dockerfile does this automatically).

---

## License

Released under the [GPL-3.0](LICENSE) license.

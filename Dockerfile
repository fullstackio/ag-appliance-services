# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# ag-appliance-services — production Dockerfile
#
# Multi-stage build for a Next.js 16 app using `output: "standalone"`.
#   1. deps    — install all dependencies (cached on lockfile changes)
#   2. builder — compile the Next.js production build
#   3. runner  — minimal runtime image (standalone server + static assets)
#
# Final image runs as a non-root user and serves on PORT (default 3000).
# ---------------------------------------------------------------------------

# Pin to an Active-LTS Node on Alpine for a small, reproducible base image.
ARG NODE_VERSION=22-alpine

# --- 1. deps -----------------------------------------------------------------
FROM node:${NODE_VERSION} AS deps
WORKDIR /app

# libc6-compat helps some native npm deps run on Alpine's musl libc.
RUN apk add --no-cache libc6-compat

# Install against the lockfile only, so this layer is cached until deps change.
COPY package.json package-lock.json ./
RUN npm ci

# --- 2. builder --------------------------------------------------------------
FROM node:${NODE_VERSION} AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Skip Next.js telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# --- 3. runner ---------------------------------------------------------------
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run as an unprivileged user.
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# `public/` and `.next/static` are NOT bundled into the standalone server by
# default, so copy them alongside it. The standalone output already contains
# the trimmed node_modules + server.js.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Minimal server produced by `output: "standalone"` (replaces `next start`).
CMD ["node", "server.js"]

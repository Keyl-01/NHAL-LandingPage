# NHAL Landing Page

Landing page for **Ngày Hội An Lạc – Healing Day**, a series of free mental-health support events initiated by Dr. Lê Nguyên Phương and a community of learners.

The site is a single page whose content is fully editable from a CMS. It is built with [Payload CMS 3](https://payloadcms.com) running inside a [Next.js](https://nextjs.org) app, backed by PostgreSQL.

## Table of contents

- [Tech stack](#tech-stack)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Content model](#content-model)
- [Database migrations](#database-migrations)
- [Testing](#testing)
- [Deployment](#deployment)
- [Operations](#operations)
- [License](#license)

## Tech stack

| Area      | Technology                                                        |
| --------- | ----------------------------------------------------------------- |
| Framework | Next.js 16 (App Router, standalone output), React 19              |
| CMS       | Payload CMS 3 (admin panel, REST and GraphQL APIs, live preview)  |
| Database  | PostgreSQL 17 via `@payloadcms/db-postgres`                       |
| Styling   | Tailwind CSS 4, shadcn/ui (Radix UI), SCSS modules, Framer Motion |
| Editor    | Lexical rich text                                                 |
| Testing   | Vitest (integration), Playwright (end-to-end)                     |
| Tooling   | TypeScript, ESLint, Prettier, pnpm                                |
| Runtime   | Node.js 22, Docker / Docker Compose                               |

## Features

- **Block-based page builder**: the home page is a Payload global made of reorderable blocks (hero, about, services, testimonials, gallery, sponsors, and more).
- **Drafts, autosave, and scheduled publishing** with live preview at mobile, tablet, and desktop breakpoints.
- **SEO fields** (title, description, Open Graph image) via `@payloadcms/plugin-seo`, with sensible defaults.
- **Image uploads** with focal point, resizing, and folders, processed by `sharp`.
- **First admin bootstrap**: an admin user is created from environment variables on first boot.
- **Transactional email** over SMTP (for example, password reset), falling back to console logging when SMTP is not configured.
- **Production-ready Docker setup**: multi-stage image, automatic migrations on boot, health check, and log rotation.

## Prerequisites

- [Node.js](https://nodejs.org) **22 or later**
- [pnpm](https://pnpm.io) **11.24.0** (the version pinned in `package.json`; run `corepack enable` to use it automatically)
- [Docker](https://docs.docker.com/get-docker/) with Docker Compose, for the local PostgreSQL database

## Getting started

1. **Clone the repository**

   ```bash
   git clone git@github.com:Keyl-01/NHAL-LandingPage.git
   cd NHAL-LandingPage
   ```

2. **Configure the environment**

   ```bash
   cp .env.example .env
   ```

   Set at least `PAYLOAD_SECRET` and `PREVIEW_SECRET` (generate each with `openssl rand -hex 32`). To have an admin account created for you, also set `PAYLOAD_ADMIN_EMAIL` and `PAYLOAD_ADMIN_PASSWORD`. See [Environment variables](#environment-variables).

3. **Start PostgreSQL**

   ```bash
   docker compose -f docker-compose.dev.yml up -d
   ```

   This starts only the database, on `127.0.0.1:5432`, using the `POSTGRES_*` values from `.env`. Keep `DATABASE_URL` in sync with them.

4. **Install dependencies and start the dev server**

   ```bash
   pnpm install
   pnpm dev
   ```

5. **Open the app**

   - Website: <http://localhost:3000>
   - Admin panel: <http://localhost:3000/admin>

   If you did not set `PAYLOAD_ADMIN_*`, the admin panel will ask you to create the first user.

In development, Payload pushes schema changes to the database automatically, and changes in `src/` are hot-reloaded. Uploaded files are stored in `public/media/`, which is git-ignored.

## Environment variables

All variables are documented in [`.env.example`](.env.example).

| Variable                                            | Required | Description                                                                                                                              |
| --------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`                                      | Dev only | PostgreSQL connection string for `pnpm dev`. Docker Compose builds it from the `POSTGRES_*` values in production.                        |
| `PAYLOAD_SECRET`                                    | Yes      | Secret used to sign auth tokens.                                                                                                         |
| `PREVIEW_SECRET`                                    | Yes      | Secret that protects the draft preview route.                                                                                            |
| `NEXT_PUBLIC_SERVER_URL`                            | Yes      | Public site URL, without a trailing slash. It is inlined into the client bundle at build time, so rebuild after changing it.             |
| `PAYLOAD_ADMIN_EMAIL`, `PAYLOAD_ADMIN_PASSWORD`     | No       | Creates the first admin user on boot, only when the `users` table is empty. Remove them from the server `.env` after the first start.    |
| `PAYLOAD_ADMIN_NAME`                                | No       | Display name of that admin user. Defaults to `Admin`.                                                                                    |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`  | No       | SMTP server for outgoing email. Leave `SMTP_HOST` empty to log emails to the console. Port `465` uses implicit TLS; `587` uses STARTTLS. |
| `SMTP_FROM_ADDRESS`, `SMTP_FROM_NAME`               | No       | Sender address and name.                                                                                                                 |
| `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` | Yes      | Credentials of the PostgreSQL container. The password is only applied when the data volume is first created.                             |
| `POSTGRES_PORT`, `APP_PORT`, `PGADMIN_PORT`         | No       | Host ports, bound to `127.0.0.1` only. Default to `5432`, `3000`, and `5050`.                                                            |
| `PGADMIN_EMAIL`, `PGADMIN_PASSWORD`                 | pgAdmin  | Login for the optional pgAdmin service.                                                                                                  |

## Available scripts

| Command                      | Description                                                 |
| ---------------------------- | ----------------------------------------------------------- |
| `pnpm dev`                   | Start the development server.                               |
| `pnpm devsafe`               | Clear the `.next` cache, then start the development server. |
| `pnpm build`                 | Create a production build.                                  |
| `pnpm start`                 | Serve the production build.                                 |
| `pnpm lint`                  | Run ESLint.                                                 |
| `pnpm test`                  | Run integration tests, then end-to-end tests.               |
| `pnpm test:int`              | Run Vitest integration tests.                               |
| `pnpm test:e2e`              | Run Playwright end-to-end tests.                            |
| `pnpm generate:types`        | Regenerate `src/payload-types.ts` from the Payload config.  |
| `pnpm generate:importmap`    | Regenerate the admin panel import map.                      |
| `pnpm migrate`               | Apply pending database migrations.                          |
| `pnpm migrate:create <name>` | Create a migration from the current schema.                 |
| `pnpm migrate:status`        | Show which migrations have been applied.                    |

Run `pnpm generate:types` after changing any collection, global, or block config, and `pnpm generate:importmap` after adding custom admin components.

## Project structure

```text
.
├── docker/                    # Container config (pgAdmin server list)
├── public/                    # Static assets: favicons, fonts, local media uploads
├── src/
│   ├── access/                # Payload access-control functions
│   ├── app/
│   │   ├── (frontend)/        # Public website (home page, preview routes)
│   │   └── (payload)/         # Admin panel, REST and GraphQL API routes
│   ├── blocks/                # Page-builder blocks (config.ts + Component.tsx each)
│   ├── collections/           # Payload collections (Users, Media)
│   ├── components/            # Shared React components and shadcn/ui primitives
│   ├── fields/                # Shared field config (Lexical editor)
│   ├── globals/Home/          # Home page global and its default layout
│   ├── hooks/                 # Payload hooks and React hooks
│   ├── migrations/            # Database migrations (applied on production boot)
│   ├── plugins/               # Payload plugins (SEO)
│   ├── utilities/             # Helper functions
│   ├── payload.config.ts      # Payload configuration
│   └── payload-types.ts       # Generated types; do not edit by hand
├── tests/
│   ├── e2e/                   # Playwright tests
│   └── int/                   # Vitest tests
├── docker-compose.yml         # Production stack: app, PostgreSQL, optional pgAdmin
├── docker-compose.dev.yml     # Local development: PostgreSQL only
└── Dockerfile                 # Multi-stage production image
```

## Content model

| Type       | Slug    | Purpose                                                                                    |
| ---------- | ------- | ------------------------------------------------------------------------------------------ |
| Collection | `users` | Admin users with access to the admin panel.                                                |
| Collection | `media` | Public image and video uploads, with alt text, caption, focal point, and folders.          |
| Global     | `home`  | The landing page: a `layout` of blocks, plus an SEO tab. Supports drafts and live preview. |

Blocks available in the `home` layout (in `src/blocks/`):

`Banner`, `Hero`, `About`, `Benefit`, `Service`, `Methodology`, `Archive`, `Testimonial`, `Gallery`, `Sponsor`, `Footer`, `NavFlyout`.

The site serves only the home page at `/`; any other path returns 404. When the SEO tab is empty, the title and description fall back to the defaults in `src/utilities/siteMeta.ts`.

## Database migrations

Development uses Payload's automatic schema push. **Production never pushes the schema**: it only applies the migrations in `src/migrations/`, which run automatically when the server starts.

After changing a collection, global, or block:

```bash
# Run against a database whose schema matches the latest existing migration
pnpm migrate:create <descriptive-name>
```

Review and commit the generated files in `src/migrations/`, then redeploy.

## Testing

Both test suites need a running database configured in `.env`.

```bash
pnpm test:int   # Vitest integration tests (tests/int)
pnpm test:e2e   # Playwright end-to-end tests (tests/e2e)
```

The end-to-end suite starts `pnpm dev` automatically, or reuses a server already running on port 3000. Before the first run, install the browser with `pnpm exec playwright install chromium`. The admin tests create a test user (`dev@payloadcms.com`), so do not run them against a production database.

## Deployment

The production stack runs on a single VPS with Docker Compose:

- `payload`: the Next.js standalone image built from the `Dockerfile`
- `postgres`: `postgres:17-alpine`
- `pgadmin`: optional, enabled with the `tools` profile

1. **Configure the environment** on the server:

   ```bash
   cp .env.example .env
   ```

   Fill in `PAYLOAD_SECRET`, `PREVIEW_SECRET`, `NEXT_PUBLIC_SERVER_URL` (your public domain), the `POSTGRES_*` values with a strong password, and optionally `PAYLOAD_ADMIN_*` and `SMTP_*`. `DATABASE_URL` is not used here.

2. **Build and start** the stack:

   ```bash
   docker compose up -d --build
   ```

   - Pending migrations run automatically on boot.
   - Uploads are stored in the `media` volume, mounted at `/app/media`.
   - Container logs are rotated (3 × 10 MB per service).

3. **Put a reverse proxy with TLS** (for example, Caddy or Nginx) in front of `127.0.0.1:3000`. All ports are bound to localhost and are never exposed publicly.

To deploy a new version, pull the latest code and run `docker compose up -d --build` again.

## Operations

### Inspecting the database

pgAdmin is disabled by default. Start it only when needed and reach it through an SSH tunnel:

```bash
docker compose --profile tools up -d pgadmin
ssh -L 5050:127.0.0.1:5050 user@your-server   # then open http://localhost:5050
docker compose stop pgadmin                    # when done
```

PostgreSQL itself listens on `127.0.0.1:5432` only. Use an SSH tunnel to connect with tools such as DBeaver or `psql`.

### Backup and restore

Back up the database and the uploaded media:

```bash
# Load POSTGRES_USER and POSTGRES_DB into the shell
set -a; . ./.env; set +a

# Database
docker compose exec -T postgres pg_dump -U "$POSTGRES_USER" -Fc "$POSTGRES_DB" > backup.dump

# Media (the volume is named <project>_media; list volumes with `docker volume ls`)
docker run --rm -v nhal-landingpage_media:/m -v "$PWD":/b alpine tar czf /b/media.tgz -C /m .
```

Restore:

```bash
docker compose exec -T postgres pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" --clean --if-exists < backup.dump
docker run --rm -v nhal-landingpage_media:/m -v "$PWD":/b alpine tar xzf /b/media.tgz -C /m
```

## License

Released under the [MIT License](LICENSE).

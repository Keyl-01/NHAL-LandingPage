# Payload Blank Template

This template comes configured with the bare minimum to get started on anything you need.

## Quick start

## Quick Start - local setup

To spin up this template locally, follow these steps:

### Clone

After you click the `Deploy` button above, you'll want to have standalone copy of this repo on your machine. If you've already cloned this repo, skip to [Development](#development).

### Development

1. First [clone the repo](#clone) if you have not done so already
2. `cd my-project && cp .env.example .env` to copy the example environment variables. For a local database run `docker compose up -d postgres` (uses the `POSTGRES_*` values).

3. `pnpm install && pnpm dev` to install dependencies and start the dev server
4. open `http://localhost:3000` to open the app in your browser

That's it! Changes made in `./src` will be reflected in your app. Follow the on-screen instructions to login and create your first admin user. Then check out [Production](#production) once you're ready to build and serve your app, and [Deployment](#deployment) when you're ready to go live.

## How it works

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/3.x/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Media

  This is the uploads enabled collection. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.

## Deploy (VPS, Docker Compose)

Stack: `payload` (Next.js standalone image) + `postgres:17` + optional `pgadmin` (profile `tools`).

1. On the server: `cp .env.example .env`, then fill in `PAYLOAD_SECRET`, `PREVIEW_SECRET` (`openssl rand -hex 32`), `NEXT_PUBLIC_SERVER_URL`, `POSTGRES_*` and the first-admin `PAYLOAD_ADMIN_*`.
2. `docker compose up -d --build`
   - Pending migrations in `src/migrations` run automatically on boot (`prodMigrations`).
   - Uploads are stored in the `media` volume (`/app/media`).
3. Put a reverse proxy with TLS (Caddy/Nginx) in front of `127.0.0.1:3000`.

### Schema changes

Production never auto-pushes the schema. After changing collections/globals/blocks:

```bash
pnpm migrate:create <name>   # against a DB that matches the previous migration
```

Commit the generated files in `src/migrations`, then redeploy.

### Inspecting the database (pgAdmin)

```bash
docker compose --profile tools up -d pgadmin
ssh -L 5050:127.0.0.1:5050 user@your-vps   # then open http://localhost:5050
docker compose stop pgadmin                # when done
```

Postgres itself is published on `127.0.0.1:5432` only — use an SSH tunnel for DBeaver/psql.

### Backup

```bash
docker compose exec -T postgres pg_dump -U payload -Fc nhal > backup.dump
docker run --rm -v <project>_media:/m -v "$PWD":/b alpine tar czf /b/media.tgz -C /m .
```

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).

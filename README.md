# Anggit Mono boilerplate

A full-stack TypeScript monorepo boilerplate with Next.js, NestJS, Prisma, PostgreSQL, and shared UI. The home page fetches a hello message from the API. A shared Prisma package is ready for PostgreSQL when you need it; the database schema has no models yet.

| Directory | What lives there |
| --- | --- |
| `apps/api` | NestJS API and its database service |
| `apps/web` | Next.js app using shared UI components |
| `packages/database` | Prisma schema, generated client, and PostgreSQL connection |
| `packages/domain` | Code shared by the API and web app |
| `packages/ui` | Reusable React components |

## Get started

You need Node.js 24 and pnpm 12. PostgreSQL is optional for the hello demo.

From the repository root:

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>. The web app fetches `Hello, world!` from <http://localhost:4000/hello> through its server component. The API's `/` route still returns a sample greeting. Neither app needs a database to run this demo. If the API is hosted elsewhere, set `API_URL` in `apps/web/.env.local` to its base URL (for example, `API_URL=https://api.example.com`).

## Deploy with Docker

Docker Compose runs the web and API as separate services, so you can rebuild one without restarting the others. The production containers run on Bun; Node.js and pnpm are not required on the server.

Create a `.env` file from the template and edit the values for your server:

```bash
cp .env.example .env
```

Build and start the application:

```bash
docker compose up -d --build
```

The web app is available on port `3000` and the API on port `4000`. To deploy a web-only change, rebuild only that service:

```bash
docker compose up -d --build web
```

The default stack expects PostgreSQL to be provided separately. To run a local PostgreSQL container instead, add these values to `.env`:

```dotenv
POSTGRES_USER=app
POSTGRES_PASSWORD=change-this-password
POSTGRES_DB=app
```

Then start both Compose files:

```bash
docker compose -f compose.yaml -f compose.database.yaml up -d --build
```

The database data is stored in the `postgres-data` Docker volume. Keep backups of that volume or use an external PostgreSQL service for production. Put a reverse proxy and TLS in front of the published ports when exposing the deployment to the internet.

## Build your app

1. Add API routes and services in `apps/api`. Fetch them from Next.js server components in `apps/web`, as the home page does. Put reusable React components in `packages/ui` and shared code in `packages/domain`.
2. When you need PostgreSQL, use an available PostgreSQL server. Copy `packages/database/.env.example` to `packages/database/.env` and set `DATABASE_URL` to your connection string; an exported `DATABASE_URL` takes precedence.
3. Add models to [`packages/database/prisma/schema.prisma`](packages/database/prisma/schema.prisma). For a new, empty database, create and apply the first migration with `pnpm --filter @anggit-mono/database exec prisma migrate dev --name init`.
4. Regenerate and compile the shared client with `pnpm --filter @anggit-mono/database build`. Register `DatabaseService` from `apps/api/src/database.service.ts` in `AppModule`, then inject it into services that query through Prisma. Restart `pnpm dev` after changing the schema.

If browser code calls the API directly across ports or domains, [allow the web origin with NestJS CORS](https://docs.nestjs.com/security/cors).

If your PostgreSQL database already has tables, run `pnpm --filter @anggit-mono/database exec prisma db pull` to bring them into the Prisma schema. [Baseline the existing database](https://www.prisma.io/docs/orm/v7/prisma-migrate/workflows/baselining) before using Prisma Migrate for those tables; the `migrate dev --name init` step above is for an empty database. Hosted databases may also need [a configured shadow database](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/shadow-database) for `migrate dev`.

`pnpm build` builds the workspace; `pnpm lint` and `pnpm tsc` check it.

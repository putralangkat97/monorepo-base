# Task Moon boilerplate

A starting point for a NestJS API, a Next.js web app, and PostgreSQL through a shared Prisma package. The database schema has no models, and the API and web pages contain placeholders for you to replace.

| Directory | What lives there |
| --- | --- |
| `apps/api` | NestJS API and its database service |
| `apps/web` | Next.js app using shared UI components |
| `packages/database` | Prisma schema, generated client, and PostgreSQL connection |
| `packages/domain` | Code shared by the API and web app |
| `packages/ui` | Reusable React components |

## Get started

You need Node.js 24, pnpm 12, and a PostgreSQL database. Use your own PostgreSQL server, or start the optional local one with `docker compose up -d monorepo-postgres`.

From the repository root:

```bash
pnpm install
cp packages/database/.env.example packages/database/.env
```

Edit `packages/database/.env` and set `DATABASE_URL` to your database's connection string. The example file points to the optional local database on `localhost:5433`; an exported `DATABASE_URL` takes precedence over the file.

```bash
pnpm dev
```

The web app runs at <http://localhost:3000> and the API at <http://localhost:4000>. The API connects to PostgreSQL during startup, so it needs a reachable database. Its `/` route currently returns a sample greeting; the web home page shows sample UI components. Setup does not create any tables or run migrations.

## Build your app

1. Add your models to [`packages/database/prisma/schema.prisma`](packages/database/prisma/schema.prisma). For a new, empty database, create and apply your first migration with `pnpm --filter @task-moon/database exec prisma migrate dev --name init`.
2. Regenerate and compile the shared client with `pnpm --filter @task-moon/database build`. Restart `pnpm dev` after changing the schema so the API loads the new client.
3. Add API routes and services in `apps/api`. Inject `DatabaseService` from `apps/api/src/database.service.ts` into services registered in `AppModule` to query through Prisma.
4. Build pages in `apps/web`. Put reusable React components in `packages/ui` and code shared by the API and web app in `packages/domain`.

The web app does not call the API yet. For your first feature, add an API route, then [fetch it from a Next.js Server Component](https://nextjs.org/docs/app/getting-started/fetching-data) using an API URL configured for that environment. If browser code calls the API directly across ports or domains, [allow the web origin with NestJS CORS](https://docs.nestjs.com/security/cors).

If your PostgreSQL database already has tables, run `pnpm --filter @task-moon/database exec prisma db pull` to bring them into the Prisma schema. [Baseline the existing database](https://www.prisma.io/docs/orm/v7/prisma-migrate/workflows/baselining) before using Prisma Migrate for those tables; the `migrate dev --name init` step above is for an empty database. Hosted databases may also need [a configured shadow database](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/shadow-database) for `migrate dev`.

`pnpm build` builds the workspace; `pnpm lint` and `pnpm tsc` check it.

# Task Moon boilerplate

This workspace has a Nest API, a Next.js web app, and a shared Prisma package. The Prisma schema starts with no models. Use Node.js 24 and pnpm 12.

## Connect PostgreSQL

1. Run `pnpm install`.
2. Copy `packages/database/.env.example` to `packages/database/.env` and set `DATABASE_URL` to your PostgreSQL connection string. An exported `DATABASE_URL` takes precedence.
3. Run `pnpm dev`. The workspace generates the Prisma client, builds the database package, and starts the apps. The API connects to PostgreSQL at startup.

The sample URL uses this repo's optional local PostgreSQL service. Start it with `docker compose up -d monorepo-postgres` if you want to use that database. For another server, replace the URL; no Compose setup is required.

When you add your own models to `packages/database/prisma/schema.prisma`, run `pnpm --filter @task-moon/database db:generate` to refresh the client. Create migrations for your models as part of your application work.

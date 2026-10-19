# Keep Prisma in a shared database package

The API is the first database consumer, but this boilerplate is intended for applications that may add more server consumers. `packages/database` owns the PostgreSQL schema and client so those consumers can use one source of truth. We chose the supported Prisma 7 generated-client workflow while Prisma 8 is a release candidate; a later major-version change will require an explicit client and tooling migration.

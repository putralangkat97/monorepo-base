FROM node:24-bookworm-slim AS build

WORKDIR /app
RUN npm install --global pnpm@12.11.2

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/database/package.json packages/database/package.json
COPY packages/domain/package.json packages/domain/package.json
COPY packages/ui/package.json packages/ui/package.json
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm --filter @anggit-mono/database build \
  && pnpm --filter @anggit-mono/domain build \
  && pnpm --filter @anggit-mono/api build \
  && pnpm deploy --filter @anggit-mono/api --prod /runtime

FROM oven/bun:1.4.3 AS runtime

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000
COPY --from=build --chown=bun:bun /runtime ./
USER bun

EXPOSE 4000
CMD ["bun", "dist/main.js"]

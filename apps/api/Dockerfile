FROM node:24-alpine AS base

ARG YARN_VERSION=1.22.19

RUN apk add --no-cache libc6-compat openssl
RUN corepack enable && corepack prepare yarn@$YARN_VERSION --activate
RUN apk update

ENV NODE_ENV=production

FROM base AS builder
WORKDIR /app
RUN yarn global add turbo@2.10.12

COPY . .
RUN turbo prune api --docker

FROM base AS installer
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock

# A DATABASE_URL is required at build time for `prisma generate`, even though
# nothing connects to it — the real one is injected at runtime.
ENV DATABASE_URL="postgresql://user:password@localhost:5432/db"
RUN yarn install --frozen-lockfile

# Build the project (turbo.json is already part of the pruned output)
COPY --from=builder /app/out/full/ .

RUN yarn turbo run db:generate --filter=@repo/db
RUN yarn turbo run build --filter=api...

FROM base AS runner
ARG PORT=3001

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=installer --chown=nestjs:nestjs /app .

EXPOSE $PORT

CMD ["node", "apps/api/dist/src/main.js"]

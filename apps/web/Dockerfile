FROM node:24-alpine AS base

ARG YARN_VERSION=1.22.19

RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare yarn@$YARN_VERSION --activate
RUN apk update

ENV NODE_ENV=production

FROM base AS builder
WORKDIR /app
RUN yarn global add turbo@2.10.12

COPY . .
RUN turbo prune web --docker

FROM base AS installer
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile

# Build the project (turbo.json is already part of the pruned output)
COPY --from=builder /app/out/full/ .

RUN yarn turbo run build --filter=web...

FROM base AS runner
ARG PORT=3000

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

EXPOSE $PORT

CMD ["node", "apps/web/server.js"]

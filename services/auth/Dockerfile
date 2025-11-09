FROM node:20-alpine AS base

RUN corepack enable && corepack prepare pnpm@9.15.1 --activate

FROM base AS deps
WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY services/auth/package.json ./services/auth/
COPY packages/rabbitmq-client/package.json ./packages/rabbitmq-client/
COPY packages/types/package.json ./packages/types/
COPY packages/config/package.json ./packages/config/

RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/services/auth/node_modules ./services/auth/node_modules
COPY --from=deps /app/packages ./packages

COPY services/auth ./services/auth
COPY packages ./packages

WORKDIR /app/services/auth
RUN pnpm prisma generate
RUN pnpm build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/services/auth/dist ./dist
COPY --from=builder /app/services/auth/node_modules ./node_modules
COPY --from=builder /app/services/auth/prisma ./prisma

EXPOSE 3001

CMD ["node", "dist/main.js"]

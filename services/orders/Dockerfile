FROM node:20-alpine AS base

RUN corepack enable && corepack prepare pnpm@9.15.1 --activate

FROM base AS deps
WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY services/orders/package.json ./services/orders/
COPY packages/rabbitmq-client/package.json ./packages/rabbitmq-client/
COPY packages/types/package.json ./packages/types/
COPY packages/config/package.json ./packages/config/

RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/services/orders/node_modules ./services/orders/node_modules
COPY --from=deps /app/packages ./packages

COPY services/orders ./services/orders
COPY packages ./packages

WORKDIR /app/services/orders
RUN pnpm prisma generate
RUN pnpm build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/services/orders/dist ./dist
COPY --from=builder /app/services/orders/node_modules ./node_modules
COPY --from=builder /app/services/orders/prisma ./prisma

EXPOSE 3003

CMD ["node", "dist/index.js"]

FROM node:22-bookworm

WORKDIR /app

# pnpmを有効化
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

# 依存関係ファイルを先にコピー（キャッシュ効率化）
COPY package.json pnpm-lock.yaml ./

# 依存関係インストール
RUN pnpm install --frozen-lockfile

# ソースコードをコピー
COPY src src
COPY tsconfig.json tsconfig.json
COPY next.config.js next.config.js
COPY tailwind.config.ts tailwind.config.ts
COPY postcss.config.js postcss.config.js
COPY public public

ARG FIREBASE_API_KEY
ENV NEXT_PUBLIC_FIREBASE_API_KEY=${FIREBASE_API_KEY}
ARG FIREBASE_AUTH_DOMAIN
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${FIREBASE_AUTH_DOMAIN}
ARG FIREBASE_PROJECT_ID
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=${FIREBASE_PROJECT_ID}
ARG FIREBASE_STORAGE_BUCKET
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${FIREBASE_STORAGE_BUCKET}
ARG FIREBASE_MESSAGING_SENDER_ID
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${FIREBASE_MESSAGING_SENDER_ID}
ARG FIREBASE_APP_ID
ENV NEXT_PUBLIC_FIREBASE_APP_ID=${FIREBASE_APP_ID}
ARG FIREBASE_MEASUREMENT_ID
ENV NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=${FIREBASE_MEASUREMENT_ID}

RUN pnpm run build

ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
ENV HOME=/home/nextjs
RUN mkdir -p /home/nextjs/.cache \
    && chown -R nextjs:nodejs /home/nextjs
# permission denied対策
RUN chown nextjs:nodejs /app/.next/cache

USER nextjs

EXPOSE 3001
ENV PORT 3001
ENV HOST 0.0.0.0

CMD ["pnpm", "start"]

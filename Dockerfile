FROM arm64v8/node:19.9-bullseye

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY src src
COPY tsconfig.json tsconfig.json
COPY package*.json ./
COPY next.config.js next.config.js
COPY tailwind.config.ts tailwind.config.ts
COPY public public

RUN npm ci
RUN npm run build

ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# permission denied対策
RUN chown nextjs:nodejs /app/.next/cache

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOST 0.0.0.0
ENV NODE_TLS_REJECT_UNAUTHORIZED 0

CMD ["npm", "start"]
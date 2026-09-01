# Build stage
FROM node:22 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN mkdir -p public

ARG NEXT_PUBLIC_APP_URL=https://portal.bomanejo.com.br
ARG NEXT_PUBLIC_PORTAL_URL=https://financeiro.bomanejo.com.br
ARG NEXT_PUBLIC_CMS_API_URL
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
ENV NEXT_PUBLIC_PORTAL_URL=${NEXT_PUBLIC_PORTAL_URL}
ENV NEXT_PUBLIC_CMS_API_URL=${NEXT_PUBLIC_CMS_API_URL}
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Production stage
FROM node:22-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 && \
    chown -R nextjs:nodejs /app

USER nextjs

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

EXPOSE 3000

CMD ["node", "server.js"]

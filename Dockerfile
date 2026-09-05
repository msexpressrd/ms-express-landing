FROM node:22-bookworm-slim
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.8.0 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
ENV npm_config_cache=/tmp/pnpm-cache
RUN pnpm install --frozen-lockfile
COPY . .
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]

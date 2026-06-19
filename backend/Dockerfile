FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

RUN corepack enable
COPY package.json ./
RUN pnpm install --prod
COPY . .
RUN pnpm run build

EXPOSE 3000
CMD ["node", "dist/index.js"]

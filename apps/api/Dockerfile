# Construit depuis la racine du monorepo (contexte de build = racine du dépôt),
# car apps/api dépend du package-lock.json partagé (npm workspaces).
FROM node:22-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
RUN npm ci

COPY apps/api apps/api
RUN npm run build --workspace=apps/api
RUN npm prune --omit=dev

FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules node_modules
COPY --from=build /app/apps/api/node_modules apps/api/node_modules
COPY --from=build /app/apps/api/dist apps/api/dist
COPY --from=build /app/apps/api/package.json apps/api/package.json

# Cloud Run fournit PORT dynamiquement ; main.ts lit déjà process.env.PORT.
CMD ["node", "apps/api/dist/main.js"]

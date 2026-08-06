# backend

API Express gerada pelo Node Initializr.

```bash
pnpm install
pnpm run dev
```

# Criar Model (e Migration)

```bash
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```

# Subir app em dev

```bash
docker compose --env-file ../.env --profile '*' up --build -d
```

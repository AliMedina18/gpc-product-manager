# 04 - Database

## PostgreSQL local

- Base de datos: `gpc_db`
- Usuario: `postgres`
- Puerto: `5432`

## Variables de entorno

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/gpc_db"
```

## Prisma

```bash
cd backend
npm run db:migrate
npm run db:reset
npm run db:studio
```

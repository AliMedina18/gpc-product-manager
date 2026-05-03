# 05 - Deploy

## Frontend

- Deploy recomendado: Vercel
- Variable: `VITE_API_URL`

## Backend

- Deploy recomendado: Railway, Render o Fly.io
- Variables:
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `JWT_EXPIRES_IN`
  - `PORT`

## Base de datos en la nube

- Neon
- Supabase
- Railway Postgres

## Notas

- Ejecutar migraciones en el entorno de producción después de subir el código.
- No exponer el `.env` en el repositorio.

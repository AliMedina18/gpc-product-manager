# GPC Product Manager

## 📌 Descripción

GPC Product Manager es un proyecto fullstack que gestiona productos bajo la clasificación internacional **Global Product Classification (GPC)**.

Incluye un backend con **Express + Prisma + PostgreSQL** y un frontend con **React + Vite**. La aplicación permite autenticación de usuarios y gestión de productos y categorías.

## ⚙️ Tecnologías usadas

- Backend: **Node.js**, **Express**, **Prisma**, **PostgreSQL**, **JWT**, **bcryptjs**
- Frontend: **React**, **Vite**, **Axios**, **React Router**, **Tailwind CSS**
- Dev tools: **nodemon**, **Prisma Migrate**

## 🧱 Estructura del proyecto

```
/                    # Raíz del repositorio
/backend              # Backend Express + Prisma
  /src
    /controllers
    /routes
    /services
    /middleware
  /prisma
  /scripts
  package.json
  .env
/frontend             # Frontend React + Vite
  /src
    /components
    /pages
    /services
    /hooks
    /layouts
  package.json
.gitignore
README.md
```

## 🚀 Cómo ejecutar localmente

Para desarrollar el proyecto en local se recomiendan dos terminales independientes:

1. Terminal 1: Backend
2. Terminal 2: Frontend

### Backend

```bash
cd backend
npm install
copy .env.example .env
# Ajusta backend/.env con tu configuración local
npm run db:migrate
npm run seed:admin
npm run dev
```

- El servidor backend corre por defecto en `http://localhost:3000`
- Si necesitas datos de GPC, puedes ejecutar `npm run import:gpc`
- Para abrir Prisma Studio usa `npm run db:studio`

### Frontend

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

- El frontend arranca con Vite y suele estar en `http://localhost:5173`
- Verifica que `VITE_API_URL` en `frontend/.env` apunte a `http://localhost:3000`

## 🔐 Usuario administrador

- email: admin@gpc.com
- password: admin123

## 🗄️ Base de datos local

Este proyecto usa PostgreSQL local y Prisma como ORM/granularizador de datos.

1. Instala PostgreSQL en tu máquina.
2. Crea una base de datos local, por ejemplo `gpc_db`.
3. Configura `backend/.env` con tu conexión local:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/gpc_db"
JWT_SECRET="tu_jwt_secret_super_seguro_aqui"
JWT_EXPIRES_IN="7d"
PORT=3000
CORS_ORIGIN="*"
```

4. Ejecuta migraciones desde `backend`:

```bash
npm run db:migrate
```

5. Crea el usuario administrador:

```bash
npm run seed:admin
```

6. Si necesitas importar datos GPC adicionales:

```bash
npm run import:gpc
```

### Notas rápidas

- Prisma no es la base de datos en sí: Prisma es la biblioteca que conecta tu código con PostgreSQL.
- Puedes usar una base de datos local o una base de datos en la nube; el valor de `DATABASE_URL` define cuál usa la app.
- Para desarrollo local, usa una base de datos PostgreSQL local y evita cambiar `DATABASE_URL` a un servicio remoto salvo que quieras desplegar.

## 🌐 Despliegue

- Frontend: Vercel
- Backend: Railway o Render
- Base de datos: PostgreSQL en la nube

1. **Registro**: Los nuevos usuarios se registran con rol **EMPLOYEE**
2. **Login**: Retorna token JWT con email, userId y rol
3. **Token**: Se almacena en localStorage y se envía en headers
4. **Middleware**: Verifica token en rutas protegidas

### Roles

- **ADMIN**: Acceso completo al sistema
- **EMPLOYEE**: Acceso a funcionalidades básicas

## 📊 APIs Principales

### Autenticación

```
POST   /api/auth/register    # Registrar nuevo usuario
POST   /api/auth/login       # Iniciar sesión
```

### GPC

```
GET    /api/gpc/segments     # Obtener segmentos
GET    /api/gpc/families/:segmentId   # Obtener familias
GET    /api/gpc/classes/:familyId     # Obtener clases
GET    /api/gpc/bricks/:classId       # Obtener bricks
```

### Productos

```
GET    /api/products         # Listar productos
POST   /api/products         # Crear producto
GET    /api/products/:id     # Obtener producto
PUT    /api/products/:id     # Actualizar producto
DELETE /api/products/:id     # Eliminar producto
```

## 🌐 Despliegue

### Frontend (Vercel)

1. Conecta el repositorio en Vercel
2. Configura variables de entorno:
   - `VITE_API_URL=https://tu-backend.com/api`
3. Deploy automático en push

### Backend (Railway/Render)

1. Conecta el repositorio
2. Configura `DATABASE_URL` con tu BD en Neon/Supabase
3. Configura variables de entorno JWT
4. Deploy automático en push

### Base de Datos (Neon/Supabase)

1. Crea proyecto en Neon o Supabase
2. Copia `DATABASE_URL`
3. Ejecuta migraciones:
   ```bash
   npx prisma migrate deploy
   ```
4. Ejecuta seed en producción si es necesario

## 📚 Documentación Adicional

Para información detallada, consulta:

- [docs/01-setup.md](docs/01-setup.md) - Configuración inicial
- [docs/02-backend.md](docs/02-backend.md) - Desarrollo del backend
- [docs/03-frontend.md](docs/03-frontend.md) - Desarrollo del frontend
- [docs/04-database.md](docs/04-database.md) - Gestión de BD
- [docs/05-deploy.md](docs/05-deploy.md) - Despliegue en producción

## 🐛 Solución de Problemas

### Puerto 3000 en uso

```bash
# Encontrar proceso en puerto 3000
lsof -i :3000

# Matar proceso
kill -9 <PID>
```

### Migraciones fallidas

```bash
# Resetear base de datos
npm run db:reset

# Regenerar Prisma Client
npx prisma generate
```

### Problemas de CORS

Verifica que `CORS_ORIGIN` en backend coincida con URL del frontend.

## 📝 Scripts Disponibles

### Backend

```bash
npm start              # Iniciar servidor producción
npm run dev            # Iniciar con nodemon
npm run db:migrate     # Ejecutar migraciones
npm run db:reset       # Resetear base de datos
npm run db:seed        # Ejecutar seed GPC
npm run db:studio      # Abrir Prisma Studio
npm run seed:admin     # Crear usuario admin
npm run import:gpc     # Importar datos GPC
```

### Frontend

```bash
npm run dev            # Iniciar dev server
npm run build          # Build producción
npm run preview        # Preview build
npm run lint           # Ejecutar linter
```

## 👥 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el repositorio
2. Crea rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo licencia MIT.

---

**Última actualización**: 2 de mayo de 2026

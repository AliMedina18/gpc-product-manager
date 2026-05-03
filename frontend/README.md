# GPC Product Manager - Frontend

Frontend moderno construido con React, Vite y Tailwind CSS para gestionar productos usando la clasificación GPC (Global Product Classification).

## 🚀 Características

- ✅ Autenticación JWT con login/registro
- ✅ Dashboard con estadísticas en tiempo real
- ✅ CRUD completo de productos
- ✅ Selector GPC en cascada dinámico
- ✅ Explorador interactivo de la jerarquía GPC
- ✅ Diseño minimalista tipo Apple
- ✅ Componentes reutilizables
- ✅ Manejo de estados y errores

## 📦 Requisitos

- Node.js 16+
- npm o yarn

## 🛠️ Instalación

```bash
cd frontend
npm install
```

## ⚙️ Configuración

1. Copia el archivo `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Configura las variables de entorno:
```
VITE_API_URL=http://localhost:3000
```

## 🏃 Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Build

```bash
npm run build
```

Genera la carpeta `dist/` con los archivos optimizados para producción.

## 📋 Estructura de Carpetas

```
src/
├── components/          # Componentes reutilizables
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Card.jsx
│   ├── Modal.jsx
│   ├── Alert.jsx
│   ├── GPCSelector.jsx
│   ├── ProductTable.jsx
│   ├── Navbar.jsx
│   ├── Layout.jsx
│   └── PrivateRoute.jsx
├── pages/              # Páginas de la aplicación
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx
│   ├── ProductsPage.jsx
│   ├── CreateProductPage.jsx
│   └── ExplorerPage.jsx
├── services/           # Llamadas a API
│   ├── apiClient.js
│   ├── authService.js
│   ├── gpcService.js
│   └── productService.js
├── context/            # Context API
│   └── AuthContext.jsx
├── hooks/              # Hooks personalizados
│   ├── useAuth.js
│   └── useForm.js
├── assets/             # Imágenes y recursos
├── App.jsx             # Componente principal
├── main.jsx            # Entrada de la aplicación
└── index.css           # Estilos globales
```

## 🔐 Autenticación

La autenticación usa JWT tokens almacenados en `localStorage`. El token se envía automáticamente en todas las peticiones.

## 🌐 Despliegue

### Vercel (Recomendado)

1. Sube el proyecto a GitHub
2. En Vercel, conecta el repositorio
3. Configura las variables de entorno
4. Deploy automático en cada push a main

```bash
npm install -g vercel
vercel deploy
```

### Netlify

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 📚 Componentes principales

### GPCSelector
Selector dinámico en cascada para clasificación GPC:
```jsx
<GPCSelector onChange={(brickId) => console.log(brickId)} />
```

### ProductTable
Tabla de productos con acciones:
```jsx
<ProductTable 
  products={products}
  onEdit={handleEdit}
  onDelete={handleDelete}
  isLoading={loading}
/>
```

### Button
Botón reutilizable con variantes:
```jsx
<Button variant="primary|secondary|outline|danger" size="sm|md|lg">
  Texto
</Button>
```

## 🎨 Estilos

El proyecto usa Tailwind CSS con configuración personalizada:
- Colores: Paleta morada como color primario
- Tipografía: Sistema consistente con escala
- Espacios: Escala de 4px para consistencia
- Sombras: Suaves para efecto moderno

## 🐛 Solución de problemas

### Error de conexión a API
- Verifica que el backend esté corriendo en `http://localhost:3000`
- Revisa la variable `VITE_API_URL` en `.env`
- Comprueba las credenciales de CORS en el backend

### Tokens expirados
- Los tokens se limpian automáticamente del localStorage
- El usuario será redirigido a login

### Componentes no renderan
- Verifica que estés dentro de `<AuthProvider>`
- Comprueba que las rutas privadas usen `<PrivateRoute>`

## 📝 Notas

- La aplicación require autenticación para acceder a la mayoría de rutas
- Los productos se vinculan a la clasificación GPC mediante `brickId`
- El selector GPC carga datos bajo demanda para optimizar performance

## 📄 Licencia

MIT

# TechStore - E-commerce de Tecnología

Proyecto final del curso **React JS** de **Talento Tech**. Es una tienda online de productos tecnológicos construida con React y Vite, con carrito de compras, autenticación de usuarios, panel de administración y más.

## Funcionalidades

- Catálogo de productos con vista detallada
- Carrito de compras con gestión de cantidades
- Autenticación de usuarios (registro e inicio de sesión) con Firebase
- Roles: usuario y administrador
- Panel de gestión de productos y cupones (admin)
- Sección de productos
- Rutas protegidas según rol
- Diseño responsive con React Bootstrap, estilos CSS/Tailwind

## Tecnologías

- **React 19** + **Vite 8**
- **Bootstrap 5** + **Bootswatch** + **React Bootstrap**
- **Firebase** (Authentication + Firestore)
- **React Router DOM v7**
- **React Toastify**
- **React Helmet**
- **Styled Components**

## Requisitos

- Node.js 18 o superior
- npm

## Instalación y ejecución

1. **Clonar el repositorio**

```bash
git clone <URL_DEL_REPOSITORIO>
cd reactjs-proyecto-final
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

Crear un archivo `.env` en la raíz del proyecto con las credenciales de Firebase:

```
VITE_API_KEY=tu_api_key
VITE_AUTH_DOMAIN=tu_auth_domain
VITE_PROJECT_ID=tu_project_id
VITE_STORAGE_BUCKET=tu_storage_bucket
VITE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_APP_ID=tu_app_id
```

4. **Iniciar el servidor de desarrollo**

```bash
npm run dev
```

5. **Abrir en el navegador**

Visitar [http://localhost:5173](http://localhost:5173)

## Scripts disponibles

| Comando           | Descripción                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo    |
| `npm run build`   | Compila para producción             |
| `npm run preview` | Previsualiza la build de producción |
| `npm run lint`    | Ejecuta ESLint                      |

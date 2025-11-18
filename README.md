<div align="center">

# 📚 LibroVerse

**Tu librería virtual con ofertas, descuentos y una experiencia moderna de compra online.**

</div>

---

## 📁 Estructura general del proyecto

```bash
MiniProyecto/
├── Api_LibroVerse/   # Backend en Django (API de libros)
├── LibroVerse/       # Frontend en React (Vite)
└── venv/             # Entorno virtual de Python
```

Este README describe el proyecto completo **LibroVerse**, tanto el backend como el frontend.

---

## 🎯 Objetivo del proyecto

LibroVerse es una **librería virtual** donde las personas pueden:

- **Comprar libros online** de forma rápida y segura.
- Acceder a **precios cómodos** y competitivos.
- Aprovechar **descuentos y ofertas especiales**.
- Explorar un catálogo intuitivo con una interfaz inspirada en un diseño profesional de e‑commerce.

El objetivo principal es ofrecer una **experiencia sencilla y agradable** para el usuario, integrando un frontend moderno en React con un backend robusto en Python/Django.

---

## 👥 Integrantes

- **Fernando Mas**
- **Olortegui Padilla**
- **Aldy Montoya**
- **Alfredo Navarro**

---

## 🛠️ Tecnologías y librerías utilizadas

### 🔗 Lenguajes principales

- 🐍 **Python** – Lógica de backend, modelos, endpoints y gestión de datos.
- ⚛️ **React** – Construcción de la interfaz de usuario del frontend.

### 📦 Backend

- 🌐 **Django** – Framework principal del backend para la API REST, modelos y administración.

### 💅 Frontend

- 🎨 **Tailwind CSS** – Estilos utilitarios para crear una UI moderna y responsive.
- 🧭 **React Router** – Manejo de rutas y navegación entre páginas.
- ✨ **lucide-react** – Iconos minimalistas y modernos para la interfaz.

> Además se utilizan otras dependencias de apoyo propias del ecosistema React y Vite.

---

## 📂 Api_LibroVerse (Backend – Django)

Carpeta donde se maneja toda la lógica del **backend** del proyecto:

- **Modelos de libros** (y entidades relacionadas) para representar:
  - Libros
  - Categorías / géneros
  - Autores
  - Carrito / órdenes (según implementación)
- **Lógica de negocio** para:
  - Gestión del catálogo.
  - Cálculo de precios, descuentos y ofertas.
  - Validaciones de datos.
- **Serializadores / Vistas / URLs** para exponer una **API REST** que será consumida por el frontend de React.
- Posible integración futura con **autenticación de usuarios**, métodos de pago, etc.

Ejemplo conceptual de contenido (no exacto):

```bash
Api_LibroVerse/
├── manage.py
├── api_libroverse/            # Configuración principal de Django
└── libros/                    # App principal de libros
    ├── models.py             # Modelos de Libro, Autor, Categoría, etc.
    ├── views.py              # Lógica de endpoints (listar, detalle, búsqueda)
    ├── serializers.py        # Transformación de modelos a JSON
    ├── urls.py               # Rutas de la API
    └── ...
```

---

## 💻 LibroVerse (Frontend – React + Vite)

Carpeta donde se maneja la **aplicación React**, el consumo de la API y toda la lógica de interfaz.

Estructura conceptual de `src/`:

```bash
LibroVerse/
├── index.html
├── vite.config.js
└── src/
    ├── api/              # Funciones para invocar las APIs del backend
    ├── components/       # Componentes reutilizables de la UI
    ├── pages/            # Páginas principales (rutas) de la app
    ├── router/           # Configuración de React Router (si aplica)
    ├── styles/           # Estilos globales (Tailwind config, etc.)
    └── main.jsx          # Punto de entrada de la app React
```

### 📡 Carpeta `api/`

- Encapsula las **llamadas HTTP** al backend Django.
- Centraliza endpoints como:
  - Listado de libros.
  - Detalle de un libro.
  - Búsquedas, filtros, ofertas y descuentos.

### 🧩 Carpeta `components/`

- Contiene los **componentes reutilizables**, por ejemplo:
  - Cards de libros.
  - Botones, inputs y formularios.
  - Headers, footers, banners de ofertas.
  - Componentes de layout y grid.

### 📄 Carpeta `pages/`

- Contiene las **páginas principales** que representan rutas de la aplicación:
  - Página de inicio con ofertas y destacados.
  - Listado de catálogo de libros.
  - Detalle de libro.
  - Carrito de compras.
  - Páginas que pueden cambiar a futuro según se expandan los requerimientos.

En estas páginas se combina:

- Lógica de **navegación** (React Router).
- Llamadas a la **API** (`api/`).
- Uso de **componentes reutilizables** (`components/`).

---

## 🧠 Lógicas implementadas (visión general)

- **Gestión de catálogo de libros** (listado, detalle, filtrado y ordenamiento).
- **Manejo de descuentos y ofertas**, preparados desde el backend y mostrados en el frontend.
- **Consumo de API REST** desde React usando funciones centralizadas en `api/`.
- **Navegación SPA** con React Router para una experiencia fluida.
- Uso de **Tailwind CSS** para un diseño responsivo y visualmente atractivo.
- Iconografía moderna con **lucide-react** para mejorar la experiencia de usuario.

---

## 🎨 Inspiración de diseño (Figma)

El diseño de LibroVerse se ha inspirado en el siguiente archivo de Figma:

👉 [E-commerce App for Books – Figma](https://www.figma.com/make/xzKtY5kqKVL8FdxxYM9Nyd/E-commerce-App-for-Books?node-id=0-1&t=QsF4DuBoJvt4FoVr-1)

En base a este diseño se ha trabajado la distribución de componentes, paleta de colores, estructura de catálogo y experiencia de compra.

---

## 🚀 Futuras mejoras

- Integración completa de **autenticación de usuarios**.
- Implementación de **métodos de pago** y proceso de checkout.
- Sistema de **reseñas y valoraciones** de libros.
- Filtros avanzados por categoría, autor, precio y valoraciones.

---

Gracias por visitar **LibroVerse** 📚✨

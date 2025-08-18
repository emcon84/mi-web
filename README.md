# Portfolio Web - Emiliano Conti

Un portafolio moderno y completo construido con React, Vite y Tailwind CSS, que incluye un sistema de blog avanzado con soporte para Markdown, SEO optimizado y routing dinámico.

## 🚀 Características Principales

- **Diseño Moderno**: Interfaz elegante con animaciones fluidas usando Framer Motion
- **Sistema de Blog Completo**: Con soporte para Markdown, categorías, tags y SEO
- **Routing Dinámico**: URLs amigables para artículos del blog (`/blog/slug-del-articulo`)
- **Multiidioma**: Soporte para español e inglés
- **Temas**: Modo oscuro y claro
- **SEO Optimizado**: Meta tags dinámicos, Open Graph, Twitter Cards
- **Accesibilidad**: Componentes accesibles y navegación por teclado
- **Responsive**: Diseño adaptativo para todos los dispositivos
- **Performance**: Optimizado para carga rápida y experiencia fluida

## 📁 Estructura del Proyecto

```
mi-web/
├── public/
│   ├── favicon.svg
│   ├── site.webmanifest
│   └── img/                    # Imágenes del proyecto
├── src/
│   ├── components/
│   │   ├── Accessibility/      # Componentes de accesibilidad
│   │   ├── BlogPost/          # Componente para artículos individuales
│   │   ├── Card/              # Componentes de tarjetas
│   │   ├── Home/              # Componentes de la página principal
│   │   ├── Modern/            # Componentes modernos (navegación, hero, etc.)
│   │   └── SEO/               # Componentes para SEO
│   ├── data/
│   │   ├── articles/          # 📝 Artículos del blog (archivos individuales)
│   │   ├── blogData.jsx       # Configuración y utilidades del blog
│   │   └── data.jsx           # Datos generales del portafolio
│   ├── styles/               # Estilos CSS adicionales
│   ├── App.jsx               # Componente principal con routing
│   ├── main.jsx              # Punto de entrada
│   └── index.css             # Estilos globales
├── package.json
├── vite.config.js
├── tailwind.config.cjs
└── README.md
```

## 🛠️ Tecnologías Utilizadas

- **React 18.2.0**: Framework principal
- **Vite**: Build tool y servidor de desarrollo
- **Tailwind CSS**: Framework de estilos utilitarios
- **Framer Motion**: Animaciones fluidas
- **React Icons**: Iconografía
- **react-helmet-async**: Gestión de meta tags para SEO

## 📝 Sistema de Blog

### Arquitectura del Blog

El sistema de blog está diseñado con una arquitectura modular que permite:

- **Artículos Individuales**: Cada artículo es un archivo JavaScript separado
- **Routing Dinámico**: URLs con slugs únicos para cada artículo
- **SEO Automático**: Meta tags generados automáticamente
- **Soporte Completo de Markdown**: Headers, código, listas, enlaces, etc.
- **Multiidioma**: Contenido en español e inglés
- **Categorización**: Sistema de categorías y tags

### Estructura de un Artículo

Cada artículo se encuentra en `src/data/articles/` y sigue esta estructura:

```javascript
// src/data/articles/mi-articulo.js
export const miArticuloData = {
  id: 1, // ID único del artículo
  slug: "mi-articulo-slug", // Slug para la URL (sin espacios, guiones)
  title: {
    es: "Título en Español",
    en: "Title in English",
  },
  excerpt: {
    es: "Resumen del artículo en español...",
    en: "Article summary in English...",
  },
  image: "https://images.unsplash.com/photo-...", // URL de imagen principal
  content: {
    es: `Contenido en Markdown...`,
    en: `Content in Markdown...`,
  },
  author: "Emiliano",
  date: "2024-01-15", // Formato YYYY-MM-DD
  category: {
    es: "Desarrollo",
    en: "Development",
  },
  tags: ["React", "JavaScript", "Tutorial"],
  readTime: {
    es: "8 min de lectura",
    en: "8 min read",
  },
  featured: true, // Si aparece en destacados
};
```

## ➕ Cómo Agregar un Nuevo Artículo

### Paso 1: Crear el Archivo del Artículo

1. Crea un nuevo archivo en `src/data/articles/` con un nombre descriptivo:

   ```
   src/data/articles/nuevo-articulo.js
   ```

2. Copia la estructura base y completa todos los campos:

```javascript
export const nuevoArticuloData = {
  id: 7, // Incrementa el ID del último artículo
  slug: "nuevo-articulo-ejemplo",
  title: {
    es: "Cómo Crear Componentes React Reutilizables",
    en: "How to Create Reusable React Components"
  },
  excerpt: {
    es: "Aprende las mejores prácticas para crear componentes React que puedas reutilizar en todos tus proyectos.",
    en: "Learn best practices for creating React components that you can reuse across all your projects."
  },
  image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  content: {
    es: \`
# Introducción

Los componentes reutilizables son la base de cualquier aplicación React exitosa...

## ¿Por qué crear componentes reutilizables?

1. **Consistencia**: Mantener un diseño uniforme
2. **Mantenibilidad**: Cambios centralizados
3. **Productividad**: Desarrollo más rápido

### Ejemplo de Componente Básico

\\\`\\\`\\\`jsx
import React from 'react';

const Button = ({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  disabled = false
}) => {
  const baseClasses = 'font-medium rounded-lg transition-colors';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };

  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={\\\`\\\${baseClasses} \\\${variants[variant]} \\\${sizes[size]} \\\${disabled ? 'opacity-50 cursor-not-allowed' : ''}\\\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
\\\`\\\`\\\`

## Mejores Prácticas

- **Props claras**: Define interfaces claras con propTypes o TypeScript
- **Composición**: Prefiere composición sobre herencia
- **Testing**: Escribe tests para cada componente
    \`,
    en: \`
# Introduction

Reusable components are the foundation of any successful React application...

## Why create reusable components?

1. **Consistency**: Maintain uniform design
2. **Maintainability**: Centralized changes
3. **Productivity**: Faster development

### Basic Component Example

\\\`\\\`\\\`jsx
import React from 'react';

const Button = ({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  disabled = false
}) => {
  const baseClasses = 'font-medium rounded-lg transition-colors';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };

  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={\\\`\\\${baseClasses} \\\${variants[variant]} \\\${sizes[size]} \\\${disabled ? 'opacity-50 cursor-not-allowed' : ''}\\\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
\\\`\\\`\\\`

## Best Practices

- **Clear props**: Define clear interfaces with propTypes or TypeScript
- **Composition**: Prefer composition over inheritance
- **Testing**: Write tests for each component
    \`
  },
  author: "Emiliano",
  date: "2024-01-20",
  category: {
    es: "React",
    en: "React"
  },
  tags: ["React", "Components", "Best Practices", "JavaScript"],
  readTime: {
    es: "12 min de lectura",
    en: "12 min read"
  },
  featured: false
};
```

### Paso 2: Registrar el Artículo

Abre `src/data/blogData.jsx` y agrega la importación y el artículo al array:

```javascript
// Importar el nuevo artículo
import { nuevoArticuloData } from "./articles/nuevo-articulo.js";

// Agregar al array de artículos
export const blogData = [
  tailwindMigrationArticle,
  reactHooksArticle,
  javascriptOptimizationArticle,
  testingGuideArticle,
  cssFrameworksArticle,
  nextjsGuideArticle,
  nuevoArticuloData, // ← Agregar aquí
];
```

### Paso 3: Verificar el Artículo

1. Inicia el servidor de desarrollo: `npm run dev`
2. Navega a la sección Blog
3. Verifica que tu artículo aparezca en la lista
4. Haz clic para ver el artículo completo
5. Verifica que la URL sea correcta: `/blog/nuevo-articulo-ejemplo`

## 🎨 Guía de Markdown

El sistema de blog soporta los siguientes elementos de Markdown:

### Headers

```markdown
# Header 1

## Header 2

### Header 3
```

### Texto con Formato

```markdown
**Texto en negrita**
_Texto en cursiva_
\`código inline\`
```

### Enlaces

```markdown
[Texto del enlace](https://ejemplo.com)
```

### Listas

```markdown
- Elemento de lista
- Otro elemento

1. Lista numerada
2. Segundo elemento
```

### Bloques de Código

```markdown
\\\`\\\`\\\`javascript
const ejemplo = "código JavaScript";
console.log(ejemplo);
\\\`\\\`\\\`

\\\`\\\`\\\`jsx
const Component = () => {
return <div>React Component</div>;
};
\\\`\\\`\\\`
```

## 🖼️ Gestión de Imágenes

### Imágenes de Artículos

Para las imágenes principales de los artículos, recomendamos usar:

1. **Unsplash** (gratuito): https://unsplash.com/

   - Busca imágenes relacionadas con tecnología
   - Usa URLs optimizadas: `?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`

2. **Dimensiones recomendadas**: 1200x600px (ratio 2:1)

### Ejemplo de URL de Unsplash:

```
https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80
```

## 🏷️ Sistema de Categorías y Tags

### Categorías Existentes

- **React**: Artículos sobre React y hooks
- **JavaScript**: JavaScript vanilla y ES6+
- **CSS**: Estilos, frameworks CSS, diseño
- **Testing**: Testing, QA, mejores prácticas
- **Next.js**: Framework Next.js
- **Desarrollo**: Artículos generales de desarrollo

### Tags Recomendados

- Tecnologías: `React`, `JavaScript`, `CSS`, `HTML`, `Node.js`
- Conceptos: `Hooks`, `Components`, `Testing`, `Performance`
- Frameworks: `Next.js`, `Tailwind`, `Vite`
- Nivel: `Beginner`, `Intermediate`, `Advanced`

## 🚀 Instalación y Desarrollo

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd mi-web

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de la build
npm run preview
```

### Scripts Disponibles

- `npm run dev`: Servidor de desarrollo
- `npm run build`: Build para producción
- `npm run preview`: Preview de la build
- `npm run lint`: Ejecutar ESLint

## 📱 Responsive Design

El proyecto está optimizado para:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔍 SEO y Meta Tags

Cada artículo genera automáticamente:

- `<title>` optimizado
- Meta description
- Open Graph tags (Facebook)
- Twitter Cards
- Canonical URLs
- Structured data para artículos

## ♿ Accesibilidad

Características de accesibilidad implementadas:

- Navegación por teclado
- Screen reader support
- Contraste adecuado
- Focus management
- ARIA labels
- Skip links

## 🎯 Performance

Optimizaciones incluidas:

- Code splitting automático
- Lazy loading de imágenes
- Minificación de CSS/JS
- Compresión de assets
- Critical CSS inlined

## 📄 Licencia

Este proyecto es de código abierto bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📧 Contacto

**Emiliano Conti**

- Email: emiliano@ejemplo.com
- LinkedIn: linkedin.com/in/emiliano-conti
- GitHub: github.com/emcon84

---

_Última actualización: Agosto 2025_

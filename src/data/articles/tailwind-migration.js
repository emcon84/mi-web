export const tailwindMigrationArticle = {
  id: 1,
  slug: "como-migre-de-css-a-tailwind-css-en-proyectos-react",
  title: {
    es: "Cómo Migré de CSS a Tailwind CSS en Proyectos React",
    en: "How I Migrated from CSS to Tailwind CSS in React Projects",
  },
  excerpt: {
    es: "Mi experiencia personal migrando proyectos React de CSS tradicional a Tailwind CSS, los desafíos encontrados y las mejores prácticas aprendidas en el proceso.",
    en: "My personal experience migrating React projects from traditional CSS to Tailwind CSS, challenges encountered and best practices learned in the process.",
  },
  image:
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
  content: {
    es: `La migración de CSS tradicional a Tailwind CSS puede parecer abrumadora al principio, pero los beneficios a largo plazo son enormes. En este artículo, compartiré mi experiencia migrando varios proyectos React y las lecciones aprendidas en el proceso.

## ¿Por qué migrar a Tailwind CSS?

Después de años trabajando con CSS tradicional, SASS y CSS-in-JS, decidí dar el salto a Tailwind CSS por varias razones:

**1. Consistencia en el diseño**
Con Tailwind, ya no tengo que inventar nombres para clases CSS o preocuparme por la especificidad. El sistema de diseño está predefinido y es consistente.

**2. Desarrollo más rápido**
Una vez que te acostumbras a las utilidades de Tailwind, el desarrollo se acelera considerablemente. No hay necesidad de cambiar entre archivos CSS y JSX.

**3. Menor peso del bundle**
Tailwind CSS purga automáticamente las clases no utilizadas, resultando en un CSS mucho más pequeño en producción.

## El proceso de migración

### Paso 1: Configuración inicial

Primero, instalé Tailwind CSS en mi proyecto React:

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

### Paso 2: Configuración del archivo tailwind.config.js

\`\`\`javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
\`\`\`

### Paso 3: Migración gradual de componentes

En lugar de migrar todo de una vez, opté por un enfoque gradual:

\`\`\`jsx
// Antes - CSS tradicional
const Button = ({ children, variant = 'primary' }) => {
  return (
    <button className={\`btn btn-\${variant}\`}>
      {children}
    </button>
  );
};

// Después - Tailwind CSS
const Button = ({ children, variant = 'primary' }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors duration-200';
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  };
  
  return (
    <button className={\`\${baseClasses} \${variantClasses[variant]}\`}>
      {children}
    </button>
  );
};
\`\`\`

## Desafíos encontrados

### 1. Curva de aprendizaje
Al principio, recordar todas las clases de utilidad puede ser desafiante. Solución: usar la extensión de VS Code y tener la documentación a mano.

### 2. Componentes complejos
Para layouts complejos, a veces las clases de utilidad pueden volverse muy largas. Solución: crear componentes reutilizables o usar @apply en casos específicos.

### 3. Customización del tema
Algunos diseños requerían colores o espaciados específicos que no estaban en el tema por defecto. Solución: extender el tema en tailwind.config.js.

## Mejores prácticas aprendidas

### 1. Usa componentes base
\`\`\`jsx
// Crea componentes base reutilizables
const Card = ({ children, className = '' }) => {
  return (
    <div className={\`bg-white rounded-lg shadow-md p-6 \${className}\`}>
      {children}
    </div>
  );
};
\`\`\`

### 2. Organiza las clases
\`\`\`jsx
// Agrupa las clases por categoría para mejor legibilidad
const className = [
  // Layout
  'flex items-center justify-between',
  // Spacing
  'px-4 py-2 mb-4',
  // Appearance
  'bg-white border border-gray-200 rounded-lg shadow-sm',
  // Typography
  'text-gray-800 font-medium',
  // States
  'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
].join(' ');
\`\`\`

### 3. Usa @apply con moderación
\`\`\`css
/* Solo para patrones muy repetitivos */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500;
  }
}
\`\`\`

## Resultados

Después de completar la migración en varios proyectos, los resultados fueron:

- **Reducción del 60% en el tamaño del CSS**
- **Desarrollo 40% más rápido** para nuevas features
- **Mayor consistencia** en el diseño
- **Menos bugs de CSS** relacionados con especificidad

## Conclusión

La migración a Tailwind CSS ha sido una de las mejores decisiones técnicas que he tomado. Aunque requiere una inversión inicial de tiempo para aprender las utilidades, los beneficios a largo plazo son significativos.

Si estás considerando hacer la migración, mi consejo es:

1. **Empieza pequeño**: Migra un componente a la vez
2. **Usa las herramientas**: La extensión de VS Code es imprescindible
3. **Personaliza el tema**: Adapta Tailwind a tu sistema de diseño
4. **Sé paciente**: La curva de aprendizaje vale la pena

¿Has considerado migrar a Tailwind CSS? ¡Me encantaría conocer tu experiencia!`,
    en: `Migrating from traditional CSS to Tailwind CSS can seem overwhelming at first, but the long-term benefits are enormous. In this article, I'll share my experience migrating several React projects and the lessons learned in the process.

## Why migrate to Tailwind CSS?

After years working with traditional CSS, SASS, and CSS-in-JS, I decided to make the leap to Tailwind CSS for several reasons:

**1. Design consistency**
With Tailwind, I no longer have to invent names for CSS classes or worry about specificity. The design system is predefined and consistent.

**2. Faster development**
Once you get used to Tailwind's utilities, development speeds up considerably. There's no need to switch between CSS and JSX files.

**3. Smaller bundle size**
Tailwind CSS automatically purges unused classes, resulting in much smaller CSS in production.

## The migration process

### Step 1: Initial setup

First, I installed Tailwind CSS in my React project:

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

### Step 2: Configure tailwind.config.js

\`\`\`javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
\`\`\`

### Step 3: Gradual component migration

Instead of migrating everything at once, I opted for a gradual approach:

\`\`\`jsx
// Before - Traditional CSS
const Button = ({ children, variant = 'primary' }) => {
  return (
    <button className={\`btn btn-\${variant}\`}>
      {children}
    </button>
  );
};

// After - Tailwind CSS
const Button = ({ children, variant = 'primary' }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors duration-200';
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  };
  
  return (
    <button className={\`\${baseClasses} \${variantClasses[variant]}\`}>
      {children}
    </button>
  );
};
\`\`\`

## Challenges encountered

### 1. Learning curve
At first, remembering all utility classes can be challenging. Solution: use the VS Code extension and keep the documentation handy.

### 2. Complex components
For complex layouts, sometimes utility classes can become very long. Solution: create reusable components or use @apply in specific cases.

### 3. Theme customization
Some designs required specific colors or spacing that weren't in the default theme. Solution: extend the theme in tailwind.config.js.

## Best practices learned

### 1. Use base components
\`\`\`jsx
// Create reusable base components
const Card = ({ children, className = '' }) => {
  return (
    <div className={\`bg-white rounded-lg shadow-md p-6 \${className}\`}>
      {children}
    </div>
  );
};
\`\`\`

### 2. Organize classes
\`\`\`jsx
// Group classes by category for better readability
const className = [
  // Layout
  'flex items-center justify-between',
  // Spacing
  'px-4 py-2 mb-4',
  // Appearance
  'bg-white border border-gray-200 rounded-lg shadow-sm',
  // Typography
  'text-gray-800 font-medium',
  // States
  'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
].join(' ');
\`\`\`

### 3. Use @apply sparingly
\`\`\`css
/* Only for very repetitive patterns */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500;
  }
}
\`\`\`

## Results

After completing the migration across several projects, the results were:

- **60% reduction in CSS size**
- **40% faster development** for new features
- **Greater consistency** in design
- **Fewer CSS bugs** related to specificity

## Conclusion

Migrating to Tailwind CSS has been one of the best technical decisions I've made. While it requires an initial time investment to learn the utilities, the long-term benefits are significant.

If you're considering making the migration, my advice is:

1. **Start small**: Migrate one component at a time
2. **Use the tools**: The VS Code extension is essential
3. **Customize the theme**: Adapt Tailwind to your design system
4. **Be patient**: The learning curve is worth it

Have you considered migrating to Tailwind CSS? I'd love to hear about your experience!`,
  },
  author: "Emiliano",
  date: "2024-01-15",
  category: {
    es: "Frontend",
    en: "Frontend",
  },
  tags: ["React", "Tailwind CSS", "CSS", "Migration"],
  readTime: {
    es: "8 min de lectura",
    en: "8 min read",
  },
  featured: true,
};

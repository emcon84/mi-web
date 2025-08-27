export const sietepasosDisenoWebArticle = {
  id: 9,
  slug: "7-pasos-principales-disenar-sitio-web-profesional",
  title: {
    es: "Los 7 Pasos Principales para Diseñar un Sitio Web Exitoso",
    en: "The 7 Main Steps to Design a Successful Website",
  },
  excerpt: {
    es: "Metodología probada para diseñar sitios web que conviertan. Desde la investigación inicial hasta el lanzamiento, aprende el proceso completo paso a paso.",
    en: "Proven methodology for designing websites that convert. From initial research to launch, learn the complete process step by step.",
  },
  image:
    "https://images.unsplash.com/photo-1559028006-448665bd7c7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
  content: {
    es: `Diseñar un sitio web exitoso no es casualidad. Requiere un proceso estructurado que garantice que cada elemento tenga un propósito y contribuya a los objetivos del negocio. Te presento los 7 pasos esenciales que sigo en cada proyecto.

## Paso 1: Investigación y Análisis de Requerimientos

### Entender el Negocio
Antes de diseñar cualquier pixel, necesitas comprender completamente:

- **Objetivos del negocio**: ¿Qué quiere lograr con el sitio web?
- **Público objetivo**: ¿Quiénes son los usuarios ideales?
- **Propuesta de valor**: ¿Qué hace único al negocio?
- **Competencia**: ¿Qué están haciendo otros en el mercado?

### Investigación de Usuarios
\`\`\`javascript
// Ejemplo de datos de usuario para análisis
const userPersonas = [
  {
    name: "María Empresaria",
    age: 35,
    goals: ["Encontrar soluciones rápidas", "Información clara"],
    frustrations: ["Sitios lentos", "Información confusa"],
    devices: ["Desktop", "Mobile"],
    techLevel: "Intermedio"
  },
  {
    name: "Carlos Joven",
    age: 28,
    goals: ["Experiencias modernas", "Interacciones fluidas"],
    frustrations: ["Diseños anticuados", "Procesos complicados"],
    devices: ["Mobile", "Tablet"],
    techLevel: "Avanzado"
  }
];
\`\`\`

### Audit de la Competencia
- **Análisis de fortalezas**: ¿Qué hacen bien?
- **Identificación de debilidades**: ¿Dónde podemos diferenciarnos?
- **Tendencias del sector**: ¿Qué esperan los usuarios?

## Paso 2: Definición de la Arquitectura de Información

### Mapa del Sitio
Organiza el contenido de manera lógica:

\`\`\`
Inicio
├── Nosotros
│   ├── Equipo
│   └── Historia
├── Servicios
│   ├── Desarrollo Web
│   ├── Diseño UX/UI
│   └── Consultoría
├── Portfolio
│   ├── Proyectos Destacados
│   └── Casos de Estudio
├── Blog
│   ├── Categorías
│   └── Archivo
└── Contacto
    ├── Información
    └── Formulario
\`\`\`

### Wireframes de Baja Fidelidad
\`\`\`jsx
// Componente wireframe conceptual
const WireframeLayout = () => {
  return (
    <div className="wireframe">
      {/* Header */}
      <header className="h-16 bg-gray-200 flex items-center px-4">
        <div className="w-32 h-8 bg-gray-400"></div> {/* Logo */}
        <nav className="ml-auto flex space-x-4">
          <div className="w-16 h-4 bg-gray-400"></div>
          <div className="w-16 h-4 bg-gray-400"></div>
          <div className="w-16 h-4 bg-gray-400"></div>
        </nav>
      </header>
      
      {/* Hero Section */}
      <section className="h-96 bg-gray-100 flex flex-col justify-center items-center">
        <div className="w-96 h-8 bg-gray-400 mb-4"></div> {/* Título */}
        <div className="w-80 h-4 bg-gray-300 mb-8"></div> {/* Subtítulo */}
        <div className="w-32 h-12 bg-blue-300"></div> {/* CTA */}
      </section>
      
      {/* Content Sections */}
      <main className="p-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-gray-100 h-64"></div>
          <div className="bg-gray-100 h-64"></div>
          <div className="bg-gray-100 h-64"></div>
        </div>
      </main>
    </div>
  );
};
\`\`\`

### User Flow (Flujo de Usuario)
Define cómo los usuarios navegarán por el sitio:

1. **Landing page** → Captar atención
2. **Navegación** → Explorar servicios
3. **Páginas de contenido** → Generar interés
4. **Call-to-action** → Convertir visitante
5. **Formulario/Contacto** → Generar lead

## Paso 3: Diseño Visual y Sistema de Identidad

### Paleta de Colores
\`\`\`css
/* Sistema de colores coherente */
:root {
  /* Colores primarios */
  --primary-50: #eff6ff;
  --primary-500: #3b82f6;
  --primary-900: #1e3a8a;
  
  /* Colores secundarios */
  --secondary-50: #f0fdf4;
  --secondary-500: #22c55e;
  --secondary-900: #14532d;
  
  /* Neutros */
  --gray-50: #f9fafb;
  --gray-500: #6b7280;
  --gray-900: #111827;
}

/* Aplicación en componentes */
.btn-primary {
  background-color: var(--primary-500);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: var(--primary-600);
}
\`\`\`

### Tipografía
\`\`\`css
/* Sistema tipográfico escalable */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.typography-scale {
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px */
}

h1 { 
  font-size: var(--text-4xl); 
  font-weight: 700; 
  line-height: 1.2; 
}

h2 { 
  font-size: var(--text-3xl); 
  font-weight: 600; 
  line-height: 1.3; 
}

p { 
  font-size: var(--text-base); 
  line-height: 1.6; 
  color: var(--gray-700); 
}
\`\`\`

### Iconografía y Elementos Visuales
\`\`\`jsx
// Sistema de iconos consistente
import { 
  HomeIcon, 
  UserIcon, 
  CogIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline';

const IconSystem = () => {
  const icons = {
    home: HomeIcon,
    user: UserIcon,
    settings: CogIcon,
    analytics: ChartBarIcon
  };

  return (
    <div className="icon-grid">
      {Object.entries(icons).map(([name, Icon]) => (
        <div key={name} className="icon-item">
          <Icon className="w-6 h-6 text-primary-500" />
          <span className="text-sm">{name}</span>
        </div>
      ))}
    </div>
  );
};
\`\`\`

## Paso 4: Prototipado Interactivo

### Mockups de Alta Fidelidad
\`\`\`jsx
// Componente de diseño final
const HighFidelityMockup = () => {
  return (
    <div className="mockup-container">
      {/* Header moderno */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img className="h-8 w-auto" src="/logo.svg" alt="Logo" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                TuEmpresa
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                Inicio
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                Servicios
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                Portfolio
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                Contacto
              </a>
            </nav>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Comenzar
            </button>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Transformamos Ideas en
            <span className="block text-yellow-400">Experiencias Digitales</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Creamos sitios web que no solo se ven increíbles, sino que también 
            convierten visitantes en clientes leales.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Ver Nuestro Trabajo
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Contactar Ahora
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
\`\`\`

### Prototipo Interactivo
- **Navegación funcional**: Enlaces que funcionan
- **Animaciones sutiles**: Transiciones suaves
- **Estados de hover**: Feedback visual
- **Responsive design**: Adaptación a diferentes pantallas

## Paso 5: Desarrollo Frontend

### Configuración del Proyecto
\`\`\`javascript
// Configuración optimizada con Vite + React
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@styles': resolve(__dirname, 'src/styles')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@headlessui/react', '@heroicons/react']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
\`\`\`

### Componentes Reutilizables
\`\`\`jsx
// Sistema de componentes modular
const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  
  const classes = \`\${baseClasses} \${variants[variant]} \${sizes[size]} \${className}\`;
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

// Card component reutilizable
const Card = ({ title, description, image, link }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-w-16 aspect-h-9">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Button variant="outline" size="sm">
          Ver Más
        </Button>
      </div>
    </div>
  );
};
\`\`\`

### Optimización de Performance
\`\`\`jsx
// Lazy loading para imágenes
import { useState, useRef, useEffect } from 'react';

const LazyImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={className}>
      {inView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={\`transition-opacity duration-300 \${
            loaded ? 'opacity-100' : 'opacity-0'
          }\`}
        />
      )}
    </div>
  );
};
\`\`\`

## Paso 6: Optimización SEO y Performance

### Meta Tags Optimizados
\`\`\`jsx
// Componente SEO Head
const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url 
}) => {
  return (
    <Helmet>
      {/* Meta tags básicos */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {\`{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Tu Empresa",
          "url": "\${url}",
          "logo": "\${image}",
          "description": "\${description}"
        }\`}
      </script>
    </Helmet>
  );
};
\`\`\`

### Web Vitals Optimization
\`\`\`javascript
// Monitoreo de Core Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Enviar métricas a tu servicio de analytics
  console.log(metric);
}

// Medir todas las métricas importantes
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
\`\`\`

### Code Splitting
\`\`\`jsx
// Lazy loading de componentes
import { lazy, Suspense } from 'react';

const LazyPortfolio = lazy(() => import('./components/Portfolio'));
const LazyBlog = lazy(() => import('./components/Blog'));

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/portfolio" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <LazyPortfolio />
            </Suspense>
          } 
        />
        <Route 
          path="/blog" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <LazyBlog />
            </Suspense>
          } 
        />
      </Routes>
    </Router>
  );
};
\`\`\`

## Paso 7: Testing y Lanzamiento

### Testing de Usabilidad
\`\`\`javascript
// Tests automatizados con Jest y Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '../components/ContactForm';

describe('ContactForm', () => {
  test('submits form with correct data', async () => {
    render(<ContactForm />);
    
    const nameInput = screen.getByLabelText(/nombre/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /enviar/i });
    
    fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });
    fireEvent.change(emailInput, { target: { value: 'juan@example.com' } });
    fireEvent.click(submitButton);
    
    expect(screen.getByText(/mensaje enviado/i)).toBeInTheDocument();
  });
});
\`\`\`

### Testing de Performance
\`\`\`javascript
// Lighthouse CI configuration
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
\`\`\`

### Deployment Optimizado
\`\`\`javascript
// Configuración de Vercel
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ]
}
\`\`\`

## Checklist de Pre-Lanzamiento

### Técnico
- [ ] **Performance**: Lighthouse score > 90
- [ ] **SEO**: Meta tags optimizados
- [ ] **Accessibility**: WCAG 2.1 AA compliance
- [ ] **Mobile**: Responsive en todos los dispositivos
- [ ] **Forms**: Validación y envío funcionando
- [ ] **Analytics**: Google Analytics configurado
- [ ] **SSL**: Certificado HTTPS activo

### Contenido
- [ ] **Copy**: Revisión ortográfica y gramatical
- [ ] **Imágenes**: Alt text en todas las imágenes
- [ ] **Links**: Todos los enlaces funcionan
- [ ] **Contact**: Información de contacto actualizada
- [ ] **Legal**: Política de privacidad y términos

### Marketing
- [ ] **Social Media**: Meta tags para compartir
- [ ] **Google My Business**: Perfil actualizado
- [ ] **Sitemap**: XML sitemap enviado a Google
- [ ] **Redirects**: 301 redirects configurados
- [ ] **Monitoring**: Herramientas de monitoreo activas

## Métricas de Éxito Post-Lanzamiento

### KPIs Técnicos
\`\`\`javascript
// Dashboard de métricas
const WebVitalsMonitor = () => {
  const [metrics, setMetrics] = useState({
    lcp: 0,  // Largest Contentful Paint
    fid: 0,  // First Input Delay
    cls: 0,  // Cumulative Layout Shift
    ttfb: 0  // Time to First Byte
  });

  useEffect(() => {
    // Configurar monitoreo de métricas
    import('web-vitals').then(({ getCLS, getFID, getLCP, getTTFB }) => {
      getCLS((metric) => setMetrics(prev => ({ ...prev, cls: metric.value })));
      getFID((metric) => setMetrics(prev => ({ ...prev, fid: metric.value })));
      getLCP((metric) => setMetrics(prev => ({ ...prev, lcp: metric.value })));
      getTTFB((metric) => setMetrics(prev => ({ ...prev, ttfb: metric.value })));
    });
  }, []);

  return (
    <div className="metrics-dashboard">
      <h3>Web Vitals</h3>
      <div className="metrics-grid">
        <div className="metric">
          <span>LCP: {metrics.lcp.toFixed(2)}s</span>
          <div className={\`status \${metrics.lcp < 2.5 ? 'good' : 'poor'}\`}></div>
        </div>
        <div className="metric">
          <span>FID: {metrics.fid.toFixed(2)}ms</span>
          <div className={\`status \${metrics.fid < 100 ? 'good' : 'poor'}\`}></div>
        </div>
        <div className="metric">
          <span>CLS: {metrics.cls.toFixed(3)}</span>
          <div className={\`status \${metrics.cls < 0.1 ? 'good' : 'poor'}\`}></div>
        </div>
      </div>
    </div>
  );
};
\`\`\`

### KPIs de Negocio
- **Tasa de conversión**: Visitantes que completan objetivos
- **Tiempo en página**: Engagement del usuario
- **Tasa de rebote**: Porcentaje de salidas inmediatas
- **Velocidad de carga**: Tiempo de primera interacción
- **Leads generados**: Formularios completados

## Conclusión

Estos 7 pasos forman una metodología probada que garantiza resultados. La clave está en:

1. **No saltarse etapas**: Cada paso tiene su propósito
2. **Iterar constantemente**: El diseño evoluciona
3. **Pensar en el usuario**: Siempre priorizar la experiencia
4. **Medir resultados**: Los datos guían las decisiones
5. **Mantener actualizado**: El web es un medio en constante cambio

Un sitio web exitoso es la suma de una buena estrategia, diseño centrado en el usuario, desarrollo técnico sólido y optimización continua. Siguiendo esta metodología, crearás sitios web que no solo se ven increíbles, sino que también generan resultados tangibles para el negocio.

---

## 🚀 ¿Necesitas ayuda profesional?

Si quieres implementar esta metodología en tu proyecto y crear un sitio web que realmente genere resultados, puedo ayudarte. Como desarrollador especializado en experiencias web modernas, ofrezco servicios de desarrollo y diseño web profesional.

**[👉 Conoce mis servicios de desarrollo web →](https://www.emidev.studio)**

---

*¿Tienes preguntas sobre diseño web? ¡No dudes en contactarme para discutir tu proyecto!*`,
    en: `Designing a successful website is no accident. It requires a structured process that ensures every element has a purpose and contributes to business objectives. Here are the 7 essential steps I follow in every project.

## Step 1: Research and Requirements Analysis

### Understanding the Business
Before designing any pixel, you need to fully understand:

- **Business objectives**: What do you want to achieve with the website?
- **Target audience**: Who are the ideal users?
- **Value proposition**: What makes the business unique?
- **Competition**: What are others doing in the market?

### User Research
\`\`\`javascript
// Example user data for analysis
const userPersonas = [
  {
    name: "Maria Entrepreneur",
    age: 35,
    goals: ["Find quick solutions", "Clear information"],
    frustrations: ["Slow sites", "Confusing information"],
    devices: ["Desktop", "Mobile"],
    techLevel: "Intermediate"
  },
  {
    name: "Carlos Young",
    age: 28,
    goals: ["Modern experiences", "Smooth interactions"],
    frustrations: ["Outdated designs", "Complicated processes"],
    devices: ["Mobile", "Tablet"],
    techLevel: "Advanced"
  }
];
\`\`\`

### Competitive Audit
- **Strengths analysis**: What do they do well?
- **Weakness identification**: Where can we differentiate?
- **Industry trends**: What do users expect?

## Step 2: Information Architecture Definition

### Site Map
Organize content logically:

\`\`\`
Home
├── About
│   ├── Team
│   └── History
├── Services
│   ├── Web Development
│   ├── UX/UI Design
│   └── Consulting
├── Portfolio
│   ├── Featured Projects
│   └── Case Studies
├── Blog
│   ├── Categories
│   └── Archive
└── Contact
    ├── Information
    └── Form
\`\`\`

### Low-Fidelity Wireframes
\`\`\`jsx
// Conceptual wireframe component
const WireframeLayout = () => {
  return (
    <div className="wireframe">
      {/* Header */}
      <header className="h-16 bg-gray-200 flex items-center px-4">
        <div className="w-32 h-8 bg-gray-400"></div> {/* Logo */}
        <nav className="ml-auto flex space-x-4">
          <div className="w-16 h-4 bg-gray-400"></div>
          <div className="w-16 h-4 bg-gray-400"></div>
          <div className="w-16 h-4 bg-gray-400"></div>
        </nav>
      </header>
      
      {/* Hero Section */}
      <section className="h-96 bg-gray-100 flex flex-col justify-center items-center">
        <div className="w-96 h-8 bg-gray-400 mb-4"></div> {/* Title */}
        <div className="w-80 h-4 bg-gray-300 mb-8"></div> {/* Subtitle */}
        <div className="w-32 h-12 bg-blue-300"></div> {/* CTA */}
      </section>
      
      {/* Content Sections */}
      <main className="p-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-gray-100 h-64"></div>
          <div className="bg-gray-100 h-64"></div>
          <div className="bg-gray-100 h-64"></div>
        </div>
      </main>
    </div>
  );
};
\`\`\`

### User Flow
Define how users will navigate the site:

1. **Landing page** → Capture attention
2. **Navigation** → Explore services
3. **Content pages** → Generate interest
4. **Call-to-action** → Convert visitor
5. **Form/Contact** → Generate lead

## Step 3: Visual Design and Identity System

### Color Palette
\`\`\`css
/* Coherent color system */
:root {
  /* Primary colors */
  --primary-50: #eff6ff;
  --primary-500: #3b82f6;
  --primary-900: #1e3a8a;
  
  /* Secondary colors */
  --secondary-50: #f0fdf4;
  --secondary-500: #22c55e;
  --secondary-900: #14532d;
  
  /* Neutrals */
  --gray-50: #f9fafb;
  --gray-500: #6b7280;
  --gray-900: #111827;
}

/* Application in components */
.btn-primary {
  background-color: var(--primary-500);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: var(--primary-600);
}
\`\`\`

### Typography
\`\`\`css
/* Scalable typographic system */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.typography-scale {
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px */
}

h1 { 
  font-size: var(--text-4xl); 
  font-weight: 700; 
  line-height: 1.2; 
}

h2 { 
  font-size: var(--text-3xl); 
  font-weight: 600; 
  line-height: 1.3; 
}

p { 
  font-size: var(--text-base); 
  line-height: 1.6; 
  color: var(--gray-700); 
}
\`\`\`

### Iconography and Visual Elements
\`\`\`jsx
// Consistent icon system
import { 
  HomeIcon, 
  UserIcon, 
  CogIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline';

const IconSystem = () => {
  const icons = {
    home: HomeIcon,
    user: UserIcon,
    settings: CogIcon,
    analytics: ChartBarIcon
  };

  return (
    <div className="icon-grid">
      {Object.entries(icons).map(([name, Icon]) => (
        <div key={name} className="icon-item">
          <Icon className="w-6 h-6 text-primary-500" />
          <span className="text-sm">{name}</span>
        </div>
      ))}
    </div>
  );
};
\`\`\`

## Step 4: Interactive Prototyping

### High-Fidelity Mockups
\`\`\`jsx
// Final design component
const HighFidelityMockup = () => {
  return (
    <div className="mockup-container">
      {/* Modern header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img className="h-8 w-auto" src="/logo.svg" alt="Logo" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                YourCompany
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                Services
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                Portfolio
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors">
                Contact
              </a>
            </nav>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl font-bold mb-6">
            We Transform Ideas into
            <span className="block text-yellow-400">Digital Experiences</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            We create websites that not only look incredible, but also 
            convert visitors into loyal customers.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              View Our Work
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Contact Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
\`\`\`

### Interactive Prototype
- **Functional navigation**: Working links
- **Subtle animations**: Smooth transitions
- **Hover states**: Visual feedback
- **Responsive design**: Adaptation to different screens

## Step 5: Frontend Development

### Project Configuration
\`\`\`javascript
// Optimized configuration with Vite + React
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@styles': resolve(__dirname, 'src/styles')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@headlessui/react', '@heroicons/react']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
\`\`\`

### Reusable Components
\`\`\`jsx
// Modular component system
const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  
  const classes = \`\${baseClasses} \${variants[variant]} \${sizes[size]} \${className}\`;
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

// Reusable Card component
const Card = ({ title, description, image, link }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-w-16 aspect-h-9">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Button variant="outline" size="sm">
          Learn More
        </Button>
      </div>
    </div>
  );
};
\`\`\`

### Performance Optimization
\`\`\`jsx
// Lazy loading for images
import { useState, useRef, useEffect } from 'react';

const LazyImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={className}>
      {inView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={\`transition-opacity duration-300 \${
            loaded ? 'opacity-100' : 'opacity-0'
          }\`}
        />
      )}
    </div>
  );
};
\`\`\`

## Step 6: SEO and Performance Optimization

### Optimized Meta Tags
\`\`\`jsx
// SEO Head component
const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url 
}) => {
  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {\`{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Your Company",
          "url": "\${url}",
          "logo": "\${image}",
          "description": "\${description}"
        }\`}
      </script>
    </Helmet>
  );
};
\`\`\`

### Web Vitals Optimization
\`\`\`javascript
// Core Web Vitals monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send metrics to your analytics service
  console.log(metric);
}

// Measure all important metrics
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
\`\`\`

### Code Splitting
\`\`\`jsx
// Lazy loading of components
import { lazy, Suspense } from 'react';

const LazyPortfolio = lazy(() => import('./components/Portfolio'));
const LazyBlog = lazy(() => import('./components/Blog'));

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/portfolio" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <LazyPortfolio />
            </Suspense>
          } 
        />
        <Route 
          path="/blog" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <LazyBlog />
            </Suspense>
          } 
        />
      </Routes>
    </Router>
  );
};
\`\`\`

## Step 7: Testing and Launch

### Usability Testing
\`\`\`javascript
// Automated tests with Jest and Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '../components/ContactForm';

describe('ContactForm', () => {
  test('submits form with correct data', async () => {
    render(<ContactForm />);
    
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.click(submitButton);
    
    expect(screen.getByText(/message sent/i)).toBeInTheDocument();
  });
});
\`\`\`

### Performance Testing
\`\`\`javascript
// Lighthouse CI configuration
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
\`\`\`

### Optimized Deployment
\`\`\`javascript
// Vercel configuration
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ]
}
\`\`\`

## Pre-Launch Checklist

### Technical
- [ ] **Performance**: Lighthouse score > 90
- [ ] **SEO**: Optimized meta tags
- [ ] **Accessibility**: WCAG 2.1 AA compliance
- [ ] **Mobile**: Responsive on all devices
- [ ] **Forms**: Validation and submission working
- [ ] **Analytics**: Google Analytics configured
- [ ] **SSL**: HTTPS certificate active

### Content
- [ ] **Copy**: Spelling and grammar review
- [ ] **Images**: Alt text on all images
- [ ] **Links**: All links working
- [ ] **Contact**: Updated contact information
- [ ] **Legal**: Privacy policy and terms

### Marketing
- [ ] **Social Media**: Meta tags for sharing
- [ ] **Google My Business**: Updated profile
- [ ] **Sitemap**: XML sitemap sent to Google
- [ ] **Redirects**: 301 redirects configured
- [ ] **Monitoring**: Monitoring tools active

## Post-Launch Success Metrics

### Technical KPIs
\`\`\`javascript
// Metrics dashboard
const WebVitalsMonitor = () => {
  const [metrics, setMetrics] = useState({
    lcp: 0,  // Largest Contentful Paint
    fid: 0,  // First Input Delay
    cls: 0,  // Cumulative Layout Shift
    ttfb: 0  // Time to First Byte
  });

  useEffect(() => {
    // Configure metrics monitoring
    import('web-vitals').then(({ getCLS, getFID, getLCP, getTTFB }) => {
      getCLS((metric) => setMetrics(prev => ({ ...prev, cls: metric.value })));
      getFID((metric) => setMetrics(prev => ({ ...prev, fid: metric.value })));
      getLCP((metric) => setMetrics(prev => ({ ...prev, lcp: metric.value })));
      getTTFB((metric) => setMetrics(prev => ({ ...prev, ttfb: metric.value })));
    });
  }, []);

  return (
    <div className="metrics-dashboard">
      <h3>Web Vitals</h3>
      <div className="metrics-grid">
        <div className="metric">
          <span>LCP: {metrics.lcp.toFixed(2)}s</span>
          <div className={\`status \${metrics.lcp < 2.5 ? 'good' : 'poor'}\`}></div>
        </div>
        <div className="metric">
          <span>FID: {metrics.fid.toFixed(2)}ms</span>
          <div className={\`status \${metrics.fid < 100 ? 'good' : 'poor'}\`}></div>
        </div>
        <div className="metric">
          <span>CLS: {metrics.cls.toFixed(3)}</span>
          <div className={\`status \${metrics.cls < 0.1 ? 'good' : 'poor'}\`}></div>
        </div>
      </div>
    </div>
  );
};
\`\`\`

### Business KPIs
- **Conversion rate**: Visitors who complete objectives
- **Time on page**: User engagement
- **Bounce rate**: Percentage of immediate exits
- **Load speed**: Time to first interaction
- **Leads generated**: Forms completed

## Conclusion

These 7 steps form a proven methodology that guarantees results. The key is:

1. **Don't skip stages**: Each step has its purpose
2. **Iterate constantly**: Design evolves
3. **Think about the user**: Always prioritize experience
4. **Measure results**: Data guides decisions
5. **Keep updated**: The web is a constantly changing medium

A successful website is the sum of good strategy, user-centered design, solid technical development, and continuous optimization. Following this methodology, you'll create websites that not only look incredible, but also generate tangible results for the business.

---

## 🚀 Need professional help?

If you want to implement this methodology in your project and create a website that truly generates results, I can help you. As a developer specialized in modern web experiences, I offer professional web development and design services.

**[👉 Check out my web development services →](https://www.emidev.studio)**

---

*Have questions about web design? Don't hesitate to contact me to discuss your project!*`,
  },
  author: "Emiliano Conti",
  date: "2025-01-21",
  category: {
    es: "Diseño Web",
    en: "Web Design",
  },
  tags: ["Diseño Web", "UX/UI", "Metodología", "Desarrollo Web", "Frontend"],
  readTime: {
    es: "15 min de lectura",
    en: "15 min read",
  },
  featured: true,
};

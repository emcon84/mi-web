export const nextjsGuideArticle = {
  id: 4,
  title: {
    es: "Next.js 14: Guía Completa de App Router",
    en: "Next.js 14: Complete App Router Guide",
  },
  excerpt: {
    es: "Explora las nuevas características de Next.js 14 y App Router, incluyendo Server Components, streaming, y las mejores prácticas para aplicaciones modernas.",
    en: "Explore the new features of Next.js 14 and App Router, including Server Components, streaming, and best practices for modern applications.",
  },
  content: {
    es: `Next.js 14 introduce el App Router como la nueva forma estándar de estructurar aplicaciones. Este nuevo paradigma aprovecha React Server Components y ofrece un rendimiento superior y una mejor experiencia de desarrollo.

## ¿Qué es App Router?

App Router es el nuevo sistema de enrutamiento de Next.js que reemplaza al Pages Router. Está construido sobre React Server Components y ofrece:

- **Server Components por defecto**: Renderizado en el servidor para mejor performance
- **Streaming**: Carga progresiva de contenido
- **Layouts compartidos**: Reutilización de UI entre rutas
- **Colocation**: Archivos relacionados en la misma carpeta
- **Suspense integrado**: Loading states automáticos

## Estructura del App Router

### Estructura básica de directorios
\`\`\`
app/
├── layout.js          # Layout raíz
├── page.js            # Página principal (/)
├── loading.js         # UI de carga
├── error.js           # UI de error
├── not-found.js       # Página 404
├── global.css         # Estilos globales
├── about/
│   └── page.js        # Página /about
├── blog/
│   ├── layout.js      # Layout para blog
│   ├── page.js        # Lista de posts (/blog)
│   └── [slug]/
│       └── page.js    # Post individual (/blog/[slug])
└── dashboard/
    ├── layout.js
    ├── page.js
    ├── analytics/
    │   └── page.js
    └── settings/
        └── page.js
\`\`\`

### Archivo layout.js raíz
\`\`\`jsx
// app/layout.js
import './globals.css';

export const metadata = {
  title: 'Mi Aplicación Next.js',
  description: 'Aplicación construida con Next.js 14 y App Router',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <header>
          <nav>
            {/* Navegación global */}
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          {/* Footer global */}
        </footer>
      </body>
    </html>
  );
}
\`\`\`

## Server Components vs Client Components

### Server Components (por defecto)
\`\`\`jsx
// app/posts/page.js - Server Component
import { getPosts } from '@/lib/api';

export default async function PostsPage() {
  // Este fetch se ejecuta en el servidor
  const posts = await getPosts();

  return (
    <div>
      <h1>Posts del Blog</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

// Metadata para SEO
export async function generateMetadata() {
  const posts = await getPosts();
  
  return {
    title: \`Blog - \${posts.length} posts\`,
    description: 'Últimos posts del blog',
  };
}
\`\`\`

### Client Components (cuando necesitas interactividad)
\`\`\`jsx
// app/components/SearchForm.js
'use client'; // Directiva para Client Component

import { useState } from 'react';

export default function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar posts..."
      />
      <button type="submit">Buscar</button>
    </form>
  );
}
\`\`\`

## Carga de Datos con App Router

### Fetch de datos en Server Components
\`\`\`jsx
// app/products/page.js
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    cache: 'force-cache', // Cache por defecto
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1>Productos</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
\`\`\`

### Diferentes estrategias de cache
\`\`\`jsx
// Datos estáticos (build time)
const staticData = await fetch('https://api.example.com/static', {
  cache: 'force-cache' // Por defecto
});

// Datos dinámicos (cada request)
const dynamicData = await fetch('https://api.example.com/dynamic', {
  cache: 'no-store'
});

// Revalidación por tiempo
const timedData = await fetch('https://api.example.com/timed', {
  next: { revalidate: 3600 } // Revalida cada hora
});

// Revalidación por tags
const taggedData = await fetch('https://api.example.com/tagged', {
  next: { tags: ['products'] }
});
\`\`\`

## Loading UI y Streaming

### Archivo loading.js
\`\`\`jsx
// app/dashboard/loading.js
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      <p className="ml-4">Cargando dashboard...</p>
    </div>
  );
}
\`\`\`

### Streaming con Suspense
\`\`\`jsx
// app/dashboard/page.js
import { Suspense } from 'react';
import Analytics from './components/Analytics';
import RecentOrders from './components/RecentOrders';
import UserStats from './components/UserStats';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <Suspense fallback={<AnalyticsSkeleton />}>
        <Analytics />
      </Suspense>
      
      <Suspense fallback={<OrdersSkeleton />}>
        <RecentOrders />
      </Suspense>
      
      <Suspense fallback={<StatsSkeleton />}>
        <UserStats />
      </Suspense>
    </div>
  );
}

// Cada componente puede cargar datos independientemente
async function Analytics() {
  const data = await getAnalyticsData();
  return <AnalyticsChart data={data} />;
}
\`\`\`

## Manejo de Errores

### Error Boundaries con error.js
\`\`\`jsx
// app/dashboard/error.js
'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Algo salió mal</h2>
      <p className="text-gray-600 mb-4">
        Hubo un problema cargando el dashboard
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
\`\`\`

### Not Found personalizado
\`\`\`jsx
// app/blog/[slug]/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-4">Post no encontrado</h2>
      <p className="text-gray-600 mb-6">
        El post que buscas no existe o ha sido eliminado.
      </p>
      <Link 
        href="/blog"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Ver todos los posts
      </Link>
    </div>
  );
}
\`\`\`

## Rutas Dinámicas y Generación Estática

### Rutas dinámicas básicas
\`\`\`jsx
// app/blog/[slug]/page.js
import { notFound } from 'next/navigation';

async function getPost(slug) {
  const res = await fetch(\`https://api.example.com/posts/\${slug}\`);
  
  if (!res.ok) {
    return null;
  }
  
  return res.json();
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p className="text-gray-600">{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

// Generar páginas estáticas
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(res => res.json());
  
  return posts.map(post => ({
    slug: post.slug,
  }));
}

// Metadata dinámica
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post no encontrado',
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}
\`\`\`

### Rutas con múltiples segmentos dinámicos
\`\`\`jsx
// app/shop/[category]/[product]/page.js
export default async function ProductPage({ params }) {
  const { category, product } = params;
  
  const productData = await getProduct(category, product);

  return (
    <div>
      <h1>{productData.name}</h1>
      <p>Categoría: {category}</p>
      <p>Precio: \${productData.price}</p>
    </div>
  );
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  
  return products.map(product => ({
    category: product.category,
    product: product.slug,
  }));
}
\`\`\`

## Route Handlers (API Routes)

### GET Request
\`\`\`jsx
// app/api/posts/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await getPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
\`\`\`

### POST Request con validación
\`\`\`jsx
// app/api/posts/route.js
import { NextResponse } from 'next/server';
import { z } from 'zod';

const createPostSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  author: z.string().min(1),
});

export async function POST(request) {
  try {
    const body = await request.json();
    const validatedData = createPostSchema.parse(body);
    
    const newPost = await createPost(validatedData);
    
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
\`\`\`

### Rutas dinámicas en API
\`\`\`jsx
// app/api/posts/[id]/route.js
export async function GET(request, { params }) {
  const { id } = params;
  
  try {
    const post = await getPostById(id);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  
  try {
    await deletePost(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
\`\`\`

## Middleware

\`\`\`javascript
// middleware.js (en la raíz del proyecto)
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Verificar autenticación para rutas protegidas
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('auth-token');
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Reescribir URLs
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.rewrite(new URL('/dashboard', request.url));
  }

  // Agregar headers personalizados
  const response = NextResponse.next();
  response.headers.set('X-Custom-Header', 'value');
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
\`\`\`

## Optimizaciones y Mejores Prácticas

### Optimización de imágenes
\`\`\`jsx
import Image from 'next/image';

export default function ProductCard({ product }) {
  return (
    <div>
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={200}
        priority={product.featured} // Para imágenes above-the-fold
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,..." // Placeholder base64
      />
      <h3>{product.name}</h3>
      <p>\${product.price}</p>
    </div>
  );
}
\`\`\`

### Fuentes optimizadas
\`\`\`jsx
// app/layout.js
import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={\`\${inter.className} \${robotoMono.variable}\`}>
      <body>{children}</body>
    </html>
  );
}
\`\`\`

### Configuración de next.config.js
\`\`\`javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // Habilitar App Router
  },
  images: {
    domains: ['example.com', 'cdn.example.com'],
    formats: ['image/webp', 'image/avif'],
  },
  async redirects() {
    return [
      {
        source: '/old-blog/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
\`\`\`

## Deployment y Producción

### Variables de entorno
\`\`\`bash
# .env.local
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

# .env.production
DATABASE_URL="postgresql://prod-db..."
NEXTAUTH_URL="https://yourapp.com"
\`\`\`

### Configuración para Vercel
\`\`\`json
{
  "functions": {
    "app/api/heavy-task/route.js": {
      "maxDuration": 300
    }
  },
  "regions": ["cle1"]
}
\`\`\`

## Conclusión

Next.js 14 con App Router representa un gran salto hacia adelante en el desarrollo de aplicaciones React. Las principales ventajas incluyen:

- **Mejor performance**: Server Components y streaming
- **DX mejorada**: Colocation y file-based routing
- **SEO optimizado**: Metadata API y SSR por defecto
- **Escalabilidad**: Layouts compartidos y carga incremental

### Checklist de migración:
1. ✅ Entender Server vs Client Components
2. ✅ Reestructurar rutas al directorio \`app/\`
3. ✅ Migrar API routes a Route Handlers
4. ✅ Actualizar metadata y SEO
5. ✅ Implementar loading y error boundaries
6. ✅ Optimizar imágenes y fuentes
7. ✅ Configurar middleware si es necesario
8. ✅ Testing exhaustivo antes del deploy

¿Ya estás usando Next.js 14? ¡App Router es el futuro del desarrollo con Next.js!`,
    en: `Next.js 14 introduces App Router as the new standard way to structure applications. This new paradigm leverages React Server Components and offers superior performance and better developer experience.

## What is App Router?

App Router is Next.js's new routing system that replaces the Pages Router. It's built on React Server Components and offers:

- **Server Components by default**: Server-side rendering for better performance
- **Streaming**: Progressive content loading
- **Shared layouts**: UI reuse across routes
- **Colocation**: Related files in the same folder
- **Integrated Suspense**: Automatic loading states

## App Router Structure

### Basic directory structure
\`\`\`
app/
├── layout.js          # Root layout
├── page.js            # Main page (/)
├── loading.js         # Loading UI
├── error.js           # Error UI
├── not-found.js       # 404 page
├── global.css         # Global styles
├── about/
│   └── page.js        # /about page
├── blog/
│   ├── layout.js      # Blog layout
│   ├── page.js        # Posts list (/blog)
│   └── [slug]/
│       └── page.js    # Individual post (/blog/[slug])
└── dashboard/
    ├── layout.js
    ├── page.js
    ├── analytics/
    │   └── page.js
    └── settings/
        └── page.js
\`\`\`

### Root layout.js file
\`\`\`jsx
// app/layout.js
import './globals.css';

export const metadata = {
  title: 'My Next.js App',
  description: 'App built with Next.js 14 and App Router',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            {/* Global navigation */}
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          {/* Global footer */}
        </footer>
      </body>
    </html>
  );
}
\`\`\`

## Server Components vs Client Components

### Server Components (default)
\`\`\`jsx
// app/posts/page.js - Server Component
import { getPosts } from '@/lib/api';

export default async function PostsPage() {
  // This fetch runs on the server
  const posts = await getPosts();

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

// Metadata for SEO
export async function generateMetadata() {
  const posts = await getPosts();
  
  return {
    title: \`Blog - \${posts.length} posts\`,
    description: 'Latest blog posts',
  };
}
\`\`\`

### Client Components (when you need interactivity)
\`\`\`jsx
// app/components/SearchForm.js
'use client'; // Directive for Client Component

import { useState } from 'react';

export default function SearchForm({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
\`\`\`

## Data Fetching with App Router

### Fetching data in Server Components
\`\`\`jsx
// app/products/page.js
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    cache: 'force-cache', // Default cache
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1>Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
\`\`\`

### Different caching strategies
\`\`\`jsx
// Static data (build time)
const staticData = await fetch('https://api.example.com/static', {
  cache: 'force-cache' // Default
});

// Dynamic data (every request)
const dynamicData = await fetch('https://api.example.com/dynamic', {
  cache: 'no-store'
});

// Time-based revalidation
const timedData = await fetch('https://api.example.com/timed', {
  next: { revalidate: 3600 } // Revalidate every hour
});

// Tag-based revalidation
const taggedData = await fetch('https://api.example.com/tagged', {
  next: { tags: ['products'] }
});
\`\`\`

## Loading UI and Streaming

### loading.js file
\`\`\`jsx
// app/dashboard/loading.js
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      <p className="ml-4">Loading dashboard...</p>
    </div>
  );
}
\`\`\`

### Streaming with Suspense
\`\`\`jsx
// app/dashboard/page.js
import { Suspense } from 'react';
import Analytics from './components/Analytics';
import RecentOrders from './components/RecentOrders';
import UserStats from './components/UserStats';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <Suspense fallback={<AnalyticsSkeleton />}>
        <Analytics />
      </Suspense>
      
      <Suspense fallback={<OrdersSkeleton />}>
        <RecentOrders />
      </Suspense>
      
      <Suspense fallback={<StatsSkeleton />}>
        <UserStats />
      </Suspense>
    </div>
  );
}

// Each component can load data independently
async function Analytics() {
  const data = await getAnalyticsData();
  return <AnalyticsChart data={data} />;
}
\`\`\`

## Error Handling

### Error Boundaries with error.js
\`\`\`jsx
// app/dashboard/error.js
'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <p className="text-gray-600 mb-4">
        There was a problem loading the dashboard
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  );
}
\`\`\`

### Custom Not Found
\`\`\`jsx
// app/blog/[slug]/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-4">Post not found</h2>
      <p className="text-gray-600 mb-6">
        The post you're looking for doesn't exist or has been deleted.
      </p>
      <Link 
        href="/blog"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        View all posts
      </Link>
    </div>
  );
}
\`\`\`

## Dynamic Routes and Static Generation

### Basic dynamic routes
\`\`\`jsx
// app/blog/[slug]/page.js
import { notFound } from 'next/navigation';

async function getPost(slug) {
  const res = await fetch(\`https://api.example.com/posts/\${slug}\`);
  
  if (!res.ok) {
    return null;
  }
  
  return res.json();
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p className="text-gray-600">{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

// Generate static pages
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(res => res.json());
  
  return posts.map(post => ({
    slug: post.slug,
  }));
}

// Dynamic metadata
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post not found',
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}
\`\`\`

### Routes with multiple dynamic segments
\`\`\`jsx
// app/shop/[category]/[product]/page.js
export default async function ProductPage({ params }) {
  const { category, product } = params;
  
  const productData = await getProduct(category, product);

  return (
    <div>
      <h1>{productData.name}</h1>
      <p>Category: {category}</p>
      <p>Price: \${productData.price}</p>
    </div>
  );
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  
  return products.map(product => ({
    category: product.category,
    product: product.slug,
  }));
}
\`\`\`

## Route Handlers (API Routes)

### GET Request
\`\`\`jsx
// app/api/posts/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await getPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
\`\`\`

### POST Request with validation
\`\`\`jsx
// app/api/posts/route.js
import { NextResponse } from 'next/server';
import { z } from 'zod';

const createPostSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  author: z.string().min(1),
});

export async function POST(request) {
  try {
    const body = await request.json();
    const validatedData = createPostSchema.parse(body);
    
    const newPost = await createPost(validatedData);
    
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
\`\`\`

### Dynamic API routes
\`\`\`jsx
// app/api/posts/[id]/route.js
export async function GET(request, { params }) {
  const { id } = params;
  
  try {
    const post = await getPostById(id);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  
  try {
    await deletePost(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
\`\`\`

## Middleware

\`\`\`javascript
// middleware.js (at project root)
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check authentication for protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('auth-token');
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Rewrite URLs
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.rewrite(new URL('/dashboard', request.url));
  }

  // Add custom headers
  const response = NextResponse.next();
  response.headers.set('X-Custom-Header', 'value');
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
\`\`\`

## Optimizations and Best Practices

### Image optimization
\`\`\`jsx
import Image from 'next/image';

export default function ProductCard({ product }) {
  return (
    <div>
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={200}
        priority={product.featured} // For above-the-fold images
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,..." // Base64 placeholder
      />
      <h3>{product.name}</h3>
      <p>\${product.price}</p>
    </div>
  );
}
\`\`\`

### Optimized fonts
\`\`\`jsx
// app/layout.js
import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={\`\${inter.className} \${robotoMono.variable}\`}>
      <body>{children}</body>
    </html>
  );
}
\`\`\`

### next.config.js configuration
\`\`\`javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // Enable App Router
  },
  images: {
    domains: ['example.com', 'cdn.example.com'],
    formats: ['image/webp', 'image/avif'],
  },
  async redirects() {
    return [
      {
        source: '/old-blog/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
\`\`\`

## Deployment and Production

### Environment variables
\`\`\`bash
# .env.local
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

# .env.production
DATABASE_URL="postgresql://prod-db..."
NEXTAUTH_URL="https://yourapp.com"
\`\`\`

### Vercel configuration
\`\`\`json
{
  "functions": {
    "app/api/heavy-task/route.js": {
      "maxDuration": 300
    }
  },
  "regions": ["cle1"]
}
\`\`\`

## Conclusion

Next.js 14 with App Router represents a major leap forward in React application development. Key advantages include:

- **Better performance**: Server Components and streaming
- **Improved DX**: Colocation and file-based routing
- **Optimized SEO**: Metadata API and SSR by default
- **Scalability**: Shared layouts and incremental loading

### Migration checklist:
1. ✅ Understand Server vs Client Components
2. ✅ Restructure routes to \`app/\` directory
3. ✅ Migrate API routes to Route Handlers
4. ✅ Update metadata and SEO
5. ✅ Implement loading and error boundaries
6. ✅ Optimize images and fonts
7. ✅ Configure middleware if necessary
8. ✅ Thorough testing before deployment

Are you already using Next.js 14? App Router is the future of Next.js development!`,
  },
  author: "Emiliano",
  date: "2024-01-10",
  category: {
    es: "Next.js",
    en: "Next.js",
  },
  tags: ["Next.js", "React", "App Router", "SSR"],
  readTime: {
    es: "18 min de lectura",
    en: "18 min read",
  },
  featured: true,
};

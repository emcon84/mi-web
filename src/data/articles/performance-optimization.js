export const performanceOptimizationArticle = {
  id: 3,
  slug: "optimizacion-de-performance-en-react",
  title: {
    es: "Optimización de Performance en React",
    en: "Performance Optimization in React",
  },
  excerpt: {
    es: "Técnicas avanzadas para optimizar el rendimiento de aplicaciones React, incluyendo memoización, lazy loading y mejores prácticas de renderizado.",
    en: "Advanced techniques to optimize React application performance, including memoization, lazy loading and rendering best practices.",
  },
  image:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
  content: {
    es: `La performance es crucial para una buena experiencia de usuario. En aplicaciones React complejas, optimizar el rendimiento puede marcar la diferencia entre una app fluida y una que frustra a los usuarios.

## ¿Por qué optimizar Performance?

### Impacto en la experiencia del usuario
- **Tiempo de carga más rápido**: Los usuarios esperan que las aplicaciones carguen en menos de 3 segundos
- **Interacciones más fluidas**: 60 FPS para animaciones y transiciones suaves
- **Menor consumo de batería**: Especialmente importante en dispositivos móviles
- **Mejor SEO**: Google considera la velocidad como factor de ranking

### Métricas importantes
- **First Contentful Paint (FCP)**: Tiempo hasta que aparece el primer contenido
- **Largest Contentful Paint (LCP)**: Tiempo hasta que carga el elemento principal
- **Time to Interactive (TTI)**: Tiempo hasta que la página es completamente interactiva
- **Cumulative Layout Shift (CLS)**: Estabilidad visual de la página

## React.memo: Optimización de Re-renders

\`\`\`jsx
import React, { memo } from 'react';

// Componente sin optimización
const ExpensiveComponent = ({ data, onUpdate }) => {
  console.log('ExpensiveComponent renderizando...');
  
  return (
    <div>
      {data.map(item => (
        <div key={item.id} onClick={() => onUpdate(item)}>
          {item.name}
        </div>
      ))}
    </div>
  );
};

// Componente optimizado con memo
const OptimizedComponent = memo(({ data, onUpdate }) => {
  console.log('OptimizedComponent renderizando...');
  
  return (
    <div>
      {data.map(item => (
        <div key={item.id} onClick={() => onUpdate(item)}>
          {item.name}
        </div>
      ))}
    </div>
  );
});

// Comparación personalizada
const SmartComponent = memo(({ user, posts }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <PostList posts={posts} />
    </div>
  );
}, (prevProps, nextProps) => {
  // Solo re-renderizar si el usuario o los posts cambiaron
  return prevProps.user.id === nextProps.user.id && 
         prevProps.posts.length === nextProps.posts.length;
});
\`\`\`

## useMemo: Memoización de Cálculos Costosos

\`\`\`jsx
import React, { useMemo, useState } from 'react';

const ExpensiveCalculation = ({ items, filter }) => {
  // Sin optimización - se ejecuta en cada render
  const filteredItems = items.filter(item => 
    item.category === filter && item.price > 100
  ).sort((a, b) => b.price - a.price);

  return (
    <div>
      {filteredItems.map(item => (
        <div key={item.id}>{item.name} - \${item.price}</div>
      ))}
    </div>
  );
};

// Con useMemo - solo se recalcula cuando cambian las dependencias
const OptimizedCalculation = ({ items, filter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const expensiveFilteredItems = useMemo(() => {
    console.log('Recalculando lista filtrada...');
    return items
      .filter(item => item.category === filter && item.price > 100)
      .sort((a, b) => b.price - a.price);
  }, [items, filter]); // Solo recalcula si items o filter cambian

  const searchResults = useMemo(() => {
    if (!searchTerm) return expensiveFilteredItems;
    
    return expensiveFilteredItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [expensiveFilteredItems, searchTerm]);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar productos..."
      />
      {searchResults.map(item => (
        <div key={item.id}>{item.name} - \${item.price}</div>
      ))}
    </div>
  );
};
\`\`\`

## useCallback: Optimización de Funciones

\`\`\`jsx
import React, { useState, useCallback, memo } from 'react';

// Componente hijo que recibe una función
const ChildComponent = memo(({ onItemClick, items }) => {
  console.log('ChildComponent renderizando...');
  
  return (
    <div>
      {items.map(item => (
        <button key={item.id} onClick={() => onItemClick(item)}>
          {item.name}
        </button>
      ))}
    </div>
  );
});

const ParentComponent = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [count, setCount] = useState(0);

  // Sin useCallback - se crea una nueva función en cada render
  const handleItemClickBad = (item) => {
    setSelectedItem(item);
    console.log('Item seleccionado:', item);
  };

  // Con useCallback - la función se mantiene estable
  const handleItemClick = useCallback((item) => {
    setSelectedItem(item);
    console.log('Item seleccionado:', item);
  }, []); // Sin dependencias porque no usa estado externo

  // Función que depende del estado
  const handleItemClickWithDependency = useCallback((item) => {
    setSelectedItem(item);
    // Si necesitamos usar count, debe estar en las dependencias
    console.log(\`Item seleccionado: \${item.name}, Count: \${count}\`);
  }, [count]); // Se recrea solo cuando count cambia

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Contador: {count}
      </button>
      
      <ChildComponent 
        items={items}
        onItemClick={handleItemClick}
      />
      
      {selectedItem && (
        <div>Seleccionado: {selectedItem.name}</div>
      )}
    </div>
  );
};
\`\`\`

## Lazy Loading y Code Splitting

### React.lazy para componentes
\`\`\`jsx
import React, { Suspense, lazy } from 'react';

// Carga diferida de componentes
const LazyDashboard = lazy(() => import('./Dashboard'));
const LazyProfile = lazy(() => import('./Profile'));
const LazySettings = lazy(() => import('./Settings'));

// Componente de carga personalizado
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
  </div>
);

const App = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <LazyDashboard />;
      case 'profile':
        return <LazyProfile />;
      case 'settings':
        return <LazySettings />;
      default:
        return <LazyDashboard />;
    }
  };

  return (
    <div>
      <nav>
        <button onClick={() => setCurrentView('dashboard')}>Dashboard</button>
        <button onClick={() => setCurrentView('profile')}>Profile</button>
        <button onClick={() => setCurrentView('settings')}>Settings</button>
      </nav>

      <Suspense fallback={<LoadingSpinner />}>
        {renderView()}
      </Suspense>
    </div>
  );
};
\`\`\`

### Lazy loading con React Router
\`\`\`jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
\`\`\`

## Virtualización para Listas Grandes

\`\`\`jsx
import { FixedSizeList as List } from 'react-window';

// Componente de item individual
const ListItem = ({ index, style, data }) => (
  <div style={style} className="flex items-center p-4 border-b">
    <img 
      src={data[index].avatar} 
      alt={data[index].name}
      className="w-10 h-10 rounded-full mr-4"
    />
    <div>
      <h3 className="font-semibold">{data[index].name}</h3>
      <p className="text-gray-600">{data[index].email}</p>
    </div>
  </div>
);

// Lista virtualizada
const VirtualizedList = ({ users }) => {
  return (
    <List
      height={400} // Altura del contenedor
      itemCount={users.length}
      itemSize={80} // Altura de cada item
      itemData={users}
    >
      {ListItem}
    </List>
  );
};

// Para listas con altura variable
import { VariableSizeList } from 'react-window';

const VariableListItem = ({ index, style, data }) => {
  const item = data[index];
  
  return (
    <div style={style} className="p-4 border-b">
      <h3 className="font-semibold">{item.title}</h3>
      <p className="text-gray-600 mt-2">{item.description}</p>
      {item.tags && (
        <div className="mt-2">
          {item.tags.map(tag => (
            <span key={tag} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 text-sm">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const DynamicVirtualizedList = ({ items }) => {
  // Función para calcular la altura de cada item
  const getItemSize = (index) => {
    const item = items[index];
    let height = 60; // altura base
    if (item.description) height += 30;
    if (item.tags?.length) height += 40;
    return height;
  };

  return (
    <VariableSizeList
      height={500}
      itemCount={items.length}
      itemSize={getItemSize}
      itemData={items}
    >
      {VariableListItem}
    </VariableSizeList>
  );
};
\`\`\`

## Optimización de Imágenes

\`\`\`jsx
import React, { useState, useRef, useEffect } from 'react';

// Componente de imagen con lazy loading
const LazyImage = ({ src, alt, className, placeholder }) => {
  const [imageSrc, setImageSrc] = useState(placeholder || null);
  const [imageRef, setImageRef] = useState();

  useEffect(() => {
    let observer;
    
    if (imageRef && imageSrc !== src) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observer.unobserve(imageRef);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(imageRef);
    }
    
    return () => {
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, imageSrc, src]);

  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy" // Native lazy loading como fallback
    />
  );
};

// Hook para lazy loading de imágenes
const useImagePreloader = (imageUrls) => {
  const [loadedImages, setLoadedImages] = useState(new Set());

  useEffect(() => {
    imageUrls.forEach(url => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(url));
      };
      img.src = url;
    });
  }, [imageUrls]);

  return loadedImages;
};
\`\`\`

## Profiling y Debugging

### React DevTools Profiler
\`\`\`jsx
import { Profiler } from 'react';

const onRenderCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
  console.log('Profiler:', {
    id,
    phase, // "mount" o "update"
    actualDuration, // Tiempo gastado renderizando
    baseDuration, // Tiempo estimado sin memoización
    startTime, // Cuando empezó el render
    commitTime // Cuando se confirmó el commit
  });
};

const App = () => {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Header />
      <Main />
      <Footer />
    </Profiler>
  );
};
\`\`\`

### Hook personalizado para performance monitoring
\`\`\`jsx
import { useEffect, useRef } from 'react';

const usePerformanceMonitor = (componentName) => {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    renderCount.current += 1;
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;
    
    console.log(\`\${componentName} - Render #\${renderCount.current} - Time: \${renderTime.toFixed(2)}ms\`);
    
    startTime.current = performance.now();
  });

  return renderCount.current;
};

// Uso del hook
const MyComponent = () => {
  const renderCount = usePerformanceMonitor('MyComponent');
  
  return <div>Render count: {renderCount}</div>;
};
\`\`\`

## Bundle Analysis y Optimización

### Webpack Bundle Analyzer
\`\`\`bash
# Instalar el analizador
npm install --save-dev webpack-bundle-analyzer

# Para Create React App
npm run build
npx webpack-bundle-analyzer build/static/js/*.js

# Script en package.json
{
  "scripts": {
    "analyze": "npm run build && npx webpack-bundle-analyzer build/static/js/*.js"
  }
}
\`\`\`

### Tree Shaking y Dead Code Elimination
\`\`\`javascript
// ❌ Importa toda la librería
import _ from 'lodash';
import * as lodash from 'lodash';

// ✅ Importa solo lo que necesitas
import { debounce, throttle } from 'lodash';
// o
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

// ❌ Material-UI completo
import { Button, TextField, Select } from '@material-ui/core';

// ✅ Importación específica
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
\`\`\`

## Mejores Prácticas

### 1. Evita re-renders innecesarios
\`\`\`jsx
// ❌ Objeto creado en cada render
const MyComponent = () => {
  return <ChildComponent config={{ theme: 'dark', size: 'large' }} />;
};

// ✅ Objeto memoizado o constante
const CONFIG = { theme: 'dark', size: 'large' };

const MyComponent = () => {
  return <ChildComponent config={CONFIG} />;
};

// ✅ O usar useMemo para objetos dinámicos
const MyComponent = ({ theme, size }) => {
  const config = useMemo(() => ({ theme, size }), [theme, size]);
  
  return <ChildComponent config={config} />;
};
\`\`\`

### 2. Optimiza el renderizado condicional
\`\`\`jsx
// ❌ Renderizado ineficiente
const UserList = ({ users, isLoading, error }) => {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!users?.length) return <EmptyState />;
  
  return (
    <div>
      {users.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  );
};

// ✅ Renderizado optimizado con early returns
const UserList = ({ users, isLoading, error }) => {
  // Early returns para evitar renderizar el resto
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!users?.length) return <EmptyState />;
  
  return (
    <div>
      {users.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  );
};
\`\`\`

### 3. Usa keys apropiadas
\`\`\`jsx
// ❌ Index como key (problemático para listas dinámicas)
{items.map((item, index) => (
  <ListItem key={index} item={item} />
))}

// ✅ ID único como key
{items.map(item => (
  <ListItem key={item.id} item={item} />
))}

// ✅ Combinación de propiedades si no hay ID
{items.map(item => (
  <ListItem key={\`\${item.category}-\${item.name}\`} item={item} />
))}
\`\`\`

## Conclusión

La optimización de performance en React es un proceso continuo que requiere:

- **Medición constante**: Usa herramientas de profiling regularmente
- **Optimización inteligente**: No optimices prematuramente, mide primero
- **Técnicas apropiadas**: Cada técnica tiene su lugar y momento
- **Testing de performance**: Incluye métricas de performance en tu pipeline de CI/CD

### Checklist de optimización:
1. ✅ Usar React.memo para componentes puros
2. ✅ Implementar useMemo para cálculos costosos
3. ✅ Aplicar useCallback para funciones estables
4. ✅ Configurar lazy loading para rutas
5. ✅ Virtualizar listas grandes
6. ✅ Optimizar imágenes con lazy loading
7. ✅ Analizar el bundle regularmente
8. ✅ Monitorear métricas en producción

¿Ya aplicas estas técnicas en tus proyectos React? ¡La performance es clave para el éxito de cualquier aplicación!`,
    en: `Performance is crucial for a good user experience. In complex React applications, optimizing performance can make the difference between a smooth app and one that frustrates users.

## Why optimize Performance?

### Impact on user experience
- **Faster loading time**: Users expect applications to load in less than 3 seconds
- **Smoother interactions**: 60 FPS for smooth animations and transitions
- **Lower battery consumption**: Especially important on mobile devices
- **Better SEO**: Google considers speed as a ranking factor

### Important metrics
- **First Contentful Paint (FCP)**: Time until first content appears
- **Largest Contentful Paint (LCP)**: Time until main element loads
- **Time to Interactive (TTI)**: Time until page is fully interactive
- **Cumulative Layout Shift (CLS)**: Visual stability of the page

## React.memo: Re-render Optimization

\`\`\`jsx
import React, { memo } from 'react';

// Component without optimization
const ExpensiveComponent = ({ data, onUpdate }) => {
  console.log('ExpensiveComponent rendering...');
  
  return (
    <div>
      {data.map(item => (
        <div key={item.id} onClick={() => onUpdate(item)}>
          {item.name}
        </div>
      ))}
    </div>
  );
};

// Component optimized with memo
const OptimizedComponent = memo(({ data, onUpdate }) => {
  console.log('OptimizedComponent rendering...');
  
  return (
    <div>
      {data.map(item => (
        <div key={item.id} onClick={() => onUpdate(item)}>
          {item.name}
        </div>
      ))}
    </div>
  );
});

// Custom comparison
const SmartComponent = memo(({ user, posts }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <PostList posts={posts} />
    </div>
  );
}, (prevProps, nextProps) => {
  // Only re-render if user or posts changed
  return prevProps.user.id === nextProps.user.id && 
         prevProps.posts.length === nextProps.posts.length;
});
\`\`\`

## useMemo: Expensive Calculation Memoization

\`\`\`jsx
import React, { useMemo, useState } from 'react';

const ExpensiveCalculation = ({ items, filter }) => {
  // Without optimization - runs on every render
  const filteredItems = items.filter(item => 
    item.category === filter && item.price > 100
  ).sort((a, b) => b.price - a.price);

  return (
    <div>
      {filteredItems.map(item => (
        <div key={item.id}>{item.name} - \${item.price}</div>
      ))}
    </div>
  );
};

// With useMemo - only recalculates when dependencies change
const OptimizedCalculation = ({ items, filter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const expensiveFilteredItems = useMemo(() => {
    console.log('Recalculating filtered list...');
    return items
      .filter(item => item.category === filter && item.price > 100)
      .sort((a, b) => b.price - a.price);
  }, [items, filter]); // Only recalculates if items or filter change

  const searchResults = useMemo(() => {
    if (!searchTerm) return expensiveFilteredItems;
    
    return expensiveFilteredItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [expensiveFilteredItems, searchTerm]);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
      />
      {searchResults.map(item => (
        <div key={item.id}>{item.name} - \${item.price}</div>
      ))}
    </div>
  );
};
\`\`\`

## useCallback: Function Optimization

\`\`\`jsx
import React, { useState, useCallback, memo } from 'react';

// Child component that receives a function
const ChildComponent = memo(({ onItemClick, items }) => {
  console.log('ChildComponent rendering...');
  
  return (
    <div>
      {items.map(item => (
        <button key={item.id} onClick={() => onItemClick(item)}>
          {item.name}
        </button>
      ))}
    </div>
  );
});

const ParentComponent = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [count, setCount] = useState(0);

  // Without useCallback - creates new function on every render
  const handleItemClickBad = (item) => {
    setSelectedItem(item);
    console.log('Selected item:', item);
  };

  // With useCallback - function remains stable
  const handleItemClick = useCallback((item) => {
    setSelectedItem(item);
    console.log('Selected item:', item);
  }, []); // No dependencies because it doesn't use external state

  // Function that depends on state
  const handleItemClickWithDependency = useCallback((item) => {
    setSelectedItem(item);
    // If we need to use count, it must be in dependencies
    console.log(\`Selected item: \${item.name}, Count: \${count}\`);
  }, [count]); // Recreated only when count changes

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Counter: {count}
      </button>
      
      <ChildComponent 
        items={items}
        onItemClick={handleItemClick}
      />
      
      {selectedItem && (
        <div>Selected: {selectedItem.name}</div>
      )}
    </div>
  );
};
\`\`\`

## Lazy Loading and Code Splitting

### React.lazy for components
\`\`\`jsx
import React, { Suspense, lazy } from 'react';

// Lazy loading of components
const LazyDashboard = lazy(() => import('./Dashboard'));
const LazyProfile = lazy(() => import('./Profile'));
const LazySettings = lazy(() => import('./Settings'));

// Custom loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
  </div>
);

const App = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <LazyDashboard />;
      case 'profile':
        return <LazyProfile />;
      case 'settings':
        return <LazySettings />;
      default:
        return <LazyDashboard />;
    }
  };

  return (
    <div>
      <nav>
        <button onClick={() => setCurrentView('dashboard')}>Dashboard</button>
        <button onClick={() => setCurrentView('profile')}>Profile</button>
        <button onClick={() => setCurrentView('settings')}>Settings</button>
      </nav>

      <Suspense fallback={<LoadingSpinner />}>
        {renderView()}
      </Suspense>
    </div>
  );
};
\`\`\`

### Lazy loading with React Router
\`\`\`jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
\`\`\`

## Virtualization for Large Lists

\`\`\`jsx
import { FixedSizeList as List } from 'react-window';

// Individual item component
const ListItem = ({ index, style, data }) => (
  <div style={style} className="flex items-center p-4 border-b">
    <img 
      src={data[index].avatar} 
      alt={data[index].name}
      className="w-10 h-10 rounded-full mr-4"
    />
    <div>
      <h3 className="font-semibold">{data[index].name}</h3>
      <p className="text-gray-600">{data[index].email}</p>
    </div>
  </div>
);

// Virtualized list
const VirtualizedList = ({ users }) => {
  return (
    <List
      height={400} // Container height
      itemCount={users.length}
      itemSize={80} // Height of each item
      itemData={users}
    >
      {ListItem}
    </List>
  );
};

// For variable height lists
import { VariableSizeList } from 'react-window';

const VariableListItem = ({ index, style, data }) => {
  const item = data[index];
  
  return (
    <div style={style} className="p-4 border-b">
      <h3 className="font-semibold">{item.title}</h3>
      <p className="text-gray-600 mt-2">{item.description}</p>
      {item.tags && (
        <div className="mt-2">
          {item.tags.map(tag => (
            <span key={tag} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 text-sm">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const DynamicVirtualizedList = ({ items }) => {
  // Function to calculate height of each item
  const getItemSize = (index) => {
    const item = items[index];
    let height = 60; // base height
    if (item.description) height += 30;
    if (item.tags?.length) height += 40;
    return height;
  };

  return (
    <VariableSizeList
      height={500}
      itemCount={items.length}
      itemSize={getItemSize}
      itemData={items}
    >
      {VariableListItem}
    </VariableSizeList>
  );
};
\`\`\`

## Image Optimization

\`\`\`jsx
import React, { useState, useRef, useEffect } from 'react';

// Image component with lazy loading
const LazyImage = ({ src, alt, className, placeholder }) => {
  const [imageSrc, setImageSrc] = useState(placeholder || null);
  const [imageRef, setImageRef] = useState();

  useEffect(() => {
    let observer;
    
    if (imageRef && imageSrc !== src) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observer.unobserve(imageRef);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(imageRef);
    }
    
    return () => {
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, imageSrc, src]);

  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy" // Native lazy loading as fallback
    />
  );
};

// Hook for image preloading
const useImagePreloader = (imageUrls) => {
  const [loadedImages, setLoadedImages] = useState(new Set());

  useEffect(() => {
    imageUrls.forEach(url => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(url));
      };
      img.src = url;
    });
  }, [imageUrls]);

  return loadedImages;
};
\`\`\`

## Profiling and Debugging

### React DevTools Profiler
\`\`\`jsx
import { Profiler } from 'react';

const onRenderCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
  console.log('Profiler:', {
    id,
    phase, // "mount" or "update"
    actualDuration, // Time spent rendering
    baseDuration, // Estimated time without memoization
    startTime, // When render started
    commitTime // When commit was confirmed
  });
};

const App = () => {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Header />
      <Main />
      <Footer />
    </Profiler>
  );
};
\`\`\`

### Custom hook for performance monitoring
\`\`\`jsx
import { useEffect, useRef } from 'react';

const usePerformanceMonitor = (componentName) => {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    renderCount.current += 1;
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;
    
    console.log(\`\${componentName} - Render #\${renderCount.current} - Time: \${renderTime.toFixed(2)}ms\`);
    
    startTime.current = performance.now();
  });

  return renderCount.current;
};

// Using the hook
const MyComponent = () => {
  const renderCount = usePerformanceMonitor('MyComponent');
  
  return <div>Render count: {renderCount}</div>;
};
\`\`\`

## Bundle Analysis and Optimization

### Webpack Bundle Analyzer
\`\`\`bash
# Install analyzer
npm install --save-dev webpack-bundle-analyzer

# For Create React App
npm run build
npx webpack-bundle-analyzer build/static/js/*.js

# Script in package.json
{
  "scripts": {
    "analyze": "npm run build && npx webpack-bundle-analyzer build/static/js/*.js"
  }
}
\`\`\`

### Tree Shaking and Dead Code Elimination
\`\`\`javascript
// ❌ Imports entire library
import _ from 'lodash';
import * as lodash from 'lodash';

// ✅ Import only what you need
import { debounce, throttle } from 'lodash';
// or
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

// ❌ Complete Material-UI
import { Button, TextField, Select } from '@material-ui/core';

// ✅ Specific imports
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
\`\`\`

## Best Practices

### 1. Avoid unnecessary re-renders
\`\`\`jsx
// ❌ Object created on every render
const MyComponent = () => {
  return <ChildComponent config={{ theme: 'dark', size: 'large' }} />;
};

// ✅ Memoized or constant object
const CONFIG = { theme: 'dark', size: 'large' };

const MyComponent = () => {
  return <ChildComponent config={CONFIG} />;
};

// ✅ Or use useMemo for dynamic objects
const MyComponent = ({ theme, size }) => {
  const config = useMemo(() => ({ theme, size }), [theme, size]);
  
  return <ChildComponent config={config} />;
};
\`\`\`

### 2. Optimize conditional rendering
\`\`\`jsx
// ❌ Inefficient rendering
const UserList = ({ users, isLoading, error }) => {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!users?.length) return <EmptyState />;
  
  return (
    <div>
      {users.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  );
};

// ✅ Optimized rendering with early returns
const UserList = ({ users, isLoading, error }) => {
  // Early returns to avoid rendering the rest
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!users?.length) return <EmptyState />;
  
  return (
    <div>
      {users.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  );
};
\`\`\`

### 3. Use appropriate keys
\`\`\`jsx
// ❌ Index as key (problematic for dynamic lists)
{items.map((item, index) => (
  <ListItem key={index} item={item} />
))}

// ✅ Unique ID as key
{items.map(item => (
  <ListItem key={item.id} item={item} />
))}

// ✅ Combination of properties if no ID
{items.map(item => (
  <ListItem key={\`\${item.category}-\${item.name}\`} item={item} />
))}
\`\`\`

## Conclusion

Performance optimization in React is an ongoing process that requires:

- **Constant measurement**: Use profiling tools regularly
- **Smart optimization**: Don't optimize prematurely, measure first
- **Appropriate techniques**: Each technique has its place and time
- **Performance testing**: Include performance metrics in your CI/CD pipeline

### Optimization checklist:
1. ✅ Use React.memo for pure components
2. ✅ Implement useMemo for expensive calculations
3. ✅ Apply useCallback for stable functions
4. ✅ Set up lazy loading for routes
5. ✅ Virtualize large lists
6. ✅ Optimize images with lazy loading
7. ✅ Analyze bundle regularly
8. ✅ Monitor production metrics

Do you already apply these techniques in your React projects? Performance is key to the success of any application!`,
  },
  author: "Emiliano",
  date: "2024-01-12",
  category: {
    es: "Performance",
    en: "Performance",
  },
  tags: ["React", "Performance", "Optimization", "Web Vitals"],
  readTime: {
    es: "15 min de lectura",
    en: "15 min read",
  },
  featured: true,
};

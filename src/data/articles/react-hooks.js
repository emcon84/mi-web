export const reactHooksArticle = {
  id: 2,
  slug: "react-hooks-de-usestate-a-custom-hooks",
  title: {
    es: "React Hooks: De useState a Custom Hooks",
    en: "React Hooks: From useState to Custom Hooks",
  },
  excerpt: {
    es: "Guía completa sobre React Hooks, desde los básicos como useState y useEffect hasta la creación de custom hooks reutilizables para lógica compleja.",
    en: "Complete guide to React Hooks, from basics like useState and useEffect to creating reusable custom hooks for complex logic.",
  },
  image:
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
  content: {
    es: `React Hooks han revolucionado la forma en que escribimos componentes React. Han permitido que los componentes funcionales tengan estado y efectos secundarios, simplificando significativamente el código y mejorando la reutilización de lógica.

## ¿Qué son los React Hooks?

Los Hooks son funciones especiales que permiten "enganchar" características de React (como estado y ciclo de vida) en componentes funcionales. Se introdujeron en React 16.8 y han cambiado completamente la forma en que desarrollamos con React.

### Reglas de los Hooks

Antes de profundizar, es importante recordar las dos reglas fundamentales:

1. **Solo llama Hooks en el nivel superior**: Nunca dentro de loops, condiciones o funciones anidadas
2. **Solo llama Hooks desde funciones React**: Componentes funcionales o custom hooks

## useState: Gestión de Estado Local

\`\`\`jsx
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
      
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tu nombre"
      />
      <p>Hola, {name}!</p>
    </div>
  );
};
\`\`\`

### Estado con objetos

\`\`\`jsx
const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });

  const updateUser = (field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };

  return (
    <form>
      <input 
        value={user.name}
        onChange={(e) => updateUser('name', e.target.value)}
        placeholder="Nombre"
      />
      <input 
        value={user.email}
        onChange={(e) => updateUser('email', e.target.value)}
        placeholder="Email"
      />
    </form>
  );
};
\`\`\`

## useEffect: Efectos Secundarios

\`\`\`jsx
import React, { useState, useEffect } from 'react';

const UserData = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Efecto que se ejecuta al montar y cuando userId cambia
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // Dependencia: se ejecuta cuando userId cambia

  // Efecto de limpieza
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Timer ejecutándose...');
    }, 1000);

    // Función de limpieza
    return () => {
      clearInterval(timer);
    };
  }, []); // Sin dependencias: solo al montar/desmontar

  if (loading) return <div>Cargando...</div>;
  if (!user) return <div>Usuario no encontrado</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};
\`\`\`

## useContext: Compartir Estado Global

\`\`\`jsx
import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const ThemeContext = createContext();

// Provider del tema
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Componente que usa el contexto
const ThemedButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button 
      onClick={toggleTheme}
      className={\`btn \${theme === 'dark' ? 'btn-dark' : 'btn-light'}\`}
    >
      Cambiar a {theme === 'light' ? 'dark' : 'light'}
    </button>
  );
};

// App principal
const App = () => {
  return (
    <ThemeProvider>
      <div>
        <h1>Mi App</h1>
        <ThemedButton />
      </div>
    </ThemeProvider>
  );
};
\`\`\`

## useReducer: Estado Complejo

Para estado más complejo, useReducer es una alternativa poderosa a useState:

\`\`\`jsx
import React, { useReducer } from 'react';

// Reducer function
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    default:
      return state;
  }
};

const TodoApp = () => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: []
  });

  const addTodo = (text) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  return (
    <div>
      <h2>Lista de Tareas</h2>
      {/* Renderizar todos y controles */}
    </div>
  );
};
\`\`\`

## Custom Hooks: Reutilización de Lógica

Los custom hooks permiten extraer lógica de componentes y reutilizarla:

### useLocalStorage

\`\`\`jsx
import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Obtener valor inicial del localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(\`Error reading localStorage key "\${key}":, error\`);
      return initialValue;
    }
  });

  // Función para actualizar el valor
  const setValue = (value) => {
    try {
      // Permitir que value sea una función para la misma API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(\`Error setting localStorage key "\${key}":, error\`);
    }
  };

  return [storedValue, setValue];
};

// Uso del custom hook
const Settings = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [language, setLanguage] = useLocalStorage('language', 'es');

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Claro</option>
        <option value="dark">Oscuro</option>
      </select>
      
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};
\`\`\`

### useFetch

\`\`\`jsx
import { useState, useEffect } from 'react';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Uso del custom hook
const UserList = () => {
  const { data: users, loading, error } = useFetch('/api/users');

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
\`\`\`

### useToggle

\`\`\`jsx
import { useState } from 'react';

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(prev => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return [value, { toggle, setTrue, setFalse }];
};

// Uso
const Modal = () => {
  const [isOpen, { toggle, setFalse }] = useToggle(false);

  return (
    <div>
      <button onClick={toggle}>
        {isOpen ? 'Cerrar' : 'Abrir'} Modal
      </button>
      
      {isOpen && (
        <div className="modal">
          <p>Contenido del modal</p>
          <button onClick={setFalse}>Cerrar</button>
        </div>
      )}
    </div>
  );
};
\`\`\`

## Mejores Prácticas

### 1. Nombra los custom hooks con "use"
\`\`\`jsx
// ✅ Correcto
const useApiData = () => { /* ... */ };

// ❌ Incorrecto
const fetchApiData = () => { /* ... */ };
\`\`\`

### 2. Mantén las dependencias de useEffect actualizadas
\`\`\`jsx
// ✅ Correcto
useEffect(() => {
  fetchUser(userId);
}, [userId, fetchUser]);

// ❌ Incorrecto - missing dependencies
useEffect(() => {
  fetchUser(userId);
}, []);
\`\`\`

### 3. Usa múltiples useState para estado no relacionado
\`\`\`jsx
// ✅ Correcto
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [loading, setLoading] = useState(false);

// ❌ Menos ideal para estado no relacionado
const [state, setState] = useState({
  name: '',
  email: '',
  loading: false
});
\`\`\`

### 4. Extrae lógica compleja a custom hooks
\`\`\`jsx
// ✅ Más limpio
const LoginForm = () => {
  const { user, login, loading, error } = useAuth();
  // Componente más simple y enfocado
};

// En lugar de tener toda la lógica en el componente
\`\`\`

## Conclusión

Los React Hooks han transformado la forma en que escribimos componentes React. Proporcionan:

- **Código más limpio** y fácil de entender
- **Mejor reutilización de lógica** con custom hooks
- **Componentes más simples** sin clases
- **Testing más fácil** de lógica aislada

Comenzar con useState y useEffect es suficiente para la mayoría de casos, pero dominar useContext, useReducer y custom hooks te permitirá crear aplicaciones React más robustas y mantenibles.

¿Ya usas hooks en tus proyectos? ¡Los custom hooks son el siguiente nivel!`,
    en: `React Hooks have revolutionized the way we write React components. They've allowed functional components to have state and side effects, significantly simplifying code and improving logic reusability.

## What are React Hooks?

Hooks are special functions that allow you to "hook into" React features (like state and lifecycle) in functional components. They were introduced in React 16.8 and have completely changed how we develop with React.

### Rules of Hooks

Before diving deeper, it's important to remember the two fundamental rules:

1. **Only call Hooks at the top level**: Never inside loops, conditions, or nested functions
2. **Only call Hooks from React functions**: Functional components or custom hooks

## useState: Local State Management

\`\`\`jsx
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  return (
    <div>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />
      <p>Hello, {name}!</p>
    </div>
  );
};
\`\`\`

### State with objects

\`\`\`jsx
const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });

  const updateUser = (field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };

  return (
    <form>
      <input 
        value={user.name}
        onChange={(e) => updateUser('name', e.target.value)}
        placeholder="Name"
      />
      <input 
        value={user.email}
        onChange={(e) => updateUser('email', e.target.value)}
        placeholder="Email"
      />
    </form>
  );
};
\`\`\`

## useEffect: Side Effects

\`\`\`jsx
import React, { useState, useEffect } from 'react';

const UserData = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Effect that runs on mount and when userId changes
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // Dependency: runs when userId changes

  // Cleanup effect
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Timer running...');
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(timer);
    };
  }, []); // No dependencies: only on mount/unmount

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};
\`\`\`

## useContext: Share Global State

\`\`\`jsx
import React, { createContext, useContext, useState } from 'react';

// Create context
const ThemeContext = createContext();

// Theme provider
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Component using context
const ThemedButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button 
      onClick={toggleTheme}
      className={\`btn \${theme === 'dark' ? 'btn-dark' : 'btn-light'}\`}
    >
      Switch to {theme === 'light' ? 'dark' : 'light'}
    </button>
  );
};

// Main app
const App = () => {
  return (
    <ThemeProvider>
      <div>
        <h1>My App</h1>
        <ThemedButton />
      </div>
    </ThemeProvider>
  );
};
\`\`\`

## useReducer: Complex State

For more complex state, useReducer is a powerful alternative to useState:

\`\`\`jsx
import React, { useReducer } from 'react';

// Reducer function
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    default:
      return state;
  }
};

const TodoApp = () => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: []
  });

  const addTodo = (text) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  return (
    <div>
      <h2>Todo List</h2>
      {/* Render todos and controls */}
    </div>
  );
};
\`\`\`

## Custom Hooks: Logic Reusability

Custom hooks allow you to extract component logic and reuse it:

### useLocalStorage

\`\`\`jsx
import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Get initial value from localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(\`Error reading localStorage key "\${key}":, error\`);
      return initialValue;
    }
  });

  // Function to update value
  const setValue = (value) => {
    try {
      // Allow value to be a function for same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(\`Error setting localStorage key "\${key}":, error\`);
    }
  };

  return [storedValue, setValue];
};

// Using the custom hook
const Settings = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [language, setLanguage] = useLocalStorage('language', 'en');

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
};
\`\`\`

### useFetch

\`\`\`jsx
import { useState, useEffect } from 'react';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Using the custom hook
const UserList = () => {
  const { data: users, loading, error } = useFetch('/api/users');

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
\`\`\`

### useToggle

\`\`\`jsx
import { useState } from 'react';

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(prev => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return [value, { toggle, setTrue, setFalse }];
};

// Usage
const Modal = () => {
  const [isOpen, { toggle, setFalse }] = useToggle(false);

  return (
    <div>
      <button onClick={toggle}>
        {isOpen ? 'Close' : 'Open'} Modal
      </button>
      
      {isOpen && (
        <div className="modal">
          <p>Modal content</p>
          <button onClick={setFalse}>Close</button>
        </div>
      )}
    </div>
  );
};
\`\`\`

## Best Practices

### 1. Name custom hooks with "use"
\`\`\`jsx
// ✅ Correct
const useApiData = () => { /* ... */ };

// ❌ Incorrect
const fetchApiData = () => { /* ... */ };
\`\`\`

### 2. Keep useEffect dependencies up to date
\`\`\`jsx
// ✅ Correct
useEffect(() => {
  fetchUser(userId);
}, [userId, fetchUser]);

// ❌ Incorrect - missing dependencies
useEffect(() => {
  fetchUser(userId);
}, []);
\`\`\`

### 3. Use multiple useState for unrelated state
\`\`\`jsx
// ✅ Correct
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [loading, setLoading] = useState(false);

// ❌ Less ideal for unrelated state
const [state, setState] = useState({
  name: '',
  email: '',
  loading: false
});
\`\`\`

### 4. Extract complex logic to custom hooks
\`\`\`jsx
// ✅ Cleaner
const LoginForm = () => {
  const { user, login, loading, error } = useAuth();
  // Simpler, more focused component
};

// Instead of having all logic in the component
\`\`\`

## Conclusion

React Hooks have transformed how we write React components. They provide:

- **Cleaner code** that's easier to understand
- **Better logic reusability** with custom hooks
- **Simpler components** without classes
- **Easier testing** of isolated logic

Starting with useState and useEffect is enough for most cases, but mastering useContext, useReducer, and custom hooks will allow you to create more robust and maintainable React applications.

Are you already using hooks in your projects? Custom hooks are the next level!`,
  },
  author: "Emiliano",
  date: "2024-01-18",
  category: {
    es: "React",
    en: "React",
  },
  tags: ["React", "Hooks", "JavaScript", "Frontend"],
  readTime: {
    es: "12 min de lectura",
    en: "12 min read",
  },
  featured: true,
};

export const testingReactArticle = {
  id: 6,
  slug: "testing-en-react-jest-y-react-testing-library",
  title: {
    es: "Testing en React: Jest y React Testing Library",
    en: "Testing in React: Jest and React Testing Library",
  },
  excerpt: {
    es: "Introducción práctica al testing en React, cubriendo unit tests, integration tests y mejores prácticas para mantener código confiable.",
    en: "Practical introduction to testing in React, covering unit tests, integration tests and best practices for maintaining reliable code.",
  },
  image:
    "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  content: {
    es: `El testing es una parte fundamental del desarrollo profesional. Como desarrolladores, escribimos código que debe funcionar correctamente, ser mantenible y resistir cambios futuros. En este artículo, exploraremos cómo implementar testing efectivo en React usando Jest y React Testing Library.

## ¿Por qué testing en React?

### Beneficios del testing
- **Confianza en el código**: Sabes que tu aplicación funciona como esperas
- **Refactoring seguro**: Puedes cambiar código sabiendo que no romperás funcionalidad
- **Documentación viva**: Los tests sirven como documentación de cómo debe comportarse tu código
- **Debugging más fácil**: Los tests fallidos te muestran exactamente dónde está el problema
- **Desarrollo más rápido**: Menos tiempo debuggeando en el navegador

### Tipos de testing
1. **Unit Tests**: Prueban componentes/funciones individuales
2. **Integration Tests**: Prueban la interacción entre múltiples componentes
3. **End-to-End Tests**: Prueban flujos completos de usuario

## Configuración inicial

### Instalación de dependencias
Si usas Create React App, Jest y React Testing Library ya vienen incluidos:

\`\`\`bash
# Para proyectos existentes de CRA, ya tienes todo
# Para proyectos desde cero:
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
\`\`\`

### Configuración básica (src/setupTests.js)
\`\`\`javascript
import '@testing-library/jest-dom';

// Mock para IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};
\`\`\`

## Testing de componentes básicos

### Ejemplo: Componente Button
\`\`\`javascript
// src/components/Button.jsx
const Button = ({ children, onClick, disabled = false, variant = 'primary' }) => {
  return (
    <button
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
\`\`\`

### Tests para el componente Button
\`\`\`javascript
// src/components/__tests__/Button.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe('Button Component', () => {
  test('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Clickable Button</Button>);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
\`\`\`

## Testing de componentes con estado

### Ejemplo: Componente Counter
\`\`\`javascript
// src/components/Counter.jsx
const Counter = ({ initialValue = 0 }) => {
  const [count, setCount] = useState(initialValue);

  return (
    <div>
      <span data-testid="count-value">{count}</span>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={() => setCount(c => c - 1)}>-</button>
      <button onClick={() => setCount(initialValue)}>Reset</button>
    </div>
  );
};
\`\`\`

### Tests para Counter
\`\`\`javascript
describe('Counter Component', () => {
  test('increments count when + button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter />);
    
    await user.click(screen.getByText('+'));
    expect(screen.getByTestId('count-value')).toHaveTextContent('1');
  });

  test('resets to initial value', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={5} />);
    
    await user.click(screen.getByText('+'));
    await user.click(screen.getByText('Reset'));
    expect(screen.getByTestId('count-value')).toHaveTextContent('5');
  });
});
\`\`\`

## Testing de componentes asíncronos

### Ejemplo: Componente que hace fetch
\`\`\`javascript
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>Welcome, {user.name}!</div>;
};
\`\`\`

### Tests con mocking
\`\`\`javascript
// Mock fetch
global.fetch = jest.fn();

describe('UserProfile', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('displays user after successful fetch', async () => {
    fetch.mockResolvedValue({
      json: async () => ({ name: 'John Doe' }),
    });

    render(<UserProfile userId={1} />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Welcome, John Doe!')).toBeInTheDocument();
    });
  });
});
\`\`\`

## Testing de hooks personalizados

### Ejemplo: useLocalStorage hook
\`\`\`javascript
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = (newValue) => {
    setValue(newValue);
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
};
\`\`\`

### Tests para hooks
\`\`\`javascript
import { renderHook, act } from '@testing-library/react';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('useLocalStorage', () => {
  test('returns initial value when storage is empty', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useLocalStorage('test', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  test('updates localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initial'));
    
    act(() => {
      result.current[1]('new value');
    });
    
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test', '"new value"');
  });
});
\`\`\`

## Mejores prácticas

### Qué testear
- **Comportamiento del usuario**: Lo que el usuario ve e interactúa
- **Lógica de negocio**: Funciones que contienen reglas importantes
- **Estados de error**: Cómo se comporta la app cuando algo sale mal
- **Casos edge**: Límites y situaciones extremas

### Qué NO testear
- **Detalles de implementación**: CSS específico, nombres de variables internas
- **Librerías de terceros**: Ya están testeadas por sus autores
- **Trivialidades**: Getters/setters simples sin lógica

### Estructura de tests (AAA)
\`\`\`javascript
test('should do something when action happens', () => {
  // Arrange - Configurar el escenario
  render(<Component prop="value" />);
  
  // Act - Ejecutar la acción
  fireEvent.click(screen.getByText('Button'));
  
  // Assert - Verificar el resultado
  expect(screen.getByText('Expected result')).toBeInTheDocument();
});
\`\`\`

## Comandos útiles

\`\`\`bash
# Ejecutar tests
npm test

# Tests con coverage
npm test -- --coverage

# Tests en modo watch
npm test -- --watch

# Tests específicos
npm test -- --testNamePattern="Button"
\`\`\`

## Conclusión

El testing en React no es opcional si quieres desarrollar aplicaciones profesionales. Los beneficios son claros:

- **Mayor confianza** en los cambios de código
- **Menos bugs** en producción
- **Desarrollo más eficiente** a largo plazo
- **Mejor experiencia de equipo**

### Pasos para empezar:
1. **Comienza simple**: Testea un componente básico
2. **Sé pragmático**: No busques 100% de cobertura inmediatamente
3. **Testea comportamiento**: No implementación interna
4. **Practica regularmente**: El testing mejora con la experiencia

¿Ya implementas testing en tus proyectos? ¡Empieza hoy con un componente simple y ve construyendo tu suite de tests gradualmente!`,
    en: `Testing is a fundamental part of professional development. As developers, we write code that must work correctly, be maintainable, and resist future changes. In this article, we'll explore how to implement effective testing in React using Jest and React Testing Library.

## Why testing in React?

### Benefits of testing
- **Code confidence**: You know your application works as expected
- **Safe refactoring**: You can change code knowing you won't break functionality
- **Living documentation**: Tests serve as documentation of how your code should behave
- **Easier debugging**: Failed tests show you exactly where the problem is
- **Faster development**: Less time debugging in the browser

### Types of testing
1. **Unit Tests**: Test individual components/functions
2. **Integration Tests**: Test interaction between multiple components
3. **End-to-End Tests**: Test complete user flows

## Initial setup

### Installing dependencies
If you use Create React App, Jest and React Testing Library are already included:

\`\`\`bash
# For existing CRA projects, you already have everything
# For projects from scratch:
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
\`\`\`

### Basic configuration (src/setupTests.js)
\`\`\`javascript
import '@testing-library/jest-dom';

// Mock for IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};
\`\`\`

## Testing basic components

### Example: Button Component
\`\`\`javascript
// src/components/Button.jsx
const Button = ({ children, onClick, disabled = false, variant = 'primary' }) => {
  return (
    <button
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
\`\`\`

### Tests for Button component
\`\`\`javascript
// src/components/__tests__/Button.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe('Button Component', () => {
  test('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Clickable Button</Button>);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
\`\`\`

## Testing components with state

### Example: Counter Component
\`\`\`javascript
// src/components/Counter.jsx
const Counter = ({ initialValue = 0 }) => {
  const [count, setCount] = useState(initialValue);

  return (
    <div>
      <span data-testid="count-value">{count}</span>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={() => setCount(c => c - 1)}>-</button>
      <button onClick={() => setCount(initialValue)}>Reset</button>
    </div>
  );
};
\`\`\`

### Tests for Counter
\`\`\`javascript
describe('Counter Component', () => {
  test('increments count when + button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter />);
    
    await user.click(screen.getByText('+'));
    expect(screen.getByTestId('count-value')).toHaveTextContent('1');
  });

  test('resets to initial value', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={5} />);
    
    await user.click(screen.getByText('+'));
    await user.click(screen.getByText('Reset'));
    expect(screen.getByTestId('count-value')).toHaveTextContent('5');
  });
});
\`\`\`

## Testing asynchronous components

### Example: Component that fetches data
\`\`\`javascript
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>Welcome, {user.name}!</div>;
};
\`\`\`

### Tests with mocking
\`\`\`javascript
// Mock fetch
global.fetch = jest.fn();

describe('UserProfile', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('displays user after successful fetch', async () => {
    fetch.mockResolvedValue({
      json: async () => ({ name: 'John Doe' }),
    });

    render(<UserProfile userId={1} />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Welcome, John Doe!')).toBeInTheDocument();
    });
  });
});
\`\`\`

## Testing custom hooks

### Example: useLocalStorage hook
\`\`\`javascript
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = (newValue) => {
    setValue(newValue);
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
};
\`\`\`

### Tests for hooks
\`\`\`javascript
import { renderHook, act } from '@testing-library/react';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('useLocalStorage', () => {
  test('returns initial value when storage is empty', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useLocalStorage('test', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  test('updates localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initial'));
    
    act(() => {
      result.current[1]('new value');
    });
    
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test', '"new value"');
  });
});
\`\`\`

## Best practices

### What to test
- **User behavior**: What the user sees and interacts with
- **Business logic**: Functions that contain important rules
- **Error states**: How the app behaves when something goes wrong
- **Edge cases**: Limits and extreme situations

### What NOT to test
- **Implementation details**: Specific CSS, internal variable names
- **Third-party libraries**: They're already tested by their authors
- **Trivialities**: Simple getters/setters without logic

### Test structure (AAA)
\`\`\`javascript
test('should do something when action happens', () => {
  // Arrange - Set up the scenario
  render(<Component prop="value" />);
  
  // Act - Execute the action
  fireEvent.click(screen.getByText('Button'));
  
  // Assert - Verify the result
  expect(screen.getByText('Expected result')).toBeInTheDocument();
});
\`\`\`

## Useful commands

\`\`\`bash
# Run tests
npm test

# Tests with coverage
npm test -- --coverage

# Tests in watch mode
npm test -- --watch

# Specific tests
npm test -- --testNamePattern="Button"
\`\`\`

## Conclusion

Testing in React is not optional if you want to develop professional applications. The benefits are clear:

- **Greater confidence** in code changes
- **Fewer bugs** in production
- **More efficient development** long-term
- **Better team experience**

### Steps to get started:
1. **Start simple**: Test a basic component
2. **Be pragmatic**: Don't aim for 100% coverage immediately
3. **Test behavior**: Not internal implementation
4. **Practice regularly**: Testing improves with experience

Do you already implement testing in your projects? Start today with a simple component and gradually build your test suite!`,
  },
  author: "Emiliano",
  date: "2024-01-20",
  category: {
    es: "Testing",
    en: "Testing",
  },
  tags: ["React", "Testing", "Jest", "React Testing Library"],
  readTime: {
    es: "10 min de lectura",
    en: "10 min read",
  },
  featured: false,
};

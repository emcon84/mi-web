export const webAccessibilityArticle = {
  id: 5,
  title: {
    es: "Accesibilidad Web: Construyendo para Todos",
    en: "Web Accessibility: Building for Everyone",
  },
  excerpt: {
    es: "Guía práctica para implementar accesibilidad web siguiendo las pautas WCAG, con ejemplos en React y técnicas para crear experiencias inclusivas.",
    en: "Practical guide to implementing web accessibility following WCAG guidelines, with React examples and techniques for creating inclusive experiences.",
  },
  content: {
    es: `La accesibilidad web no es una característica opcional, es un derecho fundamental. Cuando construimos aplicaciones accesibles, no solo ayudamos a personas con discapacidades, sino que mejoramos la experiencia para todos los usuarios.

## ¿Por qué la Accesibilidad es Importante?

### Estadísticas que importan
- **15% de la población mundial** vive con algún tipo de discapacidad
- **1 de cada 5 personas** experimenta alguna forma de discapacidad temporal o permanente
- **253 millones de personas** viven con discapacidad visual
- **466 millones de personas** tienen pérdida auditiva incapacitante

### Beneficios para todos
- **Mejor SEO**: Los screen readers y los motores de búsqueda "leen" sitios de manera similar
- **Mejor UX**: Interfaces claras y navegación lógica benefician a todos
- **Alcance más amplio**: Accedes a un mercado más grande
- **Cumplimiento legal**: Muchos países requieren accesibilidad por ley

## Principios WCAG (Web Content Accessibility Guidelines)

### Los 4 principios fundamentales

#### 1. Perceptible
El contenido debe ser presentado de formas que los usuarios puedan percibir:

\`\`\`jsx
// ❌ Imagen sin texto alternativo
<img src="chart.png" />

// ✅ Imagen con descripción adecuada
<img 
  src="chart.png" 
  alt="Gráfico de ventas mostrando un incremento del 25% en el último trimestre"
/>

// ✅ Imagen decorativa
<img 
  src="decoration.png" 
  alt="" 
  role="presentation"
/>
\`\`\`

#### 2. Operable
Los componentes de interfaz deben ser operables:

\`\`\`jsx
// ✅ Navegación por teclado
const Button = ({ children, onClick, disabled }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <button
      onClick={onClick}
      onKeyDown={handleKeyPress}
      disabled={disabled}
      className="px-4 py-2 bg-blue-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {children}
    </button>
  );
};
\`\`\`

#### 3. Comprensible
La información y el funcionamiento de la interfaz deben ser comprensibles:

\`\`\`jsx
// ✅ Formulario con etiquetas claras y validación
const ContactForm = () => {
  const [errors, setErrors] = useState({});

  return (
    <form>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email (requerido)
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          aria-describedby="email-error"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.email}
          </p>
        )}
      </div>
    </form>
  );
};
\`\`\`

#### 4. Robusto
El contenido debe ser robusto para diferentes tecnologías asistivas:

\`\`\`jsx
// ✅ Semántica HTML adecuada
const Article = ({ title, content, author, date }) => {
  return (
    <article>
      <header>
        <h1>{title}</h1>
        <div className="article-meta">
          <address>Por {author}</address>
          <time dateTime={date}>{formatDate(date)}</time>
        </div>
      </header>
      <main>
        {content}
      </main>
    </article>
  );
};
\`\`\`

## Navegación por Teclado

### Orden de tabulación lógico
\`\`\`jsx
const Navigation = () => {
  return (
    <nav role="navigation" aria-label="Navegación principal">
      <ul>
        <li><a href="/" tabIndex="1">Inicio</a></li>
        <li><a href="/about" tabIndex="2">Acerca de</a></li>
        <li><a href="/services" tabIndex="3">Servicios</a></li>
        <li><a href="/contact" tabIndex="4">Contacto</a></li>
      </ul>
    </nav>
  );
};
\`\`\`

### Skip links para navegación rápida
\`\`\`jsx
const SkipLink = () => {
  return (
    <a 
      href="#main-content"
      className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50"
    >
      Saltar al contenido principal
    </a>
  );
};

// CSS correspondiente
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.focus\\:not-sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
\`\`\`

### Gestión de foco
\`\`\`jsx
import { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef();
  const previousFocusRef = useRef();

  useEffect(() => {
    if (isOpen) {
      // Guardar el elemento que tenía foco antes del modal
      previousFocusRef.current = document.activeElement;
      
      // Enfocar el modal
      modalRef.current?.focus();
    } else {
      // Restaurar el foco al elemento anterior
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
    
    // Mantener el foco dentro del modal
    if (event.key === 'Tab') {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex="-1"
        onKeyDown={handleKeyDown}
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
      >
        <h2 id="modal-title" className="text-xl font-bold mb-4">
          {title}
        </h2>
        <div className="mb-4">
          {children}
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
\`\`\`

## ARIA (Accessible Rich Internet Applications)

### Roles, Properties y States
\`\`\`jsx
// Componente de pestañas accesible
const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="tabs">
      <div role="tablist" aria-label="Configuración de cuenta">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            role="tab"
            id={\`tab-\${tab.id}\`}
            aria-controls={\`tabpanel-\${tab.id}\`}
            aria-selected={activeTab === index}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => onTabChange(index)}
            className={\`tab \${activeTab === index ? 'active' : ''}\`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={\`tabpanel-\${tab.id}\`}
          aria-labelledby={\`tab-\${tab.id}\`}
          hidden={activeTab !== index}
          className="tabpanel"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};
\`\`\`

### Live Regions para actualizaciones dinámicas
\`\`\`jsx
const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSearch = async (query) => {
    setLoading(true);
    setStatusMessage('Buscando...');
    
    try {
      const data = await searchAPI(query);
      setResults(data);
      setStatusMessage(\`Se encontraron \${data.length} resultados para "\${query}"\`);
    } catch (error) {
      setStatusMessage('Error en la búsqueda. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      
      {/* Live region para anunciar cambios */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {statusMessage}
      </div>
      
      <div role="region" aria-label="Resultados de búsqueda">
        {loading && (
          <div className="flex items-center">
            <div className="spinner" aria-hidden="true"></div>
            <span className="ml-2">Cargando resultados...</span>
          </div>
        )}
        
        {results.map(result => (
          <SearchResult key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
};
\`\`\`

## Contraste de Colores y Tipografía

### Verificación de contraste
\`\`\`css
/* ❌ Contraste insuficiente (2.1:1) */
.poor-contrast {
  background-color: #f0f0f0;
  color: #c0c0c0;
}

/* ✅ Contraste adecuado para texto normal (4.5:1) */
.good-contrast {
  background-color: #ffffff;
  color: #333333;
}

/* ✅ Contraste para texto grande (3:1) */
.large-text {
  background-color: #0066cc;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
}
\`\`\`

### Tipografía accesible
\`\`\`css
/* Tipografía legible */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 16px; /* Tamaño mínimo recomendado */
  line-height: 1.5; /* Espaciado adecuado entre líneas */
  letter-spacing: 0.02em; /* Espaciado entre caracteres */
}

/* Responsive typography */
@media (max-width: 768px) {
  body {
    font-size: 18px; /* Más grande en móviles */
  }
}

/* Evitar texto justificado */
.content {
  text-align: left;
  hyphens: auto;
  word-break: break-word;
}
\`\`\`

## Formularios Accesibles

### Etiquetas y validación
\`\`\`jsx
const AccessibleForm = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  return (
    <form onSubmit={handleSubmit} noValidate>
      <fieldset>
        <legend>Información personal</legend>
        
        <div className="form-group">
          <label htmlFor="firstName" className="required">
            Nombre *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            aria-required="true"
            aria-describedby={errors.firstName ? "firstName-error" : "firstName-help"}
            value={formData.firstName || ''}
            onChange={handleChange}
            className={errors.firstName ? 'error' : ''}
          />
          <div id="firstName-help" className="help-text">
            Ingresa tu nombre completo
          </div>
          {errors.firstName && (
            <div id="firstName-error" className="error-message" role="alert">
              {errors.firstName}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="required">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            aria-required="true"
            aria-describedby="email-help"
            value={formData.email || ''}
            onChange={handleChange}
          />
          <div id="email-help" className="help-text">
            Usaremos este email para contactarte
          </div>
        </div>

        <fieldset>
          <legend>Preferencias de contacto</legend>
          <div className="radio-group" role="radiogroup" aria-labelledby="contact-legend">
            <div>
              <input
                type="radio"
                id="contact-email"
                name="contactMethod"
                value="email"
                checked={formData.contactMethod === 'email'}
                onChange={handleChange}
              />
              <label htmlFor="contact-email">Email</label>
            </div>
            <div>
              <input
                type="radio"
                id="contact-phone"
                name="contactMethod"
                value="phone"
                checked={formData.contactMethod === 'phone'}
                onChange={handleChange}
              />
              <label htmlFor="contact-phone">Teléfono</label>
            </div>
          </div>
        </fieldset>
      </fieldset>

      <button type="submit" className="submit-button">
        Enviar formulario
      </button>
    </form>
  );
};
\`\`\`

## Multimedia Accesible

### Videos con subtítulos y transcripciones
\`\`\`jsx
const AccessibleVideo = ({ videoSrc, captionsSrc, transcription }) => {
  const [showTranscription, setShowTranscription] = useState(false);

  return (
    <div className="video-container">
      <video
        controls
        aria-label="Video tutorial de React"
        aria-describedby="video-description"
      >
        <source src={videoSrc} type="video/mp4" />
        <track
          kind="captions"
          src={captionsSrc}
          srcLang="es"
          label="Español"
          default
        />
        Tu navegador no soporta videos HTML5.
      </video>
      
      <div id="video-description" className="video-description">
        Video tutorial mostrando cómo crear componentes React accesibles
      </div>

      <button
        onClick={() => setShowTranscription(!showTranscription)}
        aria-expanded={showTranscription}
        aria-controls="video-transcription"
        className="transcription-toggle"
      >
        {showTranscription ? 'Ocultar' : 'Mostrar'} transcripción
      </button>

      {showTranscription && (
        <div id="video-transcription" className="transcription">
          <h3>Transcripción del video</h3>
          <div dangerouslySetInnerHTML={{ __html: transcription }} />
        </div>
      )}
    </div>
  );
};
\`\`\`

## Testing de Accesibilidad

### Testing automatizado con jest-axe
\`\`\`javascript
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import MyComponent from './MyComponent';

expect.extend(toHaveNoViolations);

describe('MyComponent Accessibility', () => {
  test('should not have accessibility violations', async () => {
    const { container } = render(<MyComponent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should be navigable by keyboard', () => {
    render(<MyComponent />);
    
    // Simular navegación por Tab
    const firstButton = screen.getByRole('button', { name: /first/i });
    firstButton.focus();
    expect(firstButton).toHaveFocus();
    
    // Continuar con Tab
    userEvent.tab();
    const secondButton = screen.getByRole('button', { name: /second/i });
    expect(secondButton).toHaveFocus();
  });
});
\`\`\`

### Testing manual con screen readers
\`\`\`javascript
// Hook para testing con screen readers
const useScreenReaderTest = () => {
  const announceToScreenReader = (message) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  return { announceToScreenReader };
};
\`\`\`

## Herramientas y Recursos

### Extensiones útiles para desarrollo
- **axe DevTools**: Auditoría automática de accesibilidad
- **WAVE**: Evaluación visual de accesibilidad
- **Lighthouse**: Auditoría de accesibilidad en Chrome DevTools
- **Colour Contrast Analyser**: Verificación de contraste

### Testing con tecnologías asistivas
\`\`\`bash
# Screen readers gratuitos para testing
# Windows: NVDA (gratuito)
# macOS: VoiceOver (incluido)
# Linux: Orca (gratuito)

# Comandos básicos para VoiceOver (macOS):
# Cmd + F5: Activar/desactivar
# Control + Option + →: Navegar al siguiente elemento
# Control + Option + ←: Navegar al elemento anterior
# Control + Option + Space: Activar elemento
\`\`\`

## Implementación Progressive Enhancement

\`\`\`jsx
// Componente que funciona sin JavaScript
const ProgressiveDropdown = ({ options, onSelect }) => {
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Mejorar con JavaScript cuando esté disponible
    setIsEnhanced(true);
  }, []);

  if (!isEnhanced) {
    // Versión básica que funciona sin JavaScript
    return (
      <select onChange={(e) => onSelect(e.target.value)}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  // Versión mejorada con JavaScript
  return (
    <div className="dropdown">
      <button
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        Seleccionar opción
      </button>
      
      {isOpen && (
        <ul role="listbox">
          {options.map(option => (
            <li
              key={option.value}
              role="option"
              onClick={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
\`\`\`

## Conclusión

La accesibilidad web no es solo una responsabilidad técnica, es un compromiso social. Al implementar estas prácticas:

- **Incluyes a todos**: Personas con discapacidades pueden usar tu aplicación
- **Mejoras la experiencia general**: Beneficia a todos los usuarios
- **Reduces riesgos legales**: Cumples con normativas internacionales
- **Amplías tu alcance**: Accedes a un mercado más grande

### Checklist de accesibilidad:
1. ✅ Usa semántica HTML correcta
2. ✅ Implementa navegación por teclado
3. ✅ Asegura contraste de colores adecuado
4. ✅ Proporciona textos alternativos para imágenes
5. ✅ Usa ARIA attributes apropiadamente
6. ✅ Incluye skip links y landmarks
7. ✅ Testea con herramientas automáticas
8. ✅ Testea con usuarios reales y tecnologías asistivas

### Recuerda:
- La accesibilidad se planifica desde el diseño, no se añade después
- Testea regularmente con usuarios que usan tecnologías asistivas
- Mantente actualizado con las pautas WCAG
- La accesibilidad es un proceso continuo, no un objetivo único

¿Ya implementas accesibilidad en tus proyectos? ¡Cada mejora cuenta para crear un web más inclusivo!`,
    en: `Web accessibility is not an optional feature, it's a fundamental right. When we build accessible applications, we don't just help people with disabilities, we improve the experience for all users.

## Why Accessibility Matters?

### Statistics that matter
- **15% of the world's population** lives with some type of disability
- **1 in 5 people** experience some form of temporary or permanent disability
- **253 million people** live with visual impairment
- **466 million people** have disabling hearing loss

### Benefits for everyone
- **Better SEO**: Screen readers and search engines "read" sites similarly
- **Better UX**: Clear interfaces and logical navigation benefit everyone
- **Wider reach**: Access to a larger market
- **Legal compliance**: Many countries require accessibility by law

## WCAG Principles (Web Content Accessibility Guidelines)

### The 4 fundamental principles

#### 1. Perceivable
Content must be presented in ways users can perceive:

\`\`\`jsx
// ❌ Image without alt text
<img src="chart.png" />

// ✅ Image with adequate description
<img 
  src="chart.png" 
  alt="Sales chart showing a 25% increase in the last quarter"
/>

// ✅ Decorative image
<img 
  src="decoration.png" 
  alt="" 
  role="presentation"
/>
\`\`\`

#### 2. Operable
Interface components must be operable:

\`\`\`jsx
// ✅ Keyboard navigation
const Button = ({ children, onClick, disabled }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <button
      onClick={onClick}
      onKeyDown={handleKeyPress}
      disabled={disabled}
      className="px-4 py-2 bg-blue-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {children}
    </button>
  );
};
\`\`\`

#### 3. Understandable
Information and UI operation must be understandable:

\`\`\`jsx
// ✅ Form with clear labels and validation
const ContactForm = () => {
  const [errors, setErrors] = useState({});

  return (
    <form>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email (required)
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          aria-describedby="email-error"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.email}
          </p>
        )}
      </div>
    </form>
  );
};
\`\`\`

#### 4. Robust
Content must be robust for different assistive technologies:

\`\`\`jsx
// ✅ Proper HTML semantics
const Article = ({ title, content, author, date }) => {
  return (
    <article>
      <header>
        <h1>{title}</h1>
        <div className="article-meta">
          <address>By {author}</address>
          <time dateTime={date}>{formatDate(date)}</time>
        </div>
      </header>
      <main>
        {content}
      </main>
    </article>
  );
};
\`\`\`

## Keyboard Navigation

### Logical tab order
\`\`\`jsx
const Navigation = () => {
  return (
    <nav role="navigation" aria-label="Main navigation">
      <ul>
        <li><a href="/" tabIndex="1">Home</a></li>
        <li><a href="/about" tabIndex="2">About</a></li>
        <li><a href="/services" tabIndex="3">Services</a></li>
        <li><a href="/contact" tabIndex="4">Contact</a></li>
      </ul>
    </nav>
  );
};
\`\`\`

### Skip links for quick navigation
\`\`\`jsx
const SkipLink = () => {
  return (
    <a 
      href="#main-content"
      className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50"
    >
      Skip to main content
    </a>
  );
};

// Corresponding CSS
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.focus\\:not-sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
\`\`\`

### Focus management
\`\`\`jsx
import { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef();
  const previousFocusRef = useRef();

  useEffect(() => {
    if (isOpen) {
      // Save the element that had focus before the modal
      previousFocusRef.current = document.activeElement;
      
      // Focus the modal
      modalRef.current?.focus();
    } else {
      // Restore focus to previous element
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
    
    // Keep focus within modal
    if (event.key === 'Tab') {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex="-1"
        onKeyDown={handleKeyDown}
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
      >
        <h2 id="modal-title" className="text-xl font-bold mb-4">
          {title}
        </h2>
        <div className="mb-4">
          {children}
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};
\`\`\`

## ARIA (Accessible Rich Internet Applications)

### Roles, Properties and States
\`\`\`jsx
// Accessible tabs component
const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="tabs">
      <div role="tablist" aria-label="Account settings">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            role="tab"
            id={\`tab-\${tab.id}\`}
            aria-controls={\`tabpanel-\${tab.id}\`}
            aria-selected={activeTab === index}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => onTabChange(index)}
            className={\`tab \${activeTab === index ? 'active' : ''}\`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={\`tabpanel-\${tab.id}\`}
          aria-labelledby={\`tab-\${tab.id}\`}
          hidden={activeTab !== index}
          className="tabpanel"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};
\`\`\`

### Live Regions for dynamic updates
\`\`\`jsx
const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSearch = async (query) => {
    setLoading(true);
    setStatusMessage('Searching...');
    
    try {
      const data = await searchAPI(query);
      setResults(data);
      setStatusMessage(\`Found \${data.length} results for "\${query}"\`);
    } catch (error) {
      setStatusMessage('Search error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      
      {/* Live region to announce changes */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {statusMessage}
      </div>
      
      <div role="region" aria-label="Search results">
        {loading && (
          <div className="flex items-center">
            <div className="spinner" aria-hidden="true"></div>
            <span className="ml-2">Loading results...</span>
          </div>
        )}
        
        {results.map(result => (
          <SearchResult key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
};
\`\`\`

## Color Contrast and Typography

### Contrast verification
\`\`\`css
/* ❌ Insufficient contrast (2.1:1) */
.poor-contrast {
  background-color: #f0f0f0;
  color: #c0c0c0;
}

/* ✅ Adequate contrast for normal text (4.5:1) */
.good-contrast {
  background-color: #ffffff;
  color: #333333;
}

/* ✅ Contrast for large text (3:1) */
.large-text {
  background-color: #0066cc;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
}
\`\`\`

### Accessible typography
\`\`\`css
/* Readable typography */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 16px; /* Recommended minimum size */
  line-height: 1.5; /* Adequate line spacing */
  letter-spacing: 0.02em; /* Character spacing */
}

/* Responsive typography */
@media (max-width: 768px) {
  body {
    font-size: 18px; /* Larger on mobile */
  }
}

/* Avoid justified text */
.content {
  text-align: left;
  hyphens: auto;
  word-break: break-word;
}
\`\`\`

## Accessible Forms

### Labels and validation
\`\`\`jsx
const AccessibleForm = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  return (
    <form onSubmit={handleSubmit} noValidate>
      <fieldset>
        <legend>Personal information</legend>
        
        <div className="form-group">
          <label htmlFor="firstName" className="required">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            aria-required="true"
            aria-describedby={errors.firstName ? "firstName-error" : "firstName-help"}
            value={formData.firstName || ''}
            onChange={handleChange}
            className={errors.firstName ? 'error' : ''}
          />
          <div id="firstName-help" className="help-text">
            Enter your full name
          </div>
          {errors.firstName && (
            <div id="firstName-error" className="error-message" role="alert">
              {errors.firstName}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="required">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            aria-required="true"
            aria-describedby="email-help"
            value={formData.email || ''}
            onChange={handleChange}
          />
          <div id="email-help" className="help-text">
            We'll use this email to contact you
          </div>
        </div>

        <fieldset>
          <legend>Contact preferences</legend>
          <div className="radio-group" role="radiogroup" aria-labelledby="contact-legend">
            <div>
              <input
                type="radio"
                id="contact-email"
                name="contactMethod"
                value="email"
                checked={formData.contactMethod === 'email'}
                onChange={handleChange}
              />
              <label htmlFor="contact-email">Email</label>
            </div>
            <div>
              <input
                type="radio"
                id="contact-phone"
                name="contactMethod"
                value="phone"
                checked={formData.contactMethod === 'phone'}
                onChange={handleChange}
              />
              <label htmlFor="contact-phone">Phone</label>
            </div>
          </div>
        </fieldset>
      </fieldset>

      <button type="submit" className="submit-button">
        Submit form
      </button>
    </form>
  );
};
\`\`\`

## Accessible Multimedia

### Videos with captions and transcriptions
\`\`\`jsx
const AccessibleVideo = ({ videoSrc, captionsSrc, transcription }) => {
  const [showTranscription, setShowTranscription] = useState(false);

  return (
    <div className="video-container">
      <video
        controls
        aria-label="React tutorial video"
        aria-describedby="video-description"
      >
        <source src={videoSrc} type="video/mp4" />
        <track
          kind="captions"
          src={captionsSrc}
          srcLang="en"
          label="English"
          default
        />
        Your browser doesn't support HTML5 video.
      </video>
      
      <div id="video-description" className="video-description">
        Tutorial video showing how to create accessible React components
      </div>

      <button
        onClick={() => setShowTranscription(!showTranscription)}
        aria-expanded={showTranscription}
        aria-controls="video-transcription"
        className="transcription-toggle"
      >
        {showTranscription ? 'Hide' : 'Show'} transcription
      </button>

      {showTranscription && (
        <div id="video-transcription" className="transcription">
          <h3>Video transcription</h3>
          <div dangerouslySetInnerHTML={{ __html: transcription }} />
        </div>
      )}
    </div>
  );
};
\`\`\`

## Accessibility Testing

### Automated testing with jest-axe
\`\`\`javascript
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import MyComponent from './MyComponent';

expect.extend(toHaveNoViolations);

describe('MyComponent Accessibility', () => {
  test('should not have accessibility violations', async () => {
    const { container } = render(<MyComponent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should be navigable by keyboard', () => {
    render(<MyComponent />);
    
    // Simulate Tab navigation
    const firstButton = screen.getByRole('button', { name: /first/i });
    firstButton.focus();
    expect(firstButton).toHaveFocus();
    
    // Continue with Tab
    userEvent.tab();
    const secondButton = screen.getByRole('button', { name: /second/i });
    expect(secondButton).toHaveFocus();
  });
});
\`\`\`

### Manual testing with screen readers
\`\`\`javascript
// Hook for screen reader testing
const useScreenReaderTest = () => {
  const announceToScreenReader = (message) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  return { announceToScreenReader };
};
\`\`\`

## Tools and Resources

### Useful development extensions
- **axe DevTools**: Automatic accessibility audit
- **WAVE**: Visual accessibility evaluation
- **Lighthouse**: Accessibility audit in Chrome DevTools
- **Colour Contrast Analyser**: Contrast verification

### Testing with assistive technologies
\`\`\`bash
# Free screen readers for testing
# Windows: NVDA (free)
# macOS: VoiceOver (included)
# Linux: Orca (free)

# Basic VoiceOver commands (macOS):
# Cmd + F5: Enable/disable
# Control + Option + →: Navigate to next element
# Control + Option + ←: Navigate to previous element
# Control + Option + Space: Activate element
\`\`\`

## Progressive Enhancement Implementation

\`\`\`jsx
// Component that works without JavaScript
const ProgressiveDropdown = ({ options, onSelect }) => {
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Enhance with JavaScript when available
    setIsEnhanced(true);
  }, []);

  if (!isEnhanced) {
    // Basic version that works without JavaScript
    return (
      <select onChange={(e) => onSelect(e.target.value)}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  // Enhanced version with JavaScript
  return (
    <div className="dropdown">
      <button
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        Select option
      </button>
      
      {isOpen && (
        <ul role="listbox">
          {options.map(option => (
            <li
              key={option.value}
              role="option"
              onClick={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
\`\`\`

## Conclusion

Web accessibility is not just a technical responsibility, it's a social commitment. By implementing these practices:

- **Include everyone**: People with disabilities can use your application
- **Improve general experience**: Benefits all users
- **Reduce legal risks**: Comply with international regulations
- **Expand your reach**: Access to a larger market

### Accessibility checklist:
1. ✅ Use correct HTML semantics
2. ✅ Implement keyboard navigation
3. ✅ Ensure adequate color contrast
4. ✅ Provide alternative text for images
5. ✅ Use ARIA attributes appropriately
6. ✅ Include skip links and landmarks
7. ✅ Test with automated tools
8. ✅ Test with real users and assistive technologies

### Remember:
- Accessibility is planned from design, not added afterwards
- Test regularly with users who use assistive technologies
- Stay updated with WCAG guidelines
- Accessibility is an ongoing process, not a single goal

Do you already implement accessibility in your projects? Every improvement counts towards creating a more inclusive web!`,
  },
  author: "Emiliano",
  date: "2024-01-08",
  category: {
    es: "Accesibilidad",
    en: "Accessibility",
  },
  tags: ["Accessibility", "WCAG", "React", "UX"],
  readTime: {
    es: "16 min de lectura",
    en: "16 min read",
  },
  featured: false,
};

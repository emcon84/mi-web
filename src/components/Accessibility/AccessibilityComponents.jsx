import { useEffect, useRef } from "react";
import { announce } from "@react-aria/live-announcer";

// Componente para anuncios de lectores de pantalla
export const ScreenReaderAnnouncer = ({ message, priority = "polite" }) => {
  useEffect(() => {
    if (message) {
      announce(message, priority);
    }
  }, [message, priority]);

  return null;
};

// Componente para saltar al contenido principal
export const SkipToContent = ({ theme, language }) => {
  const skipLinkRef = useRef(null);

  const handleSkipClick = (e) => {
    e.preventDefault();
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a
      ref={skipLinkRef}
      href="#main-content"
      onClick={handleSkipClick}
      className={`sr-only focus:not-sr-only fixed top-4 left-4 z-[9999] px-4 py-2 rounded-md font-medium transition-all duration-200 transform -translate-y-12 focus:translate-y-0 ${
        theme === "dark"
          ? "bg-blue-600 text-white focus:bg-blue-700"
          : "bg-blue-600 text-white focus:bg-blue-700"
      }`}
      aria-label={
        language === "es"
          ? "Saltar al contenido principal"
          : "Skip to main content"
      }
    >
      {language === "es" ? "Saltar al contenido" : "Skip to content"}
    </a>
  );
};

// Componente para texto solo visible para lectores de pantalla
export const VisuallyHidden = ({ children, ...props }) => {
  return (
    <span className="sr-only" {...props}>
      {children}
    </span>
  );
};

// Hook para manejar el foco y navegación por teclado
export const useFocusManagement = () => {
  useEffect(() => {
    // Manejar navegación por teclado
    const handleKeyDown = (e) => {
      // Escape para cerrar modales
      if (e.key === "Escape") {
        const modal = document.querySelector('[role="dialog"]');
        if (modal) {
          const closeButton = modal.querySelector(
            '[aria-label*="cerrar"], [aria-label*="close"]'
          );
          if (closeButton) {
            closeButton.click();
          }
        }
      }

      // Tab trapping en modales
      if (e.key === "Tab") {
        const modal = document.querySelector('[role="dialog"]');
        if (modal) {
          const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
};

// Componente para indicar el estado de carga
export const LoadingIndicator = ({ isLoading, message, language }) => {
  if (!isLoading) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={language === "es" ? "Cargando contenido" : "Loading content"}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex items-center space-x-3">
        <div
          className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"
          aria-hidden="true"
        />
        <span className="text-gray-900 dark:text-white">
          {message || (language === "es" ? "Cargando..." : "Loading...")}
        </span>
      </div>
      <VisuallyHidden>
        {language === "es"
          ? "Contenido cargando, por favor espere"
          : "Content loading, please wait"}
      </VisuallyHidden>
    </div>
  );
};

// Componente para anuncios de navegación
export const NavigationAnnouncer = ({ currentSection, sections, language }) => {
  const prevSectionRef = useRef(currentSection);

  useEffect(() => {
    if (prevSectionRef.current !== currentSection && sections[currentSection]) {
      const sectionName = sections[currentSection].name;
      const message =
        language === "es"
          ? `Navegando a la sección: ${sectionName}`
          : `Navigating to section: ${sectionName}`;

      announce(message, "polite");
      prevSectionRef.current = currentSection;
    }
  }, [currentSection, sections, language]);

  return null;
};

// Hook para mejorar la accesibilidad de las animaciones
export const useReducedMotion = () => {
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  return prefersReducedMotion;
};

// Este componente ha sido removido - ya no se necesita el botón de animaciones

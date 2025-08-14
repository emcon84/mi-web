import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModernHero } from "./components/Modern/ModernHero";
import { ModernProjects } from "./components/Modern/ModernProjects";
import { ModernSkills } from "./components/Modern/ModernSkills";
import { ModernContact } from "./components/Modern/ModernContact";
import { ModernNavigation } from "./components/Modern/ModernNavigation";

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [language, setLanguage] = useState("es"); // "es" or "en"
  const [theme, setTheme] = useState("dark"); // "dark" or "light"
  const [isAnimating, setIsAnimating] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es mobile o pantalla pequeña
  useEffect(() => {
    const checkIsMobile = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      // Considerar mobile si el ancho es menor a 768px o la altura es menor a 600px
      setIsMobile(width < 768 || height < 600);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Controlar overflow durante animaciones (carga inicial y transiciones)
  useEffect(() => {
    // En mobile, siempre permitir scroll
    if (isMobile) {
      document.body.classList.remove("overflow-hidden");
      document.body.classList.add("allow-scroll");
      return;
    }

    // En desktop, controlar overflow durante animaciones
    if (isAnimating) {
      document.body.classList.remove("allow-scroll");
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
      document.body.classList.add("allow-scroll");
    }

    // Cleanup al desmontar el componente
    return () => {
      document.body.classList.remove("overflow-hidden");
      document.body.classList.add("allow-scroll");
    };
  }, [isAnimating, isMobile]);

  // Detectar cuando terminan las animaciones
  useEffect(() => {
    // En mobile, no controlar animaciones de overflow
    if (isMobile) return;

    setIsAnimating(true); // Activar control de overflow en cada cambio

    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Reducir tiempo ya que no hay desplazamientos

    return () => clearTimeout(timer);
  }, [currentSection, isMobile]); // Reset cuando cambia la sección o el estado mobile

  // Control adicional para carga inicial
  useEffect(() => {
    // En mobile, permitir scroll desde el inicio
    if (isMobile) {
      document.body.classList.remove("overflow-hidden");
      document.body.classList.add("allow-scroll");
      setIsAnimating(false);
      return;
    }

    // En desktop, asegurar que overflow esté oculto desde el inicio
    document.body.classList.remove("allow-scroll");
    document.body.classList.add("overflow-hidden");

    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 800); // Reducir tiempo para carga inicial

    return () => clearTimeout(timer);
  }, [isMobile]); // Dependencia en isMobile para reaccionar a cambios

  const navigateToSection = (sectionIndex) => {
    if (sectionIndex >= 0 && sectionIndex < 4) {
      // 4 sections total
      setIsAnimating(true); // Activar control de overflow antes del cambio
      setCurrentSection(sectionIndex);
    }
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "es" ? "en" : "es"));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const sections = [
    {
      id: 0,
      name: language === "es" ? "Inicio" : "Home",
      component: (
        <ModernHero
          onNavigate={navigateToSection}
          language={language}
          theme={theme}
        />
      ),
    },
    {
      id: 1,
      name: language === "es" ? "Habilidades" : "Skills",
      component: <ModernSkills language={language} theme={theme} />,
    },
    {
      id: 2,
      name: language === "es" ? "Proyectos" : "Projects",
      component: <ModernProjects language={language} theme={theme} />,
    },
    {
      id: 3,
      name: language === "es" ? "Contacto" : "Contact",
      component: <ModernContact language={language} theme={theme} />,
    },
  ];

  return (
    <div
      className={`relative min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
          : "bg-gradient-to-br from-gray-100 via-blue-100 to-gray-100"
      }`}
    >
      <ModernNavigation
        sections={sections}
        currentSection={currentSection}
        onNavigate={navigateToSection}
        language={language}
        theme={theme}
        onToggleLanguage={toggleLanguage}
        onToggleTheme={toggleTheme}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.25, 0.25, 1],
          }}
          className="w-full"
          onAnimationComplete={() => setIsAnimating(false)}
        >
          {sections[currentSection].component}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;

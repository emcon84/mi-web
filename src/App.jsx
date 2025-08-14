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

  // Controlar el overflow del body durante las animaciones
  useEffect(() => {
    if (isAnimating) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup al desmontar el componente
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isAnimating]);

  // Detectar cuando terminan las animaciones iniciales
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 800); // Duración más corta

    return () => clearTimeout(timer);
  }, [currentSection]); // Reset cuando cambia la sección

  const navigateToSection = (sectionIndex) => {
    if (sectionIndex >= 0 && sectionIndex < 4) {
      // 4 sections total
      setIsAnimating(true); // Activar control de overflow
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
      name: language === "es" ? "Inicio" : "Hero",
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
      className={`relative min-h-screen overflow-hidden ${
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.25, 0.25, 1],
          }}
          className="w-full h-screen"
          onAnimationComplete={() => setIsAnimating(false)}
        >
          {sections[currentSection].component}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;

import { useState } from "react";
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

  const navigateToSection = (sectionIndex) => {
    if (sectionIndex >= 0 && sectionIndex < 4) {
      // 4 sections total
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
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.25, 0.25, 1],
          }}
          className="w-full"
        >
          {sections[currentSection].component}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;

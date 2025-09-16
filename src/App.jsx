import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModernHero } from "./components/Modern/ModernHero";
import { ModernProjects } from "./components/Modern/ModernProjects";
import { ModernSkills } from "./components/Modern/ModernSkills";
import { ModernContact } from "./components/Modern/ModernContact";
import { ModernNavigation } from "./components/Modern/ModernNavigation";
import { ModernBlog } from "./components/Modern/ModernBlog";
import { SEOHead } from "./components/SEO/SEOHead";
import { getPostBySlug } from "./data/blogData";
import {
  SkipToContent,
  NavigationAnnouncer,
  useFocusManagement,
  useReducedMotion,
} from "./components/Accessibility/AccessibilityComponents";

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [language, setLanguage] = useState("es"); // "es" or "en"
  const [theme, setTheme] = useState("dark"); // "dark" or "light"
  const [isAnimating, setIsAnimating] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [currentArticleSlug, setCurrentArticleSlug] = useState(null);

  // Hooks de accesibilidad
  useFocusManagement();
  const prefersReducedMotion = useReducedMotion();
  useEffect(() => {
    const checkIsMobile = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      // Considerar mobile/small screen si el ancho es menor a 1024px o la altura es menor a 700px
      // Esto incluye tablets, pantallas pequeñas de PC y móviles
      setIsMobile(width < 1024 || height < 700);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Controlar overflow durante animaciones (carga inicial y transiciones)
  useEffect(() => {
    // En pantallas pequeñas (mobile, tablets, PCs pequeñas), siempre permitir scroll
    if (isMobile) {
      document.body.classList.remove("overflow-hidden");
      document.body.classList.add("allow-scroll");
      return;
    }

    // En la sección del blog (sección 3), siempre permitir scroll
    if (currentSection === 3) {
      document.body.classList.remove("overflow-hidden");
      document.body.classList.add("allow-scroll");
      return;
    }

    // En desktop grande, controlar overflow durante animaciones
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
  }, [isAnimating, isMobile, currentSection]);

  // Detectar cuando terminan las animaciones
  useEffect(() => {
    // En pantallas pequeñas, no controlar animaciones de overflow
    if (isMobile) return;

    // En la sección del blog, no controlar animaciones de overflow
    if (currentSection === 3) {
      setIsAnimating(false);
      return;
    }

    setIsAnimating(true); // Activar control de overflow en cada cambio

    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Reducir tiempo ya que no hay desplazamientos

    return () => clearTimeout(timer);
  }, [currentSection, isMobile]); // Reset cuando cambia la sección o el estado mobile

  // Control adicional para carga inicial
  useEffect(() => {
    // En pantallas pequeñas, permitir scroll desde el inicio
    if (isMobile) {
      document.body.classList.remove("overflow-hidden");
      document.body.classList.add("allow-scroll");
      setIsAnimating(false);
      return;
    }

    // En desktop grande, asegurar que overflow esté oculto desde el inicio
    document.body.classList.remove("allow-scroll");
    document.body.classList.add("overflow-hidden");

    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 800); // Reducir tiempo para carga inicial

    return () => clearTimeout(timer);
  }, [isMobile]); // Dependencia en isMobile para reaccionar a cambios

  // Handle URL routing for blog articles
  useEffect(() => {
    const handleRouting = () => {
      const path = window.location.pathname;
      const blogMatch = path.match(/^\/blog\/(.+)$/);

      if (blogMatch) {
        const slug = blogMatch[1];
        setCurrentArticleSlug(slug);
        setCurrentSection(3); // Blog section
      } else if (path === "/blog") {
        setCurrentArticleSlug(null);
        setCurrentSection(3); // Blog section
      } else {
        setCurrentArticleSlug(null);
        // Determine section based on path
        if (path === "/" || path === "") {
          setCurrentSection(0);
        } else if (path === "/projects") {
          setCurrentSection(1);
        } else if (path === "/skills") {
          setCurrentSection(2);
        } else if (path === "/contact") {
          setCurrentSection(4);
        }
      }
    };

    // Handle initial load
    handleRouting();

    // Handle browser back/forward
    window.addEventListener("popstate", handleRouting);

    return () => {
      window.removeEventListener("popstate", handleRouting);
    };
  }, []);

  // Update URL when section changes
  const updateURL = (sectionIndex, slug = null) => {
    let newPath = "";

    if (slug) {
      newPath = `/blog/${slug}`;
    } else {
      switch (sectionIndex) {
        case 0:
          newPath = "/";
          break;
        case 1:
          newPath = "/projects";
          break;
        case 2:
          newPath = "/skills";
          break;
        case 3:
          newPath = "/blog";
          break;
        case 4:
          newPath = "/contact";
          break;
        default:
          newPath = "/";
      }
    }

    if (window.location.pathname !== newPath) {
      window.history.pushState({}, "", newPath);
    }
  };

  const navigateToSection = (sectionIndex) => {
    if (sectionIndex >= 0 && sectionIndex < 5) {
      // 5 sections total (0-4)
      setIsAnimating(true); // Activar control de overflow antes del cambio
      setCurrentSection(sectionIndex);
      setCurrentArticleSlug(null); // Clear article when navigating to sections
      updateURL(sectionIndex);
    }
  };

  const navigateToArticle = (slug) => {
    setCurrentSection(3); // Blog section
    setCurrentArticleSlug(slug);
    updateURL(3, slug);
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
      name: language === "es" ? "Proyectos" : "Projects",
      component: <ModernProjects language={language} theme={theme} />,
    },
    {
      id: 2,
      name: language === "es" ? "Habilidades" : "Skills",
      component: <ModernSkills language={language} theme={theme} />,
    },
    {
      id: 3,
      name: language === "es" ? "Blog" : "Blog",
      component: (
        <ModernBlog
          language={language}
          theme={theme}
          currentArticleSlug={currentArticleSlug}
          onArticleSelect={navigateToArticle}
          onBackToBlog={() => navigateToSection(3)}
        />
      ),
    },
    // {
    //   id: 4,
    //   name: language === "es" ? "Contacto" : "Contact",
    //   component: <ModernContact language={language} theme={theme} />,
    // },
  ];

  // SEO dinámico basado en la sección actual
  const getSEOData = () => {
    const sectionNames = ["home", "skills", "projects", "blog", "contact"];
    const currentSectionName = sectionNames[currentSection] || "home";

    const seoData = {
      home: {
        title:
          language === "es"
            ? "Emiliano Conti - Frontend Developer | Portfolio"
            : "Emiliano Conti - Frontend Developer | Portfolio",
        description:
          language === "es"
            ? "Frontend Developer con más de 8 años de experiencia en React, JavaScript y desarrollo web moderno. Especializado en crear aplicaciones web innovadoras y accesibles."
            : "Frontend Developer with 8+ years of experience in React, JavaScript and modern web development. Specialized in creating innovative and accessible web applications.",
      },
      skills: {
        title:
          language === "es"
            ? "Tecnologías | Emiliano Conti - Frontend Developer"
            : "Technologies | Emiliano Conti - Frontend Developer",
        description:
          language === "es"
            ? "Tecnologías y herramientas que domino: React, JavaScript, TypeScript, Node.js, MongoDB, CSS, Tailwind, Next.js y más. Stack completo de desarrollo frontend."
            : "Technologies and tools I master: React, JavaScript, TypeScript, Node.js, MongoDB, CSS, Tailwind, Next.js and more. Complete frontend development stack.",
      },
      projects: {
        title:
          language === "es"
            ? "Proyectos | Emiliano Conti - Frontend Developer"
            : "Projects | Emiliano Conti - Frontend Developer",
        description:
          language === "es"
            ? "Explora mis proyectos destacados: aplicaciones React, sistemas de gestión, dashboards y soluciones web completas desarrolladas con las últimas tecnologías."
            : "Explore my featured projects: React applications, management systems, dashboards and complete web solutions developed with the latest technologies.",
      },
      blog: {
        title:
          language === "es"
            ? "Blog | Emiliano Conti - Frontend Developer"
            : "Blog | Emiliano Conti - Frontend Developer",
        description:
          language === "es"
            ? "Artículos, tutoriales y reflexiones sobre desarrollo frontend, React, JavaScript y las últimas tendencias en tecnología web."
            : "Articles, tutorials and thoughts about frontend development, React, JavaScript and the latest trends in web technology.",
      },
      // contact: {
      //   title:
      //     language === "es"
      //       ? "Contacto | Emiliano Conti - Frontend Developer"
      //       : "Contact | Emiliano Conti - Frontend Developer",
      //   description:
      //     language === "es"
      //       ? "¿Tienes un proyecto en mente? Contacta conmigo para discutir cómo puedo ayudarte a llevarlo a cabo. Disponible para proyectos remotos."
      //       : "Have a project in mind? Contact me to discuss how I can help you bring it to life. Available for remote projects.",
      // },
    };

    return seoData[currentSectionName] || seoData.home;
  };

  return (
    <div
      className={`relative min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
          : "bg-gradient-to-br from-gray-100 via-blue-100 to-gray-100"
      }`}
      role="application"
      aria-label={
        language === "es"
          ? "Portafolio de Emiliano Conti"
          : "Emiliano Conti's Portfolio"
      }
    >
      {/* SEO Head with dynamic content */}
      <SEOHead {...getSEOData()} language={language} />

      {/* Skip to content link */}
      <SkipToContent theme={theme} language={language} />

      {/* Navigation announcer for screen readers */}
      <NavigationAnnouncer
        currentSection={currentSection}
        sections={sections}
        language={language}
      />

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
        <motion.main
          id="main-content"
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
          tabIndex="-1"
          role="main"
          aria-label={`${sections[currentSection].name} ${language === "es" ? "sección" : "section"}`}
        >
          {sections[currentSection].component}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

export default App;

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  HiSun,
  HiMoon,
  HiGlobeAlt,
  HiMenu,
  HiX,
  HiHome,
  HiUser,
  HiCode,
  HiMail,
  HiDocumentDownload,
  HiNewspaper,
} from "react-icons/hi";

export const ModernNavigation = ({
  sections,
  currentSection,
  onNavigate,
  language,
  theme,
  onToggleLanguage,
  onToggleTheme,
}) => {
  const [isHovered, setIsHovered] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Iconos para navegación móvil
  const mobileIcons = [
    <HiHome className="text-xl" />,
    <HiUser className="text-xl" />,
    <HiCode className="text-xl" />,
    <HiNewspaper className="text-xl" />, // Icono para Blog
    <HiMail className="text-xl" />, // Icono para Contacto
  ];

  return (
    <>
      {/* Desktop Navigation */}
      {!isMobile && (
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className={`fixed top-0 left-0 right-0 z-50 p-4 md:p-6 ${
            theme === "dark"
              ? "bg-black/20 backdrop-blur-md"
              : "bg-white/20 backdrop-blur-md"
          }`}
          role="navigation"
          aria-label={
            language === "es" ? "Navegación principal" : "Main navigation"
          }
        >
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            {/* Logo/Name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`text-lg md:text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"}`}
            >
              <span
                className={`bg-gradient-to-r bg-clip-text text-transparent ${
                  theme === "dark"
                    ? "from-blue-400 to-cyan-400"
                    : "from-blue-600 to-cyan-600"
                }`}
              >
                <span className="hidden sm:inline">Emiliano Conti</span>
                <span className="sm:hidden">Emiliano Conti</span>
              </span>
            </motion.div>

            {/* Desktop Navigation Menu */}
            <div className="hidden lg:flex space-x-8" role="menubar">
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  onClick={() => onNavigate(index)}
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(null)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    currentSection === index
                      ? "text-blue-400"
                      : theme === "dark"
                        ? "text-white/70 hover:text-white"
                        : "text-gray-600 hover:text-gray-800"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  role="menuitem"
                  aria-current={currentSection === index ? "page" : false}
                  aria-label={`${language === "es" ? "Ir a" : "Go to"} ${section.name}`}
                >
                  {section.name}

                  {/* Active indicator */}
                  {currentSection === index && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Hover effect */}
                  {isHovered === index && currentSection !== index && (
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                        theme === "dark" ? "bg-white/30" : "bg-gray-400/50"
                      }`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      exit={{ scaleX: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Controls (Language, Theme, Download CV) */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Language Toggle */}
              <motion.button
                onClick={onToggleLanguage}
                className={`flex items-center space-x-1 px-3 py-2 transition-colors duration-300 rounded-full ${
                  theme === "dark"
                    ? "text-white/70 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-200/50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={
                  language === "es" ? "Switch to English" : "Cambiar a Español"
                }
              >
                <HiGlobeAlt className="text-lg" />
                <span className="text-sm font-medium">
                  {language.toUpperCase()}
                </span>
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                onClick={onToggleTheme}
                className={`p-2 transition-colors duration-300 rounded-full ${
                  theme === "dark"
                    ? "text-white/70 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-200/50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={
                  theme === "dark"
                    ? "Switch to Light Mode"
                    : "Switch to Dark Mode"
                }
              >
                {theme === "dark" ? (
                  <HiSun className="text-lg" />
                ) : (
                  <HiMoon className="text-lg" />
                )}
              </motion.button>

              {/* Download CV Button */}
              <motion.a
                href="/src/assets/doc/Emiliano-contiCV.pdf"
                download
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === "es" ? "Descargar CV" : "Download CV"}
              </motion.a>
            </div>
          </div>
        </motion.nav>
      )}

      {/* Mobile Top Bar - Solo controles */}
      {isMobile && (
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className={`fixed top-0 left-0 right-0 z-50 p-3 ${
            theme === "dark"
              ? "bg-black/20 backdrop-blur-md"
              : "bg-white/20 backdrop-blur-md"
          }`}
        >
          <div className="flex justify-between items-center">
            {/* Logo/Name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-gray-800"}`}
            >
              <span
                className={`bg-gradient-to-r bg-clip-text text-transparent ${
                  theme === "dark"
                    ? "from-blue-400 to-cyan-400"
                    : "from-blue-600 to-cyan-600"
                }`}
              >
                Emiliano Conti
              </span>
            </motion.div>

            {/* Controls */}
            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <motion.button
                onClick={onToggleTheme}
                className={`p-2 transition-colors duration-300 rounded-full ${
                  theme === "dark"
                    ? "text-white/70 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-200/50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {theme === "dark" ? (
                  <HiSun className="text-lg" />
                ) : (
                  <HiMoon className="text-lg" />
                )}
              </motion.button>

              {/* Language Toggle */}
              <motion.button
                onClick={onToggleLanguage}
                className={`flex items-center space-x-1 p-2 transition-colors duration-300 rounded-full ${
                  theme === "dark"
                    ? "text-white/70 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-200/50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HiGlobeAlt className="text-lg" />
                <span className="text-xs font-medium">
                  {language.toUpperCase()}
                </span>
              </motion.button>
            </div>
          </div>
        </motion.nav>
      )}

      {/* Mobile Floating Navigation Bar */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="fixed bottom-6 left-4 right-4 z-50"
        >
          <motion.nav
            className={`flex items-center justify-around p-3 rounded-2xl border shadow-lg ${
              theme === "dark"
                ? "bg-black/40 backdrop-blur-xl border-white/10 shadow-black/50"
                : "bg-white/80 backdrop-blur-xl border-gray-200/50 shadow-gray-900/10"
            }`}
            whileHover={{ scale: 1.02 }}
            role="navigation"
            aria-label={
              language === "es" ? "Navegación móvil" : "Mobile navigation"
            }
          >
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => onNavigate(index)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 ${
                  currentSection === index
                    ? theme === "dark"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-blue-100 text-blue-600"
                    : theme === "dark"
                      ? "text-white/60 hover:text-white hover:bg-white/10"
                      : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-current={currentSection === index ? "page" : false}
                aria-label={`${language === "es" ? "Ir a" : "Go to"} ${section.name}`}
              >
                <motion.div
                  animate={
                    currentSection === index ? { scale: [1, 1.2, 1] } : {}
                  }
                  transition={{ duration: 0.3 }}
                >
                  {mobileIcons[index]}
                </motion.div>
                <span className="text-xs font-medium mt-1">{section.name}</span>

                {/* Active indicator dot */}
                {currentSection === index && (
                  <motion.div
                    layoutId="mobileActiveTab"
                    className="absolute -bottom-1 w-1 h-1 bg-blue-400 rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}

            {/* CV Button within navigation */}
            <motion.a
              href="/src/assets/doc/Emiliano-contiCV.pdf"
              download
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 ${
                theme === "dark"
                  ? "text-white/60 hover:text-white hover:bg-white/10"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={
                language === "es"
                  ? "Descargar CV de Emiliano Conti"
                  : "Download Emiliano Conti's CV"
              }
            >
              <motion.div>
                <HiDocumentDownload className="text-xl" />
              </motion.div>
              <span className="text-xs font-medium mt-1">CV</span>
            </motion.a>
          </motion.nav>
        </motion.div>
      )}
    </>
  );
};

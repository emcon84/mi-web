import { motion } from "framer-motion";
import { useState } from "react";
import { HiSun, HiMoon, HiGlobeAlt, HiMenu, HiX } from "react-icons/hi";

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

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 p-4 md:p-6 ${
        theme === "dark"
          ? "bg-black/20 backdrop-blur-md"
          : "bg-white/20 backdrop-blur-md"
      }`}
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
            <span className="sm:hidden">E.C</span>
          </span>
        </motion.div>

        {/* Desktop Navigation Menu */}
        <div className="hidden lg:flex space-x-8">
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
            >
              {section.name}

              {/* Active indicator */}
              {currentSection === index && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
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
              theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
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

        {/* Mobile/Tablet Controls */}
        <div className="flex items-center space-x-2 lg:hidden">
          {/* Theme Toggle - Mobile */}
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

          {/* Language Toggle - Mobile */}
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

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 transition-colors duration-300 rounded-full ${
              theme === "dark"
                ? "text-white/70 hover:text-white hover:bg-white/10"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-200/50"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <HiX className="text-lg" />
            ) : (
              <HiMenu className="text-lg" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className={`lg:hidden mt-4 p-4 rounded-lg ${
            theme === "dark"
              ? "bg-black/40 backdrop-blur-md"
              : "bg-white/40 backdrop-blur-md"
          }`}
        >
          {/* Mobile Navigation Links */}
          <div className="flex flex-col space-y-2 mb-4">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => {
                  onNavigate(index);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                  currentSection === index
                    ? theme === "dark"
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "bg-blue-100 text-blue-600 border border-blue-200"
                    : theme === "dark"
                      ? "text-white/70 hover:text-white hover:bg-white/10"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-200/50"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {section.name}
              </motion.button>
            ))}
          </div>

          {/* Mobile CV Download Button */}
          <motion.a
            href="/src/assets/doc/Emiliano-contiCV.pdf"
            download
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium text-center hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {language === "es" ? "Descargar CV" : "Download CV"}
          </motion.a>
        </motion.div>
      )}
    </motion.nav>
  );
};

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiFillGithub, AiFillLinkedin, AiFillGitlab } from "react-icons/ai";
import { HiDownload, HiMail } from "react-icons/hi";

export const ModernHero = ({ onNavigate, language = "es", theme = "dark" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typewriterText, setTypewriterText] = useState("");

  // Textos para el efecto typewriter
  const typewriterTexts = {
    es: "Creando experiencias web modernas e interactivas",
    en: "Crafting modern and interactive web experiences",
  };

  // Efecto typewriter
  useEffect(() => {
    const text = typewriterTexts[language];
    let currentIndex = 0;

    const typewriter = setInterval(() => {
      if (currentIndex <= text.length) {
        setTypewriterText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typewriter);
      }
    }, 50); // Velocidad de escritura

    // Delay para empezar el typewriter después de que aparezca el título
    const delayTimeout = setTimeout(() => {
      // El typewriter ya está configurado arriba
    }, 1200);

    return () => {
      clearInterval(typewriter);
      clearTimeout(delayTimeout);
    };
  }, [language]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.99 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.25, 0.25, 1],
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <section
      className="hero-container relative min-h-screen flex items-center justify-center py-8 px-4 pt-8 md:pt-24 lg:mb-0"
      aria-labelledby="hero-title"
      role="banner"
    >
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)`,
        }}
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(168, 85, 247, 0.4) 0%, transparent 50%)`,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating Elements */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 left-4 md:left-20 w-20 md:w-32 h-20 md:h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
        className="absolute bottom-20 right-4 md:right-20 w-24 md:w-40 h-24 md:h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "4s" }}
        className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-xl"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-16"
      >
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            type: "spring",
            bounce: 0.4,
          }}
          className="mb-6 md:mb-8 relative inline-block"
        >
          <motion.div
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden border-4 border-blue-400/50 shadow-2xl shadow-blue-500/25"
            whileHover={{ scale: 1.1, rotate: 5 }}
            animate={{
              boxShadow: [
                "0 25px 50px rgba(59, 130, 246, 0.25)",
                "0 25px 50px rgba(34, 197, 94, 0.25)",
                "0 25px 50px rgba(6, 182, 212, 0.25)",
                "0 25px 50px rgba(59, 130, 246, 0.25)",
              ],
            }}
            transition={{
              duration: 0.3,
              boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <img
              src="/img/yo.jpeg"
              alt="Emiliano Conti"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-20"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
          />
          {/* Círculos decorativos pulsantes */}
          <motion.div
            className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-2 -left-2 w-3 h-3 bg-cyan-400 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </motion.div>

        {/* Main Title with Simple Animations */}
        <motion.div variants={itemVariants} className="mb-4 md:mb-6">
          <h1
            id="hero-title"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className={`bg-gradient-to-r bg-clip-text text-transparent ${
                theme === "dark"
                  ? "from-white via-blue-200 to-blue-400"
                  : "from-gray-800 via-blue-600 to-blue-700"
              }`}
            >
              Sotware
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className={`bg-gradient-to-r bg-clip-text text-transparent ${
                theme === "dark"
                  ? "from-blue-400 to-cyan-400"
                  : "from-blue-600 to-cyan-600"
              }`}
            >
              Engineer
            </motion.span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mb-6 md:mb-8"
        >
          <p
            className={`text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed px-4 min-h-[60px] ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
          >
            {typewriterText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className={`${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}
            >
              |
            </motion.span>
          </p>
        </motion.div>

        {/* Tech Stack Pills */}
        {/* <motion.div variants={itemVariants} className="mb-12 hidden md:block">
          <div className="flex flex-wrap justify-center gap-3">
            {["React", "Next.js", "TypeScript", "Tailwind", "Node.js"].map(
              (tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className={`px-4 py-2 backdrop-blur-sm border rounded-full text-sm font-medium transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                      : "bg-white/80 border-gray-300 text-gray-800 hover:bg-white hover:shadow-md"
                  }`}
                >
                  {tech}
                </motion.span>
              )
            )}
          </div>
        </motion.div> */}

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
            {/* <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.0, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(3)}
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold text-base md:text-lg shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <HiMail className="text-lg md:text-xl" />
              {language === "es" ? "Contactame" : "Get In Touch"}
            </motion.button> */}

            <motion.a
              href="/Emiliano-contiCV.pdf"
              download
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 backdrop-blur-sm border rounded-full font-semibold text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                theme === "dark"
                  ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                  : "bg-gray-800/80 border-gray-700/50 text-white hover:bg-gray-800"
              }`}
            >
              <HiDownload className="text-lg md:text-xl" />
              {language === "es" ? "Descargar CV" : "Download CV"}
            </motion.a>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants}>
          <div className="flex justify-center items-center gap-4 md:gap-6 w-full">
            {[
              {
                icon: AiFillGithub,
                href: "https://github.com/emcon84",
                label: "GitHub",
              },
              {
                icon: AiFillLinkedin,
                href: "https://www.linkedin.com/in/emiliano-conti/",
                label: "LinkedIn",
              },
              {
                icon: AiFillGitlab,
                href: "https://gitlab.com/emcon84",
                label: "GitLab",
              },
            ].map(({ icon: Icon, href, label }, index) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 md:p-4 backdrop-blur-sm border rounded-full transition-all duration-300 group flex items-center justify-center ${
                  theme === "dark"
                    ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                    : "bg-gray-800/80 border-gray-700/50 text-white hover:bg-gray-800"
                }`}
              >
                <Icon className="text-xl md:text-2xl group-hover:text-blue-400 transition-colors duration-300" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

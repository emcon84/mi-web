import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiFillGithub, AiFillLinkedin, AiFillGitlab } from "react-icons/ai";
import { HiDownload, HiMail } from "react-icons/hi";

export const ModernHero = ({ onNavigate, language = "es", theme = "dark" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
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
    <div className="relative min-h-screen flex items-center justify-center py-8 px-4">
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
        className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Profile Image */}
        <motion.div
          variants={itemVariants}
          className="mb-6 md:mb-8 relative inline-block"
        >
          <motion.div
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden border-4 border-blue-400/50 shadow-2xl shadow-blue-500/25"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
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
        </motion.div>

        {/* Main Title */}
        <motion.div variants={itemVariants} className="mb-4 md:mb-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4">
            <span
              className={`bg-gradient-to-r bg-clip-text text-transparent ${
                theme === "dark"
                  ? "from-white via-blue-200 to-blue-400"
                  : "from-gray-800 via-blue-600 to-blue-700"
              }`}
            >
              Frontend
            </span>
            <br />
            <span
              className={`bg-gradient-to-r bg-clip-text text-transparent ${
                theme === "dark"
                  ? "from-blue-400 to-cyan-400"
                  : "from-blue-600 to-cyan-600"
              }`}
            >
              Developer
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants} className="mb-6 md:mb-8">
          <p
            className={`text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed px-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
          >
            {language === "es" ? (
              <>
                Creando experiencias web{" "}
                <span
                  className={`font-semibold ${theme === "dark" ? "text-blue-400" : "text-blue-700"}`}
                >
                  modernas
                </span>{" "}
                e
                <span
                  className={`font-semibold ${theme === "dark" ? "text-cyan-400" : "text-cyan-700"}`}
                >
                  {" "}
                  interactivas
                </span>{" "}
                con{" "}
                <span
                  className={`font-semibold ${theme === "dark" ? "text-blue-400" : "text-blue-700"}`}
                >
                  React
                </span>{" "}
                y tecnologías de vanguardia
              </>
            ) : (
              <>
                Crafting{" "}
                <span
                  className={`font-semibold ${theme === "dark" ? "text-blue-400" : "text-blue-700"}`}
                >
                  modern
                </span>{" "}
                and
                <span
                  className={`font-semibold ${theme === "dark" ? "text-cyan-400" : "text-cyan-700"}`}
                >
                  {" "}
                  interactive
                </span>{" "}
                web experiences with{" "}
                <span
                  className={`font-semibold ${theme === "dark" ? "text-blue-400" : "text-blue-700"}`}
                >
                  React
                </span>{" "}
                and cutting-edge technologies
              </>
            )}
          </p>
        </motion.div>

        {/* Tech Stack Pills */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {["React", "Next.js", "TypeScript", "Tailwind", "Node.js"].map(
              (tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
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
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(3)}
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold text-base md:text-lg shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <HiMail className="text-lg md:text-xl" />
              {language === "es" ? "Contactame" : "Get In Touch"}
            </motion.button>

            <motion.a
              href="/src/assets/doc/Emiliano-contiCV.pdf"
              download
              whileHover={{ scale: 1.05, y: -2 }}
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
          <div className="flex justify-center gap-4 md:gap-6">
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
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 md:p-3 backdrop-blur-sm border rounded-full transition-all duration-300 group ${
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
    </div>
  );
};

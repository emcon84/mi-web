import { motion } from "framer-motion";
import { dataStack } from "../../data/data";
import {
  HiUsers,
  HiLightBulb,
  HiChatAlt2,
  HiPuzzle,
  HiClock,
  HiTrendingUp,
  HiAcademicCap,
  HiHeart,
} from "react-icons/hi";
import { useEffect } from "react";

export const ModernSkills = ({ language = "es", theme = "dark" }) => {
  // Habilitar scroll para esta sección
  useEffect(() => {
    document.body.classList.remove("overflow-hidden");
    document.body.classList.add("allow-scroll");
    document.getElementById("root").classList.add("skills-view");

    return () => {
      document.getElementById("root").classList.remove("skills-view");
    };
  }, []);

  const softSkills = [
    {
      id: "teamwork",
      name: language === "es" ? "Trabajo en Equipo" : "Teamwork",
      icon: <HiUsers className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />,
      description:
        language === "es"
          ? "Colaboración efectiva y comunicación fluida"
          : "Effective collaboration and smooth communication",
    },
    {
      id: "problem-solving",
      name: language === "es" ? "Resolución de Problemas" : "Problem Solving",
      icon: <HiPuzzle className="w-6 h-6 md:w-8 md:h-8 text-green-500" />,
      description:
        language === "es"
          ? "Análisis crítico y soluciones creativas"
          : "Critical analysis and creative solutions",
    },
    {
      id: "communication",
      name: language === "es" ? "Comunicación" : "Communication",
      icon: <HiChatAlt2 className="w-6 h-6 md:w-8 md:h-8 text-purple-500" />,
      description:
        language === "es"
          ? "Transmisión clara de ideas complejas"
          : "Clear transmission of complex ideas",
    },
    {
      id: "scrum",
      name: "Scrum / Agile",
      icon: <HiTrendingUp className="w-6 h-6 md:w-8 md:h-8 text-orange-500" />,
      description:
        language === "es"
          ? "Metodologías ágiles y gestión de proyectos"
          : "Agile methodologies and project management",
    },
    {
      id: "time-management",
      name: language === "es" ? "Gestión del Tiempo" : "Time Management",
      icon: <HiClock className="w-6 h-6 md:w-8 md:h-8 text-red-500" />,
      description:
        language === "es"
          ? "Priorización y organización eficiente"
          : "Efficient prioritization and organization",
    },
    {
      id: "innovation",
      name: language === "es" ? "Innovación" : "Innovation",
      icon: <HiLightBulb className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />,
      description:
        language === "es"
          ? "Pensamiento creativo y mejora continua"
          : "Creative thinking and continuous improvement",
    },
    {
      id: "learning",
      name: language === "es" ? "Aprendizaje Continuo" : "Continuous Learning",
      icon: <HiAcademicCap className="w-6 h-6 md:w-8 md:h-8 text-indigo-500" />,
      description:
        language === "es"
          ? "Adaptación y actualización constante"
          : "Constant adaptation and updating",
    },
    {
      id: "empathy",
      name: language === "es" ? "Empatía" : "Empathy",
      icon: <HiHeart className="w-6 h-6 md:w-8 md:h-8 text-pink-500" />,
      description:
        language === "es"
          ? "Comprensión del usuario y stakeholders"
          : "Understanding users and stakeholders",
    },
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const skillCardVariants = {
    hidden: {
      opacity: 0,
      rotateY: -90,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 1],
      },
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      z: 50,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section
      className="min-h-screen flex flex-col py-8 md:py-12 px-4 md:px-6 pt-20 md:pt-32 pb-32 md:pb-12 overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 0px)" }}
      aria-labelledby="skills-title"
      role="main"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto w-full flex-1 flex flex-col"
      >
        {/* Section Title */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-6 md:mb-8"
        >
          <h2
            id="skills-title"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3"
          >
            <span
              className={`bg-gradient-to-r bg-clip-text text-transparent ${
                theme === "dark"
                  ? "from-blue-400 to-cyan-400"
                  : "from-blue-600 to-cyan-600"
              }`}
            >
              {language === "es" ? "Habilidades" : "Skills"}
            </span>
          </h2>
          <p
            className={`text-sm md:text-base max-w-xl mx-auto px-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
          >
            {language === "es"
              ? "Tecnologías y competencias que me permiten crear soluciones efectivas"
              : "Technologies and competencies that allow me to create effective solutions"}
          </p>
        </motion.div>

        {/* Technical Skills Section */}
        <motion.div variants={itemVariants} className="mb-12 md:mb-16">
          <h3
            className={`text-xl md:text-2xl font-bold mb-6 text-center ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            {language === "es" ? "Stack Tecnológico" : "Tech Stack"}
          </h3>

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8"
          >
            {dataStack.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover="hover"
                className="group relative"
              >
                {/* Glow Effect */}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  whileHover={{ scale: 1.05 }}
                />

                {/* Card */}
                <motion.div
                  className={`relative backdrop-blur-sm border rounded-2xl p-4 md:p-6 lg:p-8 text-center transition-all duration-500 ${
                    theme === "dark"
                      ? "bg-white/5 border-white/10 hover:bg-white/10 group-hover:border-blue-400/50"
                      : "bg-white/80 border-gray-200 hover:bg-white hover:shadow-lg group-hover:border-blue-500/50"
                  }`}
                  whileHover={{
                    boxShadow:
                      theme === "dark"
                        ? "0 20px 40px rgba(59, 130, 246, 0.3)"
                        : "0 20px 40px rgba(59, 130, 246, 0.2)",
                  }}
                >
                  {/* Icon Container */}
                  <motion.div className="mb-3 md:mb-4 flex justify-center">
                    <div
                      className={`p-3 md:p-4 rounded-xl transition-all duration-500 ${
                        theme === "dark"
                          ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 group-hover:from-blue-500/30 group-hover:to-cyan-500/30"
                          : "bg-gradient-to-br from-blue-100 to-cyan-100 group-hover:from-blue-200 group-hover:to-cyan-200"
                      }`}
                    >
                      {skill.icon}
                    </div>
                  </motion.div>

                  {/* Skill Name */}
                  <motion.h3
                    className={`text-sm md:text-base lg:text-lg font-semibold transition-colors duration-300 ${
                      theme === "dark"
                        ? "text-white group-hover:text-blue-300"
                        : "text-gray-800 group-hover:text-blue-700"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill.name}
                  </motion.h3>

                  {/* Hover Particles */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400 rounded-full"
                        style={{
                          top: `${20 + Math.random() * 60}%`,
                          left: `${20 + Math.random() * 60}%`,
                        }}
                        animate={{
                          y: [-10, -30, -10],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Soft Skills Section */}
        <motion.div variants={itemVariants} className="mb-12 md:mb-16">
          <h3
            className={`text-xl md:text-2xl font-bold mb-6 text-center ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            {language === "es" ? "Habilidades Blandas" : "Soft Skills"}
          </h3>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {softSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative"
              >
                <motion.div
                  className={`backdrop-blur-sm border rounded-xl p-4 md:p-6 text-center transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-gray-400/50"
                      : "bg-white/80 border-gray-200 hover:bg-white hover:shadow-lg hover:border-gray-400/50"
                  }`}
                >
                  {/* Icon */}
                  <motion.div
                    className="mb-3 flex justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <div
                      className={`p-3 rounded-lg transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-gray-700/50 group-hover:bg-gray-600/50"
                          : "bg-gray-100 group-hover:bg-gray-200"
                      }`}
                    >
                      {skill.icon}
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h4
                    className={`text-base md:text-lg font-semibold mb-2 transition-colors duration-300 ${
                      theme === "dark"
                        ? "text-white group-hover:text-blue-300"
                        : "text-gray-800 group-hover:text-blue-700"
                    }`}
                  >
                    {skill.name}
                  </h4>

                  {/* Description */}
                  <p
                    className={`text-xs md:text-sm transition-colors duration-300 ${
                      theme === "dark"
                        ? "text-gray-400 group-hover:text-gray-300"
                        : "text-gray-600 group-hover:text-gray-700"
                    }`}
                  >
                    {skill.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Text */}
        <motion.div variants={itemVariants} className="text-center mt-8">
          <p
            className={`text-base md:text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
          >
            {language === "es"
              ? "La combinación perfecta entre conocimiento técnico y habilidades humanas para crear experiencias excepcionales"
              : "The perfect combination of technical knowledge and human skills to create exceptional experiences"}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

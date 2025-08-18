import { motion } from "framer-motion";
import { dataStack } from "../../data/data";

export const ModernSkills = ({ language = "es", theme = "dark" }) => {
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
      className="min-h-screen flex items-center justify-center py-8 md:py-12 px-4 md:px-6 pt-20 md:pt-24 pb-8 md:pb-12 mb-24 md:mb-0"
      aria-labelledby="skills-title"
      role="main"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto w-full"
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
              {language === "es" ? "Tecnologías" : "Tech Stack"}
            </span>
          </h2>
          <p
            className={`text-sm md:text-base max-w-xl mx-auto px-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
          >
            {language === "es"
              ? "Tecnologías y herramientas que uso para dar vida a las ideas"
              : "Technologies and tools I use to bring ideas to life"}
          </p>
        </motion.div>

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

        {/* Bottom Text */}
        <motion.div variants={itemVariants} className="text-center mt-16">
          <p
            className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
          >
            {language === "es"
              ? "Siempre aprendiendo y explorando nuevas tecnologías para mantenerme a la vanguardia"
              : "Always learning and exploring new technologies to stay on the cutting edge"}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

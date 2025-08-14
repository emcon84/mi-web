import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HiExternalLink, HiCode, HiEye } from "react-icons/hi";

export const ModernProjects = ({ language = "es", theme = "dark" }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  // Proyectos reales de Emiliano
  const projectsData = [
    {
      name: "UI Tool",
      company: "Notimation",
      image: "/img/imgUiTool.png",
      description: {
        es: "Un proyecto desafiante. Desde el inicio, la idea fue ambiciosa. Este proyecto es un creador de templates para envíos de emails, landings y bots conectados a IAs, diseñado para ayudar al usuario a construir un ecosistema de comunicación unificado. Estuve a cargo de toda la UI y la integración con los endpoints y APIs. El MVP termino resultando en una aplicacion de diseño muy parecida visualmente a Photoshop y otros software de diseño, solo que orientado a las necesidades del cliente. El proyecto fue desarrollado con React, Next.js, Tailwind CSS y NextUI.",
        en: "A challenging project. From the beginning, the idea was ambitious. This project is a template creator for email campaigns, landings and AI-connected bots, designed to help users build a unified communication ecosystem. I was in charge of all UI and integration with endpoints and APIs. The MVP ended up being a design application very visually similar to Photoshop and other design software, only oriented to the client's needs. The project was developed with React, Next.js, Tailwind CSS and NextUI.",
      },
      technologies: ["React", "Next.js", "Tailwind CSS", "NextUI"],
    },
    {
      name: "Agent",
      company: "Notimation",
      image: "/img/Agent.png",
      description: {
        es: "Sistema de gestión de soporte para Notimation. Otro gran proyecto para el mismo cliente de UITool en el que tuve que desarrollar habilidades de diseño y arquitectura modernos. Agentes es una plataforma donde personal de soporte se conectan y responden chats iniciados por chatbots implementados en distintos canales de comunicacion empresarial. Una vez que el usuario solicita hablar con un agente, el sistema notifica a un agente disponible para que atienda el requerimiento y comience una conversación en tiempo real con el cliente. El proyecto fue desarrollado con React y Next.js, utilizando Tailwind CSS y NextUI. Para el chat se empleó Socket.IO.",
        en: "Support management system for Notimation. Another great project for the same UITool client where I had to develop modern design and architecture skills. Agents is a platform where support staff connect and respond to chats initiated by chatbots implemented in different business communication channels. Once the user requests to speak with an agent, the system notifies an available agent to handle the request and start a real-time conversation with the client. The project was developed with React and Next.js, using Tailwind CSS and NextUI. Socket.IO was used for chat functionality.",
      },
      technologies: ["React", "Next.js", "Tailwind CSS", "NextUI", "Socket.IO"],
    },
    {
      name: "ABM admin",
      company: "Personal",
      image: "/img/dashboard.png",
      description: {
        es: "Proyecto de sistema de stock para pequeñas empresas y negocios familiares. Es un proyecto personal pensado para vender a negocios en crecimiento que requieran mantenimiento de stock, registro de ventas y compras. El proyecto fue desarrollado con React y CSS personalizado. El backend fue creado con Node.js y MongoDB. Actualmente se encuentra en producción, con el backend desplegado en Render y el frontend en Vercel, en modo demo.",
        en: "Stock management system project for small businesses and family enterprises. It's a personal project designed to sell to growing businesses that require stock maintenance, sales and purchase records. The project was developed with React and custom CSS. The backend was created with Node.js and MongoDB. Currently in production, with backend deployed on Render and frontend on Vercel, in demo mode.",
      },
      link: "https://nexo-seven.vercel.app/dashboard",
      technologies: ["React", "CSS", "Node.js", "MongoDB"],
    },
    {
      name: "Oliver Pets Web",
      company: "Oliver Pets",
      image: "/img/OliverPets.png",
      description: {
        es: "Sistema e-commerce para una startup argentina. Participé en la actualización y mantenimiento del sitio web de la empresa, utilizando ReactJS y Styled Components. También desarrollé el frontend de aplicaciones móviles con React Native. Además, se mantuvo un panel de administración en React desde donde se gestionaba la configuración, facturación, estadísticas, métricas, etc., de toda la empresa y sus aplicaciones. En este trabajo colaboré con un equipo de frontend y backend, atendiendo a los requerimientos del área de negocio. Se trabajó con metodología Scrum poco restrictiva y se utilizó Git para el control de versiones. Todos los proyectos están actualmente en producción.",
        en: "E-commerce system for an Argentine startup. I participated in updating and maintaining the company's website, using ReactJS and Styled Components. I also developed frontend for mobile applications with React Native. Additionally, maintained an admin panel in React from where configuration, billing, statistics, metrics, etc., of the entire company and its applications were managed. In this job I collaborated with frontend and backend teams, attending to business area requirements. We worked with non-restrictive Scrum methodology and used Git for version control. All projects are currently in production.",
      },
      technologies: ["React", "React Native", "Styled Components"],
    },
    {
      name: "Grupo Oslo Landing",
      company: "Grupo Oslo",
      image: "/img/grupo_oslo.png",
      description: {
        es: "Landing para una empresa argentina de bienes raíces, con presencia tanto en el país como en España. Fue creada con Astro y JavaScript puro, ya que no requería frameworks específicos al ser una landing simple. Por eso, decidí desarrollarla de la forma más pura posible para tener un mejor control del SEO y de la velocidad de carga. El proyecto está en producción. Todas las animaciones fueron desarrolladas de forma personalizada con CSS y JS puro.",
        en: "Landing page for an Argentine real estate company, with presence in both the country and Spain. It was created with Astro and pure JavaScript, as it didn't require specific frameworks being a simple landing page. Therefore, I decided to develop it in the purest way possible to have better control of SEO and loading speed. The project is in production. All animations were developed custom with CSS and pure JS.",
      },
      link: "https://grupooslo.com.ar/",
      technologies: ["Astro", "JavaScript", "CSS"],
    },
    {
      name: "Dashboard Template",
      company: "Personal",
      image: "/img/Dashboard.png",
      description: {
        es: "Template de dashboard creado para su venta en plataformas web. Desarrollado en React con Vite, Tailwind CSS y TypeScript. Incluye animaciones fluidas con Framer Motion, modo oscuro y plantillas con Sidebar o Navbar incluidos.",
        en: "Dashboard template created for sale on web platforms. Developed in React with Vite, Tailwind CSS and TypeScript. Includes smooth animations with Framer Motion, dark mode and templates with Sidebar or Navbar included.",
      },
      link: "https://dashboar-theme.vercel.app/",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
  ];

  // Convertir proyectos con descripción según idioma
  const projects = projectsData.map((project) => ({
    ...project,
    description: project.description[language],
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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

  const projectCardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0.25, 1],
      },
    },
    hover: {
      scale: 1.01,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col py-8 md:py-12 px-4 md:px-6 pt-20 md:pt-32 pb-8 md:pb-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto w-full flex-1 flex flex-col"
      >
        {/* Section Title */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-6 md:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            <span
              className={`bg-gradient-to-r bg-clip-text text-transparent ${
                theme === "dark"
                  ? "from-blue-400 to-cyan-400"
                  : "from-blue-600 to-cyan-600"
              }`}
            >
              {language === "es" ? "Proyectos Destacados" : "Featured Projects"}
            </span>
          </h2>
          <p
            className={`text-sm max-w-xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
          >
            {language === "es"
              ? "Una muestra de mi trabajo más reciente y soluciones creativas"
              : "A showcase of my latest work and creative solutions"}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="flex-1 overflow-y-auto pr-2">
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={projectCardVariants}
                whileHover="hover"
                onHoverStart={() => setHoveredProject(index)}
                onHoverEnd={() => setHoveredProject(null)}
                className="group relative cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Card */}
                <motion.div
                  className={`relative backdrop-blur-sm border rounded-3xl overflow-hidden transition-all duration-500 ${
                    theme === "dark"
                      ? "bg-white/5 border-white/10 hover:bg-white/10 group-hover:border-blue-400/50"
                      : "bg-white/80 border-gray-200 hover:bg-white hover:shadow-lg group-hover:border-blue-500/50"
                  }`}
                >
                  {/* Project Image */}
                  <div className="relative h-32 sm:h-36 md:h-40 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                      initial={{ opacity: 0.6 }}
                      whileHover={{ opacity: 0.9 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Company Badge */}
                    <div className="absolute top-2 left-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          project.company === "Personal"
                            ? "bg-green-500/80 text-white"
                            : "bg-blue-500/80 text-white"
                        }`}
                      >
                        {project.company === "Personal"
                          ? "Personal"
                          : project.company}
                      </span>
                    </div>

                    {/* Hover Actions */}
                    <AnimatePresence>
                      {hoveredProject === index && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute inset-0 flex items-center justify-center gap-4"
                        >
                          {project.link && (
                            <motion.a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <HiExternalLink className="text-xl" />
                            </motion.a>
                          )}

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition-colors duration-300"
                          >
                            <HiEye className="text-xl" />
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Project Info */}
                  <div className="p-3 md:p-4">
                    <motion.h3
                      className={`text-sm md:text-base font-bold mb-2 transition-colors duration-300 ${
                        theme === "dark"
                          ? "text-white group-hover:text-blue-300"
                          : "text-gray-800 group-hover:text-blue-700"
                      }`}
                      whileHover={{ x: 5 }}
                    >
                      {project.name}
                    </motion.h3>

                    <p
                      className={`text-xs mb-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <span className="block sm:hidden">
                        {project.description?.substring(0, 120)}
                      </span>
                      <span className="hidden sm:block line-clamp-2">
                        {project.description?.substring(0, 80)}...
                      </span>
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.technologies
                        ?.slice(0, 3)
                        .map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: techIndex * 0.1 }}
                            className={`px-1.5 py-0.5 rounded-full text-xs font-medium border ${
                              theme === "dark"
                                ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                                : "bg-blue-100 text-blue-700 border-blue-300"
                            }`}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      {project.technologies?.length > 3 && (
                        <span
                          className={`px-1.5 py-0.5 text-xs ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>
                        {project.link ? "En Producción" : "Completado"}
                      </span>
                      {project.link && (
                        <motion.div
                          className="w-2 h-2 bg-green-400 rounded-full"
                          animate={{
                            opacity: [1, 0.5, 1],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  className="w-full h-64 md:h-80 object-cover rounded-t-3xl"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors duration-300"
                >
                  ✕
                </button>

                {/* Company Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-2 rounded-full text-sm font-medium ${
                      selectedProject.company === "Personal"
                        ? "bg-green-500/90 text-white"
                        : "bg-blue-500/90 text-white"
                    }`}
                  >
                    {selectedProject.company === "Personal"
                      ? "Personal"
                      : selectedProject.company}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-3xl font-bold text-white mb-4">
                  {selectedProject.name}
                </h3>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-white mb-3">
                    Tecnologías utilizadas
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies?.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 flex items-center gap-2"
                    >
                      <HiExternalLink />
                      Ver Proyecto
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors duration-300"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

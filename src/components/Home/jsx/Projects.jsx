import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { img } from "framer-motion/client";

export const Projects = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenModal = (project) => {
    setIsOpen(true);
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const projects = [
    {
      name: "UI Tool",
      company: "Notimation",
      image: "/img/imgUiTool.png",
      description:
        "Un proyecto desafiante. Desde el inicio, la idea fue ambiciosa. Este proyecto es un creador de templates para envíos de emails, landings y bots conectados a IAs, diseñado para ayudar al usuario a construir un ecosistema de comunicación unificado. Estuve a cargo de toda la UI y la integración con los endpoints y APIs. El MVP termino resultando en una aplicacion de diseño muy parecida visualmente a Photoshop y otros software de diseño, solo que orientado a las necesidades del cliente. El proyecto fue desarrollado con React, Next.js, Tailwind CSS y NextUI.",
    },
    {
      name: "Agent",
      company: "Notimation",
      image: "/img/Agent.png",
      description:
        "Sistema de gestión de soporte para Notimation. Otro gran proyecto para el mismo cliente de UITool en el que tuve que desarrollar habilidades de diseño y arquitectura mudernos. Agentes es una plataforma donde personal de soporte se conectan y responden chats iniciados por chatbots implementados en distintos canales de comunicacion empresarial. Una vez que el usuario solicita hablar con un agente, el sistema notifica a un agente disponible para que atienda el requerimiento y comience una conversación en tiempo real con el cliente. El proyecto fue desarrollado con React y Next.js, utilizando Tailwind CSS y NextUI. Para el chat se empleó Socket.IO.",
    },
    {
      name: "ABM admin",
      company: "Personal",
      image: "/img/dashboard.png",
      description:
        "Proyecto de sistema de stock para pequeñas empresas y negocios familiares. Es un proyecto personal pensado para vender a negocios en crecimiento que requieran mantenimiento de stock, registro de ventas y compras. El proyecto fue desarrollado con React y CSS personalizado. El backend fue creado con Node.js y MongoDB. Actualmente se encuentra en producción, con el backend desplegado en Render y el frontend en Vercel, en modo demo.",
      link: "https://nexo-seven.vercel.app/dashboard",
    },
    {
      name: "Oliver Pets Web",
      company: "Oliver Pets",
      image: "/img/OliverPets.png",
      description:
        "Sistema e-commerce para una startup argentina. Participé en la actualización y mantenimiento del sitio web de la empresa, utilizando ReactJS y Styled Components. También desarrollé el frontend de aplicaciones móviles con React Native. Además, se mantuvo un panel de administración en React desde donde se gestionaba la configuración, facturación, estadísticas, métricas, etc., de toda la empresa y sus aplicaciones. En este trabajo colaboré con un equipo de frontend y backend, atendiendo a los requerimientos del área de negocio. Se trabajó con metodología Scrum poco restrictiva y se utilizó Git para el control de versiones. Todos los proyectos están actualmente en producción.",
    },
    {
      name: "Grupo Oslo Landing",
      company: "Grupo Oslo",
      image: "/img/grupo_oslo.png",
      description:
        "Landing para una empresa argentina de bienes raíces, con presencia tanto en el país como en España. Fue creada con Astro y JavaScript puro, ya que no requería frameworks específicos al ser una landing simple. Por eso, decidí desarrollarla de la forma más pura posible para tener un mejor control del SEO y de la velocidad de carga. El proyecto está en producción. Todas las animaciones fueron desarrolladas de forma personalizada con CSS y JS puro.",
      link: "https://grupooslo.com.ar/",
    },
    {
      name: "Dashboard",
      company: "Personal  ",
      image: "/img/Dashboard.png",
      description:
        "Template de dashboard creado para su venta en plataformas web. Desarrollado en React con Vite, Tailwind CSS y TypeScript. Incluye animaciones fluidas con Framer Motion, modo oscuro y plantillas con Sidebar o Navbar incluidos.",
      link: "https://dashboar-theme.vercel.app/",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center backdrop-filter backdrop-blur-md h-[100dvh]"
        >
          <div className="max-w-[800px] p-4  rounded-lg text-white">
            <h2 className="text-sm md:text-xl font-bold">
              {selectedProject.name}
            </h2>
            <p className="text-sm md:text-lg pb-2">{selectedProject.company}</p>
            <p className="text-sm md:text-lg">{selectedProject.description}</p>
            {selectedProject.link && (
              <a
                href={`${selectedProject.link}`}
                className="text-sm md:text-lg font-bold mt-4"
                target="_blank"
              >
                Link a la web
              </a>
            )}

            <div className="mt-10">
              <img src={selectedProject.image} alt={selectedProject.name} />
            </div>
            <button
              className="absolute top-0 md:top-24 right-2 md:right-10 m-4 text-white font-bold py-2 px-4 rounded"
              onClick={handleCloseModal}
            >
              X
            </button>
          </div>
        </motion.div>
      )}
      <div className="h-screen text-align-center flex flex-col items-center justify-center bg-slate-800 text-white">
        <h1 className="text-sm md:text-4xl pt-5 md:pt-20">Proyectos</h1>
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 p-5 md:p-20">
          {projects.map((project, index) => (
            <div
              key={index}
              className="border-2 border-gray-600 p-2 shadow-lg rounded-lg"
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-10 md:h-40 object-cover"
              />
              <h2 className="text-xs md:text-xl pt-4">{project.name}</h2>
              <p className="text-xs md:text-lg">Empresa: {project.company}</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 mt-2 px-2 md:px-2 md:py-2 rounded w-full text-xs md:text-lg"
                onClick={() => handleOpenModal(project)}
              >
                Ver más
              </button>
            </div>
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
};

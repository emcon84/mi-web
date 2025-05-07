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
      name: 'UI Tool',
      company: 'Notimation',
      image: '/img/imgUiTool.png',
      description: 'Un proyecto desafiante. Desde el punto inicial, la idea fue ambisiosa. Este proyecto es un creador de templates para envios emails, landings, bots templates conectados a IAs, para ayudar al usuario, a crear un ecosistema de comunicación unificado. El proyecto fue desarrollado en React y Next.js con Tailwind CSS, y NextUI.',
    },
    {
      name: 'Agent',
      company: 'Notimation',
      image: '/img/Agent.png',
      description: 'Sistema de gestion de soporte para Notimation. Agentes conectados a una plataforma para contestar chats provenientes de una chatbot iniciado por un usuario. Una vez el user pedia hablar con una agente, el sistema avisaba a un agente en linea para que tome el requerimiento y comenzaba a chatear en tiempo real con el cliente.  El proyecto fue desarrollado en React y Next.js con Tailwind CSS, y NextUI. Para el chat se utilizo Socket IO.',
    },
    {
      name: 'ABM admin',
      company: 'Personal',
      image: '/img/dashboard.png',
      description: 'Proyecto de sistema de Stock para pequeñas empresas y negocios familiares. Desarrollado con React y CSS customizado para el proyecto',
    },
    {
      name: 'Oliver Pets Web',
      company: 'Oliver Pets',
      image: '/img/OliverPets.png',
      description: 'Sistema para una startup de Argentina. Se actualizo el sitio web de la empresa, utilizando Reactjs y StyledComponents. Se desarrollo tanto un front web como una aplicacion mobile con React Native. Ademas en esta empresa se mantuvo un panel admin en React. Este trabajo fue desarollado por un equipo de personas tanto frontend como backend, atendiendo a los requerimientos de la empresa. El proyecto se encuentra en produccion en el momento.',
    },    
    {
      name: 'Grupo Oslo Landing',
      company: 'Grupo Oslo',
      image: '/img/grupo_oslo.png',
      description: ' Este landing fue creado para una empresa de Argentina, para promocionar sus productos y servicios. El proyecto se encuentra en produccion en el momento. Todas las animaciones fueron creadas customizadas con CSS. El proyecto fue desarrollado en Landing creada con Astro, y js vanilla',
      link: 'https://grupooslo.com.ar/',
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
          transition={{ duration: 0.5, ease: 'easeInOut', }}
          className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center backdrop-filter backdrop-blur-md"
        >
          <div className="max-w-[800px] p-4  rounded-lg text-white">
            <h2 className="text-sm md:text-xl font-bold">{selectedProject.name}</h2>
            <p className="text-sm md:text-lg pb-2">{selectedProject.company}</p>
            <p className="text-sm md:text-lg">{selectedProject.description}</p>
            {selectedProject.link && (
              <a href={`${selectedProject.link}`} className="text-sm md:text-lg font-bold mt-4" target="_blank">Link a la web</a>
            )}
           
            <div className="mt-10">
              <img src={selectedProject.image}  alt={selectedProject.name} />
            </div>
            <button className="absolute top-0 md:top-24 right-2 md:right-10 m-4 text-white font-bold py-2 px-4 rounded" onClick={handleCloseModal}>X</button>
          </div>
        </motion.div>
      )}
      <div className="h-screen text-align-center flex flex-col items-center justify-center bg-slate-800 text-white">
        <h1 className="text-sm md:text-4xl pt-5 md:pt-20">Proyectos</h1>
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 p-5 md:p-20">
          {projects.map((project, index) => (
            <div key={index} className="border-2 border-gray-600 p-2 shadow-lg rounded-lg">
              <img src={project.image} alt={project.name} className="w-full h-10 md:h-40 object-cover"/>
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

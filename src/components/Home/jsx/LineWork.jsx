import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { div } from "framer-motion/client";

const experiencias = [
  {
    titulo: "2018 - 2022 Desarrollador de software - Intercap S.R.L.",
    descripcion:
      "Mi primera experiencia en áreas de IT. Para esta empresa trabajé en el mantenimiento de sistemas de e-commerce, gestión de inventario, facturación y gestión de clientes. También brindé soporte técnico de hardware y realicé mantenimiento de servidores in situ.",
    tecnologias: "Java, SQL, HTML, CSS, JS",
  },
  {
    titulo: "2022 - 2024 Desarrollador de software - Oliver Pets",
    descripcion:
      "Desarrollé software para la empresa Oliver Pets, manteniendo sistemas de e-commerce, paneles administrativos y aplicaciones móviles para el uso de clientes y repartidores.",
    tecnologias: "PHP, MySQL, HTML, CSS, JS, Reactjs",
  },
  {
    titulo: "2023 - Desarrollador de software - Notimation",
    descripcion:
      "Participé en el desarrollo de software para la empresa en distintos proyectos, como dashboards administrativos, la aplicación UiTool para la creación de templates y landings, entre otros.",
    tecnologias: "ReactJS, NextJS, Tailwind CSS, HTML, CSS, JS",
  },
  {
    titulo:
      "2024 - Actualidad Desarrollador de software - Santander Tecnología",
    descripcion:
      "Desarrollo de software para sistemas de uso interno del banco. Creación de nuevos proyectos orientados a resolver problemas de negocio y mejorar la experiencia del usuario.",
    tecnologias: "ReactJS, NextJS, CSS, HTML, CSS, JS",
  },
];

export const LineWork = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const handleOpenModal = (experience) => {
    setIsOpen(true);
    setSelectedExperience(experience);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center backdrop-filter backdrop-blur-md"
        >
          <div className="max-w-[800px] p-4  rounded-lg text-white">
            <h2 className="text-sm md:text-xl font-bold">
              {selectedExperience.titulo}
            </h2>
            <p className="text-sm md:text-lg pb-2">
              {selectedExperience.descripcion}
            </p>
            <p className="text-sm md:text-lg">
              Tecnologías: {selectedExperience.tecnologias}
            </p>
            <button
              className="absolute top-0 md:top-24 right-2 md:right-10 m-4 text-white font-bold py-2 px-4 rounded"
              onClick={handleCloseModal}
            >
              X
            </button>
          </div>
        </motion.div>
      )}
      <div className="md:h-screen text-align-center flex flex-col md:items-center md:justify-center justify-start bg-gray-900 bg-transparent text-white">
        <h1 className="text-xl md:text-4xl pt-5 md:pt-20 flex flex-col items-center">
          Mi trayectoria
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 p-5 md:p-20 md:hidden">
          {experiencias.map((experience, index) => (
            <div
              key={index}
              className="border-2 border-gray-600 p-2 shadow-lg rounded-lg flex flex-col justify-between"
            >
              <h2 className="text-xs md:text-xl pt-4">{experience.titulo}</h2>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 mt-2 px-2 md:px-2 md:py-4 rounded w-full text-xs md:text-lg"
                onClick={() => handleOpenModal(experience)}
              >
                Ver más
              </button>
            </div>
          ))}
        </div>
        <div className="hidden md:block">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 px-20 ">
            {experiencias.map((experience, index) => (
              <div
                key={index}
                className="border-2 border-gray-600 rounded-lg p-4 mt-4"
              >
                <p className="text-sm md:text-xl">{experience.titulo}</p>
                <p className="mt-4 text-xs lg:text-sm">
                  {experience.descripcion}
                </p>
                <div className="mt-4 text-xs lg:text-sm">
                  <p>Tecnologías: {experience.tecnologias}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

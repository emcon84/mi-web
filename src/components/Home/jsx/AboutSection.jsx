import React from 'react';
import { motion } from "framer-motion";

export const AboutSection = () => {
  return (
    <motion.section
    className="h-screen text-align-center flex flex-col items-center justify-center bg-slate-800 text-white"    
    >
      <h1 className='text-sm md:text-4xl'>Sobre mí</h1>
      <p className='md:text-xl text-sm md:p-20 p-5 lg:max-w-[800px] xs:max-w-[300px] '>Desarrollador de software con más de 5 años de experiencia, no solo creando y manteniendo software, sino también aprendiendo nuevas tecnologías. <br />
      Mi trabajo con equipos multidisciplinarios me ha permitido expandir habilidades interpersonales que van más allá del código. El camino transitado para llegar a donde estoy me llevó por distintos desafíos técnicos y personales, lo que me permitió mejorar mis habilidades de comunicación y trato con las personas. Esto me dio flexibilidad con los tiempos y la capacidad de llevar adelante un desarrollo en equipo, haciendo de esta una buena experiencia tanto para el cliente como para el equipo de trabajo.</p>

      <p className='md:text-xl text-sm md:p-20 p-5 italic lg:max-w-[800px] xs:max-w-[300px] '>Desarrollar software no es solo crear código...es analizar, comprender, aprender, crear, testear, documentar y mantener.</p>
    </motion.section>
  );
}
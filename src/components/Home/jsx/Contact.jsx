import React from "react";
import { BiWorld } from "react-icons/bi";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";

export const Contact = () => {
  return (
    <div className="h-screen text-align-center flex flex-col items-center justify-center bg-transparent text-white bg-gray-900 ">
      <h1 className="text-sm md:text-4xl pt-5 pb-10">Contactame</h1>
      <p className="text-sm md:text-xl mb-20 flex justify-center w-72 text-center md:w-full">
        Hablemos sobre nuevos proyectos que podamos desarrollar{" "}
      </p>
      <motion.ul className="py-3 grid grid-cols-2 md:grid-cols-4 gap-4">
        <li className="hover:scale-110 transition-transform duration-300 ease-in-out">
          <a
            href="mailto:emcon84@gmail.com"
            target="_blank"
            className="flex flex-col items-center w-full"
          >
            <MdEmail className="text-white" size={48} />
            <p>Enviar email</p>
          </a>
        </li>
        <li className="hover:scale-110 transition-transform duration-300 ease-in-out">
          <a
            href="https://www.linkedin.com/in/emiliano-conti/"
            target="_blank"
            className="flex flex-col items-center w-full"
          >
            <IoLogoLinkedin className="text-white" size={48} />
            <p>Ver mi Linkedin</p>
          </a>
        </li>
        <li className="hover:scale-110 transition-transform duration-300 ease-in-out">
          <a
            href="https://www.emilianoconti.com/"
            target="_blank"
            className="flex flex-col items-center w-full"
          >
            <BiWorld className="text-white" size={48} />
            <p>Mi blog</p>
          </a>
        </li>
        <li className="hover:scale-110 transition-transform duration-300 ease-in-out">
          <a
            href="https://github.com/emcon84"
            target="_blank"
            className="flex flex-col items-center w-full"
          >
            <IoLogoGithub className="text-white" size={48} />
            <p>Mi Github</p>
          </a>
        </li>
      </motion.ul>
    </div>
  );
};

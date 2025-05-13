import React from "react";
import { BsFillTelephoneForwardFill, BsTelegram } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { IoLogoLinkedin, IoLogoWhatsapp } from "react-icons/io";
import { CardComponent } from "../../Card/CardComponent";
import {
  flex__center_teal,
  text__h2_teal_bold,
  text__white_bold,
} from "../js/HomeClassTW";

export const Contact = () => {
  return (
    <div className="h-screen text-align-center flex flex-col items-center justify-center bg-slate-800 text-white">
      <h1 className="text-sm md:text-4xl pt-5 pb-10">Contactame</h1>

      <ul className="py-3 flex justify-center w-full">
        <li>
          <a href="mailto:emcon84@gmail.com" target="_blank">
            <MdEmail className="text-white mr-10" size={48} />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/emiliano-conti/" target="_blank">
            <IoLogoLinkedin className="text-white" size={48} />
          </a>
        </li>
      </ul>
    </div>
  );
};

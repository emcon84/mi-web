//import class from Tailwind
import React from "react";
import { motion } from "framer-motion";

import {
  button_primary,
  container,
  grid__col_3,
  text__h2_teal_bold,
  text__h2_white_bold,
  title__h1,
} from "../js/HomeClassTW";

//components from Home
import { Contact } from "./Contact";
import { SocialNerwork } from "./SocialNerwork";
import { Stack } from "./Stack";
// import { PersonalDescription } from './PersonalDescription'

// import { CardComponent } from "../../Card/CardComponent";
import "../css/HomeStyles.css";
// import { JobsAndPractice } from "./JobsAndPractice";

import Curriculum from "../../../assets/doc/Curriculum.pdf";
import { BsMouse } from "react-icons/bs";
import { MdTouchApp } from "react-icons/md";
// import OliverPetsHome from "../../../assets/img/Home.jpg";
// import OliverPets from "../../../assets/img/OliverPets.png";
// import OliverPetsBrands from "../../../assets/img/brands.jpg";
// import NexoDash from "../../../assets/img/dashboard.png";
// import OliverPetsProductList from "../../../assets/img/productList.jpg";
// import OliverPetsProductPage from "../../../assets/img/productPage.jpg";

export const HomeComponent = () => {
  function handleClick() {
    window.open(Curriculum, "_blank");
  }

  return (
    <motion.section className="h-screen text-align-center flex flex-col items-center justify-center bg-slate-800 text-white text-xl lg:text-4xl">
      <div className="flex items-center">
        <img
          src="/img/yo.jpeg"
          alt="Emiliano Conti"
          className="w-20 h-20 lg:w-32 lg:h-32 rounded-full m-8"
        />
        <div>
          <h1 className="text-lg md:text-4xl"> Emiliano Conti</h1>
          <h2 className="text-sm md:text-2xl pt-3">Software Engineer</h2>
        </div>
      </div>

      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="hidden md:block"
      >
        <BsMouse />
      </motion.div>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [-10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="block md:hidden"
      >
        <MdTouchApp />
      </motion.div>
    </motion.section>
  );
};

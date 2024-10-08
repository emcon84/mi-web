//import class from Tailwind
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

import { CardComponent } from "../../Card/CardComponent";
import "../css/HomeStyles.css";
import { JobsAndPractice } from "./JobsAndPractice";

import Curriculum from "../../../assets/doc/Curriculum.pdf";
import OliverPetsHome from "../../../assets/img/Home.jpg";
import OliverPets from "../../../assets/img/OliverPets.png";
import OliverPetsBrands from "../../../assets/img/brands.jpg";
import NexoDash from "../../../assets/img/dashboard.png";
import OliverPetsProductList from "../../../assets/img/productList.jpg";
import OliverPetsProductPage from "../../../assets/img/productPage.jpg";

export const HomeComponent = () => {
  function handleClick() {
    window.open(Curriculum, "_blank");
  }

  return (
    <div className={container}>
      <div className="nav__home">
        <h1 className={title__h1}>Emiliano Conti</h1>
        <p className="text-slate-300">Fullstack Developer</p>
      </div>
      <div className={grid__col_3}>
        <Contact />
        <Stack />
        <SocialNerwork />
      </div>

      <div className="p-5">
        <h2 className={text__h2_teal_bold}>Experience</h2>
        <hr />
      </div>
      <div>
        <CardComponent>
          <h2 className={text__h2_white_bold}>Stock Management System</h2>
          <hr />
          <br />
          <div className="grid grid-cols gap-8 md:grid-cols-2">
            <div className="col">
              <img src={NexoDash} alt="" />
            </div>
            <div className="col">
              <p>
                Self-developed software, for small companies that only need to
                start managing their stocks.
                <br />
                The Stock management system is designed
                to simplify and optimize inventory control, sales, budgets,
                orders and customer management. With an intuitive and
                easy-to-use interface, you can manage your entire product
                catalog, from initial loading to stock updates, all in one
                place.
              </p>
              <br />
              <div className="flex gap-4">
                <div className="w-100">
                  <a href={"https://nexo-seven.vercel.app/"}>
                    <button type="button" className={button_primary}>
                      Demo
                    </button>
                  </a>
                </div>
                <div className="w-100">
                  <a href={"https://github.com/emcon84/nexo"}>
                    <button type="button" className={button_primary}>
                      Code
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </CardComponent>
        <CardComponent>
          <h2 className={text__h2_white_bold}>Oliver Pets - Ecommerce</h2>
          <hr />
          <br />
          <div className="grid grid-cols gap-8 md:grid-cols-2">
            <div className="col">
              <img src={OliverPets} alt="" />
            </div>
            <div className="col">
              <p>
                Ecommerce system for a startup company from Argentina. I am make
                the mobile model based on a custom figma design. Working with
                React Native. Make the layout of the web with React for both its
                mobile and desktop design. On the web, StyledComponts is used as
                a CSS library.
              </p>
              <br />
              <div className="grid grid-cols-6 gap-4">
                <div className="col">
                  <a href="#my-modal-2">
                    <img src={OliverPetsHome} alt="" />
                  </a>
                </div>
                <div className="col">
                  <a href="#my-modal-3">
                    <img src={OliverPetsBrands} alt="" />
                  </a>
                </div>
                <div className="col">
                  <a href="#my-modal-4">
                    <img src={OliverPetsProductList} alt="" />
                  </a>
                </div>
                <div className="col">
                  <a href="#my-modal-5">
                    <img src={OliverPetsProductPage} alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </CardComponent>
        <div className="modal" id="my-modal-2">
          <div className="modal-box">
            <img src={OliverPetsHome} alt="" />
            <div className="modal-action">
              <a href="#" className="btn">
                Close!
              </a>
            </div>
          </div>
        </div>
        <div className="modal" id="my-modal-3">
          <div className="modal-box">
            <img src={OliverPetsBrands} alt="" />
            <div className="modal-action">
              <a href="#" className="btn">
                Close!
              </a>
            </div>
          </div>
        </div>
        <div className="modal" id="my-modal-4">
          <div className="modal-box">
            <img src={OliverPetsProductList} alt="" />
            <div className="modal-action">
              <a href="#" className="btn">
                Close!
              </a>
            </div>
          </div>
        </div>
        <div className="modal" id="my-modal-5">
          <div className="modal-box">
            <img src={OliverPetsProductPage} alt="" />
            <div className="modal-action">
              <a href="#" className="btn">
                Close!
              </a>
            </div>
          </div>
        </div>
        <CardComponent>
          <h2 className={text__h2_white_bold}>
            Notimation - Software Factory - UiTool
          </h2>
          <hr />
          <br />
          <div className="grid grid-cols gap-8 md:grid-cols-2">
            <div className="col">
              <div className="col flex justify-center">
                <iframe
                  width="100%"
                  height="360"
                  src="https://www.youtube.com/embed/v86jLwfkeMM"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            <div className="col">
              <p>
                Software development company, where I have been working as a
                frontend developer for the past 2 years. I design screens from
                scratch using Figma, create prototypes, and write code using
                various technologies. My main focus has been on React, Next.js,
                and frameworks like Tailwind CSS. I also use Redux Toolkit as a
                state manager and React DnD for Drag and Drop functionality.
              </p>
              <br />
              <p>
                <strong>UiTool</strong> is a software for creating web
                templates, emails, and AI-embedded chatbots. In this project, we
                worked on designing and developing the entire software, starting
                from the customized UI in Figma, creating icons and all
                components using Atomic Design, and then translating everything
                into code using Next.js, Redux Toolkit, and Tailwind.
              </p>
              <br />
              <div></div>
            </div>
          </div>
        </CardComponent>
        <CardComponent>
          <h2 className={text__h2_white_bold}>
            Notimation - Software Factory - Agent
          </h2>
          <hr />
          <br />
          <div className="grid grid-cols gap-8 md:grid-cols-2">
            <div className="col">
              <div className="col flex justify-center">
                <iframe
                  width="100%"
                  height="360"
                  src="https://www.youtube.com/embed/lohjmpFMJuM"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            <div className="col">
              <p>
                {" "}
                <strong>Agents</strong> is an application for customer service
                agents, where they handle incoming contacts created through
                websockets. The entire interface was built using NextUi and
                Next.js. Redux was also utilized for state management, and
                connections to AI-powered bots were established to provide
                intelligent responses.
              </p>
              <br />
              <div></div>
            </div>
          </div>
        </CardComponent>
      </div>
      <div className="p-5">
        <h2 className={text__h2_teal_bold}>Practice and Learning</h2>
        <hr />
      </div>
      <div className="sm:grid sm:grid-cols-2">
        <JobsAndPractice />
      </div>
      <div className="py-10">
        <CardComponent>
          <div className="grid md:grid-cols-3 py-5">
            <div className="col"></div>
            <div className="col">
              <div className="w-100">
                <a href="#">
                  <button
                    onClick={handleClick}
                    type="button"
                    className={button_primary}
                  >
                    Download CV
                  </button>
                </a>
              </div>
            </div>
            <div className="col"></div>
          </div>
        </CardComponent>
      </div>
    </div>
  );
};

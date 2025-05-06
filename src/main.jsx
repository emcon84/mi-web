import React from "react";
import ReactDOM from "react-dom/client";
import { IoLogoLinkedin, IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="fixed top-[87%] z-50 w-full flex justify-center flex-col items-center">
      <p>Contactame</p>
      <ul className="py-3 flex justify-center w-full">
        <li>
          <a href="mailto:emcon84@gmail.com" target="_blank">
            <MdEmail className="text-white mr-10" size={24} />
          </a>
        </li>        
        <li>
          <a href="https://www.linkedin.com/in/emiliano-conti/" target="_blank">
            <IoLogoLinkedin className="text-white" size={24} />
          </a>
        </li>
      </ul>
    </div>
    <App />
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <div className="fixed top-20 z-50 w-full flex justify-center flex-col items-center"></div>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

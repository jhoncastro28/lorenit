import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Establece el modo de color light por defecto
document.documentElement.classList.remove("dark");
document.documentElement.classList.add("light");

// Deshabilita modo oscuro automático
const meta = document.createElement("meta");
meta.name = "color-scheme";
meta.content = "light";
document.head.appendChild(meta);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

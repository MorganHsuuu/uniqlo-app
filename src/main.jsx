import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";
import { ResearchProvider } from "./research/ResearchContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ResearchProvider>
      <App />
    </ResearchProvider>
  </StrictMode>
);

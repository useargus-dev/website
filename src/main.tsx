import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initTheme } from "@/lib/theme";
import App from "@/app.tsx";
import "@/styles/globals.css";

initTheme();

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

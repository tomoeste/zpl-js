import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Playground from "./Playground.tsx";
import Docs from "./Docs.tsx";
import About from "./About.tsx";
import { SiteHeader } from "@/components/site-header.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/zpl-js">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SiteHeader />
        <Routes>
          <Route path="/" element={<Playground />} />
          <Route path="/docs">
            <Route
              index
              element={<Navigate to="getting-started/introduction" replace />}
            />
            <Route path=":category/:page" element={<Docs />} />
            <Route path="*" element={<Navigate to="/docs" replace />} />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);

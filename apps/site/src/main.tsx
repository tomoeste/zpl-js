import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
const Playground = lazy(() => import("./Playground.tsx"));
const Docs = lazy(() => import("./Docs.tsx"));
const About = lazy(() => import("./About.tsx"));
import SiteHeader from "@/components/site-header.tsx";
import { ThemeProvider } from "zpl-js-editor";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import LoadingScreen from "@/Loading.tsx";
const Toaster = lazy(() =>
  import("sonner").then((m) => ({ default: m.Toaster }))
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/zpl-js/">
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <SiteHeader />
        <Suspense fallback={<LoadingScreen />}>
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
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);

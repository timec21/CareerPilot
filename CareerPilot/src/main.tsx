import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApplicationProvider } from "./context/ApplicationContext";
import { GoalProvider } from "./context/GoalContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ApplicationProvider>
          <GoalProvider>
            <App />
          </GoalProvider>
        </ApplicationProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);

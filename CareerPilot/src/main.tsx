import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApplicationProvider } from "./context/ApplicationContext";
import { GoalProvider } from "./context/GoalContext";
import { MessageProvider } from "./context/MessageContext";
import { ProfileProvider } from "./context/ProfileContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProfileProvider>
          <ApplicationProvider>
            <GoalProvider>
              <MessageProvider>
                <App />
              </MessageProvider>
            </GoalProvider>
          </ApplicationProvider>
        </ProfileProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);

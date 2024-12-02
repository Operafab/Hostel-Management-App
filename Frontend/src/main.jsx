import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import UserProvider from "./context/userContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>

    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>

  </StrictMode>
);

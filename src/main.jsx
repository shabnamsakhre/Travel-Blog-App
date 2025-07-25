import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import TravelContext from "./context/TravelContext.jsx";

createRoot(document.getElementById("root")).render(
  <TravelContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TravelContext>
);

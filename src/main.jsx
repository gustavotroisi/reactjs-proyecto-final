import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import { LikeProvider } from "./context/LikeContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
      <LikeProvider>
        <App />
      </LikeProvider>
    </CartProvider>
  </BrowserRouter>,
);

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import { LikeProvider } from "./context/LikeContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <LikeProvider>
          <App />
        </LikeProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>,
);

import * as bootstrap from "bootstrap";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Layout } from "./componentes/layout/Layout";
import ItemListContainer from "./componentes/productos/ItemListContainer";
import { Directorio } from "./componentes/contactos/Directorio";
import GestionProductos from "./componentes/gestion/GestionProductos";
import GestionCupones from "./componentes/gestion/GestionCupones";
import Inicio from "./componentes/inicio/Inicio";
import ItemDetalle from "./componentes/productos/ItemDetalle/ItemDetalle";
import Cart from "./componentes/carrito/Cart";
import ProductosNacionales from "./componentes/ProductosNacionales/ProductosNacionales";
import Login from "./componentes/login/Login";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Inicio />} />
          <Route
            path="productos"
            element={
              <ItemListContainer
                titulo={"Nuestros Productos"}
                buscador={true}
              />
            }
          />
          <Route path="/producto/:id" element={<ItemDetalle />} />
          <Route
            path="/nosotros"
            element={<Directorio titulo={"Nosotros"} />}
          />
          <Route path="/gestion" element={<GestionProductos />} />
          <Route path="/cupones" element={<GestionCupones />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/productos-nacionales"
            element={<ProductosNacionales />}
          />
        </Route>
      </Routes>
    </>
  );
}
export default App;

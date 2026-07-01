import * as bootstrap from "bootstrap";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Layout } from "./componentes/layout/Layout";
import ItemListContainer from "./componentes/productos/ItemListContainer";
import { Directorio } from "./componentes/contactos/Directorio";
import GestionProductos from "./componentes/gestion/GestionProductos";
import Inicio from "./componentes/inicio/Inicio";
import ItemDetalle from "./componentes/productos/ItemDetalle/ItemDetalle";
import Cart from "./componentes/carrito/Cart";
import ProductosNacionales from "./componentes/ProductosNacionales/ProductosNacionales";

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
          <Route path="/carrito" element={<Cart />} />
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

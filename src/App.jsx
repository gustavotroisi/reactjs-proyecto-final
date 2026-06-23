import * as bootstrap from "bootstrap";
import "bootswatch/dist/solar/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Layout } from "./componentes/layout/Layout";
import ItemListContainer from "./componentes/productos/ItemListContainer";
import { Directorio } from "./componentes/contactos/Directorio";
import FormularioContainer from "./componentes/formularioProductos/FormularioContainer";
import Inicio from "./componentes/inicio/Inicio";
import ItemDetalle from "./componentes/productos/ItemDetalle/ItemDetalle";
import Cart from "./componentes/carrito/Cart";
import ProductosNacionales from "./componentes/ProductosNacionales/ProductosNacionales";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route
          path="productos"
          element={<ItemListContainer titulo={"Productos"} />}
        />
        <Route path="/producto/:id" element={<ItemDetalle />} />
        <Route path="/nosotros" element={<Directorio titulo={"Nosotros"} />} />
        <Route path="/alta-productos" element={<FormularioContainer />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/productos-nacionales" element={<ProductosNacionales />} />
      </Route>
    </Routes>
  );
}
export default App;

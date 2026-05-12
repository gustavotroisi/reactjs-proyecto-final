import * as bootstrap from "bootstrap";
import "bootswatch/dist/solar/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Layout } from "./componentes/layout/Layout";
import ItemListContainer from "./componentes/productos/ItemListContainer";
import { Directorio } from "./componentes/contactos/Directorio";
import FormularioContainer from "./componentes/formularioProductos/FormularioContainer";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <h1 style={{ textAlign: "center", padding: "60px" }}>
              Bienvenidos
            </h1>
          }
        />
        <Route
          path="productos"
          element={<ItemListContainer titulo={"Productos Destacados"} />}
        />
        <Route path="/nosotros" element={<Directorio titulo={"Nosotros"} />} />
        <Route path="/alta-productos" element={<FormularioContainer />} />
      </Route>
    </Routes>
  );
}
export default App;

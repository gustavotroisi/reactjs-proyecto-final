import * as bootstrap from "bootstrap";
import "bootswatch/dist/solar/bootstrap.min.css";
import "./App.css";

import { Layout } from "./componentes/layout/Layout";
import Productos from "./componentes/productos/Productos";
import { Directorio } from "./componentes/contactos/Directorio";
import FormularioContainer from "./componentes/formularioProductos/FormularioContainer";

function App() {
  return (
    <Layout>
      <Productos />
      <Directorio />
      <FormularioContainer />
    </Layout>
  );
}
export default App;

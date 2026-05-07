import * as bootstrap from "bootstrap";
import "bootswatch/dist/solar/bootstrap.min.css";
import "./App.css";

import { Layout } from "./componentes/layout/Layout";
import ItemListContainer from "./componentes/productos/ItemListContainer";
import { Directorio } from "./componentes/contactos/Directorio";
import FormularioContainer from "./componentes/formularioProductos/FormularioContainer";

function App() {
  return (
    <Layout>
      <ItemListContainer />
      <Directorio />
      <FormularioContainer />
    </Layout>
  );
}
export default App;

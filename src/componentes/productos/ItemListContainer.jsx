import ItemList from "./ItemList";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";

//Firestore
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function ItemListContainer({ titulo, destacados }) {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    const productosDB = collection(db, "productos");

    getDocs(productosDB)
      .then((response) => {
        if (response.empty) throw new Error("Error al obtener los datos");

        //console.log(response);
        setProductos(
          response.docs.map((doc) => {
            //console.log(doc.data());
            return { id: doc.id, ...doc.data() };
          }),
        );
      })
      .catch((error) => setError(error.message))
      .finally(() => setCargando(false));

    /*fetch("/data/productos.json")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudo cargar el archivo de productos");
        }
        return respuesta.json();
      })
      .then((datos) => {
        setProductos(datos);
        setMensaje("Se han cargado los productos");
      })
      .catch((error) => {
        setError(error.message);
        setMensaje("Error al cargar el archivo");
      })
      .finally(() => setCargando(false));
      */
  }, []);

  if (cargando) {
    return <p>Cargando productos, por favor espere...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  const productosAMostrar = destacados
    ? productos.filter((prod) => prod.destacado)
    : productos;

  console.log(productosAMostrar);

  return (
    <>
      <Helmet>
        <title>TechStore | Productos</title>
        <meta
          name="description"
          content={`Los mejores productos para tu oficina y hogar.`}
        />
      </Helmet>
      <Container className="mt-4">
        <h1 className="page-title">{titulo}</h1>
        {console.log(mensaje)}
        <ItemList productos={productosAMostrar} />
      </Container>
    </>
  );
}

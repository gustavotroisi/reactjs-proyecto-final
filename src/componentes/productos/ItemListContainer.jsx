import ItemList from "./ItemList";
import { useState, useEffect } from "react";

export default function ItemListContainer({ titulo, destacados }) {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    fetch("/data/productos.json")
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

  return (
    <div className="product-grid">
      <h1 className="page-title">{titulo}</h1>
      {console.log(mensaje)}
      <ItemList productos={productosAMostrar} />
    </div>
  );
}

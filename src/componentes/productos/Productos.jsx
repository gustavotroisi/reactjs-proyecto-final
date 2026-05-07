import { useState, useEffect } from "react";
import styles from "./Productos.module.css";

export default function Productos() {
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

  return (
    <>
      <div className={styles.productos}>
        <div className={styles.message}>{mensaje}</div>
        <ul>
          {productos.map((producto) => (
            <li key={producto.id}>
              <h2 className={styles.nombre}>{producto.nombre}</h2>
              <img
                className={styles.imagen}
                src={producto.imagen}
                alt={producto.nombre}
              />
              <p>$ {producto.precio}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

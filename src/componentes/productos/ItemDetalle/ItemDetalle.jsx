import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

//Firestore
//import { doc, getDoc } from "firebase/firestore";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";

import styles from "./ItemDetalle.module.css";
import { useCart } from "../../../context/CartContext";

export default function ItemDetalle() {
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [esFavorito, setEsFavorito] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  const { addToCart, getCantidadActual } = useCart();

  const { id } = useParams();

  const cantidadActual = getCantidadActual(parseInt(id));

  useEffect(() => {
    //buscar por id del documento
    //const docRef = doc(db, "productos", id);

    if (!id) return;

    //buscar por id de la coleccion
    const docRef = query(
      collection(db, "productos"),
      where("id", "==", Number(id)),
    );

    getDocs(docRef)
      .then((resp) => {
        if (!resp.empty) {
          // Verificamos si el documento existe
          setProducto({ ...resp.docs[0].data(), id: resp.docs[0].id });
        } else {
          setError("Producto no encontrado");
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));

    /*
    fetch("/data/productos.json")
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error("No se pudo leer el archivo.");
        return respuesta.json();
      })
      .then((data) => {
        const producto = data.find((p) => p.id === parseInt(id));
        if (!producto) throw new Error("No se encontró el ID del producto.");
        setProducto(producto);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
    */
  }, [id]);

  if (loading) {
    return <>Cargando...</>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  const { nombre, precio, stock, imagen, descripcion, destacado } = producto;

  const agregarAlCarrito = () => {
    addToCart(producto, cantidad);
    alert(
      `Has agregado ${cantidad} unidad${cantidad > 1 ? "es de" : " de"} ${nombre} al carrito.`,
    );
  };

  return (
    <div className={`${styles.card} ${destacado ? styles.dest : ""}`}>
      <img src={imagen} alt={nombre} className={styles.productImage} />

      {destacado ? <div className={styles.destacado}>⭐</div> : ""}
      <div className={styles.fav} onClick={() => setEsFavorito(!esFavorito)}>
        {esFavorito ? "❤️" : "🖤"}
      </div>

      <h3 className={styles.nombre}>{nombre}</h3>

      <p>{descripcion}</p>
      <p className={styles.precio}>${precio}</p>
      <p className={styles.stock}>Stock disponible: {stock}</p>

      {cantidadActual > 0 ? (
        <p style={{ margin: "0 15px", fontWeight: "bold" }}>
          Tienes {cantidadActual} agregadas en el carrito.
        </p>
      ) : (
        ""
      )}

      {stock > 0 ? (
        <>
          <div className={styles.cantidadContainer}>
            <button
              className={styles.btn}
              onClick={() => setCantidad(cantidad - 1)}
              disabled={cantidad <= 1}
            >
              -
            </button>
            <span className={styles.cantidad}>{cantidad}</span>
            <button
              className={styles.btn}
              onClick={() => setCantidad(cantidad + 1)}
              disabled={cantidad >= stock}
            >
              +
            </button>
          </div>

          <p>
            <button
              className="btn btn-lg btn-secondary"
              onClick={agregarAlCarrito}
            >
              Comprar
            </button>
          </p>
        </>
      ) : (
        "Sin stock"
      )}
      <p>
        <Link to="/productos">Ver otros productos</Link>
      </p>
    </div>
  );
}

import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import styles from "./Item.module.css";

export default function Item({ id, nombre, precio, stock, imagen, destacado }) {
  const producto = { id, nombre, precio, stock, imagen, destacado };
  const [cantidad, setCantidad] = useState(1);
  const [esFavorito, setEsFavorito] = useState(false);

  const { addToCart, getCantidadActual } = useCart();

  const cantidadActual = getCantidadActual(producto.id);

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
        <Link to={`/producto/${id}`}>Ver mas info</Link>
      </p>
    </div>
  );
}

import styles from "./Item.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Item({ id, nombre, precio, stock, imagen, destacado }) {
  const [cantidad, setCantidad] = useState(1);
  const [esFavorito, setEsFavorito] = useState(false);

  const agregarAlCarrito = () => {
    alert(`Has seleccionado ${cantidad} unidades de ${nombre}`);
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

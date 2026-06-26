import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
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
    <Card
      className={`h-100 p-3 ${styles.card} ${destacado ? styles.dest : ""}`}
    >
      <Card.Img
        variant="top"
        src={imagen}
        alt={nombre}
        className={styles.imagen}
      />
      {destacado ? <div className={styles.destacado}>⭐</div> : ""}
      <Card.Body className="d-flex flex-column">
        <div className={styles.fav} onClick={() => setEsFavorito(!esFavorito)}>
          {esFavorito ? "❤️" : "🖤"}
        </div>

        <Card.Title className={styles.nombre}>{nombre}</Card.Title>
        <Card.Text>
          <p className={styles.precio}> $ {precio}</p>
          <p className={styles.stock}>Stock disponible: {stock}</p>
        </Card.Text>

        {cantidadActual > 0 ? (
          <p style={{ margin: "0 15px", fontWeight: "bold" }}>
            Tienes {cantidadActual} agregadas en el carrito.
          </p>
        ) : (
          ""
        )}

        {stock > 0 ? (
          <Row>
            <Col xs={12} md={5} lg={5} className="mb-4">
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
            </Col>
            <Col xs={12} md={7} lg={7} className="mb-4">
              <Button
                as={Link}
                to={`/producto/${id}`}
                variant="primary"
                className="mt-auto w-100"
                onClick={agregarAlCarrito}
              >
                Comprar
              </Button>
            </Col>
          </Row>
        ) : (
          "Sin stock"
        )}

        <Button
          as={Link}
          to={`/producto/${id}`}
          variant="primary"
          className="mt-auto"
        >
          Ver detalle
        </Button>
      </Card.Body>
    </Card>
  );
}

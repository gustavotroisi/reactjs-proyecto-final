import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useLike } from "../../context/LikeContext";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import { MdFavorite } from "react-icons/md";
import styles from "./Item.module.css";

export default function Item({ id, nombre, precio, stock, imagen, destacado }) {
  const producto = { id, nombre, precio, stock, imagen, destacado };
  const [cantidad, setCantidad] = useState(1);
  //const [esFavorito, setEsFavorito] = useState(false);

  const { addToCart, getCantidadActual } = useCart();
  const { setMeGusta, chequeaSiMeGusta } = useLike();

  const cantidadActual = getCantidadActual(producto.id);

  const handleMeGusta = (id) => {
    setMeGusta(id);
  };

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
        <div
          className={styles.fav}
          role="button"
          aria-label={
            chequeaSiMeGusta(id) ? "Quitar de favoritos" : "Agregar a favoritos"
          }
          //onClick={() => setEsFavorito(!esFavorito)}
          onClick={() => handleMeGusta(id)}
        >
          {chequeaSiMeGusta(id) ? (
            <MdFavorite style={{ color: "var(--color-primary)" }} />
          ) : (
            <MdFavorite style={{ color: "var(--color-disabled)" }} />
          )}
        </div>

        <Card.Title className={styles.nombre}>{nombre}</Card.Title>
        <div className={styles.precio}>
          $ {precio}
          {stock > 0 ? (
            <Card.Text className={styles.stock}>
              Stock disponible: {stock}
            </Card.Text>
          ) : (
            <Card.Text className={styles.stock}>Sin stock</Card.Text>
          )}
        </div>

        {cantidadActual > 0 ? (
          <Badge className="mb-2 bg-secondary">
            Tienes {cantidadActual} agregado{cantidadActual > 1 ? "s" : ""} al
            carrito
          </Badge>
        ) : (
          ""
        )}

        {stock > 0 ? (
          <Row>
            <Col xs={12} md={6} lg={6} className="mb-4">
              <div className={styles.cantidadContainer}>
                <button
                  className={styles.btn}
                  onClick={() => setCantidad(cantidad - 1)}
                  disabled={cantidad <= 1}
                  aria-label="Disminuir cantidad"
                >
                  -
                </button>
                <span className={styles.cantidad}>{cantidad}</span>
                <button
                  className={styles.btn}
                  onClick={() => setCantidad(cantidad + 1)}
                  disabled={cantidad >= stock}
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>
            </Col>
            <Col xs={12} md={6} lg={6} className="mb-4">
              <Button
                as={Link}
                variant="primary"
                className="mt-auto w-100"
                onClick={agregarAlCarrito}
                aria-label="Comprar"
              >
                Comprar
              </Button>
            </Col>
          </Row>
        ) : (
          ""
        )}

        <Button
          as={Link}
          to={`/producto/${id}`}
          variant="primary"
          className={`mt-auto ${styles.btnDetalle}`}
          aria-label="Ver detalle del producto"
        >
          Ver detalle
        </Button>
      </Card.Body>
    </Card>
  );
}

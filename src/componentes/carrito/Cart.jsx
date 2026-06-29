import { useCart } from "../../context/CartContext";
import { useLike } from "../../context/LikeContext";
import { Container, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCartPlus } from "react-icons/fa6";
import { MdFavorite } from "react-icons/md";

export default function Cart() {
  const { cart, clearCart, removeItem, getCartTotal } = useCart();
  const cartHeader = <h1 className={`page-title ${styles.titulo}`}>Carrito</h1>;
  const { chequeaSiMeGusta } = useLike();

  if (cart.length === 0) {
    return (
      <>
        <Helmet>
          <title>TechStore | Carrito</title>
        </Helmet>
        <Container className={`mt-4 mx-auto ${styles.cart}`}>
          <Row>
            <Col xs={12} md={8} lg={8} className="mb-4 mx-auto">
              {cartHeader}
              <p style={{ textAlign: "center" }}>
                <strong>El carrito está vacío.</strong>
              </p>
              <p style={{ textAlign: "center" }}>
                Agregá productos para iniciar un pedido.
              </p>
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>TechStore | Carrito</title>
      </Helmet>
      <div className={styles.cart}>
        {cartHeader}
        <div className={styles.cartItems}>
          <Row className={styles.headerRow}>
            <Col xs={12} md={5}>
              Producto
            </Col>
            <Col xs={6} md={2}>
              $/Unidad
            </Col>
            <Col xs={3} md={2}>
              Cantidad
            </Col>
            <Col xs={3} md={2}>
              Subtotal
            </Col>
            <Col xs={0} md={1}></Col>
          </Row>
          {cart.map((item) => (
            <Row key={item.id} className={styles.itemRow}>
              <Col
                xs={12}
                md={5}
                className={styles.producto}
                style={{ position: "relative" }}
              >
                <Link to={`/producto/${item.id}`}>
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className={styles.productImage}
                  />
                  {item.nombre}
                </Link>
                {chequeaSiMeGusta(item.id) ? (
                  <div className={styles.favorito}>
                    <MdFavorite style={{ color: "var(--color-primary)" }} />
                  </div>
                ) : (
                  ""
                )}
              </Col>
              <Col xs={6} md={2} className={styles.precio}>
                $ {item.precio}
              </Col>
              <Col xs={3} md={2} className={styles.cantidad}>
                {item.quantity}
              </Col>
              <Col xs={3} md={2} className={styles.subtotal}>
                $ {item.precio * item.quantity}
              </Col>
              <Col xs={12} md={1} className={styles.accion}>
                <button
                  onClick={() => removeItem(item.id)}
                  className={styles.btnEliminar}
                >
                  <RiDeleteBin6Line />
                </button>
              </Col>
            </Row>
          ))}
        </div>
        <Row className={styles.totalRow}>
          <Col xs={12} className={styles.total}>
            <span>Total: </span>
            <span className={styles.totalPrecio}>$ {getCartTotal()}</span>
          </Col>
        </Row>
        <div className={styles.actionsWrapper}>
          <Link to="/productos" className={styles.verMasProductos}>
            <FaCartPlus /> agregar mas productos
          </Link>
          <Link
            to="/"
            className={styles.btnPagar}
            onClick={() => {
              alert("Gracias por comprar");
              clearCart();
            }}
          >
            Finalizar compra
          </Link>

          <button className={styles.btnVaciar} onClick={clearCart}>
            Vaciar Carrito
          </button>
        </div>
      </div>
    </>
  );
}

import { useCart } from "../../context/CartContext";
import { Container, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, clearCart, removeItem, getCartTotal } = useCart();
  const cartHeader = <h1 className={styles.header}>Carrito</h1>;

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
        <div className={styles.tablewrapper}>
          <div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio Unitario</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td className={styles.producto}>
                      <Link to={`/producto/${item.id}`}>
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          className={styles.productImage}
                        />
                        {item.nombre}
                      </Link>
                    </td>

                    <td align="right">$ {item.precio}</td>
                    <td align="center">{item.quantity}</td>
                    <td align="right">$ {item.precio * item.quantity}</td>
                    <td>
                      <button
                        onClick={() => removeItem(item.id)}
                        className={styles.btnEliminar}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.total}>
            <span>Total: </span>
            <span className={styles.totalPrecio}>$ {getCartTotal()}</span>
          </div>
        </div>
        <div className={styles.actionsWrapper}>
          <Link to="/productos" className={styles.verMasProductos}>
            Ver más productos
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

import { useCart } from "../../context/CartContext";
import styles from "./Cart.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, clearCart, getCartTotal } = useCart();
  const cartHeader = <h1 className={styles.header}>Carrito</h1>;

  const navigate = useNavigate();

  const handleFinalizarCompra = () => {
    alert("Gracias por tu compra!");
    clearCart();
    navigate("/");
  };

  if (cart.length === 0) {
    return (
      <div className={styles.cart}>
        {cartHeader}
        <p style={{ textAlign: "center" }}>
          <strong>El carrito está vacío.</strong>
        </p>
        <p style={{ textAlign: "center" }}>
          Agregá productos para iniciar un pedido.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      {cartHeader}
      <div className={styles.tablewrapper}>
        <div>
          <table className={styles.table}>
            <thead>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Subtotal</th>
              <th></th>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Link to={`/producto/${item.id}`}>
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        className={styles.productImage}
                      />
                      {item.nombre}
                    </Link>
                  </td>
                  <td>{item.quantity}</td>
                  <td>$ {item.precio}</td>
                  <td>$ {item.precio * item.quantity}</td>
                  <td>Quitar</td>
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
        <div style={{ marginTop: "1em" }}>
          <button onClick={handleFinalizarCompra} className={styles.btnPagar}>
            Pagar
          </button>
        </div>
        <button className={styles.btnVaciar} onClick={clearCart}>
          Vaciar Carrito
        </button>
      </div>
    </div>
  );
}

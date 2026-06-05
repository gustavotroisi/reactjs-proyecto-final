import { useCart } from "../../context/CartContext";
import styles from "./Cart.module.css";

export default function Cart() {
  const { cart, clearCart, getCartTotal } = useCart();
  const cartHeader = <h1>Carrito</h1>;

  if (cart.length === 0) {
    return (
      <div className={styles.cart}>
        {cartHeader}
        <p>Agrega productos para iniciar tu pedido</p>
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
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className={styles.productImage}
                    />
                    {item.nombre}
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
      <div style={{ marginTop: "1em" }}>
        <button className={styles.btnPagar}>Pagar</button>
      </div>
      <button className={styles.btnVaciar} onClick={clearCart}>
        Vaciar Carrito
      </button>
    </div>
  );
}

import Item from "./Item";
import styles from "./ItemList.module.css";

export default function ItemList({ productos }) {
  return (
    <div className={styles.itemlist}>
      {productos.map(
        (prod) => (
          <Item key={prod.id} {...prod} />
        ),
        {
          /*  prod.stock ? <Item key={prod.id} {...prod} /> : false, */
        },
      )}
    </div>
  );
}

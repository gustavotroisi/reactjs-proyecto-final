import ItemListContainer from "../productos/ItemListContainer";
import styles from "./Inicio.module.css";

export default function Inicio() {
  return (
    <>
      <h1 className={styles.titulo}>
        Bienvenidos a <strong>Tech Store</strong>
      </h1>
      <ItemListContainer titulo="Productos Destacados" destacados={true} />
    </>
  );
}

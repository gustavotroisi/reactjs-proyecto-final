import ItemListContainer from "../productos/ItemListContainer";
import styles from "./Inicio.module.css";
import logo from "../../../public/images/logo_techstore4.png";

export default function Inicio() {
  return (
    <>
      <h1 className={styles.titulo}>
        <img className={styles.logo} src={logo} alt="Tech Store logo" />
      </h1>
      <ItemListContainer titulo="Productos Destacados" destacados={true} />
    </>
  );
}

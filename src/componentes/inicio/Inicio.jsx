import ItemListContainer from "../productos/ItemListContainer";
import styles from "./Inicio.module.css";
import logo from "../../../public/images/logo_tech_store3.png";

export default function Inicio() {
  return (
    <>
      <h1 className={styles.titulo}>
        Bienvenidos a<br />
        <img className={styles.logo} src={logo} alt="Tech Store logo" />
      </h1>
      <ItemListContainer titulo="Productos Destacados" destacados={true} />
    </>
  );
}

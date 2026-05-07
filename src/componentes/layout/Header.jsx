import styles from "./Header.module.css";
function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a href="#">Inicio</a>
        <a href="#">Productos</a>
        <a href="#">Carrito</a>
        <a href="#">Contacto</a>
      </nav>
    </header>
  );
}
export default Header;

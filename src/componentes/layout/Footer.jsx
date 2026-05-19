import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer
      className={`navbar navbar-expand-lg bg-secondary ${styles.footer}`}
      data-bs-theme="dark"
    >
      <p>
        &copy;2026 <strong>Tech Store</strong> - Desarrollado por Gustavo Troisi
      </p>
    </footer>
  );
}
export default Footer;

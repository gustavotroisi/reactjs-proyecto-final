import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer
      className={`navbar navbar-expand-lg bg-secondary ${styles.footer}`}
      data-bs-theme="dark"
    >
      <p>
        &copy;2026 <strong>Proyecto React</strong> - Gustavo Troisi
      </p>
    </footer>
  );
}
export default Footer;

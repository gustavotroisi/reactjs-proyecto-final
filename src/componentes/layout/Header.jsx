import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Container, Row, Col } from "react-bootstrap";
import * as bootstrap from "bootstrap";
import styles from "./Header.module.css";
import logo from "../../../public/images/logo_techstore4.png";
import cartIcon from "../../../public/images/cart-svgrepo-com.svg";

function Header() {
  const { getCartQuantity } = useCart();
  const totalItems = getCartQuantity();

  const closeNav = () => {
    const el = document.getElementById("navbarColor01");
    if (el && el.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(el).hide();
    }
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
        <Container fluid>
          <Row className="w-100 align-items-center">
            <Col xs={6} lg={4} className="d-flex justify-content-start">
              <Link
                to="/"
                className="navbar-brand"
                aria-label="Tech Store Home"
              >
                <img className={styles.logo} src={logo} alt="Tech Store logo" />
              </Link>
            </Col>
            <Col xs={12} lg={4} className="d-flex justify-content-center">
              <div className="collapse navbar-collapse" id="navbarColor01">
                <ul className="navbar-nav mx-auto">
                  <li className="nav-item">
                    <Link to="/" className="nav-link" aria-label="Inicio" onClick={closeNav}>
                      Inicio
                      <span className="visually-hidden">(current)</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/productos"
                      className="nav-link"
                      aria-label="Productos"
                      onClick={closeNav}
                    >
                      Productos
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/nosotros"
                      className="nav-link"
                      aria-label="Nosotros"
                      onClick={closeNav}
                    >
                      Nosotros
                    </Link>
                  </li>
                  <li className="nav-item d-lg-none">
                    <Link
                      to="/carrito"
                      className="nav-link"
                      aria-label="Carrito de compras"
                      onClick={closeNav}
                    >
                      Carrito
                      <span className={`${styles.cartIcon} ms-2`}>
                        <img src={cartIcon} alt="cart icon" />
                        {totalItems > 0 && (
                          <div className={styles.total}>{totalItems}</div>
                        )}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/gestion"
                      className="nav-link"
                      aria-label="Gestión"
                      onClick={closeNav}
                    >
                      Gestión
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col
              xs={6}
              lg={4}
              className="d-flex justify-content-end align-items-center gap-2"
            >
              <button
                className={`navbar-toggler d-lg-none ${styles.togglerFixed}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarColor01"
                aria-controls="navbarColor01"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <Link
                to="/carrito"
                className="linkCarrito d-none d-lg-block"
                aria-label="Carrito de compras"
              >
                <span className={styles.cartIcon}>
                  <img src={cartIcon} alt="cart icon" />
                  {totalItems > 0 && (
                    <div className={styles.total}>{totalItems}</div>
                  )}
                </span>
              </Link>
            </Col>
          </Row>
        </Container>
      </nav>
    </header>
  );
}
export default Header;

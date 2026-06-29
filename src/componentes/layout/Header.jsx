import { NavLink, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Container, Row, Col } from "react-bootstrap";
import * as bootstrap from "bootstrap";
import styles from "./Header.module.css";
import logo from "../../../public/images/logo_techstore4.png";
import cartIcon from "../../../public/images/cart-svgrepo-com.svg";

function Header() {
  const { getCartQuantity } = useCart();
  const totalItems = getCartQuantity();

  const handleClick = () => {
    const el = document.getElementById("navbarCollapse");
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
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mx-auto">
                  <li className="nav-item">
                    <NavLink
                      to="/"
                      className={styles.nav}
                      aria-label="Inicio"
                      className={({ isActive }) =>
                        `${styles.nav} nav-link${isActive ? " active" : ""}`
                      }
                      onClick={handleClick}
                    >
                      Inicio
                      <span className="visually-hidden">(current)</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/productos"
                      className={styles.nav}
                      aria-label="Productos"
                      className={({ isActive }) =>
                        `${styles.nav} nav-link${isActive ? " active" : ""}`
                      }
                      onClick={handleClick}
                    >
                      Productos
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/nosotros"
                      className={styles.nav}
                      aria-label="Nosotros"
                      className={({ isActive }) =>
                        `${styles.nav} nav-link${isActive ? " active" : ""}`
                      }
                      onClick={handleClick}
                    >
                      Nosotros
                    </NavLink>
                  </li>
                  <li className="nav-item d-lg-none">
                    <NavLink
                      to="/carrito"
                      className={styles.nav}
                      aria-label="Carrito de compras"
                      className={({ isActive }) =>
                        `${styles.nav} nav-link${isActive ? " active" : ""}`
                      }
                      onClick={handleClick}
                    >
                      Carrito
                      <span className={`${styles.cartIcon} ms-2`}>
                        <img src={cartIcon} alt="cart icon" />
                        {totalItems > 0 && (
                          <div className={styles.total}>{totalItems}</div>
                        )}
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/gestion"
                      className={styles.nav}
                      aria-label="Gestión"
                      className={({ isActive }) =>
                        `${styles.nav} nav-link${isActive ? " active" : ""}`
                      }
                      onClick={handleClick}
                    >
                      Gestión
                    </NavLink>
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
                data-bs-target="#navbarCollapse"
                aria-controls="navbarCollapse"
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

import { NavLink, Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { Container, Row, Col } from "react-bootstrap";
import * as bootstrap from "bootstrap";
import styles from "./Header.module.css";
import logo from "../../../public/images/logo_techstore4.png";
import cartIcon from "../../../public/images/cart-svgrepo-com.svg";
import { FaUserAlt } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

function Header() {
  const { getCartQuantity } = useCart();
  const totalItems = getCartQuantity();
  const { user, logout } = useAuth();

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
            <Col xs={6} lg={3} className="d-flex justify-content-start">
              <Link
                to="/"
                className="navbar-brand"
                aria-label="Tech Store Home"
              >
                <img className={styles.logo} src={logo} alt="Tech Store logo" />
              </Link>
            </Col>
            <Col xs={12} lg={7} className="d-flex justify-content-center">
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className={`navbar-nav mx-auto ${styles.navbarNav}`}>
                  <li className="nav-item">
                    <NavLink
                      to="/"
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
                      aria-label="Nosotros"
                      className={({ isActive }) =>
                        `${styles.nav} nav-link${isActive ? " active" : ""}`
                      }
                      onClick={handleClick}
                    >
                      Nosotros
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/carrito"
                      aria-label="Carrito de compras"
                      className={({ isActive }) =>
                        `${styles.nav} nav-link${isActive ? " active" : ""}`
                      }
                      onClick={handleClick}
                    >
                      Carrito
                      <span className={`${styles.cartIcon} ms-2  d-lg-none`}>
                        <img src={cartIcon} alt="Icono del carrito" />
                        {totalItems > 0 && (
                          <div className={styles.total}>{totalItems}</div>
                        )}
                      </span>
                    </NavLink>
                  </li>

                  {user ? (
                    <>
                      <li className="nav-item dropdown">
                        <a
                          className={`${styles.nav} nav-link dropdown-toggle`}
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <FaUserAlt /> {user.rol || user.email.split("@")[0]}
                        </a>
                        <ul className="dropdown-menu">
                          <li>
                            <NavLink
                              to="/perfil"
                              className={({ isActive }) =>
                                `dropdown-item${isActive ? " active" : ""}`
                              }
                              onClick={handleClick}
                              aria-label="Perfil"
                            >
                              Perfil
                            </NavLink>
                          </li>
                          {
                            /*
                             *
                             * ADMIN
                             *
                             */
                            user.rol === "admin" ? (
                              <>
                                <li>
                                  <NavLink
                                    to="/gestion"
                                    className={({ isActive }) =>
                                      `dropdown-item${isActive ? " active" : ""}`
                                    }
                                    aria-label="Gestión de Productos"
                                    onClick={handleClick}
                                  >
                                    Gestión de Productos
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink
                                    to="/cupones"
                                    className={({ isActive }) =>
                                      `dropdown-item${isActive ? " active" : ""}`
                                    }
                                    onClick={handleClick}
                                    aria-label="Gestión de cupones"
                                  >
                                    Gestión de Cupones
                                  </NavLink>
                                </li>
                              </>
                            ) : (
                              ""
                            )
                          }
                          <li className="nav-item d-flex flex-column flex-sm-row align-items-center align-items-sm-start">
                            <button
                              className="dropdown-item"
                              aria-label="Salir"
                              onClick={logout}
                            >
                              <MdLogout /> Salir
                            </button>
                          </li>
                        </ul>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <NavLink
                          to="/login"
                          aria-label="Login"
                          className={({ isActive }) =>
                            `${styles.nav} nav-link${isActive ? " active" : ""}`
                          }
                          onClick={handleClick}
                        >
                          <FaUserAlt /> Acceder
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </Col>
            <Col
              xs={6}
              lg={2}
              className="d-flex justify-content-end align-items-center "
            >
              <button
                className={`navbar-toggler d-lg-none ${styles.togglerFixed}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
                aria-controls="navbarCollapse"
                aria-expanded="false"
                aria-label="Menu de navegación"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <Link
                to="/carrito"
                className="linkCarrito d-none d-lg-block"
                aria-label="Carrito de compras"
              >
                <span className={styles.cartIcon}>
                  <img src={cartIcon} alt="Icono del carrito" />
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

import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./Header.module.css";
import logo from "../../../public/images/logo_tech_store3.png";
import cartIcon from "../../../public/images/cart-svgrepo-com.svg";

function Header() {
  const { getCartQuantity } = useCart();
  const totalItems = getCartQuantity();

  return (
    <header>
      <nav
        className="navbar navbar-expand-lg bg-secondary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img className={styles.logo} src={logo} alt="Tech Store logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Inicio
                  <span className="visually-hidden">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/productos" className="nav-link">
                  Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/nosotros" className="nav-link">
                  Nosotros
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/gestion" className="nav-link">
                  Gestión
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/carrito" className="nav-link">
                  Carrito
                </Link>
              </li>
              <li className="nav-item">
                <div className={styles.cartIcon}>
                  <Link to="/carrito">
                    <img src={cartIcon} alt="cart icon" />

                    {totalItems > 0 && (
                      <div className={styles.total}>{totalItems}</div>
                    )}
                  </Link>
                </div>
              </li>
              {/*<li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Separated link
                  </a>
                </div>
              </li>*/}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Header;

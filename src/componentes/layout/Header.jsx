import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./Header.module.css";
import logo from "../../../public/images/logo_tech_store3.png";

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
                <Link to="/alta-productos" className="nav-link">
                  Agregar Nuevo Producto
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
                    <svg
                      class="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                      />
                    </svg>

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

import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import styled from "styled-components";

//Firestore
//import { doc, getDoc } from "firebase/firestore";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";

import styles from "./ItemDetalle.module.css";
import { useCart } from "../../../context/CartContext";

export default function ItemDetalle() {
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [esFavorito, setEsFavorito] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  const { addToCart, getCantidadActual } = useCart();

  const { id } = useParams();

  const cantidadActual = getCantidadActual(parseInt(id));

  const BotonAccion = styled.button`
    background-color: transparent;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    margin-left: 8px;
    transition: all 0.2s ease;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
  `;

  const BotonVerOtros = styled(BotonAccion)`
    border-color: ##0d6efd;
    color: ##0d6efd;
    text-decoration: none;

    &:hover {
      background-color: ##0d6efd;
    }
  `;

  useEffect(() => {
    //buscar por id del documento
    //const docRef = doc(db, "productos", id);

    if (!id) return;

    //buscar por id de la coleccion
    const docRef = query(
      collection(db, "productos"),
      where("id", "==", Number(id)),
    );

    getDocs(docRef)
      .then((resp) => {
        if (!resp.empty) {
          // Verificamos si el documento existe
          setProducto({ ...resp.docs[0].data(), id: resp.docs[0].id });
        } else {
          setError("Producto no encontrado");
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));

    /*
    fetch("/data/productos.json")
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error("No se pudo leer el archivo.");
        return respuesta.json();
      })
      .then((data) => {
        const producto = data.find((p) => p.id === parseInt(id));
        if (!producto) throw new Error("No se encontró el ID del producto.");
        setProducto(producto);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
    */
  }, [id]);

  if (loading) {
    return <>Cargando...</>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  const { nombre, precio, stock, imagen, descripcion, destacado } = producto;

  const agregarAlCarrito = () => {
    addToCart(producto, cantidad);
    alert(
      `Has agregado ${cantidad} unidad${cantidad > 1 ? "es de" : " de"} ${nombre} al carrito.`,
    );
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12} md={12} lg={12} className="mb-4">
          <Card
            className={`h-100 ${styles.card} ${destacado ? styles.dest : ""}`}
          >
            {destacado ? <div className={styles.destacado}>⭐</div> : ""}
            <Row>
              <Col xs={12} md={6} lg={6}>
                <Card.Img
                  variant="top"
                  src={imagen}
                  alt={nombre}
                  className={styles.imagen}
                />
              </Col>
              <Col xs={12} md={6} lg={6}>
                <Card.Body className="d-flex flex-column">
                  <div
                    className={styles.fav}
                    onClick={() => setEsFavorito(!esFavorito)}
                  >
                    {esFavorito ? "❤️" : "🖤"}
                  </div>

                  <Card.Title className={styles.nombre}>{nombre}</Card.Title>

                  <Card.Text className={styles.texto}>{descripcion}</Card.Text>

                  <Card.Text className={styles.precio}>$ {precio}</Card.Text>

                  <Card.Text className={styles.stock}>
                    Stock disponible: {stock}
                  </Card.Text>

                  {cantidadActual > 0 ? (
                    <Card.Text style={{ margin: "0 15px", fontWeight: "bold" }}>
                      Tienes {cantidadActual} agregadas en el carrito.
                    </Card.Text>
                  ) : (
                    ""
                  )}

                  {stock > 0 ? (
                    <Row>
                      <Col xs={12} md={3} lg={3} className="mb-4">
                        <div className={styles.cantidadContainer}>
                          <button
                            className={styles.btn}
                            onClick={() => setCantidad(cantidad - 1)}
                            disabled={cantidad <= 1}
                          >
                            -
                          </button>
                          <span className={styles.cantidad}>{cantidad}</span>
                          <button
                            className={styles.btn}
                            onClick={() => setCantidad(cantidad + 1)}
                            disabled={cantidad >= stock}
                          >
                            +
                          </button>
                        </div>
                      </Col>
                      <Col xs={12} md={9} lg={9} className="mb-4">
                        <Button
                          as={Link}
                          to={`/producto/${id}`}
                          variant="primary"
                          className="mt-auto w-100"
                          onClick={agregarAlCarrito}
                        >
                          Comprar
                        </Button>
                      </Col>
                    </Row>
                  ) : (
                    "Sin stock"
                  )}
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12} lg={12} className="mb-4">
          <BotonVerOtros as={Link} to="/productos" className="text-center">
            Ver otros productos
          </BotonVerOtros>
        </Col>
      </Row>
    </Container>
  );
}

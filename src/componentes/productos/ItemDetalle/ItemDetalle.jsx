import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLike } from "../../../context/LikeContext";
import { Helmet } from "react-helmet";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { MdFavorite } from "react-icons/md";
import { IoStar } from "react-icons/io5";
import styled from "styled-components";
import { formatoPrecio } from "../../../utils/formatoPrecio";

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

  //const [esFavorito, setEsFavorito] = useState(null);
  const { setMeGusta, chequeaSiMeGusta } = useLike();
  const handleMeGusta = (id) => {
    setMeGusta(parseInt(id));
  };

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
    border-color: var(--color-primary);
    color: var(--color-primary);
    text-decoration: none;

    &:hover {
      background-color: var(--color-primary);
      color: black;
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
          setProducto({ id: resp.docs[0].id, ...resp.docs[0].data() });
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
    //console.log(producto, cantidad);
    alert(
      `Has agregado ${cantidad} unidad${cantidad > 1 ? "es de" : " de"} ${nombre} al carrito.`,
    );
  };

  return (
    <>
      <Helmet>
        <title>TechStore | {nombre}</title>
        <meta
          name="description"
          content={`Detalles y precio del producto ${nombre}.`}
        />
      </Helmet>
      <Container className="mt-4">
        <Row>
          <Col xs={12} md={12} lg={12} className="mb-4">
            <Card
              className={`h-100 p-3 ${styles.card} ${destacado ? styles.dest : ""}`}
            >
              {destacado ? (
                <div className={styles.destacado}>
                  <IoStar
                    style={{
                      top: "5px",
                      position: "absolute",
                      left: "5px",
                    }}
                  />{" "}
                  DESTACADO
                </div>
              ) : (
                ""
              )}
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
                      role="button"
                      aria-label={
                        chequeaSiMeGusta(id)
                          ? "Quitar de favoritos"
                          : "Agregar a favoritos"
                      }
                      //onClick={() => setEsFavorito(!esFavorito)}
                      onClick={() => handleMeGusta(id)}
                    >
                      {chequeaSiMeGusta(parseInt(id)) ? (
                        <MdFavorite style={{ color: "var(--color-primary)" }} />
                      ) : (
                        <MdFavorite
                          style={{ color: "var(--color-disabled)" }}
                        />
                      )}
                    </div>

                    <Card.Title className={styles.nombre}>{nombre}</Card.Title>

                    <Card.Text className={styles.texto}>
                      {descripcion}
                    </Card.Text>

                    <Row>
                      <Col xs={12} lg={6}>
                        <div className={styles.precio}>
                          {formatoPrecio(precio)}
                          {stock > 0 ? (
                            <Card.Text className={styles.stock}>
                              Stock disponible: {stock}
                            </Card.Text>
                          ) : (
                            <Card.Text className={styles.stock}>
                              Sin stock
                            </Card.Text>
                          )}
                        </div>
                      </Col>
                      <Col
                        xs={12}
                        lg={6}
                        className="d-flex justify-content-end"
                      >
                        {cantidadActual > 0 ? (
                          <Link to="/carrito">
                            <Badge className="mb-2 bg-secondary">
                              Tienes {cantidadActual} en el carrito
                            </Badge>{" "}
                          </Link>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>

                    {stock > 0 ? (
                      <Row>
                        <Col xs={12} md={3} lg={3} className="mb-4">
                          <div className={styles.cantidadContainer}>
                            <button
                              className={styles.btn}
                              onClick={() => setCantidad(cantidad - 1)}
                              disabled={cantidad <= 1}
                              aria-label="Disminuir cantidad"
                            >
                              -
                            </button>
                            <span className={styles.cantidad}>{cantidad}</span>
                            <button
                              className={styles.btn}
                              onClick={() => setCantidad(cantidad + 1)}
                              disabled={cantidad >= stock}
                              aria-label="Aumentar cantidad"
                            >
                              +
                            </button>
                          </div>
                        </Col>
                        <Col xs={12} md={9} lg={9} className="mb-4">
                          <Button
                            as={Link}
                            variant="primary"
                            className="mt-auto w-100"
                            onClick={agregarAlCarrito}
                          >
                            Comprar
                          </Button>
                        </Col>
                      </Row>
                    ) : (
                      ""
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
    </>
  );
}

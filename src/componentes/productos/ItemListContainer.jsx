import ItemList from "./ItemList";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { Helmet } from "react-helmet";

//Firestore
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
} from "firebase/firestore";

import { db } from "../../firebase/config";

export default function ItemListContainer({
  titulo,
  destacados,
  buscador,
  paginacion = true,
}) {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  //const [mensaje, setMensaje] = useState(null);

  //Paginacion
  const [cargandoMas, setCargandoMas] = useState(false);
  const [ultimoVisible, setUltimoVisible] = useState(null);
  const [hayMas, setHayMas] = useState(true);
  const PRODUCTOS_POR_PAGINA = 6;

  /*

  PRODUCTOS CON PAGINACION
  
  */
  const obtenerProductosIniciales = () => {
    //setCargando(true);
    const productosDB = collection(db, "productos");
    const q = query(productosDB, limit(PRODUCTOS_POR_PAGINA));

    getDocs(q)
      .then((resp) => {
        setProductos(
          resp.docs.map((doc) => {
            //console.log(doc.data());
            return { id: doc.id, ...doc.data() };
          }),
        );

        const ultimoDoc = resp.docs[resp.docs.length - 1];
        setUltimoVisible(ultimoDoc);

        setHayMas(resp.docs.length === PRODUCTOS_POR_PAGINA);
      })
      .catch((error) => setError(error.message))
      .finally(() => setCargando(false));
  };

  /* Funcion para cargar la siguiente pagina */
  const obtenerMasProductos = () => {
    console.log("obtenerMasProductos: ", hayMas, cargandoMas);
    if (!hayMas || cargandoMas) return;

    setCargandoMas(true);
    const productosDB = collection(db, "productos");
    const q = query(
      productosDB,
      startAfter(ultimoVisible),
      limit(PRODUCTOS_POR_PAGINA),
    );

    getDocs(q)
      .then((resp) => {
        const productosData = resp.docs.map((doc) => {
          //console.log(doc.data());
          return { id: doc.id, ...doc.data() };
        });

        setProductos((productosAnteriores) => [
          ...productosAnteriores,
          ...productosData,
        ]);

        const ultimoDoc = resp.docs[resp.docs.length - 1];
        setUltimoVisible(ultimoDoc);

        setHayMas(resp.docs.length === PRODUCTOS_POR_PAGINA);
      })
      .catch((error) => setError(error.message))
      .finally(() => setCargandoMas(false));
  };

  /* Vuelve a llamar a la funcion que trae la primera pagina, reseteando el estado. */
  const verMenos = () => {
    obtenerProductosIniciales();
    // Opcional: Desplazar la vista hacia arriba
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    obtenerProductosIniciales();
    /* 
    
    TODOS LOS PRODUCTOS

    const productosDB = collection(db, "productos");

    getDocs(productosDB)
      .then((response) => {
        if (response.empty) throw new Error("Error al obtener los datos");

        //console.log(response);
        setProductos(
          response.docs.map((doc) => {
            //console.log(doc.data());
            return { id: doc.id, ...doc.data() };
          }),
        );
      })
      .catch((error) => setError(error.message))
      .finally(() => setCargando(false));

      */
    /*
    
    FETCH JSON

    fetch("/data/productos.json")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudo cargar el archivo de productos");
        }
        return respuesta.json();
      })
      .then((datos) => {
        setProductos(datos);
        setMensaje("Se han cargado los productos");
      })
      .catch((error) => {
        setError(error.message);
        setMensaje("Error al cargar el archivo");
      })
      .finally(() => setCargando(false));

  
      */
  }, []);

  if (cargando) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <Spinner
          animation="border"
          variant="primary"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }
  if (error) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh", color: "var(--color-secondary)" }}
      >
        Error: {error}
      </div>
    );
  }

  const productosAMostrar = destacados
    ? productos.filter((prod) => prod.destacado)
    : productos;

  //console.log(productosAMostrar);

  return (
    <>
      <Helmet>
        <title>TechStore | Productos</title>
        <meta
          name="description"
          content={`Los mejores productos para tu oficina y hogar.`}
        />
      </Helmet>
      <Container className="mt-4">
        <h1 className="page-title">{titulo}</h1>
        {/*console.log(mensaje)*/}
        <ItemList productos={productosAMostrar} buscador={buscador} />

        {/* Logica de renderizado para los botones --- */}
        {paginacion ? (
          <Row className="mt-4">
            <Col className="text-center d-flex justify-content-center gap-2">
              {/* El boton "Ver menos" solo aparece si hay mas de una pagina cargada */}
              {productos.length > PRODUCTOS_POR_PAGINA && (
                <Button variant="secondary" onClick={verMenos}>
                  Ver menos
                </Button>
              )}

              {/* Boton "Cargar mas" */}
              {hayMas ? (
                <Button onClick={obtenerMasProductos} disabled={cargandoMas}>
                  {cargandoMas ? (
                    <Spinner as="span" animation="border" size="sm" />
                  ) : (
                    "Cargar mas"
                  )}
                </Button>
              ) : (
                // No mostramos el alert si solo hay una pagina de resultados
                productos.length > PRODUCTOS_POR_PAGINA && (
                  <Alert variant="light" className="m-0">
                    No hay mas productos para mostrar.
                  </Alert>
                )
              )}
            </Col>
          </Row>
        ) : (
          ""
        )}
      </Container>
    </>
  );
}

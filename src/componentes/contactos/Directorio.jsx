import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet";

//Firestore
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

import styles from "./Directorio.module.css";
import { TarjetaContacto } from "./TarjetaContacto";

export function Directorio({ titulo }) {
  const [nosotros, setNosotros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const nosotrosDB = collection(db, "nosotros");

    getDocs(nosotrosDB)
      .then((response) => {
        if (response.empty) throw new Error("Error al obtener los datos");

        //console.log(response);
        setNosotros(
          response.docs.map((doc) => {
            //console.log(doc.data());
            return { ...doc.data(), id: doc.id };
          }),
        );
      })
      .catch((error) => setError(error.message))
      .finally(() => setCargando(false));

    /*
    fetch("/data/nosotros.json")
      .then((response) => {
        if (!response.ok) throw new Error("Error al leer archivo");
        return response.json();
      })
      .then((json) => {
        //console.log(json);
        setNosotros(json);
      })
      .catch((error) => setError(error.message))
      .finally(() => {
        setCargando(false);
      });
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

  return (
    <>
      <Helmet>
        <title>TechStore | Nosotros</title>
        <meta
          name="description"
          content={`Nuestro equipo está conformado por un grupo de profesionales.`}
        />
      </Helmet>
      <Container className="mt-4">
        <Row>
          <Col xs={12} md={12} lg={12} className="mb-4">
            <h1 className="page-title">{titulo}</h1>
            <section className={styles.texto}>
              <p>
                <strong>Tech Store</strong> es una empresa dedicada a la
                importación y distribución de tecnología.
              </p>
              <p>
                Nuestro equipo está conformado por un grupo de profesionales
                encargados de que puedas lograr tus objetivos.
              </p>
            </section>
            <div className={styles.directorio}>
              {nosotros.map((person) => (
                <TarjetaContacto key={person.id} {...person} />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

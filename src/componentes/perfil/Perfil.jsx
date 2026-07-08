import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useAuth } from "../../context/AuthContext";
import styles from "./Perfil.module.css";

export function Perfil() {
  const { user } = useAuth();

  return (
    <>
      <Helmet>
        <title>TechStore | Perfil</title>
        <meta
          name="description"
          content={`Nuestro equipo está conformado por un grupo de profesionales.`}
        />
      </Helmet>
      <Container className="mt-4">
        <Row>
          <Col xs={12} md={12} lg={12} className="mb-4">
            <h1 className={`page-title ${styles.titulo}`}>Perfil</h1>
            <section className={styles.texto}>
              <p>Gracias por ser parte de TechStore</p>
              <p>
                Ingresa a tus opciones en el menu{" "}
                <strong style={{ textTransform: "uppercase" }}>
                  {user.rol || user.email.split("@")[0]}
                </strong>
              </p>
            </section>
          </Col>
        </Row>
      </Container>
    </>
  );
}

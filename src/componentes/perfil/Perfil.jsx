import { Container, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { FaUserAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import profileImage from "../../../public/images/profile-image.png";
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
            <Row>
              <Col xs={12} md={4}>
                <img src={profileImage} className="pb-4" />
              </Col>
              <Col xs={12} md={8}>
                <section className={styles.texto}>
                  <h2 className={styles.subtitulo}>Bienvenido {user.email}!</h2>
                  <p>
                    Accede a tus secciones exclusivas desde el menu{" "}
                    <FaUserAlt />{" "}
                    <strong style={{ textTransform: "uppercase" }}>
                      {user.email.split("@")[0]}
                    </strong>
                  </p>
                </section>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

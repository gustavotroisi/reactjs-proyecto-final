import ItemListContainer from "../productos/ItemListContainer";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import styles from "./Inicio.module.css";
import homeImage from "../../../public/images/home_imagen.png";

export default function Inicio() {
  return (
    <>
      <Helmet>
        <title>TechStore</title>
        <meta
          name="description"
          content={`Equipos y accesorios de computación. Los mejores precios, la mejor atención.`}
        />
      </Helmet>
      <section
        style={{
          backgroundColor: "var(--color-bg)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "56px 0 48px",
        }}
      >
        <Container>
          <Row className="align-items-center g-4">
            <Col xs={12} lg={7}>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "var(--color-primary)",
                  marginBottom: "16px",
                }}
              >
                Tecnología de punta
              </p>

              <h1
                style={{
                  fontSize: "clamp(32px, 5vw, 46px)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  color: "#ffffff",
                  marginBottom: "16px",
                }}
              >
                Tu próximo setup,{" "}
                <span style={{ color: "#00C2FF" }}>al mejor precio</span>
              </h1>

              <p
                style={{
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.75,
                  marginBottom: "32px",
                  maxWidth: "420px",
                }}
              >
                Equipos y accesorios de computación. Los mejores precios, la
                mejor atención.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <Button
                  href="/productos"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    borderColor: "var(--color-primary)",
                    color: "var(--color-bg)",
                    fontWeight: 700,
                    fontSize: "14px",
                    padding: "11px 26px",
                    borderRadius: "8px",
                  }}
                >
                  Ver productos
                </Button>

                <Button
                  variant="outline-light"
                  href="/nosotros"
                  style={{
                    borderColor: "rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,0.6)",
                    fontWeight: 400,
                    fontSize: "14px",
                    padding: "11px 26px",
                    borderRadius: "8px",
                    backgroundColor: "transparent",
                  }}
                >
                  Conocenos
                </Button>
              </div>
            </Col>

            <Col xs={12} lg={5}>
              <Row className="g-3 justify-content-lg-end">
                <Col>
                  <img
                    src={homeImage}
                    alt="Imagen de inicio"
                    className={styles.homeImage}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      <ItemListContainer
        titulo="Productos Destacados"
        destacados={true}
        buscador={false}
      />
    </>
  );
}

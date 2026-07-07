import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Helmet } from "react-helmet";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./Registro.module.css";

const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [quiereLoguearse, setQuiereLoguearse] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reseteamos cualquier error previo
    setQuiereLoguearse(false); // Reseteamos la bandera de querer loguearse

    const errorCodes = {
      "auth/invalid-email": "El correo electrónico no es válido.",
      "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
    };
    try {
      // Intentamos crear el nuevo usuario en Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      // Si la creación es exitosa, lo redirigimos al inicio
      // Firebase ya gestiona el estado de sesión automáticamente
      navigate("/");
    } catch (error) {
      // Aquí es donde manejamos el caso específico que nos interesa
      if (error.code === "auth/email-already-in-use") {
        // Usamos window.confirm para hacer la pregunta al usuario
        setQuiereLoguearse(true);
      } else {
        // Para cualquier otro error (contraseña débil, email inválido, etc.),
        // mostramos un mensaje genérico.
        //console.log(error.code);
        setError(
          `Error en el registro: ${errorCodes[error.code] || error.message}`,
        );
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>TechStore | Login</title>
      </Helmet>
      <Container className="mt-4 mx-auto">
        <Row>
          <Col xs={12} md={8} lg={8} className="mb-4 mx-auto">
            <h2 className={`page-title ${styles.titulo}`}>Crear cuenta</h2>
            <form onSubmit={handleSubmit} className={styles.formregistro}>
              <Container>
                <Row>
                  <Col
                    xs={12}
                    className="mb-3 w-fit d-flex justify-content-center"
                  >
                    <Row>
                      <Col>
                        <label className="text-center">
                          Correo Electrónico
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setError(null);
                            setQuiereLoguearse(false);
                            setEmail(e.target.value);
                          }}
                          className="form-control"
                          disabled={loading}
                          required
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col
                    xs={12}
                    className="mb-3 w-fit d-flex justify-content-center"
                  >
                    <Row>
                      <Col>
                        <label className="text-center">
                          Contraseña (mínimo 6 caracteres)
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => {
                            setError(null);
                            setQuiereLoguearse(false);
                            setPassword(e.target.value);
                          }}
                          className="form-control"
                          disabled={loading}
                          required
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                {quiereLoguearse && (
                  <Row>
                    <Col className="mb-3 d-flex justify-content-center">
                      <p className={styles.quiereLoguearse}>
                        El correo electrónico ya está registrado.{" "}
                        <Link to="/login">¿Desea iniciar sesión?</Link>
                      </p>
                    </Col>
                  </Row>
                )}
                {error && (
                  <Row>
                    <Col className="mb-3 d-flex justify-content-center">
                      <p className={styles.errorMessage}>{error}</p>
                    </Col>
                  </Row>
                )}
                <Row>
                  <Col
                    xs={12}
                    className="mb-3 w-fit d-flex justify-content-center"
                  >
                    <Button
                      disabled={loading}
                      aria-label="Registrarse"
                      type="submit"
                    >
                      Registrarse
                    </Button>
                  </Col>
                </Row>
              </Container>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Registro;

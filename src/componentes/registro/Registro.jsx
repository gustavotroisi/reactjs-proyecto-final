import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Helmet } from "react-helmet";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./Registro.module.css";

const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reseteamos cualquier error previo

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
        const quiereLoguearse = window.confirm(
          "Este correo electrónico ya está registrado. ¿Desea intentar iniciar sesión?",
        );
        if (quiereLoguearse) {
          // Si el usuario confirma, lo redirigimos a la página de login;
          navigate("/login");
        } else {
          // Si el usuario cancela, lo redirigimos a la página de inicio;
          navigate("/");
        }
      } else {
        // Para cualquier otro error (contraseña débil, email inválido, etc.),
        // mostramos un mensaje genérico.
        setError(
          "Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente.",
        );
        console.error("Error en el registro:", error.message);
      }
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
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
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
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control"
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
                    {error && <p className="error-message">{error}</p>}
                    <Button type="submit">Registrarse</Button>
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

import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const errorCodes = {
    "auth/invalid-credential": "Las credenciales son incorrectas.",
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuario logueado:", user);
        //alert("¡Inicio de sesión exitoso!");
        toast.success("Inicio de sesión exitoso! Serás redirigido...", {
          onClose: () => navigate("/perfil"),
        });
      })
      .catch((error) => {
        //const errorCode = error.code;
        //const errorMessage = error.message;
        //console.error("Error en el login:", errorCode, errorMessage);
        //alert("Error: " + errorMessage);
        toast.error(
          `Error al intentar acceder: ${errorCodes[error.code] || error.message}`,
        );
        setLoading(false);
      });
  };
  return (
    <>
      <Helmet>
        <title>TechStore | Login</title>
      </Helmet>
      <ToastContainer />
      <Container className="mt-4 mx-auto">
        <Row>
          <Col xs={12} md={8} lg={8} className="mb-4 mx-auto">
            <h2 className={`page-title ${styles.titulo}`}>Iniciar Sesión</h2>
            <form onSubmit={handleLogin} className={styles.formlogin}>
              <Container>
                <Row>
                  <Col
                    xs={12}
                    className="mb-3 w-fit d-flex justify-content-center"
                  >
                    <Row>
                      <Col>
                        <label className="text-center">
                          Correo electrónico
                        </label>
                        <input
                          type="email"
                          value={email}
                          className="form-control"
                          onChange={(e) => setEmail(e.target.value)}
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
                        <label className="text-center">Contraseña</label>
                        <input
                          type="password"
                          value={password}
                          className="form-control"
                          onChange={(e) => setPassword(e.target.value)}
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
                    <Button
                      aria-label="Ingresar"
                      disabled={loading}
                      type="submit"
                    >
                      Ingresar
                    </Button>
                  </Col>
                </Row>
              </Container>
            </form>
            <p
              style={{ textAlign: "center", marginTop: "10px", color: "white" }}
            >
              ¿No tenés una cuenta?{" "}
              <Link
                to="/registro"
                aria-label="Registrate aquí"
                style={{ color: "var(--color-primary)" }}
              >
                Registrate aquí
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Login;

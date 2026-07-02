import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { FaFloppyDisk } from "react-icons/fa6";
import styles from "./GestionCupones.module.css";

const GestionCupones = () => {
  const [cupones, setCupones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [modalEliminar, setModalEliminar] = useState({ show: false, id: null });

  const obtenerCupones = async () => {
    //Read

    try {
      const respuesta = await getDocs(collection(db, "cupones"));

      const lista = respuesta.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCupones(lista);
    } catch (error) {
      console.error("Error al obtener los cupones:", error);
      alert("Ocurrió un error al cargar los cupones.");
    }
  };

  useEffect(() => {
    obtenerCupones();
  }, []);

  const manejarEnvio = async (e) => {
    e.preventDefault();
  };

  const handleDelete = (idFirestore) => {
    setModalEliminar({ show: true, idFirestore });
  };

  const confirmarEliminar = async () => {
    const docRef = doc(db, "productos", modalEliminar.idFirestore);
    await deleteDoc(docRef);
    //setProductos(productos.filter((prod) => prod.id !== modalEliminar.id));
    await obtenerCupones();
    //resetForm();
    setModalEliminar({ show: false, id: null });
  };

  return (
    <>
      <Helmet>
        <title>TechStore | Gestión</title>
      </Helmet>
      <Container className="mt-4">
        <Row>
          <Col xs={12} md={12} className="mb-4 mx-auto">
            <Row>
              <Col xs={12} md={6}>
                <h1 className={`page-title ${styles.titulo}`}>
                  Gestión de Cupones
                </h1>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <form onSubmit={manejarEnvio} className={styles.formcupones}>
            <h3 className={`${styles.titulo} mb-4`}> Agregar Nuevo Cupón</h3>

            <Container>
              <Row>
                <Col xs={12} md={8}>
                  <div>
                    <label>Código</label>
                    <input
                      type="text"
                      placeholder="Ej: INVIERNO25"
                      name="codigo"
                      value={cupones.codigo}
                      className={`form-control ${styles.input}`}
                      required
                    />
                  </div>
                </Col>

                <Col xs={12} md={4}>
                  <div>
                    <label>Porcentaje</label>
                    <div className="input-group mb-3">
                      <input
                        type="number"
                        placeholder="Ej: 25"
                        name="porcentaje"
                        value={cupones.porcentaje}
                        className="form-control"
                        min="1"
                        required
                      />{" "}
                      <span className="input-group-text">%</span>
                    </div>
                  </div>
                </Col>
              </Row>
              {mensaje && (
                <div className={`alert alert-${mensaje.tipo} text-center`}>
                  {mensaje.texto}
                </div>
              )}
              <Row className="mt-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={loading}
                  aria-label="Enviar formulario"
                >
                  <FaFloppyDisk style={{ marginRight: "5px" }} />
                  Guardar Cupón
                </button>
              </Row>
            </Container>
          </form>
        </Row>

        <Row>
          <h1 className="page-title">Listado de Cupones</h1>
          <table className={styles.gestionTable}>
            <thead>
              <tr>
                <th>Código</th>
                <th>Porcentaje</th>
                <th className={styles.acciones}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cupones.map((cupon) => (
                <tr key={cupon.id}>
                  <td className="text-center">{cupon.codigo}</td>

                  <td className="text-center">{cupon.porcentaje} %</td>
                  <td className="text-center">
                    <Button
                      onClick={() => handleDelete(cupon.id)}
                      variant="danger"
                      className="my-2"
                      aria-label="Eliminar cupón"
                    >
                      <FaTrash style={{ marginRight: "5px" }} /> Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Row>

        {/* Modal Eliminar */}
        <Modal
          centered
          data-bs-theme="dark"
          show={modalEliminar.show}
          onHide={() => setModalEliminar({ show: false, id: null })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmar eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Está seguro de que desea eliminar el cupón{" "}
            <strong>ID: {modalEliminar.id}</strong>?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setModalEliminar({ show: false, id: null })}
            >
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmarEliminar}>
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};
export default GestionCupones;

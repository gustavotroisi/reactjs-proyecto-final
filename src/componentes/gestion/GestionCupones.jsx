import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { FaTrash } from "react-icons/fa";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { FaFloppyDisk } from "react-icons/fa6";
import styles from "./GestionCupones.module.css";

const GestionCupones = () => {
  const estadoInicialForm = {
    codigo: "",
    porcentaje: "",
  };

  const [datosForm, setDatosForm] = useState(estadoInicialForm);
  const [cupones, setCupones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [modalEliminar, setModalEliminar] = useState({
    show: false,
    id: null,
    codigo: null,
  });

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
      toast.error("Ocurrió un error al cargar los cupones.");
    }
  };

  useEffect(() => {
    obtenerCupones();
  }, []);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    let nuevoValor;
    if (name == "porcentaje") {
      nuevoValor = parseInt(value, 10);
    } else if (name == "codigo") {
      nuevoValor = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    }
    setDatosForm({ ...datosForm, [name]: nuevoValor });
    console.log(datosForm);
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    //console.log(datosForm);

    if (datosForm.codigo.trim() === "" || datosForm.porcentaje <= 0) {
      setMensaje({
        texto:
          "Por favor complete todos los campos y asegúrese de que el stock sea mayor que cero",
        tipo: "danger",
      });
      setTimeout(() => setMensaje(null), 2000);
      return;
    }
    setLoading(true);

    try {
      const cuponCollection = collection(db, "cupones");
      await addDoc(cuponCollection, datosForm);

      await obtenerCupones();
      setDatosForm(estadoInicialForm); //reset
      setMensaje({
        texto: "Cupón guardado con éxito",
        tipo: "success",
      });
    } catch (e) {
      setMensaje({
        texto: "Error al enviar el cupón",
        tipo: "danger",
      });
      console.log("Error: ", e);
    } finally {
      //console.log(datosForm);
      setLoading(false);
      setTimeout(() => setMensaje(null), 2000);
    }
  };

  const handleDelete = (idFirestore, codigo) => {
    setModalEliminar({ show: true, id: idFirestore, codigo: codigo });
  };

  const confirmarEliminar = async () => {
    const docRef = doc(db, "cupones", modalEliminar.id);
    await deleteDoc(docRef);
    await obtenerCupones();
    toast.success("Cupón eliminado con éxito.");
    //resetForm();
    setModalEliminar({ show: false, id: null, codigo: null });
  };

  return (
    <>
      <Helmet>
        <title>TechStore | Gestión</title>
      </Helmet>
      <ToastContainer />
      <Container className="mt-4">
        <Row>
          <Col xs={12} md={12} className="mb-4 mx-auto">
            <Row>
              <Col>
                <h1 className={`page-title `}>Gestión de Cupones</h1>

                <form onSubmit={manejarEnvio} className={styles.formcupones}>
                  <h3 className={`${styles.titulo} mb-4`}>
                    {" "}
                    Agregar Nuevo Cupón
                  </h3>

                  <Container>
                    <Row>
                      <Col xs={12} md={8}>
                        <div>
                          <label>Código</label>
                          <input
                            type="text"
                            placeholder="Ej: INVIERNO25"
                            name="codigo"
                            value={datosForm.codigo}
                            className={`form-control ${styles.input}`}
                            required
                            onChange={manejarCambio}
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
                              value={datosForm.porcentaje}
                              className="form-control"
                              min="1"
                              max="100"
                              required
                              onChange={manejarCambio}
                            />{" "}
                            <span className="input-group-text">%</span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    {mensaje && (
                      <div
                        className={`alert alert-${mensaje.tipo} text-center`}
                      >
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

                <h1 className="page-title">Listado de Cupones</h1>
                {cupones.length == 0 ? (
                  <p className="text-center text-white">
                    No hay cupones disponibles.
                  </p>
                ) : (
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
                              onClick={() =>
                                handleDelete(cupon.id, cupon.codigo)
                              }
                              variant="danger"
                              className="my-2"
                              aria-label="Eliminar cupón"
                            >
                              <FaTrash style={{ marginRight: "5px" }} />{" "}
                              Eliminar
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Modal Eliminar */}
        <Modal
          centered
          data-bs-theme="dark"
          show={modalEliminar.show}
          onHide={() =>
            setModalEliminar({ show: false, id: null, codigo: null })
          }
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmar eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Está seguro de que desea eliminar el cupón
            <strong> {modalEliminar.codigo}</strong>?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() =>
                setModalEliminar({ show: false, id: null, codigo: null })
              }
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

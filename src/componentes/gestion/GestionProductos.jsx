import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import FormularioContainer from "../formularioProductos/FormularioContainer";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { formatoPrecio } from "../../utils/formatoPrecio";
import { Helmet } from "react-helmet";
import styles from "./GestionProductos.module.css";

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [modalEliminar, setModalEliminar] = useState({ show: false, id: null });
  /*
  const estadoInicialForm = {
    nombre: "",
    categoria: "",
    precio: 0,
    stock: 0,
    imagen: "",
  };
  */

  useEffect(() => {
    const cargarProductos = async () => {
      const productosRef = collection(db, "productos");
      const resp = await getDocs(productosRef);
      //setProductos(resp.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setProductos(
        resp.docs.map((doc) => ({
          //id: doc.id,
          ...doc.data(),
          idFirestore: doc.id,
        })),
      );
    };
    cargarProductos();
  }, []);

  /*/*
  const handleDelete = async (id) => {
    const confirmacion = window.confirm(
      `¿Está seguro de que desea eliminar el producto con ID: ${id} ? `,
    );
    if (confirmacion) {
      const docRef = doc(db, "productos", id);
      await deleteDoc(docRef);
      setProductos(productos.filter((prod) => prod.id !== id));
      alert("Producto eliminado.");
    }
  };
  */
  const handleDelete = (idFirestore) => {
    setModalEliminar({ show: true, idFirestore });
  };

  const confirmarEliminar = async () => {
    const docRef = doc(db, "productos", modalEliminar.idFirestore);
    await deleteDoc(docRef);
    setProductos(productos.filter((prod) => prod.id !== modalEliminar.id));
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
            <h1 className={`page-title ${styles.titulo}`}>
              Gestión de Productos
            </h1>

            <FormularioContainer />

            <h1 className="page-title">Listado de Productos</h1>
            <table className={styles.gestionTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th className={styles.acciones}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((prod) => (
                  <tr key={prod.id}>
                    <td>{prod.id}</td>
                    <td>{prod.nombre}</td>
                    <td style={{ textAlign: "right" }}>
                      {formatoPrecio(prod.precio)}
                    </td>
                    <td className={styles.acciones}>
                      <Button
                        onClick={() =>
                          alert(`Editar producto con ID: ${prod.id}`)
                        }
                        variant="primary"
                        className="my-2"
                        style={{ marginRight: "10px" }}
                      >
                        <FaEdit style={{ marginRight: "5px" }} /> Editar
                      </Button>
                      <Button
                        onClick={() => handleDelete(prod.idFirestore)}
                        variant="danger"
                        className="my-2"
                      >
                        <FaTrash style={{ marginRight: "5px" }} /> Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
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
            ¿Está seguro de que desea eliminar el producto{" "}
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
export default GestionProductos;

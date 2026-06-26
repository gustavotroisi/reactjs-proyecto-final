import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import FormularioContainer from "../FormularioProductos/FormularioContainer";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./GestionProductos.module.css";

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
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
      setProductos(resp.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    cargarProductos();
  }, []);

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

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12} md={8} lg={8} className="mb-4 mx-auto">
          <h2 className={styles.titulo}>Gestión de Productos</h2>
          <hr />
          <FormularioContainer />
          <hr />
          <h3 className={styles.subtitulo}>Listado de Productos</h3>
          <table className={styles.gestionTable}>
            <thead>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </thead>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td style={{ textAlign: "right" }}>{prod.id}</td>
                <td>{prod.nombre}</td>
                <td style={{ textAlign: "right" }}>$ {prod.precio}</td>
                <td>
                  <Button
                    onClick={() => alert(`Editar producto con ID: ${prod.id}`)}
                    variant="primary"
                    className="my-2"
                    style={{ marginRight: "10px" }}
                  >
                    <FaEdit style={{ marginRight: "5px" }} /> Editar
                  </Button>
                  <Button
                    onClick={() => handleDelete(prod.id)}
                    variant="danger"
                    className="my-2"
                  >
                    <FaTrash style={{ marginRight: "5px" }} /> Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </table>
        </Col>
      </Row>
    </Container>
  );
};
export default GestionProductos;

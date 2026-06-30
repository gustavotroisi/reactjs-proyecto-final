import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import {
  //getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import FormularioProductos from "../formularioProductos/FormularioProductos";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { formatoPrecio } from "../../utils/formatoPrecio";
import { Helmet } from "react-helmet";
import styles from "./GestionProductos.module.css";

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [modalEliminar, setModalEliminar] = useState({ show: false, id: null });

  const estadoInicialForm = {
    categoria: "",
    descripcion: "",
    destacado: false,
    id: "",
    nombre: "",
    precio: "",
    stock: "",
  };

  const [datosForm, setDatosForm] = useState(estadoInicialForm);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  //const [imagenFile, setImagenFile] = useState(null);
  const [productoAEditar, setProductoAEditar] = useState(null);

  const modoEdicion = productoAEditar !== null;

  const cargarProductos = async () => {
    const productosRef = collection(db, "productos");
    const resp = await getDocs(productosRef);
    //setProductos(resp.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setProductos(
      resp.docs.map((doc) => ({
        ...doc.data(),
        idFirestore: doc.id,
      })),
    );
  };

  const handleDelete = (idFirestore) => {
    setModalEliminar({ show: true, idFirestore });
  };

  const confirmarEliminar = async () => {
    const docRef = doc(db, "productos", modalEliminar.idFirestore);
    await deleteDoc(docRef);
    //setProductos(productos.filter((prod) => prod.id !== modalEliminar.id));
    await cargarProductos();
    setModalEliminar({ show: false, id: null });
  };

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    //console.log(name, value);
    //setdatosForm({ ...datosForm, [name]: value });
    let nuevoValor = value;
    if (type === "checkbox") nuevoValor = checked;
    if (type === "number") {
      nuevoValor =
        value === ""
          ? ""
          : name === "precio"
            ? parseFloat(value)
            : parseInt(value, 10);
    }
    setDatosForm({ ...datosForm, [name]: nuevoValor });
  };

  const manejarCambioImagen = (e) => {
    setImageFile(e.target.files[0]);
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      //alert("Por favor seleccione una imagen");
      setMensaje({ texto: "Por favor seleccione una imagen", tipo: "danger" });
      return;
    }

    setLoading(true);

    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

    const formData = new FormData();
    formData.append("image", imageFile);
    //console.log("Envio realizado");

    try {
      const respuestaImgbb = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        },
      );

      //console.log(respuestaImgbb);

      const datosImgbb = await respuestaImgbb.json();

      //console.log(datosImgbb);

      if (datosImgbb.success) {
        const productoCompleto = {
          ...datosForm,
          imagen: datosImgbb.data.url,
        };
        //console.log("Imagen enviada: ", productoCompleto);

        try {
          //console.log("Enviando producto a Firebase:", productoCompleto);
          // Obtenemos la instancia de la base de datos
          //const db = getFirestore();
          // Apuntamos a la colección "productos" (si no existe, se crea)
          const productosCollection = collection(db, "productos");
          // Agregamos el nuevo documento a la colección
          await addDoc(productosCollection, productoCompleto);
          await cargarProductos();
          setDatosForm(estadoInicialForm);
          //setImagenFile(null);
        } catch (e) {
          setMensaje({ texto: "Error al enviar el producto", tipo: "danger" });
          console.log("Error: ", e);
        }
      } else {
        setMensaje({ texto: "Error al enviar la imagen", tipo: "danger" });
        throw new Error("Error al enviar imagen");
      }

      setMensaje({ texto: "Producto guardado con éxito", tipo: "success" });
      //resetForm();
    } catch (e) {
      setMensaje({ texto: "Error al subir la imagen", tipo: "danger" });
      console.log("Error: ", e);
    } finally {
      setLoading(false);
      setTimeout(() => setMensaje(null), 4000);
    }
  };

  const manejarEditar = (producto) => {
    //console.log(producto);
    setProductoAEditar(producto);
    setDatosForm(producto);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

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

            <FormularioProductos
              datosForm={datosForm}
              manejarCambio={manejarCambio}
              manejarEnvio={manejarEnvio}
              manejarCambioImagen={manejarCambioImagen}
              loading={loading}
              mensaje={mensaje}
              modoEdicion={modoEdicion}
            />

            <h1 className="page-title">Listado de Productos</h1>
            <table className={styles.gestionTable}>
              <thead>
                <tr>
                  <th>Id #</th>
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
                        onClick={() => manejarEditar(prod)}
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

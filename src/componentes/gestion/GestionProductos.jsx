import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import {
  //getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import FormularioProductos from "../formularioProductos/FormularioProductos";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { formatoPrecio } from "../../utils/formatoPrecio";
import { Helmet } from "react-helmet";
import styles from "./GestionProductos.module.css";

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);
  const [modalEliminar, setModalEliminar] = useState({ show: false, id: null });
  const [keyInputFile, setKeyInputFile] = useState(0);

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
  const [imagenFile, setImagenFile] = useState(null);
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
    resetForm();
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
    setImagenFile(e.target.files[0]);
  };

  const resetForm = () => {
    setDatosForm(estadoInicialForm);
    setImagenFile(null);
    setProductoAEditar(null);
    setKeyInputFile((prev) => prev + 1);
  };
  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!imagenFile && !productoAEditar) {
      //alert("Por favor seleccione una imagen");
      setMensaje({ texto: "Por favor seleccione una imagen", tipo: "danger" });
      setTimeout(() => setMensaje(null), 2000);
      return;
    }

    if (
      datosForm.nombre.trim() === "" ||
      datosForm.precio <= 0 ||
      datosForm.precio <= 0 ||
      datosForm.stock <= 0
    ) {
      setMensaje({
        texto:
          "Por favor complete todos los campos y asegúrese de que el precio y el stock sean mayores que cero",
        tipo: "danger",
      });
      setTimeout(() => setMensaje(null), 2000);
      return;
    }
    setLoading(true);

    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

    const formData = new FormData();
    formData.append("image", imagenFile);

    let urlImagen = datosForm.imagen;

    //Solo si se sube una nueva imagen
    if (imagenFile) {
      formData.append("image", imagenFile);
      //console.log("Envio realizado");

      /* 
      Imagen 
      */
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
          urlImagen = datosImgbb.data.url;
          console.log("Imagen enviada");
        } else {
          //setMensaje({ texto: "Error al enviar la imagen", tipo: "danger" });
          throw new Error("Error al enviar imagen");
        }

        //resetForm();
      } catch (e) {
        setMensaje({ texto: "Error al enviar la imagen", tipo: "danger" });
        console.log("Error: ", e);
      } finally {
        setLoading(false);
        setTimeout(() => setMensaje(null), 2000);
      }
    }

    console.log("urlImagen: ".urlImagen);

    /* 
      Producto 
    */
    const productoCompleto = {
      ...datosForm,
      imagen: urlImagen,
    };

    setLoading(true);

    try {
      //console.log("Enviando producto a Firebase:", productoCompleto);
      // Obtenemos la instancia de la base de datos
      //const db = getFirestore();
      // Apuntamos a la colección "productos" (si no existe, se crea)
      //const productosCollection = collection(db, "productos");
      // Agregamos el nuevo documento a la colección

      if (productoAEditar) {
        const docRef = doc(db, "productos", productoAEditar.idFirestore);

        await updateDoc(docRef, productoCompleto);
        //alert("Producto actualizado correctamente");
      } else {
        //await addDoc(productosCollection, productoCompleto);
        const productosCollection = collection(db, "productos");
        await addDoc(productosCollection, productoCompleto);
      }
      await cargarProductos();
      resetForm();
      setMensaje({
        texto: `Producto ${modoEdicion ? "actualizado" : "guardado"} con éxito `,
        tipo: "success",
      });
    } catch (e) {
      setMensaje({
        texto: "Error al enviar el producto",
        tipo: "danger",
      });
      console.log("Error: ", e);
    } finally {
      console.log(productoCompleto);
      setLoading(false);
      setTimeout(() => setMensaje(null), 2000);
    }
  };

  const manejarEditar = (producto) => {
    //console.log(producto);
    setProductoAEditar(producto);
    setDatosForm(producto);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            <Row>
              <Col xs={12} md={6}>
                <h1 className={`page-title ${styles.titulo}`}>
                  Gestión de Productos
                </h1>
              </Col>
              <Col
                xs={12}
                md={6}
                className="d-flex justify-content-end align-items-center"
              >
                {modoEdicion ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      resetForm();
                    }}
                    aria-label="Crear nuevo producto"
                  >
                    <MdOutlineLibraryAdd /> Crear Nuevo
                  </button>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <FormularioProductos
              datosForm={datosForm}
              manejarCambio={manejarCambio}
              manejarEnvio={manejarEnvio}
              manejarCambioImagen={manejarCambioImagen}
              loading={loading}
              mensaje={mensaje}
              modoEdicion={modoEdicion}
              keyInputFile={keyInputFile}
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
                        aria-label="Editar producto"
                      >
                        <FaEdit style={{ marginRight: "5px" }} /> Editar
                      </Button>
                      <Button
                        onClick={() => handleDelete(prod.idFirestore)}
                        variant="danger"
                        className="my-2"
                        aria-label="Eliminar producto"
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

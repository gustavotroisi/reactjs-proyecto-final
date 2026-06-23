import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import FormularioContainer from "../FormularioProductos/FormularioContainer";
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
      "¿Está seguro de que desea eliminar este producto ? ",
    );
    if (confirmacion) {
      const docRef = doc(db, "productos", id);
      await deleteDoc(docRef);
      setProductos(productos.filter((prod) => prod.id !== id));
      alert("Producto eliminado.");
    }
  };

  return (
    <div>
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
              <button
                onClick={() => handleDelete(prod.id)}
                className="btn btn-danger"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
export default GestionProductos;

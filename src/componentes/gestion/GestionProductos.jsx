import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import FormularioContainer from "../FormularioProductos/FormularioContainer";

const GestionProductos = () => {
  const [productos, setProductos] = useState([]);

  const estadoInicialForm = {
    nombre: "",
    categoria: "",
    precio: 0,
    stock: 0,
    imagen: "",
  };

  useEffect(() => {
    const cargarProductos = async () => {
      const productosRef = collection(db, "productos");
      const resp = await getDocs(productosRef);
      setProductos(resp.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
      <h2>Gestión de Productos</h2>
      <hr />
      <FormularioContainer />
      <hr />
      <h3>Lista de Productos</h3>
      <table>
        {productos.map((prod) => (
          <tr key={prod.id}>
            <td>{prod.nombre}</td>
            <td>
              {" "}
              ${prod.precio}
              {/*acá agregamos los botones de acción */}
            </td>
            <td>
              {" "}
              <button
                onClick={() => handleDelete(prod.id)}
                style={{ marginLeft: "10px" }}
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

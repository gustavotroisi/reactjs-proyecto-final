import FormularioProductos from "./FormularioProductos";
import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export default function FormularioContainer() {
  const [datosForm, setdatosForm] = useState({
    categoria: "",
    descripcion: "",
    destacado: false,
    id: "",
    nombre: "",
    precio: "",
    stock: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [fileKey, setFileKey] = useState(0);

  const manejarCambio = (e) => {
    /*let elem = e.target.name;
    let val = e.target.value;
    */
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
    setdatosForm({ ...datosForm, [name]: nuevoValor });
    //console.log(datosForm);
  };

  const manejarCambioImagen = (e) => {
    setImageFile(e.target.files[0]);
  };

  const resetForm = () => {
    setdatosForm({
      categoria: "",
      descripcion: "",
      destacado: false,
      id: "",
      nombre: "",
      precio: "",
      stock: "",
    });
    setImageFile(null);
    setFileKey((prev) => prev + 1);
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
          const db = getFirestore();
          // Apuntamos a la colección "productos" (si no existe, se crea)
          const productosCollection = collection(db, "productos");
          // Agregamos el nuevo documento a la colección
          await addDoc(productosCollection, productoCompleto);
        } catch (e) {
          setMensaje({ texto: "Error al enviar el producto", tipo: "danger" });
          console.log("Error: ", e);
        }
      } else {
        setMensaje({ texto: "Error al enviar la imagen", tipo: "danger" });
        throw new Error("Error al enviar imagen");
      }

      setMensaje({ texto: "Producto guardado con éxito", tipo: "success" });
      resetForm();
    } catch (e) {
      setMensaje({ texto: "Error al subir la imagen", tipo: "danger" });
      console.log("Error: ", e);
    } finally {
      setLoading(false);
      setTimeout(() => setMensaje(null), 4000);
    }
  };

  return (
    <FormularioProductos
      datosForm={datosForm}
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
      manejarCambioImagen={manejarCambioImagen}
      loading={loading}
      mensaje={mensaje}
      fileKey={fileKey}
    />
  );
}

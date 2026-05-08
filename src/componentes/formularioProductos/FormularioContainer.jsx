import FormularioProductos from "./FormularioProductos";
import { useState } from "react";

export default function FormularioContainer() {
  const [datosForm, setdatosForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const manejarCambio = (e) => {
    /*let elem = e.target.name;
    let val = e.target.value;
    */
    const { name, value } = e.target;
    //console.log(name, value);
    setdatosForm({ ...datosForm, [name]: value });
    //console.log(datosForm);
  };

  const manejarCambioImagen = (e) => {
    setImageFile(e.target.files[0]);
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Por favor seleccione una imagen");
      return;
    }

    setLoading(true);

    const apiKey = "f15a13482952f9419b9a16b2c9655897";
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

      console.log(datosImgbb);

      if (datosImgbb.success) {
        const productoCompleto = {
          ...datosForm,
          urlImagen: datosImgbb.data.url,
        };
        console.log("Imagen enviada: ", productoCompleto);
      } else {
        throw new Error("Error al enviar imagen");
      }

      setLoading(false);
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  return (
    <FormularioProductos
      datosForm={datosForm}
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
      manejarCambioImagen={manejarCambioImagen}
      loading={loading}
    />
  );
}

import styles from "./FormularioProductos.module.css";

export default function FormularioProductos({
  datosForm,
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
}) {
  return (
    <form onSubmit={manejarEnvio} className={styles.formproducto}>
      <h3>Agregar Nuevo Producto</h3>
      <div>
        <label>Nombre del Producto:</label>
        <input
          type="text"
          placeholder="Ej: Teclado Mecánico"
          name="nombre"
          value={datosForm.nombre}
          onChange={manejarCambio}
        />
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          placeholder="Ej: 95"
          name="precio"
          value={datosForm.precio}
          onChange={manejarCambio}
        />
      </div>
      <div>
        <label>Stock:</label>
        <input
          type="number"
          placeholder="Ej: 5"
          name="stock"
          value={datosForm.stock}
          onChange={manejarCambio}
        />
      </div>
      <div>
        <label>Imagen:</label>
        <input
          type="file"
          placeholder="https://..."
          onChange={manejarCambioImagen}
        />
      </div>
      <button type="submit">Guardar Producto</button>
    </form>
  );
}

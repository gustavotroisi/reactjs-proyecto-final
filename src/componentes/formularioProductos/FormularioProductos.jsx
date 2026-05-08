import styles from "./FormularioProductos.module.css";

export default function FormularioProductos({
  datosForm,
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
  loading,
}) {
  return (
    <form onSubmit={manejarEnvio} className={styles.formproducto}>
      <h2 className={styles.titulo}>Agregar Nuevo Producto</h2>
      <div>
        <label>Nombre del Producto</label>
        <input
          type="text"
          placeholder="Ej: Teclado Mecánico"
          name="nombre"
          value={datosForm.nombre}
          onChange={manejarCambio}
          className="form-control"
        />
      </div>
      <div>
        <label>Precio</label>
        <input
          type="number"
          placeholder="Ej: 95"
          name="precio"
          value={datosForm.precio}
          onChange={manejarCambio}
          className="form-control"
        />
      </div>
      <div>
        <label>Stock</label>
        <input
          type="number"
          placeholder="Ej: 5"
          name="stock"
          value={datosForm.stock}
          onChange={manejarCambio}
          className="form-control"
        />
      </div>
      <div>
        <label>Imagen</label>
        <input
          type="file"
          onChange={manejarCambioImagen}
          className="form-control"
        />
      </div>
      <button
        type="submit"
        className="btn btn-secondary btn-lg"
        disabled={loading}
      >
        {loading ? "Guardando Producto..." : "Guardar Producto"}
      </button>
    </form>
  );
}

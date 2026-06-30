import { FaFloppyDisk } from "react-icons/fa6";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./FormularioProductos.module.css";

export default function FormularioProductos({
  datosForm,
  manejarCambio,
  manejarEnvio,
  manejarCambioImagen,
  loading,
  mensaje,
  fileKey,
}) {
  return (
    <>
      <form onSubmit={manejarEnvio} className={styles.formproducto}>
        <h3 className={`${styles.titulo} mb-4`}>Agregar Nuevo Producto</h3>
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <div>
                <label>ID</label>
                <input
                  type="number"
                  name="id"
                  value={datosForm.id}
                  onChange={manejarCambio}
                  className={`form-control ${styles.input}`}
                  min="0"
                  required
                />
              </div>
              <div>
                <label>Categoría</label>
                <select
                  name="categoria"
                  value={datosForm.categoria}
                  onChange={manejarCambio}
                  className="form-select mb-3"
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  <option value="componentes">Componentes</option>
                  <option value="perifericos">Periféricos</option>
                  <option value="equipos">Equipos</option>
                </select>
              </div>
              <div>
                <label>Nombre del Producto</label>
                <input
                  type="text"
                  placeholder="Ej: Teclado Mecánico"
                  name="nombre"
                  value={datosForm.nombre}
                  onChange={manejarCambio}
                  className={`form-control ${styles.input}`}
                  required
                />
              </div>

              <div>
                <label>Descripción</label>
                <textarea
                  name="descripcion"
                  rows="6"
                  cols="50"
                  onChange={manejarCambio}
                  className="form-control mb-3"
                  value={datosForm.descripcion}
                ></textarea>
              </div>

              <div className="form-check mt-3 mb-3">
                <input
                  type="checkbox"
                  name="destacado"
                  checked={datosForm.destacado}
                  onChange={manejarCambio}
                  className="form-check-input"
                />
                <label className="form-check-label">Destacado</label>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <Row>
                <Col xs={12} md={6}>
                  <div>
                    <label>Precio</label>
                    <div className="input-group mb-3">
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Ej: 95"
                        name="precio"
                        value={datosForm.precio}
                        onChange={manejarCambio}
                        className="form-control"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                </Col>
                <Col>
                  <div>
                    <label>Stock</label>
                    <input
                      type="number"
                      placeholder="Ej: 5"
                      name="stock"
                      value={datosForm.stock}
                      onChange={manejarCambio}
                      className={`form-control ${styles.input}`}
                      min="0"
                      required
                    />
                  </div>
                </Col>
              </Row>

              <div>
                <label>Imagen (800x600px)</label>
                <input
                  type="file"
                  onChange={manejarCambioImagen}
                  className="form-control mb-3"
                  key={fileKey}
                  required
                />
              </div>
            </Col>
          </Row>
          <Row className="mt-4">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loading}
            >
              <FaFloppyDisk style={{ marginRight: "5px" }} />
              {loading ? "Guardando Producto..." : "Guardar Producto"}
            </button>
          </Row>
        </Container>
      </form>
      {mensaje && (
        <div className={`alert alert-${mensaje.tipo} text-center`}>
          {mensaje.texto}
        </div>
      )}
    </>
  );
}

import styles from "./TarjetaContacto.module.css";

export function TarjetaContacto(contacto) {
  return (
    <div className={styles.card}>
      <img src={contacto.fotoURL} alt={contacto.nombre} />
      <h2 className={styles.nombre}>{contacto.nombre}</h2>
      <p>{contacto.linkedinURL}</p>
      <p className="badge bg-secondary">{contacto.rol}</p>
    </div>
  );
}

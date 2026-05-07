import styles from "./TarjetaContacto.module.css";

export function TarjetaContacto(contacto) {
  return (
    <div className={styles.card}>
      <img src={contacto.foto} />
      <h2>{contacto.nombre}</h2>
      <p>{contacto.email}</p>
      <p>{contacto.puesto}</p>
    </div>
  );
}

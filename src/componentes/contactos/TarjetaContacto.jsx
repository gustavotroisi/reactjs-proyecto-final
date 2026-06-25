import { Card } from "react-bootstrap";
import styles from "./TarjetaContacto.module.css";

export function TarjetaContacto(contacto) {
  return (
    <Card className="h-100" className={styles.card}>
      <Card.Img variant="top" src={contacto.fotoURL} alt={contacto.nombre} />
      <Card.Title className={styles.nombre}>{contacto.nombre}</Card.Title>
      <Card.Text>
        <p>{contacto.linkedinURL}</p>
        <p className="badge bg-secondary">{contacto.rol}</p>
      </Card.Text>
    </Card>
  );
}

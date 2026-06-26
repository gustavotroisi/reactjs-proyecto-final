import { Card } from "react-bootstrap";
import styles from "./TarjetaContacto.module.css";

export function TarjetaContacto(contacto) {
  return (
    <Card className="h-100" className={styles.card}>
      <Card.Img variant="top" src={contacto.fotoURL} alt={contacto.nombre} />
      <Card.Title className={styles.nombre}>{contacto.nombre}</Card.Title>
      <div>
        <Card.Text>{contacto.linkedinURL}</Card.Text>
        <Card.Text className="badge bg-secondary">{contacto.rol}</Card.Text>
      </div>
    </Card>
  );
}

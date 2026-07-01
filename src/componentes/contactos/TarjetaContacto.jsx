import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./TarjetaContacto.module.css";

export function TarjetaContacto(contacto) {
  return (
    <Card className="h-100" className={styles.card}>
      <Card.Img
        variant="top"
        src={contacto.fotoURL}
        className="mb-3"
        alt={contacto.nombre}
      />
      <Card.Title className={styles.nombre}>{contacto.nombre}</Card.Title>
      <Badge className="mb-2 bg-primary mx-auto mt-2">{contacto.rol}</Badge>
      <Link
        to={contacto.linkedinURL}
        aria-label={`LinkedIn de ${contacto.nombre}`}
        className={`  mb-2 ${styles.linkedIn}`}
        target="_blank"
      >
        {contacto.linkedinURL}
      </Link>
    </Card>
  );
}

import { useState, useEffect } from "react";
import styles from "./Directorio.module.css";
import { TarjetaContacto } from "./TarjetaContacto";

export function Directorio({ titulo }) {
  const [nosotros, setNosotros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/data/nosotros.json")
      .then((response) => {
        if (!response.ok) throw new Error("Error al leer archivo");
        return response.json();
      })
      .then((json) => {
        //console.log(json);
        setNosotros(json);
      })
      .catch((error) => setError(error.message))
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <>Cargando equipo...</>;
  }

  if (error) {
    return <>Error: {error}</>;
  }

  return (
    <>
      <h1 className="page-title">{titulo}</h1>
      <section className={styles.texto}>
        <p>
          <strong>Tech Store</strong> es una empresa dedicada a la importación y
          distribución de tecnología.
        </p>
        <p>
          NUestro equipo está formado por un grupo de profesionales dispuestos a
          ayudarlo en conseguir sus objetivos.
        </p>
      </section>
      <div className={styles.directorio}>
        {nosotros.map((person) => (
          <TarjetaContacto key={person.id} {...person} />
        ))}
      </div>
    </>
  );
}

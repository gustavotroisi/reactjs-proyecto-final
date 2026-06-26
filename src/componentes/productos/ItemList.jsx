import Item from "./Item";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
//import styles from "./ItemList.module.css";

export default function ItemList({ productos, buscador }) {
  const [searchTerm, setSearchTerm] = useState("");

  //Filtro
  const productosFiltrados = productos.filter((prod) =>
    prod.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      {buscador ? (
        <Row className="mb-4">
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar productos por nombre..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
        </Row>
      ) : (
        ""
      )}
      <Row>
        {productosFiltrados.map(
          (prod) => (
            <Col key={prod.id} xs={12} md={6} lg={4} className="mb-4">
              <Item {...prod} />
            </Col>
          ),
          {
            /*  prod.stock ? <Item key={prod.id} {...prod} /> : false, */
          },
        )}
      </Row>
    </>
  );
}

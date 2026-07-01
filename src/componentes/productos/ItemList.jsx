import Item from "./Item";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
//import styles from "./ItemList.module.css";
import { FaSearch } from "react-icons/fa";

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
            <div className="input-group">
              <span className="input-group-text">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar productos por nombre..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
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

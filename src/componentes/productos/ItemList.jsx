import Item from "./Item";
import { Row, Col } from "react-bootstrap";
//import styles from "./ItemList.module.css";

export default function ItemList({ productos }) {
  return (
    <Row>
      {productos.map(
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
  );
}

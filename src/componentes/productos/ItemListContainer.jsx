import ItemList from "./ItemList";

export default function ItemListContainer() {
  const productos = [
    {
      id: "1234",
      nombre: "Notebook Pro",
      precio: 12000,
      stock: 10,
      imagen: "https://placeholdpicsum.dev/photo/seed/product-1/200/250",
    },
    {
      id: "2344",
      nombre: "Monitor Curvo",
      precio: 450000,
      stock: 3,
      imagen: "https://placeholdpicsum.dev/photo/seed/product-2/200/250",
    },
    {
      id: "2545",
      nombre: "Teclado Mecánico",
      precio: 15000,
      stock: 8,
      imagen: "https://placeholdpicsum.dev/photo/seed/product-3/200/250",
    },
  ];

  return (
    <div class="product-grid">
      <ItemList productos={productos} />
    </div>
  );
}

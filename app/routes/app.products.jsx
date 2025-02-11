import { useEffect, useState } from "react";

export default function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products?shop=myshop.myshopify.com")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error loading products:", error));
  }, []);
  console.log(products);

  return (
    <div>
      <h2>Shopify Products</h2>
      <ul>
        {products.map(({ node }) => (
          <li key={node.id}>
            {node.title} - Variants:{" "}
            {node.variants.edges.map((v) => v.node.title).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

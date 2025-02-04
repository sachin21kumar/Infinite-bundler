import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import shopify, { authenticate } from "../shopify.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { session, shop } = await authenticate(request);

  if (!shop || !session) {
    throw new Response("Unauthorized", { status: 401 });
  }

  // Initialize Shopify GraphQL Client
  const client = new shopify.api.clients.Graphql({ session });

  const productsQuery = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            descriptionHtml
            images(first: 1) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  price
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await client.query({
      data: { query: productsQuery, variables: { first: 50 } }, // Fetch first 50 products
    });

    const products = response.body.data.products.edges.map(edge => edge.node);

    if (!products.length) {
      throw new Response("No Products Found", { status: 404 });
    }

    console.log("Fetched Products:", products);

    return json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Response("Internal Server Error", { status: 500 });
  }
};

export default function ProductsPage() {
  const products = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>All Products</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px" }}>
            {product.images.edges.length > 0 && (
              <img
                src={product.images.edges[0].node.originalSrc}
                alt={product.images.edges[0].node.altText || "Product Image"}
                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
              />
            )}
            <h2>{product.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></div>
            <h3>Variants:</h3>
            <ul>
              {product.variants.edges.map(({ node }) => (
                <li key={node.id}>
                  {node.title} - ${node.price}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

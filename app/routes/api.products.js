import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import shopify, { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  try {
    const { session, shop } = await authenticate(request);

    if (!shop || !session) {
      return json({ products: [], error: "Unauthorized" }, { status: 401 });
    }

    const client = new shopify.clients.Graphql({ session });

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

    const response = await client.query({
      data: {
        query: productsQuery,
        variables: { first: 50 },
      },
    });

    if (!response?.body?.data?.products?.edges?.length) {
      return json(
        { products: [], error: "No products found" },
        { status: 200 },
      );
    }

    const products = response.body.data.products.edges.map((edge) => edge.node);

    console.log("Fetched Products:", products);

    return json({ products, error: null }); // Ensure valid JSON response
  } catch (error) {
    console.error("Error fetching products:", error);
    return json(
      { products: [], error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

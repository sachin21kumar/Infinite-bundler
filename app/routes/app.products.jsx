import { useEffect, useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  // Authenticate the admin session
  const { admin } = await authenticate.admin(request);
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "";
  const response = await admin.graphql(
    `#graphql
    {
      products(first: 150) {
        edges {
          node {
            id
            title
            handle
            status
            images(first: 1) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }
    }
    `,
    { query },
  );
  const responseJson = await response.json();
  return json(responseJson.data.products.edges);
};

export default function ProductsList() {
  const products = useLoaderData();
  console.log(products);
  return (
    <div>
      <h2>Shopify Products</h2>
      <ul>
        {/* {products?.map(({ node }) => (
          <li key={node.id}>
            {node.title} - Variants:{" "}
            {node.variants.edges.map((v) => v.node.title).join(", ")}
          </li>
        ))} */}
      </ul>
    </div>
  );
}

import React, { useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import {
  Button,
  BlockStack,
  Box,
  Page,
  Layout,
  Text,
  Card,
  Divider,
  List,
  FooterHelp,
  Link,
  InlineStack,
  MediaCard,
  VideoThumbnail,
} from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import "../styles/index.css";
export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const color = ["Red", "Orange", "Yellow", "Green"][
    Math.floor(Math.random() * 4)
  ];
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($product: ProductCreateInput!) {
        productCreate(product: $product) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
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
      }`,
    {
      variables: {
        product: {
          title: `${color} Snowboard`,
        },
      },
    },
  );
  const responseJson = await response.json();
  const product = responseJson.data.productCreate.product;
  const variantId = product.variants.edges[0].node.id;
  const variantResponse = await admin.graphql(
    `#graphql
    mutation shopifyRemixTemplateUpdateVariant($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
      productVariantsBulkUpdate(productId: $productId, variants: $variants) {
        productVariants {
          id
          price
          barcode
          createdAt
        }
      }
    }`,
    {
      variables: {
        productId: product.id,
        variants: [{ id: variantId, price: "100.00" }],
      },
    },
  );
  const variantResponseJson = await variantResponse.json();

  return {
    product: responseJson.data.productCreate.product,
    variant: variantResponseJson.data.productVariantsBulkUpdate.productVariants,
  };
};

export default function Index() {
  const fetcher = useFetcher();
  const shopify = useAppBridge();
  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";
  const productId = fetcher.data?.product?.id.replace(
    "gid://shopify/Product/",
    "",
  );

  useEffect(() => {
    if (productId) {
      shopify.toast.show("Product created");
    }
  }, [productId, shopify]);
  const generateProduct = () => fetcher.submit({}, { method: "POST" });

  return (
    <Page>
      <BlockStack gap="500">
        <Layout>
          {/* Video Layout  */}
          <Layout.Section>
            <VideoComponent
              title={"Getting started with Infinite Bundle Options"}
              description={
                "Options are set up and managed through the app's dashboard. Follow step-by-step instructions to learn how to create options for your products."
              }
              content={"Learn more"}
            />
          </Layout.Section>
          <Layout.Section>
            <SliderComponent
              isLoading={isLoading}
              fetcher={fetcher}
              generateProduct={generateProduct}
            />
            <SliderComponent
              isLoading={isLoading}
              fetcher={fetcher}
              generateProduct={generateProduct}
            />
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <BlockStack gap="500">
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    App template specs
                  </Text>
                  <BlockStack gap="200">
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Framework
                      </Text>
                      <Link
                        url="https://remix.run"
                        target="_blank"
                        removeUnderline
                      >
                        Remix
                      </Link>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Database
                      </Text>
                      <Link
                        url="https://www.prisma.io/"
                        target="_blank"
                        removeUnderline
                      >
                        Prisma
                      </Link>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Interface
                      </Text>
                      <span>
                        <Link
                          url="https://polaris.shopify.com"
                          target="_blank"
                          removeUnderline
                        >
                          Polaris
                        </Link>
                        {", "}
                        <Link
                          url="https://shopify.dev/docs/apps/tools/app-bridge"
                          target="_blank"
                          removeUnderline
                        >
                          App Bridge
                        </Link>
                      </span>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        API
                      </Text>
                      <Link
                        url="https://shopify.dev/docs/api/admin-graphql"
                        target="_blank"
                        removeUnderline
                      >
                        GraphQL API
                      </Link>
                    </InlineStack>
                  </BlockStack>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Next steps
                  </Text>
                  <List>
                    <List.Item>
                      Build an{" "}
                      <Link
                        url="https://shopify.dev/docs/apps/getting-started/build-app-example"
                        target="_blank"
                        removeUnderline
                      >
                        {" "}
                        example app
                      </Link>{" "}
                      to get started
                    </List.Item>
                    <List.Item>
                      Explore Shopify’s API with{" "}
                      <Link
                        url="https://shopify.dev/docs/apps/tools/graphiql-admin-api"
                        target="_blank"
                        removeUnderline
                      >
                        GraphiQL
                      </Link>
                    </List.Item>
                  </List>
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>
          <Divider borderColor="border-inverse" />
          <Layout.Section>
            <Footer />
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <div className="">
          <Text variant="heading2xl" as="h2">
            MisterSk
          </Text>
        </div>
        <div className="">
          <Text variant="headingXs" as="p" style={{ margin: "20px" }}>
            Just across the bridge from San Francisco, we specialize in custom
            development for Shopify and Shopify Plus. By combining the deep,
            technical knowledge with a wide range of services, we craft detailed
            experiences and powerful integrations that convert into real sales.
          </Text>
        </div>
        <div className="">
          <Button>Learn more.</Button>
        </div>
      </div>
      <FooterHelp>
        Learn more about{" "}
        <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
          Infinite Options
        </Link>{" "}
        at the{" "}
        <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
          MisterSk Help Docs
        </Link>
        .
      </FooterHelp>
    </footer>
  );
}

function SliderComponent({ isLoading, fetcher, generateProduct }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <Card className="slider-card">
        <BlockStack gap="500">
          <BlockStack gap="200">
            <Text as="h2" variant="headingMd">
              Congrats on creating a new Shopify app 🎉
            </Text>
            <Text variant="bodyMd" as="p">
              This embedded app template uses{" "}
              <Link
                url="https://shopify.dev/docs/apps/tools/app-bridge"
                target="_blank"
                removeUnderline
              >
                App Bridge
              </Link>{" "}
              interface examples like an{" "}
              <Link url="/app/additional" removeUnderline>
                additional page in the app nav
              </Link>
              , as well as an{" "}
              <Link
                url="https://shopify.dev/docs/api/admin-graphql"
                target="_blank"
                removeUnderline
              >
                Admin GraphQL
              </Link>{" "}
              mutation demo, to provide a starting point for app development.
            </Text>
          </BlockStack>
          <BlockStack gap="200">
            <Text as="h3" variant="headingMd">
              Get started with products
            </Text>
            <Text as="p" variant="bodyMd">
              Generate a product with GraphQL and get the JSON output for that
              product. Learn more about the{" "}
              <Link
                url="https://shopify.dev/docs/api/admin-graphql/latest/mutations/productCreate"
                target="_blank"
                removeUnderline
              >
                productCreate
              </Link>{" "}
              mutation in our API references.
            </Text>
          </BlockStack>
          <InlineStack gap="300">
            <Button loading={isLoading} onClick={generateProduct}>
              Generate a product
            </Button>
            {fetcher.data?.product && (
              <Button
                url={`shopify:admin/products/${productId}`}
                target="_blank"
                variant="plain"
              >
                View product
              </Button>
            )}
          </InlineStack>
          {fetcher.data?.product && (
            <>
              <Text as="h3" variant="headingMd">
                {" "}
                productCreate mutation
              </Text>
              <Box
                padding="400"
                background="bg-surface-active"
                borderWidth="025"
                borderRadius="200"
                borderColor="border"
                overflowX="scroll"
              >
                <pre style={{ margin: 0 }}>
                  <code>{JSON.stringify(fetcher.data.product, null, 2)}</code>
                </pre>
              </Box>
              <Text as="h3" variant="headingMd">
                {" "}
                productVariantsBulkUpdate mutation
              </Text>
              <Box
                padding="400"
                background="bg-surface-active"
                borderWidth="025"
                borderRadius="200"
                borderColor="border"
                overflowX="scroll"
              >
                <pre style={{ margin: 0 }}>
                  <code>{JSON.stringify(fetcher.data.variant, null, 2)}</code>
                </pre>
              </Box>
            </>
          )}
        </BlockStack>
      </Card>
    </div>
  );
}

function VideoComponent({ title, description, content }) {
  return (
    <MediaCard
      title={title}
      primaryAction={{
        content: content,
        onAction: () => {},
      }}
      description={description}
      popoverActions={[{ content: "Dismiss", onAction: () => {} }]}
    >
      <VideoThumbnail
        videoLength={80}
        thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
        onClick={() => console.log("clicked")}
      />
    </MediaCard>
  );
}

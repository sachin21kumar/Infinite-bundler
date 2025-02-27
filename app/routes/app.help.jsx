import {
  Box,
  Button,
  Card,
  Layout,
  Link,
  List,
  Icon,
  Page,
  Text,
  BlockStack,
  Divider,
  CalloutCard,
  LegacyCard,
  FooterHelp,
  Grid,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { ChatIcon, SendIcon } from "@shopify/polaris-icons";
import "../styles/index.css";

export default function HelpPage() {
  return (
    <Page>
      <TitleBar title="Help" />
      <Layout>
        <Layout.Section variant="fullWidth">
          <CardComponent
            title={
              "Please post your review of Infinite Bundler on the Shopify App Store. ❤ The MisterSk Team"
            }
            descriptioin={
              "Your feedback means a lot to us! Please take a minute to leave us a review on the Shopify App Store."
            }
          />
        </Layout.Section>
        {/* Answer common questions with these guides: */}
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Getting Started with Infinite Options
              </Text>
              <Text as="p" variant="bodyMd">
                Self-help articles & setup Instructions.
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <BlockStack gap="200">
              <Text as="h2" variant="headingMd">
                Follow these articles to get started with Infinite Options:
              </Text>
              <List>
                <List.Item>
                  <Link
                    url="https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav"
                    target="_blank"
                    removeUnderline
                  >
                    Getting Started Guide
                  </Link>
                </List.Item>
                <List.Item>
                  <Link
                    url="https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav"
                    target="_blank"
                    removeUnderline
                  >
                    Install Infinite Options
                  </Link>
                </List.Item>
                <List.Item>
                  <Link
                    url="https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav"
                    target="_blank"
                    removeUnderline
                  >
                    Create product bundles
                  </Link>
                </List.Item>
                <List.Item>
                  <Link
                    url="https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav"
                    target="_blank"
                    removeUnderline
                  >
                    Style form fields
                  </Link>
                </List.Item>
              </List>
              <Text as="h2" variant="headingMd">
                Additional help can be found at the ShopPad Help Docs:
              </Text>
              <button
                style={{
                  marginTop: "10px",
                  padding: "10px 8px",
                  display: "inline",
                  backgroundColor: "white",
                  border: "1px solid gray",
                }}
              >
                Infinite Option Button Docs
              </button>
            </BlockStack>
          </Card>
        </Layout.Section>
        <Divider borderColor="border-inverse" />
        {/* We're available Monday - Friday, 9am to 5pm PT. */}
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Need Help?
              </Text>
              <Text as="p" variant="bodyMd">
                Our ShopPad Customer Success team is based in sunny California
                and is here to make sure your store is successful.
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <BlockStack gap="200">
              <Text as="h2" variant="headingMd" alignment="center">
                We're available Monday - Friday, 9am to 5pm PT.
              </Text>
              <Grid>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <div className="centered-container">
                    <span
                      className="help-send-icon"
                      style={{ rotate: "-45deg" }}
                    >
                      <Icon
                        source={SendIcon}
                        color="base"
                        backdrop
                        size="extraLarge"
                      />
                    </span>
                    <button>Send an Email</button>
                  </div>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                  <div className="centered-container">
                    <span className={"help-chat-icon"}>
                      <Icon
                        source={ChatIcon}
                        color="base"
                        backdrop
                        size="large"
                      />
                    </span>

                    <button>Let’s Chat</button>
                  </div>
                </Grid.Cell>
              </Grid>
            </BlockStack>
          </Card>
        </Layout.Section>
        <Divider borderColor="border-inverse" />
        {/* Get Started... */}
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Expert Install Service
              </Text>
              <Text as="p" variant="bodyMd">
                Our experts can install Infinite Options so you can just sit
                back, relax and know it’s done right.
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <BlockStack gap="200">
              <Text as="h2" variant="headingMd">
                About the Expert Install Service
              </Text>
              <Text as="hp" variant="headingXs" fontWeight={"regular"}>
                Our support team will install Infinite Options for you in one
                business day. The service costs a one time fee of $20, and we
                offer a full money back guarantee if you are not satisfied. The
                installation will be completed within one business day after
                receiving store access. The service includes the following:
              </Text>
              <List>
                <List.Item>
                  <Link
                    url="https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav"
                    target="_blank"
                    removeUnderline
                  >
                    Add Infinite Options to your theme
                  </Link>
                </List.Item>
                <List.Item>
                  <Link
                    url="https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav"
                    target="_blank"
                    removeUnderline
                  >
                    Display option selections in the cart
                  </Link>
                </List.Item>
                <List.Item>
                  <Link
                    url="https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav"
                    target="_blank"
                    removeUnderline
                  >
                    Display options on the Order Confirmation and New Order
                    emails
                  </Link>
                </List.Item>
                <List.Item>
                  <Link
                    url="https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav"
                    target="_blank"
                    removeUnderline
                  >
                    Decrease Infinite Options' load time
                  </Link>
                </List.Item>
                <List.Item>
                  <Link
                    url="https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav"
                    target="_blank"
                    removeUnderline
                  >
                    Style Infinite Options to match your theme
                  </Link>
                </List.Item>
              </List>
              <Text as="hp" variant="headingXs" fontWeight={"regular"}>
                Please note that this service does not include creating the
                options for your store, but we will provide you with the tools
                and resources needed to do so.
              </Text>
              <Text as="h2" variant="headingMd" fontWeight={"regular"}>
                After the installation is complete you will continue to have
                access to our exceptional support.
              </Text>
              <Text as="h2" variant="headingMd" fontWeight={"regular"}>
                Our team of experts are always happy to answer questions!
              </Text>
              <button
                style={{
                  marginTop: "10px",
                  padding: "10px 8px",
                  display: "inline",
                  backgroundColor: "white",
                  border: "1px solid gray",
                }}
              >
                Infinite Option Button Docs
              </button>
            </BlockStack>
          </Card>
        </Layout.Section>
        <Divider borderColor="border-inverse" />
        <Footer />
      </Layout>
    </Page>
  );
}

function CardComponent({ title, descriptioin }) {
  return (
    <CalloutCard
      title={title}
      illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
      primaryAction={{
        content: "Post Review",
        url: "#",
      }}
    >
      <p>{descriptioin}</p>
    </CalloutCard>
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

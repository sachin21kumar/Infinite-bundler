import { useState, useCallback } from "react";
import {
  Card,
  Layout,
  LegacyCard,
  BlockStack,
  Tabs,
  Text,
  Link,
  Grid,
  List,
  Divider,
  Icon,
  MediaCard,
  CalloutCard,
  VideoThumbnail,
} from "@shopify/polaris";
import ModalComponent from "./Modal";
import { TextInputField, CheckboxField } from "./InputFields";
import { ChatIcon, SendIcon } from "@shopify/polaris-icons";
import "../styles/index.css";

function TabComponent({ formData, setFormData, step, currentStep }) {
  const [selected, setSelected] = useState(0);
  const [isModalActive, setIsModalActive] = useState(false);
  const handleModalChange = useCallback(
    () => setIsModalActive(!isModalActive),
    [isModalActive],
  );

  const tabs = [
    {
      id: "1",
      content: "Add all products",
      accessibilityLabel: "All customers",
      panelID: "all-customers-content-1",
    },
    {
      id: "2",
      content: "Add to select products",
      panelID: "accepts-marketing-content-1",
    },
    {
      id: "3",
      content: "Add to a specific type of product",
      panelID: "repeat-customers-content-1",
    },
  ];

  const handleTabSelect = (selectedIndex) => {
    setSelected(selectedIndex);
    if (selectedIndex === 1) {
      setIsModalActive(true);
    }
  };

  const currentStepData = formData.find((item) => item.step === step);
  const [value, setValue] = useState(currentStepData?.label_on_product || "");

  function handleChange(e) {
    const newValue = e.target.value;
    setValue(newValue);

    setFormData((prevData) =>
      prevData.map((item) =>
        item.step === step ? { ...item, label_on_product: newValue } : item,
      ),
    );
  }

  return (
    <div className="tab-container">
      <div className="tab-header">
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabSelect} />
      </div>
      <div className="tab-body">
        {selected === 0 ? (
          <>
            {currentStep === 1 && (
              <TabOneContainer
                formData={formData}
                setFormData={setFormData}
                step={1}
              >
                <Text as="p" variant={"headingXs"} fontWeight={"regular"}>
                  What should the label for this option be on <br /> the product
                  listing?
                </Text>
                <Grid>
                  <Grid.Cell columnSpan={{ xs: 8, sm: 4, md: 4, lg: 6, xl: 6 }}>
                    <div
                      style={{
                        height: "150px",
                        marginTop: "10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <label>Label on Product</label>
                      <TextInputField value={value} onChange={handleChange} />
                      <Text>
                        This is the name of the option that appears on the
                        product page as an option a customer can select. It
                        should describe the option to shoppers <br /> — like
                        material, color, gift wrapping, etc.
                      </Text>
                    </div>
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 4, sm: 2, md: 2, lg: 6, xl: 6 }}>
                    <div style={{ height: "200px", margin: "auto" }}>
                      <img
                        loading="lazy"
                        style={{ height: "100%", width: "100%" }}
                        src="https://img.freepik.com/free-vector/icon-element-online-shop-business_272375-3595.jpg?t=st=1737626570~exp=1737630170~hmac=5b5fc4df1f61dc1bd92673978ec5af44450c0a0910fd4dd2f431caf0970c8d47&w=740"
                        alt="Image-Vector"
                      />
                    </div>
                  </Grid.Cell>
                </Grid>
              </TabOneContainer>
            )}
            {currentStep === 2 && (
              <TabOneContainer
                formData={formData}
                setFormData={setFormData}
                step={2}
              >
                <Text as="p" variant={"headingXs"} fontWeight={"regular"}>
                  What should the label for this option be on the cart page?
                </Text>
                <Grid>
                  <Grid.Cell columnSpan={{ xs: 8, sm: 4, md: 4, lg: 6, xl: 6 }}>
                    <div
                      style={{
                        height: "150px",
                        marginTop: "10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <label>Label on Cart</label>
                      <TextInputField
                        value={value}
                        onChange={handleChange}
                        style={{
                          marginTop: "10px",
                        }}
                      />
                      <CheckboxField lable={"Same as Label on Product."} />
                      <Text
                        style={{
                          marginTop: "10px",
                        }}
                      >
                        This is the name of the option that appears on the cart
                        summary screen, checkout, and order details page that
                        describes the option a customer has selected. We
                        recommend making this value unique for all of your
                        options.
                      </Text>
                    </div>
                  </Grid.Cell>
                  <Grid.Cell columnSpan={{ xs: 4, sm: 2, md: 2, lg: 6, xl: 6 }}>
                    <div style={{ height: "200px", margin: "auto" }}>
                      <img
                        loading="lazy"
                        style={{ height: "100%", width: "100%" }}
                        src="https://img.freepik.com/free-vector/icon-element-online-shop-business_272375-3595.jpg?t=st=1737626570~exp=1737630170~hmac=5b5fc4df1f61dc1bd92673978ec5af44450c0a0910fd4dd2f431caf0970c8d47&w=740"
                        alt="Image-Vector"
                      />
                    </div>
                  </Grid.Cell>
                </Grid>
              </TabOneContainer>
            )}
            {currentStep === 3 && (
              <TabOneContainer
                formData={formData}
                setFormData={setFormData}
                step={3}
                style={{ marginBottom: "20px" }}
              >
                <Text
                  as="h3"
                  variant={"headingXl"}
                  fontWeight={"regular"}
                  style={{ marginBottom: "20px" }}
                >
                  Finish setting up your option set.
                </Text>
                <div style={{ marginBottom: "40px" }}>
                  <Text as="p" variant={"headingSm"} fontWeight={"regular"}>
                    Congrats! You’re ready to start customizing the Option Set
                    you just setup.
                  </Text>
                </div>
                <div></div>
                <div>
                  {" "}
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

                    <Divider borderColor="border-inverse" />

                    <Layout.Section variant="fullWidth">
                      <VideoComponent
                        title={"Create options for products"}
                        description={
                          "Options are set up and managed through the app's dashboard. Follow step-by-step instructions to learn how to create options for your products."
                        }
                        content={"Learn more"}
                      />
                    </Layout.Section>

                    <Divider borderColor="border-inverse" />

                    {/* Get Started... */}
                    <Layout.Section variant="fullWidth">
                      <Layout>
                        <Layout.Section variant="oneHalf">
                          <Card>
                            <BlockStack gap="200">
                              <Text as="h2" variant="headingMd">
                                How to increase the cost of an option
                              </Text>
                              <Text
                                as="hp"
                                variant="headingXs"
                                fontWeight={"regular"}
                              >
                                If you want to charge more for a specific
                                option, just use the add-on product feature
                                native bundling.
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
                                Learn more.
                              </button>
                            </BlockStack>
                          </Card>
                        </Layout.Section>
                        <Layout.Section variant="oneHalf">
                          <Card>
                            <BlockStack gap="200">
                              <Text as="h2" variant="headingMd">
                                How to create Conditional Logic
                              </Text>
                              <Text
                                as="hp"
                                variant="headingXs"
                                fontWeight={"regular"}
                              >
                                Use this feature if you want to hide or show
                                specific options. bundling.
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
                                Learn more.
                              </button>
                            </BlockStack>
                          </Card>
                        </Layout.Section>
                      </Layout>
                    </Layout.Section>
                  </Layout>
                </div>
              </TabOneContainer>
            )}
          </>
        ) : selected === 1 ? (
          <TabTwoContainer
            isModalActive={isModalActive}
            handleModalChange={handleModalChange}
            products={products}
          />
        ) : selected === 2 ? (
          <TabThreeContainer products={products} />
        ) : (
          <TabOneContainer products={products} setFormData={setFromData} />
        )}
      </div>
    </div>
  );
}

const TabOneContainer = ({ formData, setFormData, step, children }) => {
  return (
    <LegacyCard.Section>
      <div style={{ marginBottom: "10px", color: "blue" }}>
        <Text as="h6" variant={"headingSm"} fontWeight={"regular"}>
          Step {step} of 3
        </Text>
      </div>
      {children}
    </LegacyCard.Section>
  );
};

const TabTwoContainer = ({ isModalActive, handleModalChange, products }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [checkboxData, setCheckboxData] = useState(
    products?.map(({ node }) => ({ ...node, checked: false })),
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // handle Checkbox Change
  const handleCheckboxChange = (index) => {
    setCheckboxData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item,
      ),
    );
  };
  // handle filters
  const filteredProducts = checkboxData?.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <ModalComponent
      label={"Add products"}
      active={isModalActive}
      handleChange={handleModalChange}
    >
      <TextInputField
        label="Search Products"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div style={{ marginTop: "10px" }}>
        <CheckboxField
          products={filteredProducts}
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>
    </ModalComponent>
  );
};

const TabThreeContainer = ({ products }) => {
  const [productsData, setProductsData] = useState(
    products?.map(({ node }) => ({ ...node, checked: false })),
  );
  return <CheckboxField products={productsData} />;
};

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

export default TabComponent;

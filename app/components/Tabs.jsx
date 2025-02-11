import { useState, useCallback } from "react";
import { LegacyCard, Tabs, Text, Grid } from "@shopify/polaris";
import ModalComponent from "./Modal";
import { TextInputField, CheckboxField } from "./InputFields";
import "../styles/index.css";

function TabComponent({ products, formData, setFormData }) {
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

  return (
    <div className="tab-container">
      <div className="tab-header">
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabSelect} />
      </div>
      <div className="tab-body">
        {selected === 0 ? (
          <TabOneContainer fformData={formData} setFormData={setFormData} />
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

const TabOneContainer = ({ formData, setFormData }) => {
  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }
  setFormData(value);
  return (
    <LegacyCard.Section>
      <Text as="h6" variant={"headingMd"}>
        What should the label for this option be on <br /> the product listing?
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
            <TextInputField
              label={"Label on Product"}
              value={value}
              onChange={handleChange}
            />
            <Text>
              This is the name of the option that appears on the product page as
              an option a customer can select. It should describe the option to
              shoppers <br /> — like material, color, gift wrapping, etc.
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

export default TabComponent;

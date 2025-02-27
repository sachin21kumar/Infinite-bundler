import React, { useState, useCallback } from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  DeleteIcon,
  MenuHorizontalIcon,
} from "@shopify/polaris-icons";
import {
  Button,
  Text,
  Layout,
  TextField,
  Collapsible,
  Page,
  Grid,
  Icon,
  Select,
  Popover,
  MediaCard,
  ActionList,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import "../styles/index.css";
import ModalComponent from "../components/Modal";
import TabComponent from "../components/Tabs";
// products
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
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
            tags
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

export default function OptionSetPage() {
  const [isModalActive, setIsModalActive] = useState(false);
  const handleModalChange = useCallback(
    () => setIsModalActive((active) => !active),
    [],
  );
  const products = useLoaderData();
  console.log("Products:", products);
  const [cardData, setCardData] = useState([
    {
      id: "1",
      title: "crossbow-custom-leather-belt-blank size varinat",
    },
    {
      id: "2",
      title: "Option Set 5",
    },
    {
      id: "3",
      title: "Option Set 3",
    },
    {
      id: "4",
      title:
        "belt page optioncrossbow-custom-leather-belt-blank size varinat crossbow-custom-leather-belt-blank size varinat",
    },
    {
      id: "5",
      title: "RING & LOOP BELT",
    },
    {
      id: "5",
      title: "Option Set 7",
    },
  ]);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState([
    { step: 1, label_on_product: "" },
    { step: 2, label_on_product: "" },
    { step: 3, label_on_product: "" },
  ]);

  function handleNextChange() {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Final Form Data:", formData);
      setIsModalActive(false);
    }
  }

  return (
    <Page>
      <TitleBar title="Option Sets">
        <button onClick={handleModalChange}>Launch wizard</button>
        <button>Create Infinite-Bundle Set</button>
      </TitleBar>
      <Layout>
        <Layout.Section>
          {cardData?.map(({ id, title }, index) => {
            return <CollapsibleCard id={id} title={title} />;
          })}
        </Layout.Section>
        <Layout.Section>
          <MediaCardComponent />
        </Layout.Section>
      </Layout>
      {isModalActive && (
        <ModalComponent
          label={"Setup your field"}
          active={isModalActive}
          handleChange={handleModalChange}
          onNext={handleNextChange}
          currentStep={currentStep}
        >
          <TabComponent
            currentStep={currentStep}
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextChange}
          />
        </ModalComponent>
      )}
    </Page>
  );
}

function CollapsibleCard({ id, title }) {
  const [openCollapsibleCard, setOpenCollapsibleCard] = useState(false);
  const handleToggle = useCallback(
    () => setOpenCollapsibleCard((openCollapsibleCard) => !openCollapsibleCard),
    [],
  );
  const [fields, setFields] = useState([0]);

  const handleAddField = () => {
    setFields((prevFields) => [...prevFields, fields.length]);
  };
  // Remove a specific field
  const handleRemoveField = (index) => {
    setFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  // Action Button
  const actions = [
    {
      content: "Duplicate",
      onAction: () => console.log("Duplicated!"),
    },
    {
      content: "Remove",
      onAction: () => console.log("Removed!"),
    },
  ];

  return (
    <div className="dropdown-card">
      <div className="dropdown-card-header">
        <div className="dropdown-card-header" onClick={handleToggle}>
          <span>
            {openCollapsibleCard ? (
              <Icon source={ChevronDownIcon} tone="base" />
            ) : (
              <Icon source={ChevronRightIcon} tone="base" />
            )}
          </span>
          <Text variant="headingsm" as="p" style={{ color: "blue" }}>
            {title}
          </Text>
        </div>

        <ActionListInPopover actions={actions} />
      </div>
      <Collapsible
        open={openCollapsibleCard}
        id="basic-collapsible"
        transition={{ duration: "150ms", timingFunction: "ease-in-out" }}
        expandOnPrint
      >
        <ProductFilter />
        {fields?.map((field, index) => (
          <div key={index}>
            <SubCollapsibleCard
              index={index}
              handleRemoveField={handleRemoveField}
            />
          </div>
        ))}
        <Button onClick={handleAddField}>Add Another Custom Field</Button>
      </Collapsible>
    </div>
  );
}

function SubCollapsibleCard({ index, handleRemoveField }) {
  const [open, setOpen] = useState(false);
  const handleToggle = useCallback((e) => {
    e.stopPropagation();
    setOpen((open) => !open);
  }, []);

  return (
    <div className="sub-dropdown-card" onClick={handleToggle}>
      <div className="sub-dropdown-card-header">
        <div className="dropdown-card-header">
          <span>
            {open ? (
              <Icon source={ChevronDownIcon} tone="base" />
            ) : (
              <Icon source={ChevronRightIcon} tone="base" />
            )}
          </span>

          <TextInputField label={"Label on Product"} />
        </div>
        <span onClick={() => handleRemoveField(index)}>
          <Icon source={DeleteIcon} tone="base" />
        </span>
      </div>
      <Collapsible
        open={open}
        id="basic-collapsible"
        transition={{ duration: "150ms", timingFunction: "ease-in-out" }}
        expandOnPrint
      >
        <div style={{ padding: "8px", marginTop: "10px" }}>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <TextInputField label={"Label on Cart"} />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <TextSelectField label={"Label on Product"} />
            </Grid.Cell>
          </Grid>
        </div>
      </Collapsible>
    </div>
  );
}

function MediaCardComponent() {
  return (
    <MediaCard
      title="Google Sheets based reporting for smarter business decision making"
      primaryAction={{
        content: "Learn more",
        onAction: () => {},
      }}
      description="Gain a better understanding of how well your product bundles are performing with enhanced reporting capabilities. Automatically send Infinite Options product bundle data directly into a Google Sheet today so you can make better decisions for tomorrow."
      popoverActions={[{ content: "Dismiss", onAction: () => {} }]}
    >
      <img
        alt=""
        width="100%"
        height="100%"
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
        src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
      />
    </MediaCard>
  );
}

function ActionListInPopover({ actions }) {
  const [active, setActive] = useState(false);

  // Toggle Popover
  const toggleActive = useCallback(() => setActive((prev) => !prev), []);

  // Popover activator button
  const activator = (
    <button onClick={toggleActive} disclosure>
      <Icon source={MenuHorizontalIcon} tone="base" />
    </button>
  );

  return (
    <div>
      <Popover active={active} activator={activator} onClose={toggleActive}>
        <ActionList actionRole="menuitem" items={actions} />
      </Popover>
    </div>
  );
}

function TextInputField({ label }) {
  const [value, setValue] = useState("Jaded Pixel");
  return (
    <TextField
      label={label}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      autoComplete="off"
    />
  );
}

function TextSelectField({ label }) {
  const [selected, setSelected] = useState("today");

  const options = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 days", value: "lastWeek" },
  ];

  return (
    <Select
      label={label}
      options={options}
      onChange={(e) => setSelected(e.target.value)}
      value={selected}
    />
  );
}

const ProductFilter = () => {
  const [selectedFilter, setSelectedFilter] = useState("Handle");
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="filter-container">
      <div className="filter-container-header">
        <div className="filter-text-container">
          <p className="filter-text">When product</p>
          <select
            className="filter-dropdown"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="Handle">Handle</option>
            <option value="Title">Title</option>
            <option value="SKU">SKU</option>
          </select>
        </div>

        <p className="filter-text">is</p>

        {/* Input field */}
        <input
          type="text"
          className="filter-input"
          placeholder="Enter product..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        {/* AND & OR buttons */}
        <button className="filter-button">AND</button>
        <button className="filter-button">OR</button>
      </div>
      <div className="filter-container-footer">
        <Button className="filter-preview">Preview 1 matching product</Button>
      </div>
    </div>
  );
};

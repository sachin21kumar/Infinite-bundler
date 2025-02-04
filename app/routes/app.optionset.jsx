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

export default function OptionSetPage() {
  const [isModalActive, setIsModalActive] = useState(false);
  const handleModalChange = useCallback(
    () => setIsModalActive((active) => !active),
    [],
  );
  return (
    <Page>
      <TitleBar title="Option Sets">
        <button onClick={handleModalChange}>Launch wizard</button>
        <button>Create Infinite-Bundle Set</button>
      </TitleBar>
      <Layout>
        <Layout.Section>
          <CollapsibleCard />
          <CollapsibleCard />
          <CollapsibleCard />
          <CollapsibleCard />
          <CollapsibleCard />
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
        >
          <TabComponent />
        </ModalComponent>
      )}
    </Page>
  );
}

function CollapsibleCard() {
  const [open, setOpen] = useState(false);
  const handleToggle = useCallback(() => setOpen((open) => !open), []);
  const [fields, setFields] = useState([0]);
  // Add a new field
  const handleAddField = () => {
    setFields((prevFields) => [...prevFields, fields.length]);
  };

  // Remove a specific field
  const handleRemoveField = (index) => {
    setFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  return (
    <div className="dropdown-card" onClick={handleToggle}>
      <div className="dropdown-card-header">
        <div className="dropdown-card-header">
          <span>
            {open ? (
              <Icon source={ChevronDownIcon} tone="base" />
            ) : (
              <Icon source={ChevronRightIcon} tone="base" />
            )}
          </span>
          <Text variant="headingsm" as="p">
            Online store dashboard
          </Text>
        </div>
        <Button>
          <ActionListInPopover />
        </Button>
      </div>
      <Collapsible
        open={open}
        id="basic-collapsible"
        transition={{ duration: "150ms", timingFunction: "ease-in-out" }}
        expandOnPrint
      >
        {fields.map((field, index) => (
          <div
            key={index}
            style={{
              padding: "8px",
              marginBottom: "4px",
            }}
          >
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

function ActionListInPopover() {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const handleImportedAction = useCallback(() => console.log("Duplicate"), []);

  const handleExportedAction = useCallback(() => console.log("Remove"), []);

  const activator = (
    <button onClick={toggleActive} disclosure>
      <Icon source={MenuHorizontalIcon} tone="base" />
    </button>
  );

  return (
    <div>
      <Popover
        active={active}
        activator={activator}
        autofocusTarget="first-node"
        onClose={toggleActive}
      >
        <ActionList
          actionRole="menuitem"
          items={[
            {
              content: "Import file",
              onAction: handleImportedAction,
            },
            {
              content: "Export file",
              onAction: handleExportedAction,
            },
          ]}
        />
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

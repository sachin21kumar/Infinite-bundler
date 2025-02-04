import React, { useState, useCallback, useReducer } from "react";
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
  Grid,
  Icon,
  Select,
  Popover,
  ActionList,
  Page,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function OptionSetPage() {
  return (
    <Page>
      <TitleBar title="Option Sets" />
      <Layout>
        <Layout.Section>
          <CollapsibleCard />
          <CollapsibleCard />
        </Layout.Section>
      </Layout>
    </Page>
  );
}

// Reducer for managing fields dynamically
function fieldsReducer(state, action) {
  switch (action.type) {
    case "ADD_FIELD":
      return [...state, { id: state.length }];
    case "REMOVE_FIELD":
      return state.filter((_, index) => index !== action.index);
    default:
      return state;
  }
}

function CollapsibleCard() {
  const [open, setOpen] = useState(false);
  const handleToggle = useCallback(() => setOpen((open) => !open), []);

  // Use useReducer for dynamic field management
  const [fields, dispatch] = useReducer(fieldsReducer, [{ id: 0 }]);

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
            key={field.id}
            style={{
              padding: "8px",
              marginBottom: "4px",
            }}
          >
            <SubCollapsibleCard
              index={index}
              handleRemoveField={() =>
                dispatch({ type: "REMOVE_FIELD", index })
              }
            />
          </div>
        ))}
        <Button onClick={() => dispatch({ type: "ADD_FIELD" })}>
          Add Another Custom Field
        </Button>
      </Collapsible>
    </div>
  );
}

function SubCollapsibleCard({ index, handleRemoveField }) {
  const [open, setOpen] = useState(false);
  const handleToggle = useCallback(() => setOpen((open) => !open), []);

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
        <span onClick={handleRemoveField}>
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
  const [value, setValue] = useState("");
  return (
    <TextField
      label={label}
      value={value}
      onChange={(e) => setValue(e)}
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
      onChange={(e) => setSelected(e)}
      value={selected}
    />
  );
}

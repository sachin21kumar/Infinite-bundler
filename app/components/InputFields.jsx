import { Checkbox, TextField, ChoiceList } from "@shopify/polaris";
import { useState, useCallback } from "react";

function TextInputField({ label }) {
  const [value, setValue] = useState("Jhon Doe");

  return (
    <TextField
      size="medium"
      autoSize={true}
      label={label}
      value={value}
      onChange={""}
      autoComplete="off"
    />
  );
}

function CheckboxField() {
  const [data, setData] = useState([
    { label: "Basic checkbox 1", checked: false },
    { label: "Basic checkbox 2", checked: false },
    { label: "Basic checkbox 3", checked: false },
    { label: "Basic checkbox 4", checked: false },
    { label: "Basic checkbox 5", checked: false },
    { label: "Basic checkbox 6", checked: false },
    { label: "Basic checkbox 7", checked: false },
    { label: "Basic checkbox 8", checked: false },
    { label: "Basic checkbox 9", checked: false },
    { label: "Basic checkbox 10", checked: false },
  ]);

  const handleCheckboxChange = (index) => {
    setData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {data.map(({ label, checked }, index) => (
        <Checkbox
          key={index}
          label={label}
          checked={checked}
          onChange={() => handleCheckboxChange(index)}
        />
      ))}
    </div>
  );
}

function SingleChoiceListField() {
  const [selected, setSelected] = useState(["hidden"]);
  const handleChange = useCallback((value) => setSelected(value), []);
  return (
    <ChoiceList
      title="Select a product type to add options to."
      choices={[
        { label: "Hidden", value: "hidden" },
        { label: "Optional", value: "optional" },
        { label: "Required", value: "required" },
      ]}
      selected={selected}
      onChange={handleChange}
    />
  );
}

export { CheckboxField, TextInputField, SingleChoiceListField };

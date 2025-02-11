import { Checkbox, TextField, ChoiceList } from "@shopify/polaris";
import { useState, useCallback } from "react";

function TextInputField({ label, value, onChange }) {
  return (
    <input
      type="text"
      placeholder={label}
      value={value}
      onChange={onChange}
      autoComplete="off"
      style={{
        padding: "12px 16px",
        fontSize: "16px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        width: "100%",
        outline: "none",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        transition: "border-color 0.3s ease-in-out",
      }}
    />
  );
}

function CheckboxField({ products, handleCheckboxChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {products?.length > 0 ? (
        products?.map((item, index) => (
          <Checkbox
            key={item.id}
            label={item.title}
            checked={item.checked}
            onChange={() => handleCheckboxChange(index)}
          />
        ))
      ) : (
        <p>No matching products found.</p>
      )}
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

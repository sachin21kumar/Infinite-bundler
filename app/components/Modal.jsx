import { Modal, TextContainer } from "@shopify/polaris";

function ModalComponent({ label, active, handleChange, children }) {
  return (
    <Modal
      open={active}
      onClose={handleChange}
      title={label}
      size="large"
      primaryAction={{
        content: "Next",
        onAction: handleChange,
      }}
      secondaryActions={[
        {
          content: "View Help Docs",
          onAction: handleChange,
        },
      ]}
    >
      <Modal.Section>
        <TextContainer>
          <div style={{ height: "300px" }}>{children}</div>
        </TextContainer>
      </Modal.Section>
    </Modal>
  );
}

export default ModalComponent;

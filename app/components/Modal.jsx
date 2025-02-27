import { Modal, TextContainer } from "@shopify/polaris";

function ModalComponent({
  label,
  active,
  handleChange,
  children,
  onNext,
  currentStep,
}) {
  return (
    <Modal
      open={active}
      onClose={handleChange}
      title={label}
      size="large"
      primaryAction={{
        content: currentStep === 3 ? "Save" : "Next",
        onAction: onNext,
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

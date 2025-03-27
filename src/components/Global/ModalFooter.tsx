import React from "react";
import CustomButton from "./CustomButton";

interface ModalFooterProps {
  okBtnLoading?: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  onOk?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  cancelVariant?: "primary" | "secondary" | "default" | "danger" | null;
  okVariant?: "primary" | "secondary" | "default" | "danger" | null;
}

function ModalFooter({
  okBtnLoading,
  setOpenModal,
  onOk = () => {},
  onCancel = () => {},
  okText = "Cancel",
  cancelText = "Ok",
  cancelVariant = "default",
  okVariant = "secondary",
}: ModalFooterProps) {
  return (
    <div className="flex items-center gap-4 w-full justify-end ">
      <CustomButton
        text={cancelText}
        onClick={() => {
          setOpenModal(false);
          onCancel();
        }}
        variant={cancelVariant}
      />
      <CustomButton
        loading={okBtnLoading}
        text={okText}
        variant={okVariant}
        className="bg-btn_primary text-primary_clr hover:bg-secondary_clr hover:text-white transition-all "
        onClick={onOk}
      />
    </div>
  );
}

export default ModalFooter;

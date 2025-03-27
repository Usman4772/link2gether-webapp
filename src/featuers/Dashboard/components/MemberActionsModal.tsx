import ActionModal from "@/components/Global/ActionModal";
import ModalFooter from "@/components/Global/ModalFooter";
import React from "react";

interface MemberActionsModalProps {
  openModal: boolean;
  setOpenModal: any;
  actionType?: "make" | "remove";
  btnLoading?: boolean;
  onConfirmAction: () => void;
  onCancel: () => void;
}

function MemberActionsModal({
  openModal,
  setOpenModal,
  actionType = "make",
  btnLoading,
  onConfirmAction,
  onCancel,
}: MemberActionsModalProps) {
  return (
    <ActionModal
      openModal={openModal}
      setOpenModal={setOpenModal}
      heading={actionType == "make" ? "Make Mode" : "Remove Mode"}
      subheading={
        actionType == "make"
          ? "Are you sure you want to make this user a moderator?"
          : "Are you sure you want to remove this user from moderator?"
      }
      icon={actionType == "make" ? "/think.jpg" : "/delete-vector.jpg"}
      footer={
        <ModalFooter
          setOpenModal={setOpenModal}
          okBtnLoading={btnLoading}
          onOk={onConfirmAction}
          okText={actionType == "make" ? "Make" : "Remove"}
          cancelText="Cancel"
          cancelVariant="default"
          okVariant={actionType == "make" ? "secondary" : "danger"}
          onCancel={onCancel}
        />
      }
    />
  );
}

export default MemberActionsModal;

import ActionModal from "@/components/Global/ActionModal";
import ModalFooter from "@/components/Global/ModalFooter";
import React from "react";

interface RequestActionModalProps {
  openModal: boolean;
  setOpenModal: any;
  isApprovalModal?: boolean;
  btnLoading?: boolean;
  onConfirmAction: () => void;
  onCancel: () => void;
}

function RequestActionModal({
  openModal,
  setOpenModal,
  isApprovalModal = false,
  btnLoading,
  onConfirmAction,
  onCancel,
}: RequestActionModalProps) {
  return (
    <ActionModal
      openModal={openModal}
      setOpenModal={setOpenModal}
      heading={isApprovalModal ? "Approve Request" : "Reject Request"}
      subheading={
        isApprovalModal
          ? "Are you sure you want to approve this request?"
          : "Are you sure you want to reject this request?"
      }
      icon={isApprovalModal ? "/approve.jpg" : "/reject-vector.jpg"}
      btnLoading={btnLoading}
      okText={isApprovalModal ? "Approve" : "Reject"}
      footer={
        <ModalFooter
          setOpenModal={setOpenModal}
          okBtnLoading={btnLoading}
          onOk={onConfirmAction}
          okText={isApprovalModal ? "Approve" : "Reject"}
          cancelText="Cancel"
          cancelVariant="default"
          okVariant={isApprovalModal ? "secondary" : "danger"}
          onCancel={onCancel}
        />
      }
    />
  );
}

export default RequestActionModal;

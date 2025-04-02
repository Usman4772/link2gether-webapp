import ActionModal from "@/components/Global/ActionModal";
import CustomButton from "@/components/Global/CustomButton";
import React from "react";
import DismissReportIcon from "./DismissIcon";

interface DismissReportModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirmAction: () => void;
  loading: boolean;
}

function DismissReportModal({
  openModal,
  setOpenModal,
  onConfirmAction,
  loading,
}: DismissReportModalProps) {
  return (
    <ActionModal
      openModal={openModal}
      setOpenModal={setOpenModal}
      heading={"Dismiss Report Request"}
      subheading="Are you sure you want to dismiss this report request?"
      IconComponent={<DismissReportIcon />}
      footer={
        <div className="flex items-center gap-4 w-full justify-end ">
          <CustomButton
            text="Cancel"
            onClick={() => setOpenModal(false)}
            variant={"default"}
          />
          <CustomButton
            text="Dismiss"
            variant={"danger"}
            loading={loading}
            className="bg-btn_primary text-primary_clr hover:bg-secondary_clr hover:text-white transition-all "
            onClick={() => onConfirmAction()}
          />
        </div>
      }
    />
  );
}

export default DismissReportModal;

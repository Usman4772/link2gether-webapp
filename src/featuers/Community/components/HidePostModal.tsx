import ActionModal from "@/components/Global/ActionModal";
import CustomButton from "@/components/Global/CustomButton";
import HidePostIcon from "@/featuers/Post/components/HidePostIcon";
import React from "react";

interface HidePostModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirmAction: () => void;
  loading: boolean;
}

function HidePostModal({
  openModal,
  setOpenModal,
  onConfirmAction,
  loading,
}: HidePostModalProps) {
  return (
    <ActionModal
      openModal={openModal}
      setOpenModal={setOpenModal}
      heading={"Hide Post"}
      subheading="Are you sure you want to hide this post?"
      IconComponent={<HidePostIcon />}
      footer={
        <div className="flex items-center gap-4 w-full justify-end ">
          <CustomButton
            text="Cancel"
            onClick={() => setOpenModal(false)}
            variant={"default"}
          />
          <CustomButton
            text="Hide"
            variant={"secondary"}
            loading={loading}
            className="bg-btn_primary text-primary_clr hover:bg-secondary_clr hover:text-white transition-all "
            onClick={() => onConfirmAction()}
          />
        </div>
      }
    />
  );
}

export default HidePostModal;

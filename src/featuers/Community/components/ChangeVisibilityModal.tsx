import ActionModal from "@/components/Global/ActionModal";
import CustomButton from "@/components/Global/CustomButton";
import React from "react";
import useUpdateCommunity from "../hooks/useUpdateCommunity";

interface ChangeVisibilityModalProps {
  data: any;
  id: string | number;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChangeVisibilityModal({
  data,
  id,
  openModal,
  setOpenModal,
}: ChangeVisibilityModalProps) {
  const { changeVisibility, visibilityBtnLoading } = useUpdateCommunity({
    id: id,
    setOpenModal: setOpenModal,
  });

  return (
    <ActionModal
      heading={`Change visibility to ${
        data?.visibility === "public" ? "private" : "public"
      }`}
      subheading="Are you sure you want to change the visibility of this community?"
      icon={"/decision_vector.jpg"}
      openModal={openModal}
      setOpenModal={setOpenModal}
      footer={
        <div className="flex items-center gap-4 w-full justify-end ">
          <CustomButton text="Cancel" onClick={() => setOpenModal(false)}  variant={"default"}/>
          <CustomButton
            loading={visibilityBtnLoading}
            text="Change"
            variant={"secondary"}
            className="bg-btn_primary text-primary_clr hover:bg-secondary_clr hover:text-white transition-all "
            onClick={() => changeVisibility(data)}
          />
        </div>
      }
    />
  );
}

export default ChangeVisibilityModal;

"use client";
import CustomModal from "@/components/Global/CustomModal";
import EditForm from "./EditFrom";


export default function EditCommunityModal({
  id,
  initialData,
  openModal,
  setOpenModal,
}: {
    id: string | number;
  initialData: any;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <CustomModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        body={<EditForm initialData={initialData} id={ id} setOpenModal={setOpenModal} />}
        width={500}
        footer={null}
        className="custom-modal"
      />
    </>
  );
}

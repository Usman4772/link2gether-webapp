"use client";
import CustomModal from "@/components/Global/CustomModal";
import { forwardRef, useRef } from "react";
import CreatePostForm from "./CreatPostForm";

const images = ["/education.jpg", "/music.jpg", "/technology.jpg"];

export default function CreatePostModal({
  openModal,
  setOpenModal,
  id,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string | number;
}) {
  const formRef = useRef<any>(null);
  return (
    <>
      <CustomModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        body={
          <CreatePostModalBody
            ref={formRef}
            id={id}
            setOpenModal={setOpenModal}
          />
        }
        width={1000}
        footer={null}
        className="custom-modal"
        // onCancel={() => formRef.current?.resetForm()}
      />
    </>
  );
}

interface CreateFormProps {
  props?: any;
}

const CreatePostModalBody = forwardRef<CreateFormProps, any>(
  function CreatePostModalBody({ setOpenModal, id }, ref) {
    return <CreatePostForm setOpenModal={setOpenModal} id={id} ref={ref} />;
  }
);

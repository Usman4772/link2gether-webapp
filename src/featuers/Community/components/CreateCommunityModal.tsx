"use client";
import CustomModal from "@/components/Global/CustomModal";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppSelector";
import { setOpenCreateCommunityModal } from "@/redux/Slices/create.community.slice";
import { forwardRef, useRef } from "react";
import CreateForm from "./CreateForm";
import ModalFooter from "@/components/Global/ModalFooter";
import { Form } from "antd";

const images = ["/art.jpg", "/travel.jpg", "/gaming.jpg"];

export default function CreateCommunityModal() {
  const states = useAppSelector((state: any) => state.createCommunity.create);
  const dispatch = useAppDispatch();

  const formRef = useRef<any>(null);
  return (
    <>
      <CustomModal
        openModal={states.openCreateCommunityModal}
        dispatchEvent={true}
        setOpenModal={() => dispatch(setOpenCreateCommunityModal(false))}
        body={<CreateModalBody ref={formRef}  />}
        footer={null}
        width={800}
        onCancel={() => formRef.current?.resetForm()}
      />
    </>
  );
}

interface CreateFormProps {
  props?: any;
}

const CreateModalBody = forwardRef<CreateFormProps, any>(
  function CreateModalBody({ props }, ref) {
    return <CreateForm ref={ref}  />;
  }
);

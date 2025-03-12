import CustomButton from "@/components/Global/CustomButton";
import {
  CustomInput,
  CustomSelectBox,
  CustomTextArea,
} from "@/components/Global/CustomFormFields";
import CustomModal from "@/components/Global/CustomModal";
import Heading from "@/components/Global/Heading";
import Paragraph from "@/components/Global/Paragraph";
import { Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import useBanUser from "../hooks/useBanUser";

interface BanUserModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  communityId: string | number |undefined;
  userId:string | number
}

function BanUserModal({ openModal, setOpenModal,communityId,userId }: BanUserModalProps) {
  return (
    <CustomModal
      openModal={openModal}
      setOpenModal={setOpenModal}
      width={800}
      footer={null}
      body={<BanUserBody userId={userId} communityId={communityId} setOpenModal={setOpenModal } />}
      title={<Header />}
    />
  );
}

export default BanUserModal;

function Header() {
  return (
    <div className="flex flex-col py-4">
      <Heading text="Ban user" />
      <Paragraph text="The user will not be able to post anything in this community duration ban duration." />
    </div>
  );
}



interface BanUserBodyProps{
  userId: string | number;
  communityId: string | number | undefined;
  setOpenModal:React.Dispatch<React.SetStateAction<boolean>>
  
}
function BanUserBody({ userId, communityId,setOpenModal }:BanUserBodyProps) {
  const [form] = Form.useForm();

  const {banBtnLoading,banUser}=useBanUser({setOpenModal})

  const banDuration = [
    {
      key: "1",
      label: "1 day",
      value: "one_day",
    },
    {
      key: "2",
      label: "1 week",
      value: "one_week",
    },
    {
      key: "3",
      label: "1 month",
      value: "one_month",
    },
    {
      key: "4",
      label: "Forever",
      value: "forever",
    },
  ];


  return (
    <Form
      layout="vertical"
      onFinish={(values) => {
       banUser(values,communityId,userId)
      }}
      form={form}
    >
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please enter the reason for banning this user",
          },
        ]}
        name={"reason"}
      >
        <TextArea
          placeholder="Enter reason"
          className="text-text_secondary focus:shadow-none focus:border-text_secondary focus:outline-text_secondary py-4"
        />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please select the ban duration",
          },
        ]}
        name={"duration"}
      >
        <Select
          placeholder="Select ban duration"
          options={banDuration}
          className="custom-select-box !text-text_secondary"
        />
      </Form.Item>
      <CustomButton variant={"secondary"} text="Ban User" type="submit" loading={ banBtnLoading} />
    </Form>
  );
}

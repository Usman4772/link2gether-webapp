import {
  CustomInput,
  CustomSelect,
} from "@/components/Global/AntDesignFormFields";
import CustomButton from "@/components/Global/CustomButton";
import CustomModal from "@/components/Global/CustomModal";
import { Form } from "antd";
import React from "react";

function BanUserModal({
  form,
  openModal,
  setOpenModal,
  btnLoading,
  onConfirmAction,
  onCancel,
}: any) {
  return (
    <CustomModal
      title="Ban User"
      openModal={openModal}
      setOpenModal={setOpenModal}
      body={
        <BanUserForm
          form={form}
          onConfirmAction={onConfirmAction}
          loading={btnLoading}
        /> 
      }
      onCancel={() => form.resetFields()}
    />
  );
}

export default BanUserModal;

function BanUserForm({ form, onConfirmAction, loading }: any) {
  const duration = [
    {
      label: "One Day",
      value: "one_day",
    },
    {
      label: "One Week",
      value: "one_week",
    },
    {
      label: "One Month",
      value: "one_month",
    },
    {
      label: "Forever",
      value: "forever",
    },
  ];
  return (
    <Form layout="vertical" form={form} onFinish={onConfirmAction}>
      <Form.Item
        label="Reason"
        name="reason"
        rules={[{ required: true, message: "Please input the reason!" }]}
      >
        <CustomInput placeholder="Enter ban reason" />
      </Form.Item>
      <Form.Item
        label="Duration"
        name="duration"
        rules={[{ required: true, message: "Please select the duration!" }]}
      >
        <CustomSelect placeholder="Select ban duration" options={duration} />
      </Form.Item>
      <div className="w-full flex items-center justify-end ">
        <CustomButton variant={"danger"} text="Ban User" loading={loading} />
      </div>
    </Form>
  );
}

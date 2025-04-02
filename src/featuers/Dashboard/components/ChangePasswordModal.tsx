"use client";

import { useState } from "react";
import { Modal, Form, Input, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import CustomModal from "@/components/Global/CustomModal";
import CustomButton from "@/components/Global/CustomButton";
import useUpdatePassword from "../hooks/useUpdatePassword";

interface ChangePasswordModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePasswordModal({
  openModal,
  setOpenModal,
}: ChangePasswordModalProps) {
  const [form] = Form.useForm();

  function resetForm() {
    form.resetFields();
    setOpenModal(false);
  }
  return (
    <CustomModal
      title="Change Password"
      openModal={openModal}
      width={600}
      setOpenModal={setOpenModal}
      onCancel={() =>resetForm()}
      okText="Change Password"
      body={<ChangePasswordForm form={form} reset={ resetForm} />}
    ></CustomModal>
  );
}

function ChangePasswordForm({ form ,reset}: { form: any,reset:()=>void }) {


  const {updatePassword,passwordBtnLoading}=useUpdatePassword(reset)
  const validatePassword = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error("Please input your password!"));
    }

    if (value.length < 8) {
      return Promise.reject(
        new Error("Password must be at least 8 characters")
      );
    }

    if (!/[a-z]/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one lowercase letter")
      );
    }

    if (!/[A-Z]/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one uppercase letter")
      );
    }

    if (!/[0-9]/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one number")
      );
    }

    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one special character")
      );
    }

    return Promise.resolve();
  };

  const validateConfirmPassword = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error("Please confirm your password!"));
    }

    if (form.getFieldValue("new_password") !== value) {
      return Promise.reject(new Error("The two passwords do not match!"));
    }

    return Promise.resolve();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={updatePassword}
      autoComplete="off"
    >
      <Form.Item
        name="old_password"
        label="Current Password"
        rules={[
          { required: true, message: "Please input your current password!" },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Current Password"
          style={{
            padding: "13px",
            borderRadius: "6px",
          }}
        />
      </Form.Item>

      <Form.Item
        name="new_password"
        label="New Password"
        rules={[
          { required: true, message: "Please input your new password!" },
          { validator: validatePassword },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="New Password"
          style={{
            padding: "13px",
            borderRadius: "6px",
          }}
        />
      </Form.Item>

      <Form.Item
        name="confirm_password"
        label="Confirm New Password"
        dependencies={["new_password"]}
        rules={[
          { required: true, message: "Please confirm your new password!" },
          { validator: validateConfirmPassword },
        ]}
      >
        <Input.Password
          style={{
            padding: "13px",
            borderRadius: "6px",
          }}
          prefix={<LockOutlined />}
          placeholder="Confirm New Password"
        />
      </Form.Item>
      <div className="w-full flex items-center justify-end">
        <CustomButton text="Change Password" variant={"secondary"} className="py-3" loading={ passwordBtnLoading} />
      </div>
    </Form>
  );
}

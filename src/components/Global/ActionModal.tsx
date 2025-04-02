import { Modal } from "antd";
import Image from "next/image";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import React from "react";

interface ModalProps {
  heading: string;
  subheading: string;
  icon?: string | null;
  openModal: boolean;
  btnLoading?: boolean;
  setOpenModal: any;
  closeable?: boolean;
  IconComponent?: React.ReactNode | null;
  className?: string;
  onConfirmAction?: () => void;
  onCancel?: () => void;
  title?: string | React.ReactNode;
  btnBg?: string;
  width?: number;  height?: number;
  okText?: string;
  cancelText?: string;
  okBtnStyles?: string;
  cancelBtnStyles?: string;
  footer?: React.ReactNode | null;
}

function ActionModal({
  heading,
  subheading,
  icon=null,
  openModal,
  btnLoading,
  setOpenModal,
  closeable = true,
  className = "",
  onConfirmAction = () => {},
  onCancel = () => {},
  title,
  btnBg = "red",
  width = 400,
  height = 400,
  okText = "Confirm",
  cancelText = "Cancel",
  okBtnStyles = "",
  cancelBtnStyles = "",
  IconComponent=null,
  footer = null,
}: ModalProps) {
  const handleCancel = () => {
    setOpenModal(false)
    onCancel();
  };
  return (
    <div>
      <Modal
        title={<div className="pt-4">{title}</div>}
        centered
        open={openModal}
        confirmLoading={btnLoading}
        onCancel={handleCancel}
        maskClosable={false}
        onOk={onConfirmAction}
        okText={okText}
        cancelText={cancelText}
        closable={closeable}
        className={className}
        footer={footer}
        okButtonProps={{ className: okBtnStyles }}
        cancelButtonProps={{
          className: cancelBtnStyles,
        }}
        width={width}
          >
              <div className="flex items-start justify-center flex-col gap-4">
          {icon && !IconComponent && <Image src={icon} alt="confirm" width={200} height={200} />}
          {IconComponent && <div>{IconComponent}</div>}
          <Heading text={heading} size="17px"/>
          <Paragraph text={ subheading} />
              </div>
      </Modal>
    </div>
  );
}

export default ActionModal;

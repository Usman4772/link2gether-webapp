import { Modal } from "antd";


interface ModalProps {
  openModal: boolean;
  btnLoading?: boolean;
  setOpenModal: any;
  closeable?: boolean;
  className?: string;
  onConfirmAction?: () => void;
  onCancel?: () => void;
  title?: string | React.ReactNode;
  btnBg?: string;
  width?: number;
  body: React.ReactNode;
  height?: number;
  okText?: string;
  cancelText?: string;
    okBtnStyles?: string;
    dispatchEvent?: boolean;
  cancelBtnStyles?: string;
  footer?: boolean | null;
}

function CustomModal({
  openModal,
  btnLoading,
  setOpenModal,
    closeable = true,
  dispatchEvent=false,
  className = "",
  onConfirmAction = () => {},
  onCancel = () => {},
  title,
  btnBg = "red",
  width = 400,
  body,
  height = 400,
  okText = "Confirm",
  cancelText = "Cancel",
  okBtnStyles = "",
  cancelBtnStyles = "",
  footer = true,
}:ModalProps) {
    const handleCancel = () => {
        if (dispatchEvent) {
            setOpenModal()
        } else {
            setOpenModal(false)
      }
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
        styles={{
          mask: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }
        }
        }
        footer={footer}
        okButtonProps={{ className: okBtnStyles }}
        cancelButtonProps={{
          className: cancelBtnStyles,
        }}
        width={width}
      >
        {body}
      </Modal>
    </div>
  );
}

export default CustomModal;

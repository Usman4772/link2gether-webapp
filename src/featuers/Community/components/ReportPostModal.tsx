import React, { useState } from "react";
import { Modal, Button } from "antd";

const ReportPostModal = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleOk = () => {
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Modal
        title="Submit a report"
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} // Remove default footer to customize
        className="custom-modal"
       
      >
        <div className="p-4">
          <p className="text-gray-700 mb-4">
            Thanks for looking out for yourself and your fellow redditors by
            reporting things that break the rules. Let us know what’s happening,
            and we’ll look into it.
          </p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded">
              Breaks r/pkmigrate rules
            </Button>
            <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded">
              Harassment
            </Button>
            <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded">
              Threatening violence
            </Button>
            <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded">
              Hate
            </Button>
            <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded">
              Minor abuse or sexualization
            </Button>
            <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded">
              Sharing personal information
            </Button>
            <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded">
              Non-consensual intimate media
            </Button>
            <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded">
              Prohibited transaction
            </Button>
            <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded">
              Impersonation
            </Button>
            <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded">
              Copyright violation
            </Button>
            <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded">
              Trademark violation
            </Button>
            <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded">
              Self-harm or suicide
            </Button>
            <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded">
              Spam
            </Button>
            <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded">
              Contributor Program violation
            </Button>
          </div>
          <p className="text-sm text-gray-500 mb-2">
            <span className="text-blue-500">i</span> Not sure if something is
            breaking the rules? Review the{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Reddit Rules & r/pkmigrate rules
            </a>
          </p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">
              Sharing personal information
            </h3>
            <p className="text-gray-700">
              Sharing or threatening to share private, personal, or confidential
              information about someone.
            </p>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              type="primary"
              onClick={handleOk}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              Next
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ReportPostModal;

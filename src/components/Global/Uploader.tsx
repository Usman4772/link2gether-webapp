"use client";

import { useState } from "react";
import { CameraOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function Uploader({
  fileList,
  setFileList,
  placeholder = "Profile Picture",
}: any) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div className="flex flex-col items-center justify-center h-full">
      <CameraOutlined className="text-lg text-neutral-500 mb-1" />
      <div className="text-xs text-neutral-500">{placeholder}</div>
    </div>
  );

  return (
    <div className="uploader-container">
      <Upload
        listType="picture-circle"
        fileList={fileList}
        accept="image/*"
        onPreview={handlePreview}
        onChange={handleChange}
        className="community-avatar-uploader"
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage || "/placeholder.svg"}
        />
      )}

      <style jsx global>{`
        .community-avatar-uploader .ant-upload-select {
          border: 1px dashed #d9d9d9;
          border-radius: 100%;
          cursor: pointer;
          transition: all 0.3s;
          width: 100px !important;
          height: 100px !important;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .community-avatar-uploader .ant-upload-select:hover {
          border-color: #999;
        }

        .dark .community-avatar-uploader .ant-upload-select {
          border-color: #555;
          background-color: rgba(255, 255, 255, 0.03);
        }

        .dark .community-avatar-uploader .ant-upload-select:hover {
          border-color: #777;
        }

        .community-avatar-uploader .ant-upload-list-item-container {
          width: 100px !important;
          height: 100px !important;
        }
      `}</style>
    </div>
  );
}

export default Uploader;

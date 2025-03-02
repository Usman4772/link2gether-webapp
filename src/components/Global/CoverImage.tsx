"use client";
import type { UploadFile } from "antd";
import { Tooltip, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PiNotePencilFill } from "react-icons/pi";

interface CoverImageProps {
  isAdmin: boolean;
  cover: string | null;
  onUpload: (info: UploadChangeParam<UploadFile<any>>) => void;
  defaultImage: string;
  loading?: boolean;
}

function CoverImage({
  isAdmin,
  cover,
  onUpload,
  defaultImage,
  loading,
}: CoverImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [aspectRatio, setAspectRatio] = useState(16 / 9); 

  useEffect(() => {
    const updateAspectRatio = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = 218; // Fixed height from your CSS
        setAspectRatio(width / height);
      }
    };

    updateAspectRatio();

    window.addEventListener("resize", updateAspectRatio);
    return () => window.removeEventListener("resize", updateAspectRatio);
  }, []);


  const handleCropOk = (file: RcFile) => {
    const uploadInfo = {
      file: file as any,
      fileList: [
        {
          uid: "-1",
          name: file.name,
          status: "done",
          url: URL.createObjectURL(file),
          originFileObj: file,
        },
      ],
    } as UploadChangeParam<UploadFile<any>>;
onUpload(uploadInfo);
  };



   const modalButtonStyles = {
     okButtonProps: {
       style: {
         backgroundColor: "#7bf1a8",
         color: "#01352c",
         borderRadius: "8px",
         padding: "20px 30px",
       },
     },
     cancelButtonProps: {
       style: {
         backgroundColor: "#E8EDF5",
         color: "black",
         borderRadius: "8px",
         padding: "20px 30px",
       },
     },
   };

  return (
    <div
      ref={containerRef}
      className="relative group overflow-hidden flex items-center justify-center w-full h-[218px] object-cover rounded-[12px] group"
    >
      {loading ? (
        <Loader2 className="animate-spin " />
      ) : (
        <>
          <img
            src={cover || defaultImage}
            className="object-cover w-full h-full"
          />
          {isAdmin && (
            <Tooltip title="Change Cover">
              <ImgCrop
                  rotationSlider
                  modalProps={modalButtonStyles}
                  aspect={aspectRatio}
                  modalWidth={800}
                  modalOk="Update Cover"
                modalTitle="Crop Cover Image"
                showGrid
                onModalOk={(file) => handleCropOk(file as RcFile)}
              >
                <Upload
                  className="absolute top-2 right-3"
                  maxCount={1}
                    showUploadList={false}
                  accept="image/*"
                >
                  <div className="w-5 h-5 bg-gray-50 items-center justify-center rounded-full hidden group-hover:flex">
                    <PiNotePencilFill className="text-md cursor-pointer text-black font-bold" />
                  </div>
                </Upload>
              </ImgCrop>
            </Tooltip>
          )}
        </>
      )}
    </div>
  );
}

export default CoverImage;

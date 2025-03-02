import type { UploadFile } from "antd";
import { Tooltip, Upload } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { PiNotePencilFill } from "react-icons/pi";
import Loading from "./Loading";
import { Loader2 } from "lucide-react";

interface ProfilePictureProps {
  isAdmin: boolean;
  avatar: string | null;
  onUpload: (info: UploadChangeParam<UploadFile<any>>) => void;
  defaultImage: string;
  loading?: boolean;
}

function ProfilePicture({
  isAdmin,
  avatar,
  onUpload,
  defaultImage,
  loading,
}: ProfilePictureProps) {
  return (
    <div className="relative group w-[70px] h-[70px] rounded-[50%] overflow-hidden flex items-center justify-center">
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <img
            src={avatar || defaultImage}
            className="rounded-[50%] object-cover w-full h-full "
          />
          {isAdmin && (
            <Tooltip title="Change Avatar">
              <Upload
                onChange={onUpload}
                className="absolute top-1 right-2"
                accept="image/*"
                maxCount={1}
              >
                <div className="w-5 h-5 bg-gray-50  items-center justify-center rounded-full hidden group-hover:flex">
                  <PiNotePencilFill className="text-md cursor-pointer  text-black font-bold " />
                </div>
              </Upload>
            </Tooltip>
          )}
        </>
      )}
    </div>
  );
}

export default ProfilePicture;

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Check, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProfilePicture from "@/components/Global/ProfilePicture";
import ChangePasswordModal from "./ChangePasswordModal";
import CustomButton from "@/components/Global/CustomButton";
import { text } from "stream/consumers";
import { UserProps } from "./Header";
import useUpdateUser from "@/hooks/useUpdateUser";
import { CustomInput } from "@/components/Global/CustomFormFields";
import toast from "react-hot-toast";


export default function Profile({ data }: { data: UserProps }) {
  const { updateUser, loading } = useUpdateUser();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  const handleEdit = (field: string, value: string) => {
    setIsEditing(field);
    setEditValue(value);
  };

   const handleSave = async() => {
    if (isEditing) {
      if (editValue.trim().length === 0)
        return toast.error(`Please add ${isEditing} before updating`);
      if (data[isEditing as keyof UserProps] == editValue) {
        setIsEditing(null);
        return;
      }

     await updateUser({ [isEditing]: editValue });
      setIsEditing(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
  };

  return (
    <div className="w-[30%] flex justify-center pl-12 sticky top-0">
      <Card className="p-6 w-full   border-none shadow-none outline-none">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-amber-100 overflow-hidden mb-2 flex items-center justify-center">
              <ProfilePicture
                className="w-full h-full"
                avatar={data?.profileImage}
                onUpload={(param) => {
                  if (!param || !param?.fileList) return;
                  setIsEditing(null)
                  const newFile = param?.fileList;
                  updateUser({ profileImage: newFile});
                }}
                isAdmin={true}
                loading={!isEditing && loading}
                tooltipTitle="Change Profile Picture"
                defaultImage={"/default-user.jpeg"}
              />
            </div>
            <div className="absolute bottom-2 right-0 w-4 h-4 rounded-full bg-red-500"></div>
          </div>

          <h3 className="text-lg font-semibold mt-2">{data?.username}</h3>

          <div className="w-full mt-6 space-y-4">
            <div className="space-y-1">
              <div className="text-sm text-gray-500">Username</div>
              {isEditing === "username" ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="h-8"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleSave}
                    className="h-8 w-8"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      <Check className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleCancel}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="font-medium">{data?.username}</div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEdit("username", data?.username)}
                    className="h-8 w-8"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="text-sm text-gray-500">Email</div>
              {isEditing === "email" ? (
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Enter email address"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="h-8"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleSave}
                    className="h-8 w-8"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      <Check className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleCancel}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="font-medium">{data?.email}</div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEdit("email", data?.email)}
                    className="h-8 w-8"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="pt-4">
              <CustomButton
                variant="primary"
                className="w-full"
                onClick={() => setOpenPasswordModal(true)}
                text="Change Password"
              />
            </div>
          </div>
        </div>
        <ChangePasswordModal
          openModal={openPasswordModal}
          setOpenModal={setOpenPasswordModal}
        />
      </Card>
    </div>
  );
}

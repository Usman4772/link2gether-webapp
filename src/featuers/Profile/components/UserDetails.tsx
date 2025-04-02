"use client";

import ProfilePicture from "@/components/Global/ProfilePicture";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChangePasswordModal from "@/featuers/Dashboard/components/ChangePasswordModal";
import type { UserProps } from "@/featuers/Dashboard/components/Header";
import useUpdateUser from "@/hooks/useUpdateUser";
import { Check, Edit2, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import ProfileTabs from "./ProfileTabs";

export default function UserDetails({ data }: { data: UserProps }) {
  const { updateUser, loading } = useUpdateUser();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  const handleEdit = (field: string, value: string) => {
    setIsEditing(field);
    setEditValue(value);
  };

  const handleSave = async () => {
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
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        <div className="relative">
          <div className="w-28 h-28 rounded-full overflow-hidden">
            <ProfilePicture
              className="w-full h-full object-cover"
              avatar={data?.profileImage}
              onUpload={(param) => {
                if (!param || !param?.fileList) return;
                setIsEditing(null);
                const newFile = param?.fileList;
                updateUser({ profileImage: newFile });
              }}
              isAdmin={true}
              loading={!isEditing && loading}
              tooltipTitle="Change Profile Picture"
              defaultImage={"/default-user.jpeg"}
            />
          </div>
        </div>

        <div className="flex-1">
          {isEditing === "username" ? (
            <div className="flex items-center gap-2 mb-1 group">
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="h-9 max-w-xs"
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
            <div className="flex items-center gap-2 mb-1 group">
              <h2 className="text-2xl font-medium">{data?.username}</h2>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleEdit("username", data?.username)}
                className="h-8 w-8 text-gray-500 hidden group-hover:flex"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
          )}

          {isEditing === "email" ? (
            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter email address"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="h-9 max-w-xs"
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
            <div className="flex items-center gap-2 group">
              <p className="text-gray-500">{data?.email}</p>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleEdit("email", data?.email)}
                className="h-8 w-8 text-gray-500 hidden group-hover:flex"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <button
          onClick={() => setOpenPasswordModal(true)}
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-800 font-medium transition-colors"
        >
          Change password
        </button>
      </div>
      <ProfileTabs />
      <ChangePasswordModal
        openModal={openPasswordModal}
        setOpenModal={setOpenPasswordModal}
      />
    </div>
  );
}

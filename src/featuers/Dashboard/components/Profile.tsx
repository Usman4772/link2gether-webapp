"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProfilePicture from "@/components/Global/ProfilePicture";
import ChangePasswordModal from "./ChangePasswordModal";
import CustomButton from "@/components/Global/CustomButton";
import { text } from "stream/consumers";

interface ProfileData {
  name: string;
  username: string;
  email: string;
  avatar: string;
}

export default function Profile() {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Megan Norton",
    username: "@megnorton",
    email: "megan.norton@example.com",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EhBK3uyNFHa6VWOmSRz1hUzf8NgjAJ.png",
  });

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  const handleEdit = (field: string, value: string) => {
    setIsEditing(field);
    setEditValue(value);
  };

  const handleSave = () => {
    if (isEditing) {
      setProfileData({
        ...profileData,
        [isEditing]: editValue,
      });
      setIsEditing(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
  };

  return (
    <div className="w-[30%] flex justify-center pl-12 sticky top-0">
      <Card className="p-6 w-full border border-red-400 bg-gray-50 border-none shadow-none outline-none">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-amber-100 overflow-hidden mb-2 flex items-center justify-center">
              <ProfilePicture
                className="w-full h-full"
                avatar={profileData?.avatar}
                onUpload={()=>{}}
                isAdmin={true}
                loading={false}
                tooltipTitle="Change Profile Picture"
                defaultImage={"/default-avatar.jpeg"}
              />
            </div>
            <div className="absolute bottom-2 right-0 w-4 h-4 rounded-full bg-red-500"></div>
          </div>

          <h3 className="text-lg font-semibold mt-2">{profileData.name}</h3>

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
                    <Check className="h-4 w-4" />
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
                  <div className="font-medium">{profileData.username}</div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEdit("username", profileData.username)}
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
                    <Check className="h-4 w-4" />
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
                  <div className="font-medium">{profileData.email}</div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEdit("email", profileData.email)}
                    className="h-8 w-8"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="pt-4">
              <CustomButton variant="primary" className="w-full" onClick={() => setOpenPasswordModal(true)} text="Change Password"/>

            </div>
          </div>
        </div>
        <ChangePasswordModal openModal={ openPasswordModal} setOpenModal={setOpenPasswordModal}/>
      </Card>
    </div>
  );
}

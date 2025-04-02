"use client";
import CoverImage from "@/components/Global/CoverImage";
import CustomButton from "@/components/Global/CustomButton";
import Heading from "@/components/Global/Heading";
import ProfilePicture from "@/components/Global/ProfilePicture";
import { Tooltip } from "antd";
import Link from "next/link";
import { useState } from "react";
import { IoExitOutline } from "react-icons/io5";
import { PiPencilSimpleLineFill as EditIcon } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlinePublic, MdOutlineLock } from "react-icons/md";
import useCancelJoinRequest from "../hooks/useCancelJoinRequest";
import useJoinCommunity from "../hooks/useJoinCommunity";
import useLeaveCommunity from "../hooks/useLeaveCommunity";
import useUpdateCommunity from "../hooks/useUpdateCommunity";
import CreatePostModal from "./CreatePostModal";
import EditCommunityModal from "./EditCommunityModal";

function DetailPageHeader({ id, data }: { id: string | number; data: any }) {
  const [openPostModal, setOpenPostModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { isPending, join } = useJoinCommunity(id);
  const { leave, leaveBtnLoading } = useLeaveCommunity(id);
  const { cancelJoinRequest, cancelRequestBtnLoading } =
    useCancelJoinRequest(id);
  const { updateAvatar, avatarLoading, updateCover, coverLoading } =
    useUpdateCommunity({
      id,
      setOpenModal: setOpenEditModal,
    });

  const privateAndAdmin = data?.isAdmin && data?.visibility == "private";

  function getCreatePostTooltipTitle(data: any) {
    if (data?.memberShipStatus !== "joined")
      return "You need to join the community to create a post";
    if (data.isBanned)
      return "You can not create post as you are banned from this community";
    return "";
  }

  return (
    <div className="flex flex-col w-full relative overflow-hidden rounded-xl bg-white shadow-sm">
      {/* Cover Image */}
      <div className="relative  w-full overflow-hidden group">
        <CoverImage
          cover={data?.cover}
          onUpload={(param) => {
            if (!param || !param?.fileList) return;
            const newFile = param?.fileList;
            updateCover(newFile);
          }}
          loading={coverLoading}
          defaultImage="/default-cover.jpeg"
          isAdmin={data?.isAdmin && data?.memberShipStatus == "joined"}
        />
      </div>

      {/* Community Info Section */}
      <div className="relative px-4 sm:px-6 pb-6">
        {/* Profile Picture - Positioned to overlap the cover image */}
        <div className="absolute -top-[54px] left-6 ring-4 ring-white rounded-full shadow-md">
          <ProfilePicture
            avatar={data?.avatar}
            onUpload={(param) => {
              if (!param || !param.fileList) return;
              updateAvatar(param.fileList);
            }}
            isAdmin={data?.isAdmin && data?.memberShipStatus == "joined"}
            loading={avatarLoading}
            defaultImage={"/default-avatar.jpeg"}
            className="border-4 border-white"
          />
        </div>

        {/* Community Details */}
        <div className="flex flex-col sm:flex-row justify-between pt-16 sm:pt-4 sm:items-center">
          <div className="flex flex-col mb-4 sm:mb-0">
            <div className="flex items-center gap-2 group">
              <Heading
                text={data?.community_name}
                className="font-bold text-2xl"
                size="24px"
              />
              {data?.isAdmin && data?.memberShipStatus == "joined" && (
                <Tooltip title="Edit" placement="right">
                  <EditIcon
                    className="w-5 h-5 text-gray_clr  cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setOpenEditModal(true)}
                  />
                </Tooltip>
              )}

              {/* Visibility indicator */}
              <Tooltip
                title={
                  data?.visibility === "private"
                    ? "Private Community"
                    : "Public Community"
                }
                placement="right"
              >
                <span className="text-gray-500">
                  {data?.visibility === "private" ? (
                    <MdOutlineLock className="w-4 h-4" />
                  ) : (
                    <MdOutlinePublic className="w-4 h-4" />
                  )}
                </span>
              </Tooltip>
            </div>

            {/* Creator info and community stats */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-gray-600">
              <Link
                className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                href={`/profile/${data?.createdBy?.id}`}
              >
                <FaRegCalendarAlt className="w-3.5 h-3.5" />
                <span>
                  Created by {data?.isAdmin ? "you" : data?.createdBy?.username}
                </span>
              </Link>

              {data?.membersCount !== undefined && (
                <div className="flex items-center gap-1">
                  <HiOutlineUserGroup className="w-4 h-4" />
                  <span>{data?.membersCount} members</span>
                </div>
              )}
            </div>

            {/* Community description if available */}
            {data?.description && (
              <p className="mt-3 text-gray-700 text-sm max-w-2xl">
                {data.description}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 sm:justify-end">
            <Tooltip title={getCreatePostTooltipTitle(data)}>
              <span>
                <CustomButton
                  text="Create Post"
                  variant={"secondary"}
                  disabled={
                    data?.memberShipStatus !== "joined" || data.isBanned
                  }
                  onClick={() => {
                    setOpenPostModal(true);
                  }}
                  className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-sm"
                />
              </span>
            </Tooltip>

            {data?.memberShipStatus == "joined" ? (
              <Tooltip
                title={
                  privateAndAdmin
                    ? "You can't leave a private community as admin"
                    : ""
                }
              >
                <CustomButton
                  text="Leave"
                  disabled={privateAndAdmin}
                  variant={"default"}
                  icon={<IoExitOutline />}
                  onClick={() => leave()}
                  loading={leaveBtnLoading}
                  className="border border-gray-200 hover:bg-gray-50 text-gray-700"
                />
              </Tooltip>
            ) : data?.memberShipStatus == "requested" ? (
              <CustomButton
                text="Cancel request"
                variant={"default"}
                onClick={() => cancelJoinRequest()}
                loading={cancelRequestBtnLoading}
                className="border border-gray-200 hover:bg-gray-50 text-gray-700"
              />
            ) : (
              <CustomButton
                text="Join Now"
                onClick={() => join()}
                loading={isPending}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              />
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreatePostModal
        id={id}
        openModal={openPostModal}
        setOpenModal={setOpenPostModal}
      />
      <EditCommunityModal
        id={id}
        initialData={data}
        openModal={openEditModal}
        setOpenModal={setOpenEditModal}
      />
    </div>
  );
}

export default DetailPageHeader;

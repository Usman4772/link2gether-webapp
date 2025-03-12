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
import useCancelJoinRequest from "../hooks/useCancelJoinRequest";
import useJoinCommunity from "../hooks/useJoinCommunity";
import useLeaveCommunity from "../hooks/useLeaveCommunity";
import useUpdateCommunity from "../hooks/useUpdateCommunity";
import CreatePostModal from "./CreatePostModal";
import EditCommunityModal from "./EditCommunityModal";
import { CommunityDetailPageProps } from "@/utils/backend/modules/auth/types/community.types";

function DetailPageHeader({ id, data }: { id: string | number; data: any }) {
  const [openPostModal, setOpenPostModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { isPending, join } = useJoinCommunity(id);
  const { leave, leaveBtnLoading } = useLeaveCommunity(id);
  const { cancelJoinRequest, cancelRequestBtnLoading } =
    useCancelJoinRequest(id);
  const { updateAvatar, avatarLoading, updateCover, coverLoading } =
    useUpdateCommunity({ id, setOpenModal: setOpenEditModal });

  const privateAndAdmin = data?.isAdmin && data?.visibility == "private";


  function getCreatePostTooltipTitle(data:any) {
  if(data?.memberShipStatus !== "joined")  return "You need to join the community to create a post";
    if (data.isBanned) return "You can not create post as you are banned from this community";
    return ""
}

  return (
    <div className="flex flex-col gap-1 w-full relative">
      <div className="relative">
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
      <div
        className="w-full items-center justify-between flex h-[130px]"
        style={{ border: "1px solid #E5E5E5", borderRadius: "10px" }}
      >
        <div className="flex items-center gap-4 px-4">
          <ProfilePicture
            avatar={data?.avatar}
            onUpload={(param) => {
              if (!param || !param.fileList) return;
              updateAvatar(param.fileList);
            }}
            isAdmin={data?.isAdmin && data?.memberShipStatus == "joined"}
            loading={avatarLoading}
            defaultImage={"/default-avatar.jpeg"}
          />
          <div className="flex flex-col ">
            <div className="flex gap-4 group">
              <Heading
                text={data?.community_name}
                className="font-[700] p-0"
                size="20px"
              />
              {data?.isAdmin && data?.memberShipStatus == "joined" && (
                <Tooltip
                  title="Edit"
                  className=" items-center justify-center hidden group-hover:flex"
                >
                  <EditIcon
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => setOpenEditModal(true)}
                  />
                </Tooltip>
              )}
            </div>
            <Link
              className="text-[#4F7A96] font-[13px] p-0"
              href={`/profile/${data?.createdBy?.id}`}
            >
              created by {data?.isAdmin ? "you" : data?.createdBy?.username}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4 px-4">
          <Tooltip
            title={
              data?.memberShipStatus !== "joined"
                ? "You need to join the community to create a post"
                : ""
            }
          >
            <Tooltip
              title={getCreatePostTooltipTitle(data)}
            >
              <span>
                <CustomButton
                  text="Create Post"
                  variant={"secondary"}
                  disabled={data?.memberShipStatus !== "joined" || data.isBanned}
                  onClick={() => {
                    setOpenPostModal(true);
                  }}
                />
              </span>
            </Tooltip>
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
              />
            </Tooltip>
          ) : data?.memberShipStatus == "requested" ? (
            <CustomButton
              text="Cancel request"
              variant={"default"}
              onClick={() => cancelJoinRequest()}
              loading={cancelRequestBtnLoading}
            />
          ) : (
            <CustomButton
              text="Join Now"
              onClick={() => join()}
              loading={isPending}
            />
          )}
        </div>
      </div>
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

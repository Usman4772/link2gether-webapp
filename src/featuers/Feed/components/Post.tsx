"use client";
import DotDropdown from "@/components/Global/DotDropdown";
import Paragraph from "@/components/Global/Paragraph";
import PreviewImage from "@/components/Global/PreviewImage";
import ShowMore from "@/components/Global/ShowMore";
import { Ban, Hide, Report, Save } from "@/components/icons/icons";
import BanUserModal from "@/featuers/Community/components/BanUserModal";
import HidePostModal from "@/featuers/Community/components/HidePostModal";
import ReportPostModal from "@/featuers/Community/components/ReportPostModal";
import useHidePost from "@/featuers/Community/hooks/useHidePost";
import ShareModal from "@/featuers/Post/components/ShareModal";
import useLike from "@/featuers/Post/hook/useLike";
import useSavePost from "@/featuers/Post/hook/useSavePost";
import { PostProps } from "@/utils/backend/modules/auth/types/post.types";
import { convertNumberToK } from "@/utils/frontend/helpers/globals";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { RiHeart3Line as Like, RiHeart3Fill as LikeFill } from "react-icons/ri";
import ReactTimeAgo from "react-time-ago";
import { RemoveFromSaved } from "@/components/icons/icons";

function Post({
  data,
  isAdmin = false,
  isMode = false,
  communityDetails,
}: PostProps) {
  const { optimisticIsLiked, optimisticLikes, like } = useLike(data);

  const [openShareModal, setOpenShareModal] = useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  const [openReportPostModal, setOpenReportPostModal] = useState(false);
  const [openBanUserModal, setOpenBanUserModal] = useState(false);
  const { openHidePostModal, setOpenHidePostModal, hidePost, hideBtnLoading } =
    useHidePost(data.id, communityDetails?.id);
  const { savePost } = useSavePost();

  const userDropdownItems = [
    {
      key: "save_post",
      label: `${data.isSaved ? "Remove from saved" : "Save"}`,
      icon: data?.isSaved ? (
        <RemoveFromSaved className="w-4 h-4" />
      ) : (
        <Save className="w-4 h-4" />
      ),
      onClick: () => savePost(data?.id),
    },
    {
      //todo disable this button if the user is the author of the post once implemented userDetails api.
      key: "report_post",
      label: "Report Post",
      icon: <Report className="h-4 w-h4" />,
      danger: true,
      onClick: () => setOpenReportPostModal(true),
    },
  ];

  const adminDropdownItems = [
    {
      key: "save_post",
      label: `${data.isSaved ? "Remove from saved" : "Save"}`,
      icon: data?.isSaved ? (
        <RemoveFromSaved className="w-4 h-4" />
      ) : (
        <Save className="w-4 h-4" />
      ),
      onClick: () => savePost(data?.id),
    },

    {
      key: "hide_post",
      label: "Hide Post",
      icon: <Hide className="w-4 h-4" />,
      onClick: () => setOpenHidePostModal(true),
    },
    {
      key: "ban_user",
      label: "Ban User",
      disabled: data.author.id == communityDetails?.createdBy,
      icon: <Ban className="w-4 h-4" />,
      danger: true,
      onClick: () => setOpenBanUserModal(true),
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between  px-2">
        {data?.community ? (
          <div className="flex items-start gap-4 ">
            <Image
              src={data?.community?.avatar || "/group-default.png"}
              width={50}
              height={50}
              className="rounded-[50%] object-cover w-[50px] h-[50px]"
              alt="Avatar"
            />
            <div className="flex flex-col justify-center ">
              <Link
                href={`/community/${data?.community?.id}`}
                className="text-[#0D171C] text-[16px] font-[600] tracking-tighter"
              >
                {data?.community?.community_name}
              </Link>
              <Link href={"#"} className="text-[#4F7A96] text-[12px]">
                by {data?.author?.username}
              </Link>
              <ReactTimeAgo
                date={new Date(data?.created_at)}
                locale="en-US"
                className="text-[#4F7A96] text-[12px]"
              />
            </div>
          </div>
        ) : (
          <UserHeader author={data.author} created_at={data.created_at} />
        )}
        <div>
          <DotDropdown
            items={isAdmin || isMode ? adminDropdownItems : userDropdownItems}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center px-2">
        <ShowMore text={data?.description || ""} maxLength={200} />
      </div>
      {data.type !== "text" && (
        <PreviewImage
          image={data?.media || ""}
          width={500}
          className="!w-full !h-[400px] object-cover rounded-[15px] preview-image"
          alt="Post"
        />
      )}
      <div className="flex justify-between pt-4 px-2">
        <form className="flex items-center gap-2" action={like} ref={formRef}>
          <span
            onClick={() => formRef.current?.requestSubmit()}
            className="cursor-pointer flex items-start gap-2"
          >
            {optimisticIsLiked ? (
              <div className="flex items-center justify-center  flex-col ">
                <LikeFill className="text-[21px] text-btn_primary_clr " />
                <div className="text-text_secondary text-[12px]">
                  {convertNumberToK(optimisticLikes)}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center  flex-col ">
                <Like className="text-[21px] text-text_secondary" />
                <div className="text-text_secondary text-[12px]">
                  {convertNumberToK(optimisticLikes)}
                </div>
              </div>
            )}
            <Paragraph text="Like" />
          </span>
        </form>
        <Link className="flex items-center gap-2" href={`/post/${data.id}`}>
          <img
            src="/comment.svg"
            width={20}
            height={20}
            className="object-cover"
          />
          <Paragraph text={`Comment ( ${convertNumberToK(data.comments)})`} />
        </Link>
        <button
          className="flex items-center gap-2"
          onClick={() => setOpenShareModal(true)}
        >
          <img src="/share.svg" width={20} height={20} />
          <Paragraph text="Share" />
        </button>
      </div>
      <ShareModal openModal={openShareModal} setOpenModal={setOpenShareModal} />
      <HidePostModal
        openModal={openHidePostModal}
        setOpenModal={setOpenHidePostModal}
        onConfirmAction={hidePost}
        loading={hideBtnLoading}
      />

      <BanUserModal
        openModal={openBanUserModal}
        setOpenModal={setOpenBanUserModal}
        userId={data?.author?.id}
        communityId={communityDetails?.id}
      />

      <ReportPostModal
        openModal={openReportPostModal}
        setOpenModal={setOpenReportPostModal}
        postId={data?.id}
        communityId={communityDetails?.id}
      />
    </div>
  );
}

export default Post;

interface UserHeaderProps {
  id: string | number;
  username: string;
  profileImage: string | null;
}

function UserHeader({
  author,
  created_at,
}: {
  author: UserHeaderProps;
  created_at: string;
}) {
  return (
    <div className="flex items-start gap-4 ">
      <Image
        src={author?.profileImage || "/group-default.png"}
        width={50}
        height={50}
        className="rounded-[50%] object-cover w-[50px] h-[50px]"
        alt="Profile Picture"
      />
      <div className="flex flex-col justify-center ">
        <Link
          href={`/profile/${author?.id}`}
          className="text-[#0D171C] text-[16px] font-[600] tracking-tighter"
        >
          {author?.username}
        </Link>

        <ReactTimeAgo
          date={new Date(created_at)}
          locale="en-US"
          className="text-[#4F7A96] text-[12px]"
        />
      </div>
    </div>
  );
}

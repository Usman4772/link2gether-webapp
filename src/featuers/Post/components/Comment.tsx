"use client";

import Heading from "@/components/Global/Heading";
import Paragraph from "@/components/Global/Paragraph";
import TimeAgo from "@/components/Global/TimeAgo";
import { convertNumberToK } from "@/utils/frontend/helpers/globals";
import React from "react";
import { RiHeart3Line as Like } from "react-icons/ri";
import { RiHeart3Fill as LikeFill } from "react-icons/ri";
import useLikeComment from "../hook/useLikeComment";
import { useAppDispatch } from "@/hooks/useAppSelector";
import { setOpenLoginModal } from "@/redux/Slices/user.slice";

export interface CommentProps {
  id: string | number;
  content: string;
  allow_actions: boolean;
  author: {
    id: string | number;
    username: string;
    profileImage: string | null;
  };
  created_at: string;
  likes: number;
  isLiked: boolean;
}

function Comment({
  comment,
  postId,
  isPublicPage = false,
}: {
  comment: CommentProps;
  postId: string | number;
  isPublicPage?: boolean;
}) {
  const { likeComment, optimisticIsLiked, optimisticLikes } = useLikeComment(
    comment,
    postId
  );
  const dispatch = useAppDispatch();
  const formRef = React.useRef<HTMLFormElement>(null);

  return (
    <div className="group flex justify-between bg-gray-100 rounded-xl border border-gray-100 hover:border-gray-200 w-full p-4 transition-all duration-200">
      <div className="flex flex-col gap-3 w-full">
        {/* Author info */}
        <div className="flex gap-3 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img
              src={comment?.author?.profileImage || "/default-avatar.jpeg"}
              className="relative w-10 h-10 rounded-full object-cover border-2 border-white"
              alt={comment?.author?.username}
            />
          </div>
          <div className="flex flex-col">
            <Heading
              text={comment?.author?.username}
              className="text-[15px] font-semibold text-gray-800"
            />
            <TimeAgo
              date={comment?.created_at}
              className="text-xs text-gray-500"
            />
          </div>
        </div>

        {/* Comment content */}
        <Paragraph
          text={comment.content || "N/A"}
          className="text-gray-700 text-[15px] leading-relaxed pl-[52px]"
        />

        {/* Like button */}
        <div className="flex justify-end">
          <form
            className="flex items-center"
            action={() => {
              !comment?.allow_actions && isPublicPage
                ? dispatch(setOpenLoginModal(true))
                : likeComment();
            }}
            ref={formRef}
          >
            <button
              type="button"
              onClick={() => formRef.current?.requestSubmit()}
              className="flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 rounded-full px-3 py-1.5 transition-colors"
            >
              {optimisticIsLiked ? (
                <>
                  <LikeFill className="text-[18px] text-btn_primary_clr" />
                  <span className="text-blue-500 text-xs font-medium">
                    {convertNumberToK(optimisticLikes)}
                  </span>
                </>
              ) : (
                <>
                  <Like className="text-[18px] text-gray-500" />
                  <span className="text-gray-500 text-xs">
                    {convertNumberToK(optimisticLikes)}
                  </span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Comment;

import Heading from "@/components/Global/Heading";
import Paragraph from "@/components/Global/Paragraph";
import TimeAgo from "@/components/Global/TimeAgo";
import { convertNumberToK } from "@/utils/frontend/helpers/globals";
import React from "react";
import { RiHeart3Line as Like } from "react-icons/ri";
import { RiHeart3Fill as LikeFill } from "react-icons/ri";
import useLikeComment from "../hook/useLikeComment";

export interface CommentProps {
  id: string | number;
  content: string;
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
}: {
  comment: CommentProps;
  postId: string | number;
}) {
  const { likeComment, optimisticIsLiked, optimisticLikes } = useLikeComment(
    comment,
    postId
  );
  const formRef = React.useRef<HTMLFormElement>(null);
  return (
    <div className="flex justify-between bg-gray_clr rounded-md w-full min-h-24 max-h-max p-2 items-center">
      <div className="flex flex-col gap-2  p-2 items-start">
        <div className="flex gap-2 items-center">
          <img
            src={comment?.author?.profileImage || "/default-avatar.jpeg"}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <Heading text={comment?.author?.username} />
            <TimeAgo date={comment?.created_at} />
          </div>
        </div>
        <Paragraph text={comment.content || "N/A"} />
      </div>
      <form className="flex items-center gap-2" action={()=>likeComment()} ref={formRef}>
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
        </span>
      </form>
    </div>
  );
}

export default Comment;

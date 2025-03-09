import CustomButton from "@/components/Global/CustomButton";
import { CustomInput } from "@/components/Global/CustomFormFields";
import Comment from "./Comment";
import { useState } from "react";
import useAddComment from "../hook/useAddComment";
import useFetchPostComments from "../hook/useFetchPostComments";
import Loading from "@/components/Global/Loading";

function CommentSection({ postId }: { postId: string | number }) {
  const { comments, commentsLoading } = useFetchPostComments(postId);
  const { content, setContent, addComment, btnLoading } = useAddComment(postId);
  return (
    <section className="flex flex-col gap-4">
      <div className="flex gap-4 items-center w-full">
        <CustomInput
          placeholder="Comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="rounded-md !focus:border-black !focus:shadow-none !shadow-none !border"
        />
        <CustomButton
          text="Comment"
          loading={btnLoading}
          variant={"primary"}
          className="py-3"
          onClick={() => addComment()}
        />
      </div>
      <section className="flex flex-col gap-2">
        {commentsLoading ? (
          <Loading />
        ) : comments && comments.length > 0 ? (
          comments.map((comment:any) => (
            <Comment key={comment.id} comment={comment} postId={postId}/>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </section>
    </section>
  );
}

export default CommentSection;

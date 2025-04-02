import useFetchUser from "@/hooks/useFetchUser";
import {
  CommentOutlined,
  LoadingOutlined,
  MessageOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Empty,
  Input,
  Skeleton,
  Space,
  Typography,
} from "antd";
import useAddComment from "../hook/useAddComment";
import useFetchPostComments from "../hook/useFetchPostComments";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import httpInstance from "@/utils/config/axios";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppSelector";
import { resetUser, setOpenLoginModal, setUser } from "@/redux/Slices/user.slice";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

function CommentSection({
  postId,
  isPublicPage = false,
}: {
  postId: string | number;
  isPublicPage?: boolean;
}) {
  const { comments, commentsLoading } = useFetchPostComments(postId);
  const { content, setContent, addComment, btnLoading } = useAddComment(postId);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state?.user);
  const handleSubmit = () => {
    addComment();
  };

  async function fetchUser() {
    try {
      const response = await httpInstance.get("/user/profile");
      if (response?.data?.success) {
        dispatch(setUser(response?.data?.data));
      }
    } catch (error) {
      handleAPIErrors(error);
    }
  }
  useEffect(() => {
    if (comments && comments?.length > 0 && isPublicPage) {
      const fetchUserDetails = comments[0]?.allow_actions;
      if (!fetchUserDetails) {
        dispatch(resetUser());
        return;
      }
      fetchUser();
    }
  }, [comments]);

  return (
    <Card
      className="comment-section-card"
      bordered={false}
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div style={{ padding: "0 8px" }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Header */}
          <Space align="center">
            <MessageOutlined style={{ fontSize: "20px", color: "#1890ff" }} />
            <Title level={4} style={{ margin: 0 }}>
              Comments
              {comments && comments.length > 0 && (
                <Text
                  type="secondary"
                  style={{ fontSize: "14px", marginLeft: "8px" }}
                >
                  ({comments.length})
                </Text>
              )}
            </Title>
          </Space>

          {/* Comment input area */}
          <Card
            className="comment-input-card"
            style={{
              background: "linear-gradient(to right, #f9fafc, #f0f5ff)",
              borderRadius: "8px",
              border: "1px solid #e6f7ff",
            }}
            bodyStyle={{ padding: "16px" }}
            bordered={false}
          >
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Space align="center">
                <Avatar
                  size={40}
                  src={user?.profileImage || "default-user.jpeg"}
                  style={{ border: "2px solid #1890ff" }}
                />
                <Text strong>Write a comment</Text>
              </Space>

              <TextArea
                placeholder="Share your thoughts..."
                value={content}
                disabled={btnLoading}
                onChange={(e) => setContent(e.target.value)}
                autoSize={{ minRows: 3, maxRows: 6 }}
                style={{
                  borderRadius: "8px",
                  border: "1px solid #d9d9d9",
                  transition: "all 0.3s",
                  resize: "none",
                  padding: "8px",
                }}
              />

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="primary"
                  icon={btnLoading ? <LoadingOutlined /> : <SendOutlined />}
                  onClick={() => {
                    !comments[0]?.allow_actions && isPublicPage
                      ? dispatch(setOpenLoginModal(true))
                      : handleSubmit();
                  }}
                  loading={btnLoading}
                  disabled={!content.trim()}
                  className="!bg-btn_secondary_clr"
                  style={{
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    boxShadow: "0 2px 0 rgba(0, 0, 0, 0.045)",
                  }}
                >
                  Post Comment
                </Button>
              </div>
            </Space>
          </Card>

          <Divider style={{ margin: "8px 0" }} />

          {/* Comments list */}
          <div className="comments-list">
            {commentsLoading ? (
              <CommentSkeleton count={3} />
            ) : comments && comments.length > 0 ? (
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                {comments.map((comment: any) => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    postId={postId}
                    isPublicPage={isPublicPage}
                  />
                ))}
              </Space>
            ) : (
              <NoComments />
            )}
          </div>
        </Space>
      </div>
    </Card>
  );
}

function NoComments() {
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      imageStyle={{ height: 80 }}
      description={
        <Space direction="vertical" size="small" align="center">
          <Text strong style={{ fontSize: "16px" }}>
            No comments yet
          </Text>
          <Text type="secondary" style={{ textAlign: "center" }}>
            Be the first to share your thoughts on this post!
          </Text>
        </Space>
      }
    >
      <Button
        type="primary"
        icon={<CommentOutlined />}
        style={{
          borderRadius: "6px",
          marginTop: "16px",
          background: "linear-gradient(to right, #1890ff, #096dd9)",
          border: "none",
        }}
      >
        Start the conversation
      </Button>
    </Empty>
  );
}

function CommentSkeleton({ count = 3 }: { count?: number }) {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} style={{ display: "flex", gap: "12px" }}>
          <Skeleton.Avatar active size={40} />
          <div style={{ flex: 1 }}>
            <Skeleton active paragraph={{ rows: 2 }} title={{ width: "20%" }} />
          </div>
        </div>
      ))}
    </Space>
  );
}

export default CommentSection;

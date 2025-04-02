"use client";

import { useState } from "react";
import { Modal, Button, Typography, Space, Tag } from "antd";
import { CloseOutlined, InfoCircleOutlined } from "@ant-design/icons";
import CustomModal from "@/components/Global/CustomModal";
import CustomButton from "@/components/Global/CustomButton";
import useReportPost from "../hooks/useReportPost";

const { Title, Paragraph, Text } = Typography;

interface ReportModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  postId: string | number |null;
  communityId: string | number | undefined;
}

export default function ReportModal({
  openModal,
  setOpenModal,
  postId,
  communityId,
}: ReportModalProps) {
  const { reportPost, reportBtnLoading,reason,setReason } = useReportPost({
    postId,
    communityId,
    setOpenModal,
  });

  return (
    <>
      <CustomModal
        title={<Header handleCancel={() => {
          setOpenModal(false);
          setReason(null)
        }} />}
        openModal={openModal}
        setOpenModal={setOpenModal}
        closeable={false}
        width={600}
        body={
          <ReportModalBody
            reportPost={reportPost}
            btnLoading={reportBtnLoading}
            reason={reason}
            setReason={setReason}
          />
        }
      />
    </>
  );
}

function Header({ handleCancel }: any) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Title level={4} style={{ margin: 0 }}>
        Submit a report
      </Title>
      <Button
        type="text"
        icon={<CloseOutlined />}
        onClick={handleCancel}
        style={{ marginRight: -12 }}
      />
    </div>
  );
}

function ReportModalBody({ reportPost, btnLoading,reason,setReason }: any) {

  const reportCategories = [
    "Harassment",
    "Threatening violence",
    "Hate",
    "Minor abuse",
    "Sharing personal information",
    "Non-consensual intimate media",
    "Prohibited transaction",
    "Impersonation",
    "Copyright violation",
    "Trademark violation",
    "Self-harm or suicide",
    "Spam",
    "Contributor Program violation",
  ];

  const handleSetReason = (category: string) => {
    setReason(category);
  };

  return (
    <>
      <Paragraph style={{ marginBottom: 24 }}>
        Thanks for looking out for yourself and your fellow community members by
        reporting things that break the rules. Let us know what&apos;s
        happening, and we&apos;ll look into it.
      </Paragraph>

      <Space size={[8, 16]} wrap>
        {reportCategories.map((category) => (
          <Tag
            key={category}
            color={reason === category ? "blue" : "default"}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "14px",
              cursor: "pointer",
              backgroundColor:
                reason === category ? "#e6f7ff" : "#f0f2f5",
              border:
                reason === category
                  ? "1px solid #91caff"
                  : "1px solid #d9d9d9",
            }}
            onClick={() => handleSetReason(category)}
          >
            {category}
          </Tag>
        ))}
      </Space>

      <div style={{ marginTop: 24, display: "flex", alignItems: "center" }}>
        <InfoCircleOutlined style={{ color: "#8c8c8c", marginRight: 8 }} />
        <Text type="secondary">
          Not sure if something is breaking the rules?{" "}
          <a href="#" style={{ color: "#1677ff" }}>
            Review the Community Rules
          </a>
        </Text>
      </div>
      <div className="w-full flex items-center justify-end">
        <CustomButton
          text="Submit"
          variant={"secondary"}
          loading={btnLoading}
          disabled={!reason}
          onClick={() => reportPost(reason)}
        />
      </div>
    </>
  );
}

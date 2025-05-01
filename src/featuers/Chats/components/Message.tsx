"use client";

import type React from "react";
import { Typography, Avatar } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import type { ChatMessage } from "@/utils/backend/modules/auth/types/chat.types";
import { getFormattedTime } from "@/utils/frontend/helpers/globals";

const { Text } = Typography;

interface MessageProps {
  message: ChatMessage;
  origin: "user" | "receiver";
}

const Message: React.FC<MessageProps> = ({ message, origin }) => {
  const isUser = origin === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div className="flex items-end gap-2 max-w-[80%]">
        <div
          className={`relative px-4 py-2 rounded-lg ${
            isUser
              ? "bg-gradient-to-r from-[#e6f7f1] to-[#d1f5e4] text-gray-800 rounded-tr-none"
              : "bg-white text-gray-800 border border-gray-100 rounded-tl-none shadow-sm"
          }`}
        >
          <div className="whitespace-pre-wrap break-words">
            {message?.message}
          </div>

          <div className="flex items-center justify-end mt-1 gap-1">
            <Text type="secondary" className="text-xs">
              {getFormattedTime(message.createdAt)}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;

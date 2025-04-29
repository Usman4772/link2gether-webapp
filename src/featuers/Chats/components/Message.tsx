import { ChatMessage } from "@/utils/backend/modules/auth/types/chat.types";
import { getFormattedTime } from "@/utils/frontend/helpers/globals";
import React from "react";

function Message({
  message,
  origin,
}: {
  message: ChatMessage;
  origin: "user" | "receiver";
}) {
  return (
    <div
      key={message?.messageId}
      className={`flex ${
       origin === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[70%] px-4 py-2 rounded-lg ${
          origin=== "user"
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-white text-gray-800 border rounded-bl-none"
        }`}
      >
        <p>{message?.message}</p>
        <p
          className={`text-xs mt-1 text-right ${
            origin === "user" ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {getFormattedTime(message.createdAt)}
        </p>
      </div>
    </div>
  );
}

export default Message;

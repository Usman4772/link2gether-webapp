import { ChatMessage } from "@/utils/backend/modules/auth/types/chat.types";
import { getFormattedTime } from "@/utils/frontend/helpers/globals";
import ReactMarkdown from "react-markdown";

export function AIMessage({ message }: { message: ChatMessage }) {
  return (
    <div key={message?.messageId} className="flex justify-start w-full">
      <div className="flex gap-2 max-w-full">
        <img
          src={
            message?.sender?.profileImage || process.env.NEXT_PUBLIC_AI_AVATAR
          }
          alt="AI"
          className="w-5 h-5 rounded-full object-cover flex-shrink-0"
        />
        <div className="max-w-[70%] px-4 py-2 rounded-lg bg-white text-gray-800 rounded-bl-none break-words">
          <div className="prose max-w-full">
            <ReactMarkdown>{message?.message || ""}</ReactMarkdown>
          </div>
          <p className="text-xs mt-1 text-right text-gray-500">
            {getFormattedTime(message?.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}

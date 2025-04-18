"use client";

import Loading from "@/components/Global/Loading";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type React from "react";
import useFetchConversations, { Conversation } from "../hooks/useFetchConversations";


interface ChatListProps {
  selectedChat: Conversation | null;
  onSelectChat: (chat: Conversation) => void;
}

const ChatList: React.FC<ChatListProps> = ({
  selectedChat,
  onSelectChat,
}) => {
  const { conversations, isLoading } = useFetchConversations();

 

  if (isLoading) return <Loading />;
  return (
    <div className="flex flex-col h-full border-r">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold mb-4">Chats</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search chats..."
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        {conversations.map((conversation) => (
          <div
            key={conversation.channelId}
            className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedChat?.channelId === conversation.channelId ? "bg-gray-100" : ""
            }`}
            onClick={() => onSelectChat(conversation)}
          >
            <div className="relative">
              <Avatar className="h-12 w-12">
                <img
                  src={
                    conversation?.receiver?.profileImage || "/default-user.jpeg"
                  }
                  alt={conversation?.receiver?.username}
                  className="object-cover"
                />
              </Avatar>
              {/* {chat.isOnline && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
              )} */}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-900 truncate">
                  {conversation?.receiver?.username}
                </h3>
                {/* <span className="text-xs text-gray-500">{chat.time}</span> */}
              </div>
              {/* <p className="text-sm text-gray-500 truncate">
                {chat.lastMessage}
              </p> */}
            </div>
            {/* 
            {chat.unread > 0 && (
              <div className="flex-shrink-0 h-5 w-5 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-medium">
                  {chat.unread > 9 ? "9+" : chat.unread}
                </span>
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;

"use client";

import { useState } from "react";
import { Layout, ConfigProvider } from "antd";

import useFetchConversationMessages from "../hooks/useFetchConversationMessages";
import { SelectedChat } from "@/utils/backend/modules/auth/types/chat.types";
import ChatsList from "./ChatsList";
import Chat from "./Chat";

// Define custom theme with green colors
const theme = {
  token: {
    colorPrimary: "#1a936f",
    colorPrimaryHover: "#22a77f",
    colorPrimaryActive: "#157a5c",
    colorPrimaryBg: "rgba(123, 241, 168, 0.1)",
    borderRadius: 8,
  },
};

function ChatsPage() {
  const [selectedChat, setSelectedChat] = useState<SelectedChat | null>(null);
  const { messages, setMessages, isLoading } = useFetchConversationMessages(
    selectedChat?.receiver?.id!
  );

  return (
    <ConfigProvider theme={theme}>
      <Layout className="h-[calc(100vh-4rem)] overflow-hidden rounded-lg shadow-lg border border-gray-100">
        <div className="flex h-full">
          <div className="w-1/4 h-full border-r border-gray-100">
            <ChatsList
              selectedChat={selectedChat}
              onSelectChat={setSelectedChat}
            />
          </div>
          <div className="w-3/4 h-full bg-gray-50">
            {selectedChat ? (
              <Chat messages={messages} selectedChat={selectedChat} />
            ) : (
              <div className="h-full flex items-center justify-center flex-col p-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7bf1a8] to-[#1a936f] flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Your Messages
                </h2>
                <p className="text-gray-500 text-center max-w-md">
                  Select a conversation from the list to start chatting or
                  connect with new community members.
                </p>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </ConfigProvider>
  );
}

export default ChatsPage;

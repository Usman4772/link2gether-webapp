"use client";

import { useState } from "react";

import Chat from "./Chat";
import useFetchConversationMessages from "../hooks/useFetchConversationMessages";
import { SelectedChat } from "@/utils/backend/modules/auth/types/chat.types";
import ChatsList from "./ChatsList";



function ChatsPage() {
  const [selectedChat, setSelectedChat] = useState<SelectedChat | null>(null);;
  const { messages, setMessages, isLoading } = useFetchConversationMessages(
    selectedChat?.receiver?.id!
  );


  return (
    <div className="w-full flex h-[calc(100vh-4rem)] bg-white">
      <div className="w-1/4 h-full border-r">
        <ChatsList
          selectedChat={selectedChat}
          onSelectChat={setSelectedChat}
        />
      </div>
      <div className="w-3/4 h-full">
        {selectedChat && (
          <Chat messages={messages} onSendMessage={() => {}} selectedChat={selectedChat} />
        )}
      </div>
    </div>
  );
}

export default ChatsPage;

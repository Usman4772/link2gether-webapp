"use client";

import { useState } from "react";
import ChatList from "./ChatList";
import Chat from "./Chat";
import useFetchConversationMessages from "../hooks/useFetchConversationMessages";
import { Conversation } from "../hooks/useFetchConversations";

// Sample data
const chatPreviews = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/music.jpg",
    lastMessage: "Looking forward to our meeting tomorrow!",
    time: "10:30 AM",
    unread: 2,
    isOnline: true,
  },
];

function ChatsPage() {
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);;
  const { messages, setMessages, isLoading } = useFetchConversationMessages(
    selectedChat?.channelId!
  );


  // const handleSendMessage = (message: string) => {
  //   const newMessage = {
  //     id: `m${messages.length + 1}`,
  //     content: message,
  //     sender: "user" as const,
  //     timestamp: new Date().toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     }),
  //   };
  //   setMessages([...messages, newMessage]);
  // };

  console.log(messages, "messages");
  return (
    <div className="w-full flex h-[calc(100vh-4rem)] bg-white">
      <div className="w-1/4 h-full border-r">
        <ChatList
          selectedChat={selectedChat}
          onSelectChat={setSelectedChat}
        />
      </div>
      <div className="w-3/4 h-full">
        {selectedChat && (
          <Chat messages={messages} onSendMessage={() => {}} contact={selectedChat} />
        )}
      </div>
    </div>
  );
}

export default ChatsPage;

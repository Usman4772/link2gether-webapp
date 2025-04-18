"use client";

import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, MoreVertical, Phone, Video } from "lucide-react";
import { Conversation } from "../hooks/useFetchConversations";
import { ChatMessage } from "@/utils/backend/modules/auth/types/chat.types";

interface Message {
  id: string;
  content: string;
  sender: "user" | "contact";
  timestamp: string;
}

interface ChatProps {
  contact: Conversation;
  messages: any[];
  onSendMessage: (message: string) => void;
}

const Chat: React.FC<ChatProps> = ({
  contact,
  messages = [],
  onSendMessage,
}) => {
  const [newMessage, setNewMessage] = React.useState("");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <img
                src={contact?.receiver?.profileImage || "/placeholder.svg"}
                alt={contact?.receiver?.username}
              />
            </Avatar>
            {/* {contact.isOnline && (
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white"></span>
            )} */}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{contact?.receiver?.username}</h3>
            {/* <p className="text-xs text-gray-500">
              {contact.isOnline ? "Online" : `Last seen ${contact.lastSeen}`}
            </p> */}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Phone className="h-5 w-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Video className="h-5 w-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreVertical className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message:ChatMessage) => (
            <div
              key={message?._id}
              className={`flex ${
                message.sender?.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-lg ${
                  message.sender?.type === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 border rounded-bl-none"
                }`}
              >
                <p>{message?.message}</p>
                <p
                  className={`text-xs mt-1 text-right ${
                    message.sender?.type === "user"
                      ? "text-blue-100"
                      : "text-gray-500"
                  }`}
                >
                  {message.createdAt}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="rounded-full bg-gray-50"
          />
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="rounded-full h-10 w-10 p-0 flex items-center justify-center"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

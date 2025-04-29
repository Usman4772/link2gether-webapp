"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFetchUser from "@/hooks/useFetchUser";
import {
  ChatMessage,
  SelectedChat,
} from "@/utils/backend/modules/auth/types/chat.types";
import { Loader2, MoreVertical, Phone, Send, Video } from "lucide-react";
import React, { useEffect } from "react";
import useSendMessage from "../hooks/useSendMessage";
import { AIMessage } from "./AIMessage";
import Message from "./Message";

interface ChatProps {
  selectedChat: SelectedChat;
  messages: any[];
}

const Chat: React.FC<ChatProps> = ({ selectedChat, messages = [] }) => {
  const { sendMessage, isSending, newMessage, setNewMessage } =
    useSendMessage();
  const { data } = useFetchUser();

  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const handleSend = async () => {
    if (newMessage.trim()) {
      await sendMessage(selectedChat?.receiver?.id!, newMessage);
    }
  };
  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await handleSend();
    }
  };

  useEffect(() => {
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
                src={
                  selectedChat?.receiver?.profileImage || "/default-user.jpeg"
                }
                alt={selectedChat?.receiver?.username}
              />
            </Avatar>
            {/* {contact.isOnline && (
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white"></span>
            )} */}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">
              {selectedChat?.receiver?.username}
            </h3>
            {/* <p className="text-xs text-gray-500">f
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
          {messages.map((message: ChatMessage) => {
            return (
              <>
                {message?.by_ai ? (
                  <AIMessage message={message} />
                ) : (
                  <Message
                    message={message}
                    origin={
                      data?.id == message?.sender?._id ? "user" : "receiver"
                    }
                  />
                )}
              </>
            );
          })}
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
            {isSending ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input, Button, Avatar, Typography, Dropdown, Badge } from "antd";
import {
  SendOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
  MoreOutlined,
  LoadingOutlined,
  InfoCircleOutlined,
  MessageOutlined,
  SmileOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import useFetchUser from "@/hooks/useFetchUser";
import type {
  ChatMessage,
  SelectedChat,
} from "@/utils/backend/modules/auth/types/chat.types";
import useSendMessage from "../hooks/useSendMessage";
import Message from "./Message";
import { AIMessage } from "./AIMessage";
import {useRouter} from "next/navigation"
import Link from "next/link";

const { Text } = Typography;

interface ChatProps {
  selectedChat: SelectedChat;
  messages: any[];
}

const Chat: React.FC<ChatProps> = ({ selectedChat, messages = [] }) => {
  const { sendMessage, isSending, newMessage, setNewMessage } =
    useSendMessage();

  const { data } = useFetchUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showEmoji, setShowEmoji] = useState(false);
const router=useRouter()




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

  const dropdownItems: MenuProps["items"] = [
    {
      key: "1",
      icon: <InfoCircleOutlined />,
      label: <Link href={`/user/profile/${selectedChat?.receiver?.id}`}>View Profile</Link>
    },
    // {
    //   key: "2",
    //   icon: <BellOutlined />,
    //   label: "Mute Notifications",
    // },
    // {
    //   key: "3",
    //   icon: <DeleteOutlined />,
    //   label: "Delete Conversation",
    //   onClick:async ()=>{
    //    await deleteChat(selectedChat?.chatId)
    //   },
    //   danger: true,
    // },
    // {
    //   key: "4",
    //   icon: <BlockOutlined />,
    //   label: "Block User",
    //   danger: true,
    // },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <Badge
            dot
            status="success"
            offset={[-4, 32]}
            className={Math.random() > 0.5 ? "block" : "hidden"}
          >
            <Avatar
              size={40}
              src={selectedChat?.receiver?.profileImage || "/default-user.jpeg"}
              className="border-2 border-gray-100"
            />
          </Badge>
          <div>
            <Text strong className="text-base block">
              {selectedChat?.receiver?.username}
            </Text>
            {/* <Text type="secondary" className="text-xs">
              {Math.random() > 0.5 ? "Online" : "Last seen recently"}
            </Text> */}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="text"
            shape="circle"
            icon={<PhoneOutlined className="text-[#1a936f]" />}
            size="large"
          />
          <Button
            type="text"
            shape="circle"
            icon={<VideoCameraOutlined className="text-[#1a936f]" />}
            size="large"
          />
          <Dropdown
            menu={{ items: dropdownItems }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Button
              type="text"
              shape="circle"
              icon={<MoreOutlined />}
              size="large"
            />
          </Dropdown>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#fafafa] bg-[radial-gradient(rgba(123,241,168,0.05)_2px,transparent_2px),radial-gradient(rgba(123,241,168,0.05)_2px,transparent_2px)] bg-[length:40px_40px] bg-[0_0,20px_20px]">
        {messages.length > 0 ? (
          <div className="space-y-3">
            <div className="text-center my-4">
              <Text
                type="secondary"
                className="text-xs bg-white/80 px-3 py-1 rounded-xl"
              >
                {new Date().toLocaleDateString([], {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </div>
            {messages.map((message: ChatMessage, index: number) => {
              // Add date divider if needed
              const showDateDivider =
                index > 0 &&
                new Date(message.createdAt).toDateString() !==
                  new Date(messages[index - 1].createdAt).toDateString();

              return (
                <React.Fragment key={message.messageId || index}>
                  {showDateDivider && (
                    <div className="text-center my-4">
                      <Text
                        type="secondary"
                        className="text-xs bg-white/80 px-3 py-1 rounded-xl"
                      >
                        {new Date(message.createdAt).toLocaleDateString([], {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </Text>
                    </div>
                  )}
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
                </React.Fragment>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center flex-col">
            <div className="w-16 h-16 rounded-full bg-[#e6f7f1] flex items-center justify-center mb-4">
              <MessageOutlined className="text-2xl text-[#1a936f]" />
            </div>
            <Text className="text-base mb-2">No messages yet</Text>
            <Text type="secondary">
              Start the conversation with {selectedChat?.receiver?.username}
            </Text>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="rounded-3xl  px-4 bg-gray-50 shadow-sm"
            size="large"
            style={{
              padding: "10px",
              height: "50px",
              borderRadius: "10px",
            }}
            suffix={
              <div className="flex gap-2">
                <Button
                  type="text"
                  shape="circle"
                  size="small"
                  icon={<SmileOutlined className="text-[#1a936f]" />}
                  onClick={() => setShowEmoji(!showEmoji)}
                />
                <Button
                  type="text"
                  shape="circle"
                  size="small"
                  icon={<PaperClipOutlined className="text-[#1a936f]" />}
                />
              </div>
            }
          />
          <Button
            type="primary"
            shape="circle"
            icon={isSending ? <LoadingOutlined /> : <SendOutlined />}
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="bg-gradient-to-r from-[#7bf1a8] to-[#1a936f] shadow-md shadow-green-200"
            size="large"
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;

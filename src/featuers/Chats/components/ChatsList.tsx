"use client";

import type React from "react";

import {useState} from "react";
import {Input, Avatar, List, Badge, Spin, Typography, Empty} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import useFetchConversations from "../hooks/useFetchConversations";
import type {SelectedChat} from "@/utils/backend/modules/auth/types/chat.types";
import Loading from "@/components/Global/Loading";
import Image from "next/image";
import DotDropdown from "@/components/Global/DotDropdown";
import {useDeleteChat} from "@/featuers/Chats/hooks/useDeleteChat";

const {Title, Text} = Typography;

interface ChatsListProps {
    selectedChat: SelectedChat | null;
    onSelectChat: (chat: SelectedChat) => void;
}

const ChatsList: React.FC<ChatsListProps> = ({
                                                 selectedChat,
                                                 onSelectChat,
                                             }) => {
    const {conversations, isLoading} = useFetchConversations();
    const [searchQuery, setSearchQuery] = useState("");
    const {deleteChat} = useDeleteChat({setSelectedChat:onSelectChat})

    const filteredConversations = conversations.filter((conversation) =>
        conversation?.receiver?.username
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    if (isLoading)
        return (
            <div className="h-full flex items-center justify-center">
                <Loading/>
            </div>
        );

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-100">
                <Title level={4} style={{margin: "0 0 16px 0"}}>
                    Messages
                </Title>
                <Input
                    placeholder="Search conversations..."
                    prefix={<SearchOutlined style={{color: "#1a936f"}}/>}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        borderRadius: "5px",
                        height: "40px",
                        padding: "0 12px",
                        backgroundColor: "#f9f9f9",
                        border: "1px solid #eaeaea",
                    }}
                />
            </div>

            <div className="overflow-y-auto flex-1">
                {filteredConversations.length > 0 ? (
                    <List
                        dataSource={filteredConversations}
                        renderItem={(conversation) => {
                            const isSelected = selectedChat?.chatId === conversation.chatId;
                            return (
                                <List.Item
                                    className={`cursor-pointer transition-colors duration-200 hover:bg-gray-50 ${
                                        isSelected ? "bg-[#e6f7f1]" : ""
                                    }`}
                                    style={{padding: "12px 16px"}}
                                    onClick={() => onSelectChat(conversation)}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <div className="relative">
                                                <Badge
                                                    dot
                                                    status="success"
                                                    offset={[-4, 32]}
                                                    style={{
                                                        display: Math.random() > 0.5 ? "block" : "none",
                                                    }}
                                                >
                                                    <Image
                                                        src={
                                                            conversation?.receiver?.profileImage ||
                                                            "/default-user.jpeg"
                                                        }
                                                        className="h-10 w-10 rounded-lg object-cover border-2 border-white dark:border-neutral-700 shadow-sm"
                                                        width={50}
                                                        height={50}
                                                        alt="Avatar"
                                                    />
                                                </Badge>
                                            </div>
                                        }
                                        title={
                                            <div className={"w-full flex items-center justify-between"}>
                                                <div className="flex flex-col items-center">
                                                    <Text strong style={{fontSize: "15px"}}>
                                                        {conversation?.receiver?.username}
                                                    </Text>
                                                    <Text type="secondary" style={{fontSize: "12px"}}>
                                                        {new Date().toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </Text>
                                                </div>
                                                <DotDropdown items={[
                                                    {
                                                        id: "1",
                                                        label: "Delete Chat",
                                                        onClick: async () => {
                                                            await deleteChat(conversation?.chatId)
                                                        },
                                                        danger: true
                                                    }
                                                ]}/>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            );
                        }}
                    />
                ) : (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No conversations found"
                        style={{margin: "40px 0"}}
                    />
                )}
            </div>
        </div>
    );
};

export default ChatsList;

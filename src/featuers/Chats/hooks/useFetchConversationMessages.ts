import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { fetchMessagesAPI } from "../apis/api";
import { pusherClient } from "@/lib/pusher";
import { ChatMessage } from "@/utils/backend/modules/auth/types/chat.types";

function useFetchConversationMessages(receiverId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatId,setChatId]=useState<string |null>(null)
  const { isLoading, refetch } = useQuery({
    queryKey: ["messages", receiverId],
    queryFn: fetchConversationMessages,
  });
  async function fetchConversationMessages() {
    try {
      const response: any = await fetchMessagesAPI(receiverId);
      if (response?.data?.success) {
        setMessages(response?.data?.data?.messages);
        setChatId(response?.data?.data?.chatId)
        return response?.data?.data;
      }
    } catch (error) {
      handleAPIErrors(error);
    }
  }

  useEffect(() => {
    if (!chatId) return;

    pusherClient.subscribe(chatId);
    pusherClient.bind("incoming-message", (message: any) => {
      console.log("Received message:", message);
      // setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      pusherClient.unsubscribe(chatId);
      pusherClient.unbind("incoming-message", () => {});
    };
  }, [chatId]);

  return {
    messages: messages || [],
    setMessages,
    isLoading,
    refetch,
  };
}

export default useFetchConversationMessages;

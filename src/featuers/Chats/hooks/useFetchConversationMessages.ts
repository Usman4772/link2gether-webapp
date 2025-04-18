import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { fetchMessagesAPI } from "../apis/api";
import { pusherClient } from "@/lib/pusher";
import { ChatMessage } from "@/utils/backend/modules/auth/types/chat.types";

function useFetchConversationMessages(id: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { isLoading, refetch } = useQuery({
    queryKey: ["messages", id],
    queryFn: fetchConversationMessages,
  });
  async function fetchConversationMessages() {
    try {
      const response: any = await fetchMessagesAPI(id);
      if (response?.data?.success) {
        setMessages(response?.data?.data);
        return response?.data?.data;
      }
    } catch (error) {
      handleAPIErrors(error);
    }
  }

  useEffect(() => {
    if (!id) return;
    const channelId = id;
    pusherClient.subscribe(channelId);
    pusherClient.bind("incoming-message", (message: any) => {
      console.log("Received message:", message);
      // setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      pusherClient.unsubscribe(channelId);
      pusherClient.unbind("incoming-message", () => {});
    };
  }, [id]);

  return {
    messages: messages || [],
    setMessages,
    isLoading,
    refetch,
  };
}

export default useFetchConversationMessages;

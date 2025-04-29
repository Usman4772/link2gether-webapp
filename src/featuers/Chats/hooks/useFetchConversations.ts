import { fetchUserCommunitiesAPI } from "@/featuers/Profile/api/api";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchUserConversationsAPI } from "../apis/api";
import { subscribeChannels } from "@/utils/backend/pusher/actions/subscribe.channels";
import { SelectedChat } from "@/utils/backend/modules/auth/types/chat.types";



function useFetchConversations() {
  const { data, isLoading } = useQuery<SelectedChat[]>({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
  });

  async function fetchConversations() {
    try {
      const response = await fetchUserConversationsAPI();
      if (response?.data?.success) {
        // const chatIds = response?.data?.data.map(
        //   (conversation: SelectedChat) => conversation?.chatId
        // );
        //  subscribeChannels(chatIds);
        return response.data.data;
      }
    } catch (error) {
      handleAPIErrors(error);
    }
  }

  return {
    conversations: data || [],
    isLoading,
    fetchConversations,
  };
}

export default useFetchConversations;

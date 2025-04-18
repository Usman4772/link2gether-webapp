import { fetchUserCommunitiesAPI } from "@/featuers/Profile/api/api";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchUserConversationsAPI } from "../apis/api";
import { subscribeChannels } from "@/utils/backend/pusher/actions/subscribe.channels";

export interface Conversation {
  channelId: string;
  receiver: {
    id: string;
    username: string;
    profileImage: string | null;
    email: string;
  };
}

function useFetchConversations() {
  const { data, isLoading } = useQuery<Conversation[]>({
    queryKey: ["conversations"],
    queryFn: fetchConversations,
  });

  async function fetchConversations() {
    try {
      const response = await fetchUserConversationsAPI();
      console.log(response?.data);
      if (response?.data?.success) {
        const channelIds = response?.data?.data.map(
          (conversation: Conversation) => conversation?.channelId
        );
         subscribeChannels(channelIds);
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

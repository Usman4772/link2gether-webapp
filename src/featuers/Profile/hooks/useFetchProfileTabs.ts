import React, { useEffect, useState } from "react";
import {
  fetchJoinedCommunitiesAPI,
  fetchSavedPostsAPI,
  fetchUserCommunitiesAPI,
} from "../api/api";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";

function useFetchProfileTabs() {
  const [activeTab, setActiveTab] = useState("saved-posts");
  const [loading, setLoading] = useState(false);
  const [savedPosts, setSavedPosts] = useState([])
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [userCommunities, setUserCommunities] = useState([]);

  async function fetchSavedPosts() {
    try {
      setLoading(true);
      const response = await fetchSavedPostsAPI();
      if (response?.data?.success) {
        setSavedPosts(response?.data?.data);
      }
    } catch (error) {
      handleAPIErrors(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchJoinedCommunities() {
    try {
      setLoading(true);
      const response = await fetchJoinedCommunitiesAPI();
      if (response?.data?.success) {
        setJoinedCommunities(response?.data?.data);
      }
    } catch (error) {
      handleAPIErrors(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchUserCommunities() {
    try {
      setLoading(true);
      const response = await fetchUserCommunitiesAPI();
      if (response?.data?.success) {
        setUserCommunities(response?.data?.data);
      }
    } catch (error) {
      handleAPIErrors(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (activeTab === "saved-posts") {
      fetchSavedPosts();
    } else if (activeTab === "joined-communities") {
      fetchJoinedCommunities();
    } else if (activeTab === "your-communities") {
      fetchUserCommunities();
    }
  }, [activeTab]);

  return {
    savedPosts,
    joinedCommunities,
    userCommunities,
    loading,
    activeTab,
    setActiveTab,
    refetchSaved: fetchSavedPosts,
    refetchJoined: fetchJoinedCommunities,
    refetchUser: fetchUserCommunities,
  };
}

export default useFetchProfileTabs;

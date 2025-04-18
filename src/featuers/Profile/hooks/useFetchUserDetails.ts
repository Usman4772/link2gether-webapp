import React, { useEffect, useState } from "react";
import { fetchUserDetailsAPI, fetchUserPostsAPI } from "../api/api";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import { UserProps } from "@/featuers/Dashboard/components/Header";

function useFetchUserDetails(id: string) {
  const [data, setData] = useState<UserProps | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);

  async function fetchUserDetails(id: string) {
    setDataLoading(true);
    try {
      const response = await fetchUserDetailsAPI(id);
      if (response?.data?.success) {
        setData(response?.data?.data);
      }
    } catch (error) {
      handleAPIErrors(error);
    } finally {
      setDataLoading(false);
    }
  }
  async function fetchUserPosts(id: string) {
    setPostsLoading(true);
    try {
      const response = await fetchUserPostsAPI(id);
      if (response?.data?.success) {
        setPosts(response?.data?.data);
      }
    } catch (error) {
      handleAPIErrors(error);
    } finally {
      setPostsLoading(false);
    }
  }

  useEffect(() => {
    fetchUserDetails(id);
    fetchUserPosts(id);
  }, [id]);

  return {
    data,
    dataLoading,
    posts,
    postsLoading,
  };
}

export default useFetchUserDetails;

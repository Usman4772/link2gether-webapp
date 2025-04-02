import axios from "@/utils/config/axios";

export function fetchSavedPostsAPI() {
  return axios.get("user/profile/posts/saved");
}

export function fetchJoinedCommunitiesAPI() {
  return axios.get("user/profile/communities/all");
}

export function fetchUserCommunitiesAPI() {
  return axios.get("/user/profile/communities/created");
}

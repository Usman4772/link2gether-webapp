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

export function fetchUserDetailsAPI(id: string) {
  return axios.get(`user/profile/${id}`);
}

export function fetchUserPostsAPI(id: string) {
  return axios.get(`user/profile/${id}/posts`);
}


export function fetchLoggedInUserDetails() {
  return axios.get("user/profile");
}



export function fetchNotificationsAPI() {
  return axios.get("user/notifications");
}

export function deleteNotificationAPI(notificationId:string,clear_all=false) {
  return axios.delete(`/user/notifications/${notificationId}`);
}
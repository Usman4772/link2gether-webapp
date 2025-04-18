import axios from "@/utils/config/axios";

export function fetchUserConversationsAPI() {
  return axios.get("/chat/all/conversations");
}

export function fetchMessagesAPI(id: string) {
  return axios.get(`/chat/${id}`);
}

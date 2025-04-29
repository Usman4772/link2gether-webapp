import axios from "@/utils/config/axios";

export function fetchUserConversationsAPI() {
  return axios.get("/chat/all/conversations");
}

export function fetchMessagesAPI(id: string) {
  return axios.get(`/chat/${id}`);
}

export function sendMessageAPI(receiverId: string, message: string) {
  return axios.post(`/chat/${receiverId}/message`, { message });
}

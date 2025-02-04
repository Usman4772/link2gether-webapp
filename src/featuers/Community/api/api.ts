import axios from "@/utils/config/axios";

export async function createCommunityAPI(payload: any) {
  return  axios.post("/community/create",payload)
}

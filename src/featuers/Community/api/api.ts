import axios from "@/utils/config/axios";

export async function createCommunityAPI(payload: any) {
  return axios.post("/community/create", payload);
}

export function createPostAPI(payload: FormData, id: string | number) {
  return axios.post(`/post/create/in-community/${id}`, payload);
}

export function JoinCommunityAPI(id: string | number) {
  return axios.get(`/community/${id}/join`);
}

export function fetchCommunityDetailsAPI(id: string | number) {
  return axios.get(`/community/${id}/details`);
}

export function leaveCommunityAPI(id: string | number) {
  return axios.put(`/community/${id}/leave`);
}


export function cancelJoinRequestAPI(id: string | number) {
  return axios.get(`/community/${id}/cancel-join-request`);
}
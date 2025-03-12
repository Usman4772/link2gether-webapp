import axios from "@/utils/config/axios";

export  function createCommunityAPI(payload: any) {
  return axios.post("/community/create", payload);
}

export function getCommunityPostsAPI(id: string | number) {
  return axios.get(`/post/by-community/${id}`);
}

export function updateCommunityAPI(payload: any, id: string | number) { 
  return axios.patch(`/community/${id}/admin/update`, payload);
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


export function addRulesAPI(payload: any, id: string | number) {
  return axios.post(`/community/${id}/admin/rules/add`, payload);
}


export function banUserAPI(payload: any, communityId: string | number,userId:string|number) {
  return axios.post(`/community/${communityId}/admin/ban-user/${userId}`, payload);
}
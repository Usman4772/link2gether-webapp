import axios from "@/utils/config/axios";

export function likePostAPI(postId: string | number) {
  return axios.get(`/post/${postId}/like`);
}

export function postDetailAPI(postId: string | number) {
  return axios.get(`/post/${postId}`);
}

export function addCommentAPI(postId: string | number, content: string) {
  return axios.post(`/post/${postId}/comment`, { content });
}

export function getAllCommentsAPI(postId: string | number) {
  return axios.get(`/post/${postId}/all-comments`);
}

export function likeCommentAPI(
  postId: string | number,
  commentId: string | number
) {
  return axios.get(`post/${postId}/comment/${commentId}/like`);
}

export function hidePostAPI(
  communityId: any,
  postId: string | number
) {
  return axios.post(`/community/${communityId}/admin/hide-post/${postId}`);
}



export function savePostAPI(postId: string | number) {
  return axios.post(`/post/${postId}/save`);
}
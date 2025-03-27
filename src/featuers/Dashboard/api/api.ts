import axios from "@/utils/config/axios";

export function getKPIMetricsAPI() {
  return axios.get("/dashboard/kpi-metrics");
}

export function getTopActiveCommunitiesAPI() {
  return axios.get("/dashboard/active-communities");
}

export function getDashboardCommunitiesAPI() {
  return axios.get("/dashboard/communities");
}

export function getAdminCommunityDetailsAPI(id: string) {
  return axios.get(`/admin/community/${id}`);
}

export function getJoinRequestsAPI(id: string) {
  return axios.get(`/admin/community/${id}/join-requests`);
}

export function getReportedPostsAPI(id: string) {
  return axios.get(`/admin/community/${id}/posts/reported`);
}

export function getMembersAPI(id: string) {
  return axios.get(`/admin/community/${id}/members`);
}

export function dismissReportAPI(communityId: any, postId: any) {
  return axios.delete(
    `/admin/community/${communityId}/posts/reported/${postId}`
  );
}

export function approveRequestAPI(communityId: any, userId: any) {
  return axios.post(`/admin/community/${communityId}/join-requests/approve`, {
    userId: userId,
  });
}

export function rejectRequestAPI(communityId: any, userId: any) {
  return axios.post(`/admin/community/${communityId}/join-requests/reject`, {
    userId: userId,
  });
}

export function makeModeratorAPI(communityId: any, userId: any) {
  return axios.post(`/community/${communityId}/admin/moderators/add`, {
    moderators_id: [userId],
  });
}

export function removeModeratorAPI(communityId: any, userId: any) {
  return axios.get(
    `/community/${communityId}/admin/moderators/remove/${userId}`
  );
}

export function banUserAPI(communityId: any, userId: any, data: any) {
  return axios.post(`/community/${communityId}/admin/ban-user/${userId}`, data);
}

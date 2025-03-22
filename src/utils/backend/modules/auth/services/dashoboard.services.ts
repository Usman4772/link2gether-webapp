import { formatCommunitiesForChart, getAllUserCommunities, getTopCommunities, getTotalCommunityMembers, getTotalJoinRequests, getTotalReportedPosts } from "@/utils/backend/helpers/dashboard.helpers";

export async function getKPIsData(userId: any) {
    const all_communities = await getAllUserCommunities(userId);
  const total_members = getTotalCommunityMembers(all_communities);
  const total_join_requests = getTotalJoinRequests(all_communities);
  const total_reported_posts = getTotalReportedPosts(all_communities);
  return {
    all_communities: all_communities.length,
    total_members,
    total_join_requests,
    total_reported_posts,
  };
}


export async function getTopActiveCommunities(userId: any) {
  const all_communities = await getAllUserCommunities(userId);
  const topCommunities = getTopCommunities(all_communities);
  const chartData = formatCommunitiesForChart(topCommunities);
  return chartData;
}



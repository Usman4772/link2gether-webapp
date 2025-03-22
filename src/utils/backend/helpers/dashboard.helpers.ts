import Community from "@/models/community";
import User from "@/models/user";
import dayjs from "dayjs";

export function getTotalCommunityMembers(communities: any) {
  const totalMembers = communities.reduce((total: number, community: any) => {
    return total + community?.members?.length;
  }, 0);

  return totalMembers;
}

export function getTotalJoinRequests(communities: any) {
  const totalJoinRequests = communities.reduce(
    (total: number, community: any) => {
      return total + community?.joinRequests?.length;
    },
    0
  );

  return totalJoinRequests;
}

export function getTotalReportedPosts(communities: any) {
  const totalReportedPosts = communities.reduce(
    (total: number, community: any) => {
      return total + community?.reportedPosts?.length;
    },
    0
  );

  return totalReportedPosts;
}

export async function getAllUserCommunities(userId: any) {
  return await Community.find({ createdBy: userId })
    .select("_id community_name members joinRequests reportedPosts created_at visibility")
    .lean();
}



export function getTopCommunities(all_communities: any, upto: number = 5) {
  return all_communities
    .sort((a: any, b: any) => b.members.length - a.members.length)
    .slice(0, upto);
}

export interface chartDataType {
  month: string;
  members: number;
  community_name: string;
}

export function formatCommunitiesForChart(communities: any[]) {
  const chartData: chartDataType[] = [];

  communities.forEach((community) => {
    const monthName = dayjs(community?.created_at).format("MMMM");
    chartData.push({
      month: monthName,
      members: community.members.length,
      community_name: community.community_name,
    });
  });

  const ticks = calculateYAxisTicks(chartData);

  return {
    chartData,
    ticks: ticks,
  };
}

export function calculateYAxisTicks(chartData: any[]) {
  const maxMembers = Math.max(...chartData.map((item) => item.members));

  // If there's no data or all values are 0
  if (maxMembers <= 0) {
    return [0, 5, 10, 15, 20];
  }

  const magnitude = Math.pow(10, Math.floor(Math.log10(maxMembers)));

  let tickInterval;
  if (maxMembers / magnitude < 2) {
    tickInterval = magnitude / 5;
  } else if (maxMembers / magnitude < 5) {
    tickInterval = magnitude / 2;
  } else {
    tickInterval = magnitude;
  }

  // Round up the max value to the next tick
  const maxTick = Math.ceil(maxMembers / tickInterval) * tickInterval;

  // Generate ticks
  const ticks = [];
  for (let i = 0; i <= maxTick; i += tickInterval) {
    ticks.push(i);
  }

  // Ensure we have a reasonable number of ticks
  if (ticks.length < 5) {
    return calculateYAxisTicksWithInterval(chartData, tickInterval / 2);
  } else if (ticks.length > 10) {
    return calculateYAxisTicksWithInterval(chartData, tickInterval * 2);
  }

  return ticks;
}

export function calculateYAxisTicksWithInterval(chartData: any[], interval: number) {
  const maxMembers = Math.max(...chartData.map((item) => item.members));

  if (maxMembers <= 0) {
    return [0, 5, 10, 15, 20];
  }

  const maxTick = Math.ceil(maxMembers / interval) * interval;

  const ticks = [];
  for (let i = 0; i <= maxTick; i += interval) {
    ticks.push(i);
  }

  return ticks;
}



export function allCommunitiesPayload(communities: any[]) {
  return communities.map((community) => {
    return {
      id: community._id,
      community_name: community.name,
      members: community.members.length,
      reported_posts: community.reportedPosts.length,
      join_requests: community.joinRequests.length,
      created_at: community.created_at,
    };
  });
}
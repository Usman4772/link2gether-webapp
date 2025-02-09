import Community from "@/models/community";
import Post from "@/models/posts";
import User from "@/models/user";
import apiErrors from "@/utils/backend/helpers/apiErrors";
import { getCommunityMembershipStatus } from "@/utils/backend/helpers/community.helper";

export async function JoinCommunity(userId: any, community: any) {
  const user = await User.findById(userId);
  const alreadyMember = community?.members?.some((member: string) => {
    if (member == userId) return true;
  });
  if (alreadyMember) return community;

  if (user.communityMemberships.includes(community._id)) return community;
  community?.members.push(userId);
  community.memberCount = community?.members?.length;
  if (!user) throw new apiErrors([], "Unauthorized", 401);
  user.communityMemberships.push(community._id);
  await user.save();
  await community.save();
  return community;
}

export async function joinMultipleCommunities(data: string[], userId: any) {
  let errors: any[] = [];

  const res = data.map(async (id: string, index: number) => {
    const community = await Community.findById(id);

    if (!community) {
      const error = {
        [`joined.${index}`]: `Community does not exist`,
      };
      errors.push(error);

      return;
    }
    const data = await JoinCommunity(userId, community);
    return data;
  });

  await Promise.all(res); // to wait all promises to resolve

  if (errors.length > 0) {
    throw new apiErrors(errors, "Invalid community ids", 400);
  }
  return res;
}

export async function getCommunityDetails(id: any, userId: any) {
  const community = await Community.findById(id)
    // .populate("posts")
    .populate({
      path: "posts",
      model: Post,
      select: "-community -__v",
      populate: {
        path: "author",
        select: "_id username profileImage",
        model: User,
      },
    })
    .populate({ path: "createdBy", select: "_id username" })
    .select("-__v"); //this will populate only _id and username of username form author.and if we want to have anything else except _id and username we can add -_id and -username to exclude these two fields
  return {
    ...community?.toObject(),
    memberShipStatus: getCommunityMembershipStatus(community, userId),
    isAdmin: community?.createdBy._id.toString() === userId.toString(),
  };
}

export async function handleLeaveCommunity(community: any, user: any) {
  const isMember = community.members.includes(user?._id);
  if (!isMember) throw new apiErrors([], "Unauthorized action", 401);

  if (community?.createdBy.toString() === user?._id)
    throw new apiErrors([], "You cannot leave a community you created", 404);
  const members = community.members.filter(
    (id: any) => id.toString() !== user?._id.toString()
  );
  user.communityMemberships = user.communityMemberships.filter(
    (id: any) => id.toString() !== community._id.toString()
  );
  community.members = members;
  community.memberCount = community.members.length;
  await user.save();
  await community.save();
}


export async function handleCancelRequest(community: any, userId: any) {
  const hasRequested = community.joinRequests.some(
    (id: any) => id.toString() === userId
  );
  if (hasRequested) {
    community.joinRequests = community.joinRequests.filter(
      (id: any) => id.toString() !== userId
    );
    await community.save();
  } else {
    throw new apiErrors([], "No request found with this user!", 400);
  }
}

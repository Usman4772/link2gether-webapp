import Community from "@/models/community";
import User from "@/models/user";
import apiErrors from "@/utils/backend/helpers/apiErrors";

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

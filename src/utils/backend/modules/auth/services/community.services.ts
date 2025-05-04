import BannedUser from "@/models/bannedUsers";
import Comment from "@/models/comments";
import Community from "@/models/community";
import Post from "@/models/posts";
import User from "@/models/user";
import apiErrors from "@/utils/backend/helpers/apiErrors";
import {calculateBanExpiresAt, communityDetailPagePayload,} from "@/utils/backend/helpers/community.helper";
import Notification from "@/models/notifications.schema"
import {sendPusherNotification} from "@/utils/backend/pusher/actions/send.notification";

export async function JoinCommunity(userId: any, community: any) {
  const user = await User.findById(userId);
  const alreadyMember = community?.members?.some((member: string) => {
    if (member == userId) return true;
  });
  if (alreadyMember) return community;

  if (user.communityMemberships.includes(community._id)) return community;
  if (community.createdBy.toString() === userId.toString())
    community.moderators.push(userId);
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
    .populate({ path: "createdBy", select: "_id username" })
    .populate({
      path: "bannedUsers",
      model: BannedUser,
      match: { community: id, user: userId },
    })
    .select("-__v");
  const payload = communityDetailPagePayload(community, userId);
  return payload;
}

export async function handleLeaveCommunity(community: any, user: any) {
  const isMember = community.members.includes(user?._id);
  if (!isMember) throw new apiErrors([], "Unauthorized action", 401);

  if (community?.createdBy.toString() === user?._id.toString()) {
    if (community.visibility === "private") {
      throw new apiErrors(
        [],
        "You cannot leave private community being an admin.",
        400
      );
    }
  }
  const members = community.members.filter(
    (id: any) => id.toString() !== user?._id.toString()
  );

  community.moderators = community.moderators.filter(
    (id: any) => id.toString() !== user._id.toString()
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

export async function deleteCommunity(communityId: any) {
  await Community.findByIdAndDelete(communityId);

  //!remove community id from all members memberShip status
  await User.updateMany(
    { communityMemberships: communityId }, //where communityMemberships include this id
    { $pull: { communityMemberships: communityId } }
  );

  //! remove posts from users who have posted in this community.
  const posts = await Post.find({ community: communityId });
  const postIds = posts.map((post) => post._id);

  await User.updateMany(
    { posts: { $in: postIds } },
    { $pull: { posts: { $in: postIds } } }
  );

  //!Remove all posts related to this community from post collection.
  await Post.deleteMany({ community: communityId });

  //!Remove all the comments related on this community and on those posts
  //todo VERIFY THIS THING ONCE IMPLEMENTED COMMENT FEATURE
  await Comment.deleteMany({ community: communityId });
  await Comment.deleteMany({ post: { $in: postIds } });
}

export async function addModerators(communityId: any, moderatorsId: any) {
  return Community.updateOne(
      {_id: communityId},
      {$addToSet: {moderators: {$each: moderatorsId}}}
  );
}

export async function removeModerator(communityId: string, modId: string) {
  await Community.updateOne(
    { _id: communityId },
    { $pull: { moderators: modId } }
  );
}

export interface RulesPayload {
  rules: Array<{
    rule: string;
  }>;
  merge?: boolean;
}

export async function addRules(data: RulesPayload, community: any) {
  if (data.merge) {
    await Community.updateOne(
      { _id: community._id },
      { $push: { rules: { $each: data.rules } } }
    );
  } else {
    await Community.updateOne(
      { _id: community._id },
      { $set: { rules: data.rules } }
    );
  }
  return Community.findById(community._id);
}

export async function banUser(
  bannedUserId: any,
  community: any,
  modId: any,
  data: { reason: string; duration: string }
) {
  const isAlreadyBanned = await BannedUser.findOne({
    user: bannedUserId,
    community: community._id,
  });
  // if (isAlreadyBanned) throw new apiErrors([], "User is already banned", 400);
  const expires_at = calculateBanExpiresAt(data.duration);
  const bannedUser = await BannedUser.create({
    user: bannedUserId,
    reason: data.reason,
    community: community._id,
    banned_by: modId,
    ban_duration: data.duration,
    expires_at,
  });
  community.bannedUsers.push(bannedUser._id);
  await community.save();

await sendNotificationToBannedUser(bannedUserId,community,data?.duration,data?.reason,modId)

  return bannedUser;
}







export async function sendNotificationToBannedUser(bannedUserId:string,community:any,ban_duration:string,reason:string,modId:string){
  const mod=await User.findById(modId)
  let  notificationData={
    title:`You have been banned from ${community?.community_name}`,
    body:`You have been banned from ${community?.community_name} for ${ban_duration} by ${mod?.username} due to ${reason}`,
    avatar:community?.avatar,
    userId:bannedUserId,
  }
  const notification=await createNotification(notificationData)
  await sendPusherNotification(bannedUserId,notification)
}



export async function createNotification(data:any){
  const user=await User.findById(data.userId)
  const notification= await Notification.create(data)
  user.notifications.push(notification?._id)
  await user.save()
  return notification

}

export async function fetchExploreCommunities(user: any, query: string | null) {
  if (query) {
    const communities = await Community.find({
      community_name: { $regex: query, $options: "i" },
    })
      .select("_id community_name  avatar category members ")
      .lean();
    return {
      recommended: [],
      trending: [],
      all_communities: communities,
    };
  }

  const userPreferences = user?.preferences?.categories;
  const recommended = await Community.find({
    category: { $in: userPreferences },
    members: { $ne: user._id },
  })
    .select("_id community_name  avatar category members ")
    .lean();

  const allCommunities = await Community.find({
    members: { $ne: user._id },
  }).select("_id community_name  avatar category members ");
  const trending = allCommunities.sort(
    (a: any, b: any) => b.members.length - a.members.length
  );

  return {
    recommended: recommended,
    trending: trending,
    all_communities: [],
  };
}

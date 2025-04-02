import Community from "@/models/community";
import { CommunityProps } from "../types/types";
import User from "@/models/user";
import apiErrors from "@/utils/backend/helpers/apiErrors";
import { handleMediaUpload } from "./authServices";
import Post from "@/models/posts";

export async function createCommunity(data: CommunityProps, userId: any) {
  const alreadyPresent = await Community.findOne({
    community_name: data.community_name,
  });
  if (alreadyPresent)
    throw new apiErrors(
      [{ community_name: "Community already exists" }],
      "Community already exists",
      400
    );

  const community = await Community.create({
    ...data,
  });
  community.createdBy = userId;
  community.moderators.push(userId);
  community.members.push(userId);
  community.memberCount = community.members.length;
  community.joinRequests = [];
  await community.save();
  return community;
}

export function updateUserPreferences(userId: any, data: any) {
  return User.findByIdAndUpdate(
    userId,
    {
      $set: {
        "preferences.categories": data.categories,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
}

export async function getRecommendedCommunities(userId: any) {
  const user = await User.findById(userId).select(
    "preferences.categories communityMemberships"
  ); //fetch only the mentioned fields
  const recommendedCommunities = await Community.find({
    category: {
      $in: user.preferences.categories,
    },
    _id: {
      $nin: user.communityMemberships, //exclude communities user is already a member of
    },
  })
    .sort({ memberCount: -1 }) //sort by highest member count (-1 desc and 1 is asc)
    .limit(20);
  return recommendedCommunities;
}

export async function getUserProfileDetails(userId: any) {
  const user = await User.findById(userId).select(
    "_id username email profileImage created_at onboardingStatus"
  );

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    profileImage: user.profileImage,
    created_at: user?.created_at,
    onboardingStatus: user?.onboardingStatus,
  };
}

export async function updateProfile(data: any, userId: any) {
  const user = await User.findById(userId).select(
    "-password -preferences -__v -remember -communityMemberships -posts -savedPosts"
  );

  if (data.username) {
    user.username = data.username;
  }
  if (data.email) {
    const doesAlreadyExists = await User.findOne({ email: data.email });
    if (doesAlreadyExists && data.email !== user.email) {
      throw new apiErrors(
        [{ email: "This email is already registered" }],
        "User already exists",
        400
      );
    }
    user.email = data.email;
  }
  if (data?.profileImage) {
    const image = await handleMediaUpload(data?.profileImage);
    await user.updateOne({ profileImage: image });
  }
  await user.save();
  return user;
}

export async function getAllUserCommunities(userId: any) {
  const communities = await User.findById(userId)
    .populate({
      path: "communityMemberships",
      model: Community,
      select: "_id community_name description avatar memberCount",
    })
    .select("communityMemberships");
  return communities.communityMemberships;
}

export async function getUserCreatedCommunities(userId: any) {
  const communities = await Community.find({
    createdBy: userId,
  }).select("_id community_name description avatar memberCount");
  return communities;
}

export async function getSavedPosts(userId: any) {
  const posts = await User.findById(userId)
    .populate({
      path: "savedPosts",
      model: Post,
      select:
        "_id description media created_at type likes comments community author",
      populate: {
        path: "author",
        model: User,
        select: "_id username profileImage",
      },
    })
    .select("savedPosts");
  return posts.savedPosts.map((post: any) => {
    return {
      id: post._id,
      description: post.description,
      media: post.media,
      created_at: post.created_at,
      type: post.type,
      likes: post.likes.length,
      author: {
        id: post.author._id,
        username: post.author.username,
        profileImage: post.author.profileImage,
      },
      comments: post.comments.length,
    };
  });
}

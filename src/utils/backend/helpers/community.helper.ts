import Community from "@/models/community";
import { ObjectId, Types } from "mongoose";
import { NextRequest } from "next/server";
import apiErrors from "./apiErrors";
import Post from "@/models/posts";
import User from "@/models/user";
import {
  banUserSchema,
  moderatorsSchema,
  rulesSchema,
} from "../validation-schema/community.schema";
import { RulesPayload } from "../modules/auth/services/community.services";
import dayjs from "dayjs";

export async function checkCommunityExistence(communityId: string) {
  if (!Types.ObjectId.isValid(communityId)) {
    throw new apiErrors([], "This community does not exists", 404);
  }
  const community = await Community.findById(communityId)
    .populate({ path: "posts", model: Post })
    .populate({ path: "posts", populate: { path: "author", model: User } });
  if (!community)
    throw new apiErrors([], "This community does not exists", 404);
  return community;
}

export async function validateMultipleCommunitiesData(req: NextRequest) {
  const data = await req.json();
  if (!data || !data.joined)
    throw new apiErrors(
      [{ joined: "Joined field is required" }],
      "Please Join at least 3 communities",
      400
    );
  if (!Array.isArray(data.joined)) {
    throw new apiErrors([], "Joined field must be an array", 400);
  }
  data.joined = [...new Set(data.joined)];

  if (data.joined.length < 3) {
    throw new apiErrors(
      [{ joined: "Please Join at least 3 communities" }],
      "Please Join at least 3 communities",
      400
    );
  }
  let errors: any[] = [];
  data.joined.forEach((id: string, index: number) => {
    if (!Types.ObjectId.isValid(id) || typeof id !== "string") {
      const error = {
        [`joined.${index}`]: `Invalid community id at index ${index}`,
      };
      errors.push(error);
    }
  });
  if (errors.length > 0) {
    throw new apiErrors(errors, "Invalid community ids", 400);
  }
  return data;
}

export function getCommunityMembershipStatus(community: any, userId: any) {
  if (!community || !userId) return "not_requested";
  const memberShipStatus =
    !community?.members.includes(userId) &&
    !community?.joinRequests.includes(userId)
      ? "not_requested"
      : community?.members.includes(userId)
      ? "joined"
      : community?.joinRequests.includes(userId)
      ? "requested"
      : "not_requested";
  return memberShipStatus;
}

export function checkAdmin(userId: any, community: any) {
  if (community.createdBy.toString() !== userId) {
    throw new apiErrors([], "Unauthorized action", 400);
  }
}

export function checkModerator(community: any, userId: any) {
  if (
    !community.moderators.toString().includes(userId.toString()) &&
    community.createdBy.toString() !== userId.toString()
  ) {
    throw new apiErrors([], "Unauthorized action", 400);
  }
}

export async function validateModeratorsPayload(
  req: NextRequest,
  userId: any,
  community: any
) {
  const data = await req.json();
  if (Object.entries(data).length == 0) {
    throw new apiErrors(
      [{ moderators_id: "Moderators id are required" }],
      "Validation errors found!",
      400
    );
  }
  if (data.moderators_id.includes(userId)) {
    throw new apiErrors(
      [{ moderators_id: "You can not add admin as moderator" }],
      "Validation errors found!",
      400
    );
  }
  const moderatorsIdSet = new Set(data.moderators_id);
  const moderatorsId = [...moderatorsIdSet];
  const payload = {
    moderators_id: moderatorsId,
  };
  const result = moderatorsSchema.safeParse(payload);
  if (!result.success) {
    const errors = result.error?.errors?.map((err) => {
      return {
        [err?.path.toString()]: err?.message,
      };
    });
    throw new apiErrors(errors, "Validation errors found!", 400);
  }
  await checkMultipleUsersExistence(moderatorsId);

  checkUsersExistenceInCommunity(community, moderatorsId);

  return moderatorsId;
}

export async function checkMultipleUsersExistence(ids: any[]) {
  const users = await User.find({ _id: { $in: ids } }).select("_id");
  if (users.length !== ids.length) {
    throw new apiErrors([], "Invalid user id(s) found", 400);
  }
}

function checkUsersExistenceInCommunity(community: any, moderatorsId: any) {
  {
    //check if these moderators id's are in community members array.
    const members = community.members.map((id: any) => id.toString());
    moderatorsId.forEach((id: any) => {
      if (!members.includes(id)) {
        throw new apiErrors(
          [{ moderators_id: "Moderators must be a member of community" }],
          "Validation errors found!",
          400
        );
      }
    });
  }
}

export function validateSingleModData(
  req: NextRequest,
  community: any,
  userId: any
) {
  const modId = req.nextUrl.pathname.split("/")[7];
  if (!community.moderators.includes(modId)) {
    throw new apiErrors([], "Please provide a valid mod Id", 400);
  }
  return modId;
}

export async function validateRulesPayload(
  req: NextRequest
): Promise<{ rules: { rule: string }[]; merge: boolean }> {
  const data = await req.json();
  if (!data || !data.rules) {
    throw new apiErrors([], "Please add rules", 400);
  }
  if (!data.merge) data.merge = false;

  const result = rulesSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => {
      return {
        [error.path.join(".")]: error.message,
      };
    });
    throw new apiErrors(errors, "Validation errors found!", 400);
  }

  return data;
}




export async function validateBanPayload(
  req: NextRequest,
  bannedUserId: string,
  community: any,
  modId: any
): Promise<{ reason: string; duration: string }> {
  const data = await req.json();
  if (!data) {
    throw new apiErrors([], "Data is required", 400);
  }

  const result = banUserSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => {
      return {
        [error.path.join(".")]: error.message,
      };
    });
    throw new apiErrors(errors, "Validation errors found!", 400);
  }

  
  if (!bannedUserId || !Types.ObjectId.isValid(bannedUserId)) {
    throw new apiErrors([], "Invalid user id", 400);
  }

  const bannedUserIsAdmin =
    community.createdBy.toString() === bannedUserId.toString();

  if (bannedUserIsAdmin) {
    throw new apiErrors([], "You can't ban the community creator", 400);
  }

  const bannedUserIsModerator = community.moderators.some(
    (mod: ObjectId) => mod.toString() === bannedUserId.toString()
  );

  const bannerIsAdmin = modId.toString() === community.createdBy.toString();

  if (bannedUserIsModerator && !bannerIsAdmin) {
    throw new apiErrors(
      [],
      "Only the community creator can ban moderators",
      400
    );
  }

  return data;
}

export function calculateBanExpiresAt(duration: string): Date | null {
  const now = new Date();
  if (duration == "one_day") {
    return dayjs(now).add(1, "day").toDate();
  } else if (duration == "one_week") {
    return dayjs(now).add(1, "week").toDate();
  } else if (duration == "one_month") {
    return dayjs(now).add(1, "month").toDate();
  } else if (duration == "forever") {
    return null;
  }
  return null;
}



export function communityDetailPagePayload(community: any, userId: any) {
  return {
    id: community._id,
    community_name: community.community_name,
    description: community.description,
    visibility: community.visibility,
    rules: community.rules,
    category: community.category,
    cover: community.cover,
    avatar: community.avatar,
    isMode: community.moderators.includes(userId),
    moderators:community.moderators.length,
    isMember: community.members.includes(userId),
    memberCount: community.members.length,
    isBanned:community?.bannedUsers && community?.bannedUsers?.length > 0 ? true : false,
    created_at: community.created_at,
    createdBy: {
      id: community.createdBy._id,
      username: community.createdBy.username,
    },
    memberShipStatus: getCommunityMembershipStatus(community, userId),
    isAdmin: community.createdBy._id.toString() === userId.toString(),
}
  
}

export function getCommunityPostsPayload(posts: any, userId: any) {
  return posts.map((post: any) => {
    return {
      id: post._id,
      description: post.description,
      media: post.media,
      type: post.type,
      created_at: post.created_at,
      author: {
        id: post.author._id,
        username: post.author.username,
        profileImage: post.author.profileImage,
      },
      likes: post.likes.length,
      comments: post.comments.length,
      isLiked: post.likes.includes(userId),
    };
  });
}
import Community from "@/models/community";
import { Types } from "mongoose";
import { NextRequest } from "next/server";
import apiErrors from "./apiErrors";
import Post from "@/models/posts";
import User from "@/models/user";
import {
  moderatorsSchema,
  rulesSchema,
} from "../validation-schema/community.schema";
import { RulesPayload } from "../modules/auth/services/community.services";

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
): Promise<{ rules: RulesPayload; merge: boolean }> {
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

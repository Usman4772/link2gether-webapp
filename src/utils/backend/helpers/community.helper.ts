import Community from "@/models/community";
import { Types } from "mongoose";
import { NextRequest } from "next/server";
import apiErrors from "./apiErrors";

export async function checkCommunityExistence(communityId: string) {
  if (!Types.ObjectId.isValid(communityId)) {
    throw new apiErrors([], "This community does not exists", 404);
  }
  const community = await Community.findById(communityId)
    .populate("posts")
    .populate({ path: "posts", populate: { path: "author" } });
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

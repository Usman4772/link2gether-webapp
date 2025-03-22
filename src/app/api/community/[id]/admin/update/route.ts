import apiErrors from "@/utils/backend/helpers/apiErrors";
import {
  checkAdmin,
  checkCommunityExistence,
} from "@/utils/backend/helpers/community.helper";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import {
  connectToDatabase,
  handleMediaUpload,
} from "@/utils/backend/modules/auth/services/authServices";
import { updateCommunitySchema } from "@/utils/backend/validation-schema/community.schema";
import { ObjectId } from "mongoose";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const communityId = req.nextUrl.pathname.split("/")[3];
    const community = await checkCommunityExistence(communityId);
    checkAdmin(userId, community);
    const data = await validateUpdatePayload(req);
    await updateCommunity(data, community);
    return SUCCESS_RESPONSE([], 200, "Community updated successfully");
  } catch (error) {
    return errorHandler(error);
  }
}

async function updateCommunity(data: any, community: any) {
  if (data.community_name) {
    await community.updateOne({ community_name: data.community_name });
  }
  if ("description" in data) {
    await community.updateOne({ description: data.description });
  }
  if ("avatar" in data) {
    const avatar = await handleMediaUpload(data?.avatar);
    await community.updateOne({ avatar });
  }
  if ("cover" in data) {
    const cover = await handleMediaUpload(data?.cover);
    await community.updateOne({ cover });
  }
  if (data.visibility) {
    await community.updateOne({ visibility: data.visibility });
  }
  if (data.moderators && data.moderators.add) {
    data?.moderators?.add?.forEach((modId: ObjectId, index: number) => {
      if (!community.members?.toString().includes(modId)) {
        throw new apiErrors(
          [{ modId: "User is not a member of this community" }],
          "Validation errors found",
          400
        );
      }
    });
    await community.updateOne({
      $push: { moderators: { $each: data.moderators.add } },
    });
  }
  if (data.moderators && data.moderators.remove) {
    await community.updateOne({
      $pull: { moderators: { $in: data.moderators.remove } },
    });
  }
  if (data.members && data.members.remove) {
    await community.updateOne({
      $pull: { members: { $in: data.members.remove } },
    });
  }
}

async function validateUpdatePayload(req: NextRequest) {
  const formData = await req.formData();
  const data: any = {};

  if (formData.has("community_name")) {
    data.community_name = formData.get("community_name");
  }
  if (formData.has("description")) {
    data.description = formData.get("description");
  }
  if (formData.has("visibility")) {
    data.visibility = formData.get("visibility");
  }
  if (formData.has("avatar")) {
    const avatar = formData.get("avatar") as any;
    if (avatar?.name == "" || avatar?.size == 0) {
      data.avatar = null;
    } else {
      data.avatar = avatar;
    }
  }
  if (formData.has("cover")) {
    const cover = formData.get("cover") as any;
    if (cover?.name == "" || cover?.size == 0) {
      data.cover = null;
    } else {
      data.cover = cover;
    }
  }
  if (formData.has("moderators.add")) {
    data.moderators = { add: formData.getAll("moderators.add") };
  }
  if (formData.has("moderators.remove")) {
    data.moderators = {
      ...data.moderators,
      remove: formData.getAll("moderators.remove"),
    };
  }
  if (formData.has("members.remove")) {
    data.members = { remove: formData.getAll("members.remove") };
  }

  // Validate only the fields that exist
  const result = updateCommunitySchema.safeParse(data);
  if (!result.success) {
    const errors = result.error?.errors.map((err) => {
      return {
        [err?.path.toString()]: err?.message,
      };
    });
    throw new apiErrors(errors, "Validation errors found", 400);
  }

  return data;
}

import { NextRequest } from "next/server";
import { communitySchema } from "../validation-schema/community.schema";
import { updateProfileSchema } from "../validation-schema/user.schema";
import apiErrors from "./apiErrors";

export async function parseCommunityFormData(formData: FormData) {
  let avatar: any = formData?.get("avatar");
  if (avatar?.name == "" || avatar?.size == 0 || avatar == "") {
    avatar = null;
  }
  return {
    community_name: formData.get("community_name") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    avatar: avatar as Blob | null,
    visibility: formData.get("visibility") as string,
  };
}

export async function validateCommunityPayload(formData: FormData) {
  const payload = {
    community_name: formData.get("community_name"),
    category: formData.get("category"),
    description: formData.get("description"),
    avatar:formData?.get("avatar"),
    visibility: formData.get("visibility"),
  };

  const result = communitySchema.safeParse(payload);

  if (!result.success) {
    const errors = result.error?.errors.map((err) => {
      return {
        [err?.path.toString()]: err?.message,
      };
    });
    throw new apiErrors(errors, "Validation errors found", 400);
  }
}

export function validatePreferencesPayload(data: { categories: string[] }) {
  if (!data.categories) {
    throw new apiErrors(
      [{ categories: "Categories field is required" }],
      "Validation errors found",
      400
    );
  }
  if (data.categories.length < 5)
    throw new apiErrors([], "Choose at least 5 categories", 400);
}



export async function validateUpdateProfilePayload(req: NextRequest) {
  const formData = await req.formData();
  let data: any = {};
  if (formData.has("username")) {
    data.username = formData.get("username") as string;
  }
  if (formData.has("email")) {
    data.email = formData.get("email") as string;
  }
  if (formData.has("profileImage")) {
    const image = formData.get("profileImage") as any;
    if (image?.name == "" || image?.size == 0) {
      data.profileImage = null;
    } else {
      data.profileImage = image;
    }
  }

  const result = updateProfileSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error?.errors?.map((err) => {
      return {
        [err?.path.toString()]: err?.message,
      };
    });
    throw new apiErrors(errors, "Validation errors found!", 400);
  }
  return data;
}
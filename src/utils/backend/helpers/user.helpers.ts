import { communitySchema } from "../validation-schema/community.schema";
import apiErrors from "./apiErrors";

export async function parseCommunityFormData(formData: FormData) {
  let displayPic: any = formData?.get("displayPic");
  if (displayPic?.name == "" || displayPic?.size == 0 || displayPic == "") {
    displayPic = null;
  }
  return {
    community_name: formData.get("community_name") as string,
    description: formData.get("description") as string,
    category: formData.get("category") as string,
    displayPic: displayPic as Blob | null,
  };
}

export async function validateCommunityPayload(formData: FormData) {
  const payload = {
    community_name: formData.get("community_name"),
    category: formData.get("category"),
    description: formData.get("description"),
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

import { communitySchema } from "./validationSchema";

export async function parseCommunityFormData(formData: FormData) {
  try {
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
  } catch (error: any) {
    throw new Error(
      JSON.stringify({
        errors: null,
        status: 401,
        message: error?.message || "Something went wrong",
      })
    );
  }
}

export async function validateCommunityPayload(formData: FormData) {
  const payload = {
    community_name: formData.get("community_name"),
    category: formData.get("category"),
  };

  const result = communitySchema.safeParse(payload);
  if (!result.success) {
    const errors = result.error?.errors.map((err) => {
      return {
        [err?.path.toString()]: err?.message,
      };
    });
    throw new Error(
      JSON.stringify({
        errors,
        status: 400,
        message: "Validation errors found",
      })
    );
  }
}

export function validatePreferencesPayload(data: { categories: string[] }) {
  if (!data.categories) {
    throw new Error(
      JSON.stringify({
        errors: [{ categories: "Categories field is required" }],
        status: 400,
        message: "Validation errors found",
      })
    );
  }
}

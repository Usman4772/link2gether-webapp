import { NextRequest } from "next/server";
import { changePasswordSchema } from "../validation-schema/user.schema";
import apiErrors from "./apiErrors";

export async function validateChangePasswordPayload(req: NextRequest) {
  const data = await req.json();
  const result = changePasswordSchema.safeParse(data);
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

import { z } from "zod";

export const changePasswordSchema = z
  .object({
    old_password: z.string({ message: "Old password is required" }).min(8),
    new_password: z
      .string({ message: "New Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .refine(
        (value) =>
          /[A-Z]/.test(value) &&
          /[a-z]/.test(value) &&
          /\d/.test(value) &&
          /[!@#$%^&*(),.?":{}|<>]/.test(value),
        {
          message: "Please choose a strong password",
        }
      ),
    confirm_password: z.string({
      message: "Confirm password field is required",
    }),
  })
  .required()
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Password do not match",
    path: ["confirm_password"],
  });


export const updateProfileSchema = z
  .object({
    username: z
      .string({ message: "Username must be of type string" })
      .trim()
      .min(3, {
        message: "Username must be at least 3 characters",
      })
      .refine((value) => /^[A-Za-z]/.test(value), {
        message: "Username must not start with number",
      }).optional(),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Please enter valid email address" }).optional(),
    profileImage: z
      .union([
        z.instanceof(Blob, { message: "Profile Image must be a file" }),
        z.literal(null),
      ])
      .refine(
        (file) => {
          if (file === null) return true;
          const validTypes = ["image/jpeg", "image/png"];
          return validTypes.includes(file.type);
        },
        {
          message: "Profile Image must be an image (JPEG, PNG)",
        }
      )
      .optional(),
  })
  .optional();
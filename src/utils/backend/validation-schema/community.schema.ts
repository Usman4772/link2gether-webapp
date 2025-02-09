import { z } from "zod";

export const communitySchema = z
  .object({
    community_name: z
      .string({ message: "Community name is required" })
      .trim()
      .min(1, { message: "Community name is required" })
      .max(100, {
        message: "Community name must not be longer than 100 characters",
      }),
    description: z
      .union([
        z.string().trim().max(2000, {
          message:
            "Community description must not be longer than 2000 characters",
        }),
        z.null().or(z.undefined()),
      ])
      .optional(),
    category: z
      .string({ message: "Please choose a category" })
      .trim()
      .min(1, { message: "Category is required" }),
    visibility: z
      .string({ message: "Visibility field is required" })
      .refine((value) => {
        if (value !== "public" && value !== "private") {
          throw new Error("Invalid visibility value");
        }
        return true;
      }),
  })
  .required();


import { Types } from "mongoose";
import { z } from "zod";
import apiErrors from "../helpers/apiErrors";

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
    avatar: z
      .union([
        z.instanceof(Blob, { message: "Avatar must be a file" }),
        z.null().or(z.undefined()),
      ])
      .refine(
        (file) => {
          if (!file) return true;
          const validTypes = ["image/jpeg", "image/png"];
          return validTypes.includes(file.type);
        },
        {
          message: "Avatar must be an image (JPEG, PNG)",
        }
      )
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

export const updateCommunitySchema = z
  .object({
    community_name: z
      .string({ message: "Community name is required" })
      .trim()
      .min(1, { message: "Community name is required" })
      .max(100, {
        message: "Community name must not be longer than 100 characters",
      })
      .optional(),
    description: z
      .string()
      .trim()
      .max(2000, {
        message:
          "Community description must not be longer than 2000 characters",
      })
      .optional()
      .nullable(),
    avatar: z
      .union([
        z.instanceof(Blob, { message: "Avatar must be a file" }),
        z.literal(null),
      ])
      .refine(
        (file) => {
          if (file === null) return true;
          const validTypes = ["image/jpeg", "image/png"];
          return validTypes.includes(file.type);
        },
        {
          message: "Avatar must be an image (JPEG, PNG)",
        }
      )
      .optional(),
    cover: z
      .union([
        z.instanceof(Blob, { message: "Cover must be a file" }), // ✅ Allow new file
        z.literal(null), // ✅ Allow null for removing cover
      ])
      .refine(
        (file) => {
          if (file === null) return true; // ✅ Allow null
          const validTypes = ["image/jpeg", "image/png"];
          return validTypes.includes(file.type);
        },
        {
          message: "Cover must be an image (JPEG, PNG)",
        }
      )
      .optional(),
    category: z
      .string({ message: "Please choose a category" })
      .trim()
      .min(1, { message: "Category is required" })
      .optional(),
    visibility: z
      .string({ message: "Visibility field is required" })
      .refine((value) => {
        if (!value) return true;
        return value === "public" || value === "private";
      }, "Invalid visibility value")
      .optional(),
  })
  .partial();

export const moderatorsSchema = z
  .object({
    moderators_id: z
      .array(z.string())
      .nonempty({ message: "Moderators Id is required" })
      .refine((value) => {
        const errors: any = [];
        value?.forEach((id, index) => {
          if (!Types.ObjectId.isValid(id)) {
            errors.push({
              [`moderatorsId.${index}`]: `Invalid moderator id at index ${index}`,
            });
          }
        });
        if (errors.length) {
          throw new apiErrors(errors, "Validation errors found!", 400);
        }
        return true;
      }),
  })
  .required();

export const rulesSchema = z
  .object({
    rules: z
      .array(
        z.object(
          {
            rule: z
              .string({ message: "Rule must be of type string" })
              .trim()
              .min(1, { message: "Rule can't be empty" }),
          },
          { message: "Rules are required" }
        )
      )
      .nonempty({ message: "Rules are required" }),
    merge: z
      .boolean({ message: "Merge must be either true or false" })
      .optional(),
  })

  .required();

export const banUserSchema = z
  .object({
    reason: z
      .string({ message: "Reason must be of type string" })
      .trim()
      .min(1, { message: "Reason is required" })
      .max(100, { message: "Reason must not be longer than 100 characters" }),
    duration: z.string({ message: "Duration must be of type string" }).refine(
      (value) => {
        if (!value) return false;
        return (
          value === "one_day" ||
          value === "one_week" ||
          value === "one_month" ||
          value === "forever"
        );
      },
      {
        message: "Duration must be one of: one_day, one_week, one_month, or forever"
      }
    ),
  })
  .required();



  
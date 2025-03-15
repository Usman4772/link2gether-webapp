import { z } from "zod";

export const postSchema = z.object({
  description: z
    .string({ message: "Community description is required" })
    .trim()
    .min(5, { message: "Post description must be at least 5 characters long" })
    .max(2000, {
      message: "Post description must not be longer than 2000 characters",
    }),
  media: z
    .union([
      z.instanceof(Blob, { message: "Media must be a file" }),
      z.null().or(z.undefined()),
    ])
    .refine(
      (file) => {
        if (!file) return true;
        const validTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "video/mp4",
          "video/mpeg",
        ];
        return validTypes.includes(file.type);
      },
      {
        message: "Media must be an image (JPEG, PNG, GIF) or video (MP4, MPEG)",
      }
    )
    .optional(),
});

export const reportPostSchema = z
  .object({
    community_id: z.string({ message: "Community ID is required" }),
    reason: z
      .string({ message: "Reason is required" })
      .min(2, { message: "Reason must be at least 2 characters long" })
      .max(50, { message: "Reason must not be longer than 50 characters" }),
  })
  .required();

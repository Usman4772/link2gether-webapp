import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string({ message: "Username is required" })
      .trim()
      .min(3, {
        message: "Username must be at least 3 characters",
      })
      .refine((value) => /^[A-Za-z]/.test(value), {
        message: "Username must not start with number",
      }),
    email: z
      .string({ message: "Email is required" })
      .email("Please enter valid email address"),
    password: z
      .string({ message: "Password is required" })
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
  .refine((data) => data.password === data.confirm_password, {
    message: "Password do not match",
    path: ["confirm_password"],
  });

export const loginSchema = z
  .object({
    email: z
      .string({ message: "Email is required" })
      .email("Please enter valid email address"),
    password: z.string({ message: "Password is required" }),
  })
  .required();

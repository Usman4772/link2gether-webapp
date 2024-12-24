"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

function useFormConfigration() {
  const formSchema = z
    .object({
      username: z
        .string({})
        .trim()
        .min(3, {
          message: "Username must be at least 3 characters",
        })
        .refine((value) => /^[A-Za-z]/.test(value), {
          message: "Username must not start with number",
        }),
      email: z.string().email("Please enter valid email address"),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .refine(
          (value) =>
            /[A-Z]/.test(value) &&
            /[a-z]/.test(value) &&
            /\d/.test(value) &&
            /[!@#$%^&*(),.?":{}|<>]/.test(value),
          {
            message:
              "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
          }
        ),
      confirm_password: z.string(),
    })
    .required()
    .refine((data) => data.password === data.confirm_password, {
      message: "Password do not match",
      path: ["confirm_password"],
    });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { setError } = form;

  return {
    form,
    formSchema,
    setError,
  };
}

export default useFormConfigration;

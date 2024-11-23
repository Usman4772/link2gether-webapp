"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Title from "antd/es/typography/Title";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters",
  }),
  email: z.string().email("Please enter valid email address"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  confirm_password: z.string(),
});

function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="w-full h-full flex flex-col items-center pt-20 pb-12 px-16 bg-white rounded-[1rem] shadow-sm">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-[960px] h-[695px] max-w-[960px] flex-col items-start py-20 "
        >
          <h2 className="self-stretch text-[#0D141C] text-center  text-[22px] font-bold leading-paragraph-100 py-4">
            Create Account
          </h2>
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" my-[12px] mx-[16px] ">
                <FormControl>
                  <Input
                    placeholder="Username"
                    {...field}
                    className="flex h-[56px] items-center self-stretch bg-[#E8EDF5] p-[16px] w-[448px] rounded-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" my-[12px] mx-[16px] ">
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    className="flex h-[56px] items-center self-stretch bg-[#E8EDF5] p-[16px] w-[448px] rounded-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" my-[12px] mx-[16px] ">
                <FormControl>
                  <Input
                    placeholder="Password"
                    {...field}
                    className="flex h-[56px] items-center self-stretch bg-[#E8EDF5] p-[16px] w-[448px] rounded-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="confirm_password"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" my-[12px] mx-[16px] ">
                <FormControl>
                  <Input
                    placeholder="Confirm Password"
                    {...field}
                    className="flex h-[56px] items-center self-stretch bg-[#E8EDF5] p-[16px] w-[448px] rounded-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={"default"}
            className="w-[448px] h-[56px]  px-[16px] py-[12px]"
          >
            {/* <Loader2 className="animate-spin" /> */}
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default RegisterForm;

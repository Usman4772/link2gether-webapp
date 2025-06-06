"use client";
import FormInput from "@/components/Global/FormInput";
import { useState } from "react";
import PasswordInput from "@/components/Global/PasswordInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import useFormConfigration from "../hooks/useFormConfigration";
import useLogin from "../hooks/useLogin";
import CustomButton from "@/components/Global/CustomButton";
import {Checkbox} from "antd";

function LoginForm() {
  const { form } = useFormConfigration();
  const { handleLogin, btnLoading,setRemember } = useLogin();

  return (
    <div className="w-full overflow-x-hidden min-h-screen flex  items-center justify-center flex-col lg:flex-row md:justify-between  pb-12 md:px-16 bg-white md:rounded-[1rem] shadow-sm lg:w-full lg:h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="flex max-w-[960px] flex-col items-start py-20  justify-start"
        >
          <p className="text-[14px] font-[400] text-[#706F6F] leading-[22px] mx-[16px]">
            WELCOME BACK
          </p>
          <h2 className="self-stretch text-[#0D141C] text-start  text-[22px] font-bold leading-paragraph-100 py-4 mx-[16px]">
            Login to your account
          </h2>

          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" my-[12px] mx-[16px] max-w-[450px]">
                <FormControl>
                  <FormInput
                    placeholder="example@google.com"
                    {...field}
                    className="w-[448px]"
                    name="email"
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
              <FormItem className=" my-[12px] mx-[16px] max-w-[450px]">
                <FormControl>
                  <PasswordInput placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <div className={"mx-[16px] w-full flex items-start gap-2"}>
                <Checkbox onChange={(e)=>setRemember(e.target.checked)}/>
                <div>Remember me</div>
            </div>

            <a className={"ml-auto font-bold  text-btn py-2 px-2"} href={"/forget-password"}>Forget Password?</a>

          <CustomButton
            text="Login"
            type="submit"
            loading={btnLoading}
            size={"xl"}
            variant={"secondary"}
          />
          <h2 className="px-[16px] py-4 text-[#706F6F]">
            New to Link2Gether?{" "}
            <Link href={"/register"} className="text-btn">
              Register here
            </Link>
          </h2>
        </form>
      </Form>

      <div>
        <Image
          src={"/register-illustration.svg"}
          width={400}
          height={400}
          alt="Register"
        />
      </div>
    </div>
  );
}

export default LoginForm;

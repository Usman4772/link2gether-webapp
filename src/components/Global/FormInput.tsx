import React from "react";
import { Input } from "../ui/input";
import { HiOutlineMail } from "react-icons/hi";
import { FormInputProps } from "@/utils/frontend/types";
import { LuUser } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";

const icons = {
  username: <LuUser />,
  email: <HiOutlineMail />,
  search: <FiSearch />,
};

function FormInput({
  placeholder,
  name,
  className,
  onChange = () => {},
  ...props
}: FormInputProps) {
  const iconKey = name as keyof typeof icons;
  return (
    <div className="relative w-full ">
      <div className="absolute top-[50%] translate-y-[-50%] px-3 text-[19px]">
        {icons[iconKey]}
      </div>
      <Input
        type={"text"}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
        className={`flex h-[56px] items-center self-stretch bg-[#E8EDF5] p-[16px] px-[35px] w-[448px] rounded-12  ${className}`}
      />
    </div>
  );
}

export default FormInput;

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { FormInputProps } from "@/utils/frontend/types";
import { PiLockKeyOpenLight } from "react-icons/pi";

function PasswordInput({ placeholder, ...props }: FormInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="relative w-full">
      <div className="absolute top-[50%] translate-y-[-50%] px-3 text-[19px]">
        <PiLockKeyOpenLight />
      </div>
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        {...props}
        className="flex h-[56px] items-center self-stretch bg-[#E8EDF5] p-[16px] px-[35px] w-[448px] rounded-12 "
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-2"
      >
        {showPassword ? (
          <EyeOff className="w-5 h-5" />
        ) : (
          <Eye className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
}

export default PasswordInput;

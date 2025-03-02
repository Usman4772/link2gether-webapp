import { cva, VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import React, { ButtonHTMLAttributes } from "react";


const buttonVariants = cva(
  "flex items-center justify-center gap-2 rounded-md",
  {
    variants: {
      variant: {
        default: "bg-btn_default_clr text-black hover:bg-btn_default_hover",
        primary:
          "bg-btn_primary_clr text-primary_clr hover:bg-btn_primary_hover",
        secondary: "bg-btn_secondary_clr text-white hover:bg-btn_secondary_hover",
      },
      size: {
        sm: "",
        md: "px-4 py-2",
        lg: "",
        xl: "w-[95%] h-[56px]  mx-[16px] py-[12px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: React.ReactNode;
  text: string;
}
export default function CustomButton({ variant, size, loading, icon, text, ...props }: ButtonProps) {
  return (
    <button {...props} className={buttonVariants({ variant, size })}>
      {loading && <Loader2 className="animate-spin " />}
      {icon && <div>{icon}</div>}
      {text}
    </button>
  );
}

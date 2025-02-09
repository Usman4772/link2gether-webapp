import { RainbowButton } from "@/components/ui/rainbow-button";
import { ButtonProps } from "@/utils/frontend/types";
import { Loader2 } from "lucide-react";


export function Button({
  text = "N/A",
  className = "",
  onClick = () => {},
  loading = false,
}: ButtonProps) {
  return (
    <RainbowButton
      className={`flex items-center gap-2 h-[40px] ${className}`}
      onClick={onClick}
    >
      {loading && <Loader2 className="animate-spin" />} {text}
    </RainbowButton>
  );
}

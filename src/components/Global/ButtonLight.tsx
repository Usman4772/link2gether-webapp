import { ButtonProps } from "@/utils/frontend/types";
import { Loader2 } from "lucide-react";
import React from "react";

function ButtonLight({
  text = "N/A",
  className = "",
  onClick = () => {},
  loading = false,
  icon = null,
}: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 bg-btn_secondary rounded-md flex items-center justify-center gap-2 ${className}`}
      onClick={onClick}
    >
      {" "}
      {loading && <Loader2 className="animate-spin" />}
      {icon && <div>{icon}</div>}
      {text}
    </button>
  );
}

export default ButtonLight;

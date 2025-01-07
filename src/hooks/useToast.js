import { ToastContext } from "@/components/Global/ToastProvider";
import { CircleCheckBig, CircleX } from "lucide-react";
import React, { useContext } from "react";
import { MdSmsFailed } from "react-icons/md";

function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  const { toast } = context;

  function success(message, description) {
    toast.success({
      message,
      description,
      icon: (
        <CircleCheckBig
          style={{
            color: "#16fe3c",
          }}
        />
      ),
    });
  }

  function error(message, description) {
    toast.error({
      message,
      description,
      icon: <CircleX color="#fe1616" />,
    });
  }
  return {
    success,
    error,
  };
}

export default useToast;

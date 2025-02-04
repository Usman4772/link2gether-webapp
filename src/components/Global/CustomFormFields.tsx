import {   TextAreaProps } from "@/utils/frontend/types";
import { Textarea } from "../ui/textarea";

export function CustomTextArea({placeholder, name, className, onChange = () => {}, ...props}:TextAreaProps ) {
    return (
      <Textarea
        placeholder={placeholder}
        onChange={onChange}
            {...props}
            
        className={`flex  items-center self-stretch bg-[#E8EDF5] p-[16px] px-[35px] w-[448px] rounded-12  ${className}`}
      />
    );
}
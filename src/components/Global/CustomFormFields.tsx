import { TextAreaProps } from "@/utils/frontend/types";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function CustomTextArea({
  placeholder,
  name,
  className,
  onChange = () => {},
  ...props
}: TextAreaProps) {
  return (
    <Textarea
      placeholder={placeholder}
      onChange={onChange}
      {...props}
      className={`flex  items-center self-stretch bg-[#E8EDF5] p-[16px] px-[35px] w-[448px] rounded-12  ${className}`}
    />
  );
}

interface SelectBoxProps {
  items: { label: string; value: string }[];
  label?: string;
  placeholder?: string;
  className?: string;
  triggerBtnClassName?: string;
  labelClassName?: string;
  itemsClassName?: string;
  onChange?: (e: any) => void;
  value?: string;
}

export function CustomSelectBox({
  items,
  label = "",
  placeholder = "Select a value",
  className,
  triggerBtnClassName,
  labelClassName,
  itemsClassName,
  onChange = () => {},
  value = "",
  ...props
}: SelectBoxProps) {
  return (
    <div className="w-[95%]">
      <Select {...props} onValueChange={onChange} value={value}>
        <SelectTrigger
          className={`w-full justify-between bg-fields text-paragraph h-12 px-4 rounded-lg transition-all duration-200 hover:shadow-md ${triggerBtnClassName}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          className={` ${className}`}
          align="start"
          side="bottom"
          sideOffset={4}
          style={{
            zIndex: 9999,
            position: "relative",
            maxHeight: "calc(100vh - 100px)",
            overflowY: "auto",
          }}
        >
          <SelectGroup >
            <SelectLabel className={` ${labelClassName}`}>{label}</SelectLabel>
            {items.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className={`py-3 px-4 hover:bg-fields cursor-pointer transition-colors duration-150 ${itemsClassName}`}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

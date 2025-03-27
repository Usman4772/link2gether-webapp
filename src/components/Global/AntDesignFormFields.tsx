"use client";

import { DatePicker, Input, InputNumber, Select } from "antd";
import type {
  DatePickerProps,
  InputProps,
  InputNumberProps,
  SelectProps,
} from "antd";
import type { Moment } from "moment";
import Image from "next/image";
import type React from "react";

import { RiArrowDownWideFill as ArrowDown } from "react-icons/ri";

interface CustomInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string | null;
}

function CustomInput({
  placeholder = "Value",
  value = "",
  onChange = () => {},
  className = "",
  type = null,
  ...props
}: CustomInputProps) {
  return (
    <Input
      style={{
        padding: "13px",
        borderRadius: "6px",
      }}
      type={type || undefined}
      value={value}
      className={`text-slate-300 font-light ${className}`}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  );
}

interface CustomNumberInputProps {
  onChange?: (value: number | null) => void;
  placeholder?: string;
  className?: string;
  prefix?: React.ReactNode;
  value?: number | string;
  min?: number;
  max?: number | null;
}

function CustomNumberInput({
  onChange = () => {},
  placeholder = "Value",
  className = "",
  prefix = "",
  value = "",
  min = 1,
  max = null,
  ...props
}: CustomNumberInputProps) {
  const maxValue = max !== null ? max : Number.POSITIVE_INFINITY;
  return (
    <InputNumber
      type="number"
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: "6px",
      }}
      prefix={prefix}
      value={
        typeof value === "string"
          ? Number.parseFloat(value) || undefined
          : value
      }
      className={className}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      max={maxValue}
      {...props}
    />
  );
}

interface SelectOption {
  value: string | number;
  label: React.ReactNode;
}

interface CustomSelectProps extends Omit<SelectProps, "onChange" | "options"> {
  placeholder?: string;
  value?: string | number | (string | number)[];
  defaultValue?: string | number | (string | number)[];
  onChange?: (value: string | number | (string | number)[]) => void;
  options?: SelectOption[];
}

const CustomSelect = ({
  placeholder,
  value,
  defaultValue,
  onChange,
  options = [],
  ...props
}: CustomSelectProps) => {
  return (
    <Select
      suffixIcon={<ArrowDown className="w-5 h-5"/>}
      className={`custom-select-box`}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      options={options.map((option) => ({
        value: option.value,
        label: option.label,
      }))}
      {...props}
    />
  );
};

interface CustomTextAreaProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function CustomTextArea({
  placeholder = "Value",
  ...props
}: CustomTextAreaProps) {
  return (
    <Input.TextArea
      {...props}
      style={{
        minHeight: "103px",
        padding: "12px",
        borderRadius: "6px",
      }}
      placeholder={placeholder}
    />
  );
}

export { CustomInput, CustomNumberInput, CustomSelect };

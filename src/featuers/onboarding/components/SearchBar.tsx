import FormInput from "@/components/Global/FormInput";
import { Input } from "@/components/ui/input";
import React from "react";

function SearchBar({ setText }: { setText: (text: string) => void }) {
  return (
    <FormInput
      placeholder="Find a community"
      name="search"
      onChange={(e) => setText(e.target.value)}
      className="w-full h-[50px] pl-10"
    />
  );
}

export default SearchBar;

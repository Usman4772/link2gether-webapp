import React from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CommunityTypes from "../utils/static";

export function CategoriesSelectBox({

  ...props
}: {

  onChange?: (value: string) => void;
  value?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="w-[95%] ">
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-fields text-paragraph h-12 px-4 rounded-lg transition-all duration-200 hover:shadow-md"
          >
            <span className="flex items-center gap-2">
              {props.value ? (
                <>
                  <span className="w-3 h-3 rounded-full bg-fields"></span>
                  <span className="font-medium">
                    {
                      CommunityTypes.find(
                        (community) => community.value === props.value
                      )?.label
                    }
                  </span>
                </>
              ) : (
                "Choose a category..."
              )}
            </span>
            <ChevronsUpDown className="h-4 w-4 shrink-0 text-paragraph" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[448px] p-0 shadow-lg rounded-lg"
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
          <Command className="rounded-lg">
            <CommandInput
              placeholder="Search Category..."
              className="h-12 border-b border-fields focus:ring-0"
            />
            <CommandList className="max-h-[300px] overflow-y-auto">
              <CommandEmpty className="py-6 text-center text-paragraph">
                No category found.
              </CommandEmpty>
              <CommandGroup>
                {CommunityTypes.map((community) => (
                  <CommandItem
                    key={community.value}
                    value={community.value}
                    onSelect={(currentValue) => {
                      // setCategory(
                      //   currentValue === props.value ? "" : currentValue
                      // );
                      props.onChange?.(currentValue); // Call form onChange
                      setOpen(false);
                    }}
                    className="py-3 px-4 hover:bg-fields cursor-pointer transition-colors duration-150"
                  >
                    <span className="font-medium text-gray-700">
                      {community.label}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default CategoriesSelectBox;

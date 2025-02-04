"use client"
import { PiDotsThreeBold } from "react-icons/pi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import React from "react";

interface ItemProps {
  id: string;
  label: string;
  onClick: (id: string) => void;
  icon?: React.ReactNode;
}

export function DotDropdown({ items = [] }: { items: ItemProps[] }) {
  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <PiDotsThreeBold />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto">
        <DropdownMenuGroup>
          {items.map((item: ItemProps) => {
            return (
              <DropdownMenuItem onClick={()=>item.onClick(item.id)} key={item.id}>
                <div>{item.icon}</div>
                {item.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

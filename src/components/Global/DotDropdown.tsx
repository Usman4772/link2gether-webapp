"use client";
import { Dropdown } from "antd";
import React from "react";
import { PiDotsThreeBold } from "react-icons/pi";


interface DotDropdownProps {
  items?: {label:string,key:string|number,onClick?:()=>void}[];
  icon?: React.ReactNode;
  trigger?: "hover" | "click";
}

export default function DotDropdown({ items = [], icon, trigger = "hover" }: DotDropdownProps) {
  return (
    <div className="flex " onClick={(e) => e.stopPropagation()}>
      <Dropdown menu={{ items }} placement="bottomRight" trigger={[trigger]}>
        <a
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <div className="text-xl text-black  justify-center items-center h-10 w-10 flex rounded-md font-bold hover:border hover:shadow-md">
            <div className="">{icon ? icon : <PiDotsThreeBold />}</div>
          </div>
        </a>
      </Dropdown>
    </div>
  );
}

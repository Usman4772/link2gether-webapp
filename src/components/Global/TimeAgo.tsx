import React from "react";
import ReactTimeAgo from "react-time-ago";
import { twMerge } from "tailwind-merge";
import TimeAggo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAggo.addDefaultLocale(en);

function TimeAgo({
  date,
  className = "",
}: {
  date: string;
  className?: string;
}) {
  return (
    <ReactTimeAgo
      date={new Date(date)}
      locale="en-US"
      className={twMerge("text-[#4F7A96] text-[12px]", className)}
    />
  );
}

export default TimeAgo;

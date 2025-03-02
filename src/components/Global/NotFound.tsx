import React from "react";
import Paragraph from "./Paragraph";

function NotFound({
  text = "Something went wrong",
  icon = "/error.png",
}: {
  text: string;
  icon?: string;
}) {
  return (
    <div className="flex items-center justify-center flex-col w-full h-full">
      <img src={icon} width={300} className=" object-cover"/>
      <Paragraph text={text} size="22px"/>
    </div>
  );
}

export default NotFound;

import React from "react";

function SubHeading({
  text = "N/A",
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <h2
      className={` text-[#0D141C] text-start  text-[22px] font-bold leading-paragraph-100 py-4 mx-[16px] ${className}`}
    >
      {text}{" "}
    </h2>
  );
}

export default SubHeading;

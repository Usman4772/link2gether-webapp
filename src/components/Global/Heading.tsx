import React from "react";

function Heading({
  text,
  size= "16px",
  className,
}: {
  text: string;
  size?: string;
  className?: string;
}) {
  return (
    <h2
      className={`text-[#0D171C]  font-[600] tracking-tighter ${className}`}
      style={{ fontSize: size }}
    >
      {text}
    </h2>
  );
}

export default Heading;

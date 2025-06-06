import React, { useState } from "react";
import Paragraph from "./Paragraph";
import { twMerge } from "tailwind-merge";

interface ShowMoreTextProps {
  text: string;
  maxLength?: number;
  className?: string;
}

const ShowMoreText: React.FC<ShowMoreTextProps> = ({
  text,
  maxLength = 100,
  className,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= maxLength) {
      return <Paragraph text={ text} />
  }

  return (
    <div className={twMerge("flex items-center relative w-full ", className)} {...props}>
      <Paragraph
        text={isExpanded ? text : `${text.slice(0, maxLength)}...`}
        className="pr-[75px]"
      />
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute right-0 top-0"
      >
        <Paragraph
          text={isExpanded ? "Show Less" : "Show More"}
          className="flex"
        />
      </button>
    </div>
  );
};

export default ShowMoreText;

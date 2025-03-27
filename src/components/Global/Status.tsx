"use client";
import { capitalize } from "@/utils/frontend/helpers/globals";
import { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";



interface StatusProps{
    text: string;
    rounded?: "sm" | "md" | "lg";

}


function Status({ text, rounded = "sm",  }: StatusProps) {
  const [backgroundColor, setBackgroundColor] = useState("#edf0f2bf");
  const [border, setBorder] = useState("none");
  const [color, setColor] = useState("#596070");
  const styles:any = {
    green: {
      bgColor: "#EBF4EC",
      textclr: "#2D7738",
      border: "#D7EAD9",
    },
    blue: {
      bgColor: "#caf4fc3b",
      textclr: "#80BAC5",
      border: "#B3F3FF",
    },
    red: {
      bgColor: "#FAEAEA",
      textclr: "#970C0C",
      border: "#F4D2D2",
    },
    light_red: {
      bgColor: "#efc4c436",
      textclr: "#d46b6bc2",
      border: "#FCCECE",
    },
    gray: {
      bgColor: "#F5F7F9 ",
      border: "#E5EAEF",
      textclr: "#252A31",
    },
    yellow: {
      bgColor: "#FFF8E6",
      textclr: "#946800",
      border: "#FFE5B3",
    },
    live_green: {
      bgColor: "#E6F4EA",
      textclr: "#1E7E34",
      border: "#B7E1C5",
    },
  };
  const styleMaps:any = {
      "public": "green",
    "private": "yellow",
    pending: "blue",
    reviewed: "live_green",
  };


  const formateText = (text:string) => {
    return capitalize(text?.replace(/_/g, " "));
  };

  function getStyles() {
    if (!text) return;
      const newText = text.toLowerCase() as "public" | "private";
    const newStyles = styles[styleMaps[newText]];
    if (newStyles) {
      const { bgColor, textclr, border } = newStyles;
      setBackgroundColor(bgColor);
      setColor(textclr);
      setBorder(border);
      return;
    }
    setBackgroundColor(styles.gray.bgColor);
    setColor(styles.gray.textclr);
    setBorder(styles.gray.border);
  }

  useEffect(() => {
    getStyles();
  }, [text]);
  if (!text) return null;
  return (
    <>
      {rounded == "sm" ? (
        <div
          className="min-w-[3rem] max-w-max h-[1.5rem]  rounded-[12px] flex items-center justify-center px-2 truncate text-[12px] font-[500] leading-[16px]"
          style={{
            background: backgroundColor,
            color: color,
            border: border ? `1px solid ${border}` : "none",
          }}
        >
          { formateText(text)}
        </div>
      ) : (
        <div
          className={`w-[2rem] h-[2rem]  rounded-${rounded} flex items-center justify-center text-neutral-700`}
          style={{
            background: backgroundColor,
            color: color,
            border: border ? `1px solid ${border}` : "none",
          }}
        >
          { formateText(text)}
        </div>
      )}
    </>
  );
}
export default Status;

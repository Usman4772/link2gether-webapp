import React from "react";

function NotFound({ text = "Something went wrong" }: { text: string }) {
  return <div>{text}</div>
}

export default NotFound;

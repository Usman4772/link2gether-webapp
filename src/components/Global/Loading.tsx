import React from "react";
import { PuffLoader } from "react-spinners";

function Loading() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <PuffLoader size={30} color="#7bf1a8" />
    </div>
  );
}

export default Loading;

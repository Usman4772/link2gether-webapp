import React from "react";
import { ClimbingBoxLoader } from "react-spinners";

function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <ClimbingBoxLoader size={9} color="#0A70D9" />
    </div>
  );
}

export default Loading;

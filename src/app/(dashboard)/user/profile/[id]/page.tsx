import React from "react";

function Page({ params }: any) {
  const id = params.id;
  return <div>UserProfile {id}</div>;
}

export default Page;

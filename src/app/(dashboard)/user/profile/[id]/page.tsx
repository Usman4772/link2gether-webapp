import UserProfileDetailPage from "@/featuers/Profile/components/UserProfileDetailPage";
import React from "react";

function Page({ params }: { params: { id: string } }) {
  const { id } = params;
    return <UserProfileDetailPage id={ id} />;
}

export default Page;

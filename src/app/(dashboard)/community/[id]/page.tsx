import DetailPage from "@/featuers/Community/components/DetailPage";
import { ObjectId } from "mongoose";
import React from "react";

function Page({params}:{params:any}) {
    const id=params.id;
    return <DetailPage id={ id} />;
}

export default Page;

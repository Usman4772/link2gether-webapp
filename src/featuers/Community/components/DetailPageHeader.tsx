"use client";
import { Button } from "@/components/Global/Button";
import ButtonLight from "@/components/Global/ButtonLight";
import Heading from "@/components/Global/Heading";
import Link from "next/link";
import React, { useState } from "react";
import CreatePostModal from "./CreatePostModal";
import useJoinCommunity from "../hooks/useJoinCommunity";
import { IoExitOutline } from "react-icons/io5";
import useLeaveCommunity from "../hooks/useLeaveCommunity";
import useCancelJoinRequest from "../hooks/useCancelJoinRequest";

function DetailPageHeader({ id, data }: { id: string | number; data: any }) {
  const [openPostModal, setOpenPostModal] = useState(false);
  const { isPending, join } = useJoinCommunity(id);
  const { leave, leaveBtnLoading } = useLeaveCommunity(id);
  const { cancelJoinRequest, cancelRequestBtnLoading } =
    useCancelJoinRequest(id);
  return (
    <div className="flex flex-col gap-1 w-full relative">
      <img
        src="/art.jpg"
        className="w-full h-[218px] object-cover  rounded-[12px]"
      />
      {/* Todo Accept cover image also */}
      <div
        className="w-full items-center justify-between flex h-[130px]"
        style={{ border: "1px solid #E5E5E5", borderRadius: "10px" }}
      >
        <div className="flex items-center gap-4 px-4">
          <img
            src={data?.avatar || "/group-default.png"}
            className="rounded-[50%] object-cover w-[70px] h-[70px]  "
          />
          <div className="flex flex-col ">
            <Heading
              text={data?.community_name}
              className="font-[700] p-0"
              size="20px"
            />
            <Link
              className="text-[#4F7A96] font-[13px] p-0"
              href={`/profile/${data?.createdBy?._id}`}
            >
              created by {data?.createdBy?.username}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4 px-4">
          <Button
            text="Create Post"
            className="rounded-md "
            onClick={() => {
              setOpenPostModal(true);
            }}
          />

          {data?.isAdmin ? (
            <button>Delete</button>
          ) : data?.memberShipStatus == "joined" ? (
            <ButtonLight
              text="Leave"
              icon={<IoExitOutline />}
              onClick={leave}
              loading={leaveBtnLoading}
            />
          ) : data?.memberShipStatus == "requested" ? (
            <ButtonLight
              text="Cancel request"
              onClick={cancelJoinRequest}
              loading={cancelRequestBtnLoading}
            />
          ) : (
            <ButtonLight text="Join Now" onClick={join} loading={isPending} />
          )}

          {/* <ButtonLight
              text={data?.visibility === "public" ? "Join Now" : "Request to Join"}
              loading={isPending}
              className=""
              onClick={() => join()}
            /> */}
        </div>
      </div>
      <CreatePostModal
        id={id}
        openModal={openPostModal}
        setOpenModal={setOpenPostModal}
      />
    </div>
  );
}

export default DetailPageHeader;

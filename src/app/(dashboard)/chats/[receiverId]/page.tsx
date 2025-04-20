"use client";
import Loading from "@/components/Global/Loading";
import useFetchUser from "@/hooks/useFetchUser";
import { pusherClient } from "@/lib/pusher";
import React, { useEffect } from "react";

function Page({ params }: { params: { receiverId: string } }) {
  const { receiverId } = params;
  const { data, isLoading } = useFetchUser();

  useEffect(() => {
    if (isLoading) return;
    const channelId = `${data?.id}_${receiverId}`;
    console.log("Channel ID:", channelId);
    pusherClient.subscribe(channelId);
    pusherClient.bind("incoming-message", (message: any) => {
      console.log("Received message:", message);
    });
  }, [receiverId, data]);
  if (isLoading) return <Loading />;
  return <div>User Chat {receiverId}</div>;
}

export default Page;

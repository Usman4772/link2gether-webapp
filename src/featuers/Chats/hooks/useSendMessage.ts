import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import React, { useState } from "react";
import { sendMessageAPI } from "../apis/api";

function useSendMessage() {
  const [isSending, setIsSending] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  async function sendMessage(receiverId: string, message: string) {
    if (!receiverId || !message || message.trim() == "") return;
    try {
      setIsSending(true);
      const response = await sendMessageAPI(receiverId, message);
      if (response?.data?.success) {
        setNewMessage("");
      }
    } catch (error) {
      handleAPIErrors(error);
    } finally {
      setIsSending(false);
    }
  }


  return {
    newMessage,
    setNewMessage,
    sendMessage,
    isSending,
  };
}

export default useSendMessage;

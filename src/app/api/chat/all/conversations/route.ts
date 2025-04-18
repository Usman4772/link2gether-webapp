import Chats from "@/models/chat.schema";
import User from "@/models/user";
import { errorHandler, validateToken } from "@/utils/backend/helpers/globals";
import { SUCCESS_RESPONSE } from "@/utils/backend/helpers/responseHelpers";
import { connectToDatabase } from "@/utils/backend/modules/auth/services/authServices";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await validateToken(req);
    const conversations = await fetchUserConversations(userId);
    return SUCCESS_RESPONSE(
      conversations, 
      200,
      "Conversations fetched successfully"
    );
  } catch (error) {
    return errorHandler(error);
  }
}

async function fetchUserConversations(userId: string) {
  const conversations = await Chats.find({
    participants: { $in: [userId] },
  }).select("channelId participants");
  const conversationsPayload = await Promise.all(conversations.map(async (conversation) => {
    const receiverId = conversation.participants.find(
      (participant: string) => participant !== userId
    );
    const receiverData = await User.findById(receiverId).select(
      "username profileImage _id email"
    );
    return {
      channelId: conversation.channelId,
      receiver: {
        id: receiverId,
        username: receiverData?.username,
        profileImage: receiverData?.profileImage,
        email: receiverData?.email,
      },
    };
  }));
  return conversationsPayload;
}

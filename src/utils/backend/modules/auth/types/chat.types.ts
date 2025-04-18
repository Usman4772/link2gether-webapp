export interface MessageType {
  _id: string;
  channelId: string;
  senderId: {
    _id: string;
    profileImage: string | null;
  };
  message: string;
  createdAt: string;
  updatedAt: string;
}
export interface ChatMessage {
  _id: string;
  channelId: string;
  sender: {
      _id: string;
      type: string;
    profileImage: string | null;
  };
  message: string;
  createdAt: string;
  updatedAt: string;
}

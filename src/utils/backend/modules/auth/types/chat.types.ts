export interface RawMessage {
  _id: string;
  chatId:string;
  senderId: {
    _id: string;
    profileImage: string | null;
  };
  message: string;
  createdAt: string;
  updatedAt: string;
}
export interface ChatMessage {
  messageId: string;
  sender: {
      _id: string;
      type: string;
    profileImage: string | null;
  };
  message: string;
  createdAt: string;
  updatedAt: string;
}
export interface SelectedChat {
  chatId: string;
  receiver: {
    id: string;
    username: string;
    profileImage: string | null;
    email: string;
  };
}

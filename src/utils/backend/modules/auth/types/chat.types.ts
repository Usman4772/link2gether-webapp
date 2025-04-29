export interface RawMessage {
  _id: string;
  chatId: string;
  senderId: {
    _id: string;
    profileImage: string | null;
  };
  by_ai: boolean;
  message: string;
  createdAt: string;
  updatedAt: string;
}
export interface ChatMessage {
  chatId: string;
  messageId: string;
  sender: {
    _id: string;
    profileImage: string | null;
  };
  by_ai: boolean;
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

export interface createMessageArgs {
  senderId: string;
  receiverId: string;
  message: string;
  by_ai?: boolean;
  chatId: string;
}

export interface MessageSender {
  _id: string;
  profileImage: string | null;
}

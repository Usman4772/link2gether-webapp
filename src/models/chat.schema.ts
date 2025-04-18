import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    channelId: { type: String, required: true, unique: true },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // lastMessage: {
    //   text: { type: String, required: true },
    //   senderId: { type: String, required: true },
    //   timestamp: { type: Date, default: Date.now },
    // },
    // unreadCount: { type: Number, default: 0 },
    // isOnline: { type: Boolean, default: false },
    // lastSeen: { type: Date, default: null },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

const Chats = mongoose.models.Chats || mongoose.model("Chats", chatSchema);
export default Chats;

import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const postSchema = new mongoose.Schema({
  description: {
    type: String,
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  media: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ["video", "image", "text"],
  },
  publicId: {
    type: String,
    unique: true,
    default: () => {
      return uuidv4();
    },
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;

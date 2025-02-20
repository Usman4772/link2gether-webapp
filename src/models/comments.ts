import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  community:{ type: mongoose.Schema.Types.ObjectId, ref: "Community" },
  created_at: { type: Date, default: Date.now() },
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);
export default Comment;

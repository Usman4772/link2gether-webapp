import { GeneralCommunityTypes } from "@/utils/enums/enums";
import mongoose from "mongoose";
const communitySchema = new mongoose.Schema({
  community_name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  visibility: {
    type: String,
    enum: ["public", "private"],
    default: "public",
  },
  joinRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  displayPic: {
    type: String,
  },
  category: {
    type: String,
    enum: Object.values(GeneralCommunityTypes),
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  memberCount: {
    type: Number,
    default: 0,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Community =
  mongoose.models.Community || mongoose.model("Community", communitySchema);
export default Community;

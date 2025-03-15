import { GeneralCommunityTypes } from "@/utils/enums/enums";
import mongoose, { mongo } from "mongoose";
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
  avatar: {
    type: String,
    default: null,
  },
  cover: {
    type: String,
    default: null,
  },
  category: {
    type: String,
    enum: Object.values(GeneralCommunityTypes),
    required: true,
  },
  rules: [
    {
      rule: {
        type: String,
        required: true,
      },
    },
  ],
  moderators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
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
  bannedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "BannedUser" }],
  reportedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReportedPosts",
    }
  ],
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

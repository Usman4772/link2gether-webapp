import { CommunityCategory } from "@/utils/enums/enums";
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
  displayPic: {
    type: String,
  },
  category: {
    type: String,
    enum: Object.values(CommunityCategory),
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
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

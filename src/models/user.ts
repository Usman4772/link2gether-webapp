import { CommunityCategory } from "@/utils/enums/enums";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profileImage: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  remember: {
    type: Boolean,
    default: false,
  },
  preferences: {
    categories: [
      {
        type: String,
        enum: Object.values(CommunityCategory),
        required: true,
      },
    ],
  },
  token: {
    type: String,
  },
  communityMemberships: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

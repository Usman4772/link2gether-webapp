import mongoose from "mongoose";

const bannedUserSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reason: {
    type: String,
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  banned_at: {
    type: Date,
    default: Date.now(),
  },
  banned_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  ban_duration: {
    type: String,
    enum: ["one_day", "one_week", "one_month", "forever"],
    default: "one_day",
  },
  expires_at: {
    type: Date,
    index: { expires: 0 }, //delete it when expires at date meet
  },
});

const BannedUser =
  mongoose.models.BannedUser || mongoose.model("BannedUser", bannedUserSchema);

export default BannedUser;

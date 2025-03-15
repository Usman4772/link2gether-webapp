import mongoose from "mongoose"
const reportSchema = new mongoose.Schema({
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  reported_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    required: true,
  },
  reason: { type: String, required: true },
  status: { type: String, enum: ["pending", "reviewed"], default: "pending" },
  created_at: { type: Date, default: Date.now },
});



const ReportedPosts = mongoose.models.ReportedPost ||
  mongoose.model("ReportedPost", reportSchema);

export default ReportedPosts;
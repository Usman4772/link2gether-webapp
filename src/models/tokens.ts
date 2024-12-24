import mongoose from "mongoose";

const TokensSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  expires_at: {
    type: Date,
    default: Date.now(),
    index: { expires: 0 }, //delete it when expires at date meet
  },
});

const Tokens = mongoose.models.Tokens || mongoose.model("Tokens", TokensSchema);
export default Tokens;

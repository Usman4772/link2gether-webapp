import mongoose from "mongoose";
const tokensSchema = new mongoose.Schema({
  token: String,
  expiredAt: {
    type: Date,
    default: Date.now(),
  },
});

const BlackListTokens =
  mongoose.models.BlackListTokens ||
  mongoose.model("BlackListTokens", tokensSchema);
export default BlackListTokens;

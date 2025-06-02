import mongoose from "mongoose";

export async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    return true;
  } catch (error) {
    console.log("Db not connected", error);
    return false;
  }
}

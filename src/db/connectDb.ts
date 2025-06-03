import mongoose from "mongoose";
let isConnected = false;


export async function connectDb() {
  if (isConnected) return;
  try {
    await mongoose.connect(
      process.env.MONGODB_URI!,
    );
    isConnected = true;
    return true;
  } catch (error) {
    return false;
  }
}

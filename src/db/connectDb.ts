import mongoose from "mongoose";
let isConnected = false;


export async function connectDb() {
  if (isConnected) return;
  try {
    await mongoose.connect(
      process.env.MONGODB_URI!,
    );
    isConnected = true;
    console.log('db connected')
    return true;
  } catch (error) {
    console.log("Db not connected", error);
    return false;
  }
}

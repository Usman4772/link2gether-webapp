import mongoose from "mongoose";

export async function connectDb() {
  try {
    await mongoose.connect("mongodb://localhost:27017/link-to-gether");
    return true;
  } catch (error) {
    console.log("Db not connected", error);
    return false;
  }
}

import mongoose from "mongoose";
import {toast} from "react-hot-toast"
let isConnected = false;


export async function connectDb() {
  if (isConnected) return;
  try {
    await mongoose.connect(
      "mongodb+srv://usmanali477275:8HUZ5W0jdAiB4EV8@cluster0.icbe8gd.mongodb.net/link-to-gether?retryWrites=true&w=majority&appName=Cluster0"
    );
    isConnected = true;
  toast.success("Db Connected")
    return true;
  } catch (error) {
    console.log("Db not connected", error);
    toast.error("Db not connected"+error);
    return false;
  }
}

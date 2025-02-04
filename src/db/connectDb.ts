import mongoose from "mongoose";

export async function connectDb() {
  try {
    await mongoose.connect(
      "mongodb+srv://mani477275:gpKxG7KQs2dsXmu4@cluster0.s6vda.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/link-to-gether"
    );
    return true;
  } catch (error) {
    console.log("Db not connected", error);
    return false;
  }
}

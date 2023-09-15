import mongoose from "mongoose";

let ifConnected = false;

const connectDB = async () => {
  if (ifConnected) {
    return console.log("Mongo Allready connected");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    ifConnected = true;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;

import mongoose from "mongoose";

const url = process.env.MONGO_URI;

const connectDB = () => {
  return mongoose
    .connect(url)
    .then(console.log("Connected to Mongo db successfully"));
};

export default connectDB;

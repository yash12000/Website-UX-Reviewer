import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("🔍 ENV CHECK:");
console.log("MONGO_URI =", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ Mongo Error:", err.message);
  }
};

export default connectDB;

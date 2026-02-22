import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 
      "mongodb+srv://ux-reviewer:ux-reviewer@cluster0.llez2.mongodb.net/ux-reviewer?retryWrites=true&w=majority";

    console.log("Using URI:", uri);

    await mongoose.connect(uri);

    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ Mongo Error:", err.message);
  }
};

export default connectDB;
import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  url: String,
  review: Object,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Review", ReviewSchema);
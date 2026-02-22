import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import reviewRoutes from "./routes/review.js";
import connectDB from "./db.js";
import mongoose from "mongoose";
const app = express();

app.use(
  cors({
    origin: "*"
  })
);
app.use(express.json());

await connectDB();

app.use("/api", reviewRoutes);

app.get("/status", (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMap = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnecting"
  };
  
  res.json({
    backend: "OK",
    database: statusMap[dbStatus] || "Unknown",
    databaseCode: dbStatus,
    llm: process.env.OPENAI_API_KEY ? "OK" : "Missing",
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy", time: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
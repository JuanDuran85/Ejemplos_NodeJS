/*
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
*/

import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ["low", "medium", "high", "error"],
    required: true,
    default: "LOW",
  },
  message: {
    type: String,
    required: true,
    default: "Unknown message",
  },
  origin: {
    type: String,
    default: "Unknown origin",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const LogModel = mongoose.model("Log", logSchema);

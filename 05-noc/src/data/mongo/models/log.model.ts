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
    enum: ["LOW", "MEDIUM", "HIGH", "ERROR"],
    required: true,
    default: "LOW",
  },
  message: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const LogModel = mongoose.model("Log", logSchema);

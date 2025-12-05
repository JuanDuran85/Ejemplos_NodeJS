import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is requiredq"],
  },
  email: {
    type: String,
    required: [true, "Email is requiredq"],
    unique: true,
  },
  emailValidated: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, "Password is requiredq"],
  },
  img: {
    type: String,
  },
  role: {
    type: [String],
    default: ["USER_ROLE"],
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export const UserModel = mongoose.model("User", userSchema);

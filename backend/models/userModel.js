const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    username: { type: String, required: true, min: 8, max: 20, unique: true },
    password: { type: String, required: true, min: 8 },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", User);
module.exports = userModel;

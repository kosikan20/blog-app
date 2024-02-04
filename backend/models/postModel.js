const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true },
    title: { type: String, required: true },
    likes: { type: Array, default: [] },
    content: { type: String, required: true },
    img: { type: String },
  },
  { timestamps: true }
);

const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;

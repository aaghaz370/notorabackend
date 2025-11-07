import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user: String,
  text: String,
  book: String,
  replies: [{ user: String, text: String }],
}, { timestamps: true });

export default mongoose.model("Comment", commentSchema);

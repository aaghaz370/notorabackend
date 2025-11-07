import express from "express";
import mongoose from "mongoose";
const router = express.Router();

// ✅ Comment schema
const commentSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  name: { type: String, required: true },
  text: { type: String, required: true },
  replies: [
    {
      name: String,
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

// ✅ Get all comments for a book
router.get("/:bookId", async (req, res) => {
  try {
    const comments = await Comment.find({ bookId: req.params.bookId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Failed to load comments", error: err.message });
  }
});

// ✅ Add a new comment
router.post("/", async (req, res) => {
  try {
    const { bookId, name, text } = req.body;
    if (!bookId || !name || !text) return res.status(400).json({ message: "Missing fields" });
    const newComment = await Comment.create({ bookId, name, text });
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment", error: err.message });
  }
});

// ✅ Add reply to a comment
router.post("/reply/:id", async (req, res) => {
  try {
    const { name, text } = req.body;
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.replies.push({ name, text });
    await comment.save();

    res.json({ message: "Reply added", comment });
  } catch (err) {
    res.status(500).json({ message: "Failed to add reply", error: err.message });
  }
});

export default router;

import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  thumbnail: String,
  genre: String,
  rating: Number,
  pdfUrl: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Book", bookSchema);

import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./models/Book.js";

dotenv.config();

const books = [
  {
    name: "Fictional Book 1",
    author: "Author 1",
    thumbnail: "https://via.placeholder.com/150?text=Fictional+1",
    genre: "Fictional",
    rating: 3.4,
    pdfUrl: "https://example.com/book1.pdf",
  },
  {
    name: "Fictional Book 2",
    author: "Author 2",
    thumbnail: "https://via.placeholder.com/150?text=Fictional+2",
    genre: "Fictional",
    rating: 4.1,
    pdfUrl: "https://example.com/book2.pdf",
  },
  {
    name: "NEET Physics Guide",
    author: "Dr. A. Sharma",
    thumbnail: "https://via.placeholder.com/150?text=NEET+Physics",
    genre: "NEET",
    rating: 4.6,
    pdfUrl: "https://example.com/neet-physics.pdf",
  },
  {
    name: "JEE Chemistry Crash Course",
    author: "Prof. R. Verma",
    thumbnail: "https://via.placeholder.com/150?text=JEE+Chemistry",
    genre: "JEE",
    rating: 4.8,
    pdfUrl: "https://example.com/jee-chemistry.pdf",
  },
];

const seedBooks = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Book.deleteMany();
    await Book.insertMany(books);
    console.log("Books added successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error(error);
  }
};

seedBooks();

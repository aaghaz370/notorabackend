import Book from "../models/Book.js";

export const getBooks = async (req, res) => {
  try {
    const { genre, search, limit = 30 } = req.query;
    const query = {};

    if (genre && genre.trim() !== "") {
      query.genre = { $regex: new RegExp("^" + genre + "$", "i") };
    }

    if (search && search.trim() !== "") {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
      ];
    }

    const books = await Book.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    if (!Array.isArray(books)) {
      return res.status(500).json({ message: "Books data corrupted" });
    }

    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error.message);
    res.status(500).json({ message: "Failed to fetch books" });
  }
};


/**
 * @desc    Get single book
 * @route   GET /api/books/:id
 */
export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book)
      return res.status(404).json({ message: "Book not found" });

    res.status(200).json(book);
  } catch (error) {
    console.error("❌ Error fetching single book:", error.message);
    res.status(500).json({ message: "Failed to fetch book", error: error.message });
  }
};

/**
 * @desc    Add a new book (admin only)
 * @route   POST /api/books
 */
export const addBook = async (req, res) => {
  try {
    const { name, author, genre } = req.body;
    if (!name || !author || !genre) {
      return res.status(400).json({ message: "Name, author, and genre are required." });
    }

    const book = await Book.create(req.body);
    console.log("✅ New book added:", book.name);

    res.status(201).json(book);
  } catch (error) {
    console.error("❌ Error adding book:", error.message);
    res.status(500).json({ message: "Failed to add book", error: error.message });
  }
};

/**
 * @desc    Update existing book
 * @route   PUT /api/books/:id
 */
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book)
      return res.status(404).json({ message: "Book not found" });

    console.log("✅ Book updated:", book._id);
    res.status(200).json(book);
  } catch (error) {
    console.error("❌ Error updating book:", error.message);
    res.status(500).json({ message: "Failed to update book", error: error.message });
  }
};

/**
 * @desc    Delete a book
 * @route   DELETE /api/books/:id
 */
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book)
      return res.status(404).json({ message: "Book not found" });

    console.log("🗑️ Book deleted:", book.name);
    res.status(200).json({ message: "Book removed" });
  } catch (error) {
    console.error("❌ Error deleting book:", error.message);
    res.status(500).json({ message: "Failed to delete book", error: error.message });
  }
};


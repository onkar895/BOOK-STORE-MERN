import express from "express";
import Book from "../Models/bookModel.js";
import upload from "../Middleware/UploadImage.js";

const router = express.Router();

// Route for getting all books
router.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});

    if (!books || books.length === 0) throw new Error("No books found");

    res.status(200).json({ count: books.length, data: books });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Route for save/create a new book
router.post("/books", upload.single("image"), async (req, res) => {
  try {
    const { title, author, price, description, publishYear } = req.body;

    // Check if required fields are provided
    if (!title || !author || !price || !description || !publishYear) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Store the file path for retrieval later
    const imageUrl = `uploads/${req.file.filename}`;

    const newBook = new Book({
      title,
      author,
      price: parseFloat(price),
      description,
      publishYear: parseInt(publishYear),
      imageUrl 
    });

    const savedBook = await newBook.save();

    if (!savedBook) {
      return res.status(500).json({ message: "Error creating a new book" });
    }

    // Send only ONE response
    return res.status(201).json({
      status: "success",
      message: "Book created successfully",
      data: savedBook,
    });
  } catch (error) {
    console.log(error.message);
    if (!res.headersSent) {
      // Prevent sending multiple responses
      return res.status(500).json({ message: error.message });
    }
  }
});

router
  .route("/books/:bookId")
  // Route for showing a single book
  .get(async (req, res) => {
    try {
      const book = await Book.findById(req.params.bookId);

      if (!book) throw new Error("No book found");

      res.status(200).json({ data: book });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  })
  // Route for updating a book
  .patch(upload.single("image"), async (req, res) => {
    try {
      const { title, author, price, description, publishYear } = req.body;

      // Find existing book
      const book = await Book.findById(req.params.bookId);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      // Removing imageUrl from validation
      if (!title || !author || !price || !description || !publishYear) {
        return res.status(400).json({ message: "All text fields are required" });
      }

      // Check if an image file is uploaded
      let imageUrl = book.imageUrl; // Keep existing image if not updated
      if (req.file) {
        imageUrl = `uploads/${req.file.filename}`;
      }

      const updatedBook = await Book.findByIdAndUpdate(req.params.bookId, { title, imageUrl, author, price, description, publishYear }, { new: true });

      console.log("Updated Data:", updatedBook);

      if (!updatedBook) throw new Error("Error updating book");

      res.status(200).json({ status: "success", message: "Book updated successfully", updatedData: updatedBook });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  })
  // Route for deleting a book
  .delete(async (req, res) => {
    try {
      const deletedBook = await Book.findByIdAndDelete(req.params.bookId);

      if (!deletedBook) throw new Error("No book found");

      console.log("Deleted Data:", deletedBook);

      res.status(200).json({ status: "success", message: "Book deleted successfully", deletedData: deletedBook });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });

export default router;

import express from "express";
import Book from "../Models/bookModel.js";
import upload from "../Middleware/UploadImage.js";

const router = express.Router();

// Route for getting all books
router.get("/books", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;
    
    const books = await Book.find({})
      .skip(skip)
      .limit(limit)
      .lean(); // Use lean() for better performance
    
    const totalBooks = await Book.countDocuments();
    
    if (!books || books.length === 0) throw new Error("No books found");
    
    res.status(200).json({ 
      count: totalBooks, 
      data: books, 
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: page
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Route for save/create a new book
router.post("/books", upload.single("image"), async (req, res) => {
  try {
    console.log("Received Body:", req.body);
    console.log("Received File:", req.file);

    const { title, author, price, description, publishYear } = req.body;

    // Check if required fields are provided
    if (!title || !author || !price || !description || !publishYear) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if file was uploaded
    if (!req.file) {
      console.error("No file uploaded");
      return res.status(400).json({ message: "Image file is required" });
    }

    // Use the Cloudinary URL directly
    const imageUrl = req.file.path;

    const newBook = new Book({
      title,
      author,
      price: parseFloat(price),
      description,
      publishYear: parseInt(publishYear),
      image: imageUrl,
    });
    
    console.log("Uploaded Image URL:", req.file.path); 
    
    const savedBook = await newBook.save();

    console.log("savedBook :", savedBook);

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

      // Create update object with required fields
      const updateData = {
        title,
        author,
        price: parseFloat(price),
        description,
        publishYear: parseInt(publishYear),
      };

      // Only update image if a new file was uploaded
      if (req.file) {
        updateData.image = req.file.path;
      }

      const updatedBook = await Book.findByIdAndUpdate(req.params.bookId, updateData, { new: true });

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

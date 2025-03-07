import express from 'express';
import Book from '../Models/bookModel.js';
import upload from '../Middleware/UploadImage.js'

const router = express.Router()

// Route for getting all books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find({})

    if(!books || books.length === 0) throw new Error('No books found')

    res.status(200).json({count: books.length, data: books})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
})

// Route for save/create a new book
router.post('/books', upload.single('image'), async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Check the data received from the client
    const { title, author, price, description, publishYear } = req.body

     // Check if required fields are provided
     if (!title || !image || !author || !price || !description || !publishYear) {
      return res.status(400).json({ message: "All fields are required" });
    }

     // Get image path or URL (depends on storage solution)
     let imagePath;
    
     // If using local storage
     if (req.file) {
       imagePath = `/uploads/${req.file.filename}`;
     }
     
     // If using Cloudinary
     // imagePath = req.file.path; // Cloudinary returns the URL in req.file.pat

    const newBook = await Book.create({ title,  image: imagePath, author, price, description, publishYear })

    if (!newBook) throw new Error('Error creating a new book')

    res.status(201).json({status: 'success', message: 'Book created successfully',  data: newBook })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
})

router.route('/books/:bookId')
  // Route for showing a single book
  .get(async (req, res) => {
    try {
      const book = await Book.findById(req.params.bookId)
  
      if(!book) throw new Error('No book found')
  
      res.status(200).json({ data: book })
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ message: error.message })
    }
  })
  // Route for updating a book
  .patch(async (req, res) => {
    try {
      const { title, image, author, price, description, publishYear } = req.body

      if (!title || !image || !author || !price || !description || !publishYear) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const updatedBook = await Book.findByIdAndUpdate(req.params.bookId, { title, image, author, price, description, publishYear }, { new: true })

      console.log("Updated Data:", updatedBook);

      if (!updatedBook) throw new Error('Error updating book')

      res.status(200).json({status: 'success', message: 'Book updated successfully', updatedData: updatedBook})
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ message: error.message })
    }
  })
  // Route for deleting a book
  .delete(async (req, res) => {
    try {
      const deletedBook = await Book.findByIdAndDelete(req.params.bookId)

      if (!deletedBook) throw new Error('No book found')

      console.log("Deleted Data:", deletedBook);

      res.status(200).json({status: 'success', message: 'Book deleted successfully',  deletedData: deletedBook})
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ message: error.message })
    }
  })

export default router
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  author: String,
  price: Number,
  description: String,
  publishYear: Number,
}, {versionKey: false, timestamps: true})

const Book = mongoose.model('Book', bookSchema)

export default Book        
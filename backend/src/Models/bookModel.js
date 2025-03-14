import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    publishYear: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true }
); 

const Book = mongoose.model("Book", bookSchema);

export default Book; 

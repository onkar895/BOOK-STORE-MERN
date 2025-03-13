import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: false },
    image: { type: String },
    author: { type: String, required: false },
    price: { type: Number, required: false },
    description: { type: String, required: false },
    publishYear: { type: Number, required: false },
  },
  { versionKey: false, timestamps: true }
); 

const Book = mongoose.model("Book", bookSchema);

export default Book; 

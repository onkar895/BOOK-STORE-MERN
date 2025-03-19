import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    publishYear: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true }
);

// Add indexes for commonly searched/filtered fields
bookSchema.index({ title: 1 });
bookSchema.index({ author: 1 });
bookSchema.index({ publishYear: 1 });
// Consider a compound index if you frequently search by multiple criteria
bookSchema.index({ author: 1, publishYear: 1 });

const Book = mongoose.model("Book", bookSchema);

export default Book;
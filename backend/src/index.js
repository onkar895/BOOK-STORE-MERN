import express from 'express';
import connectDb from './database/db.js'
import bookRoutes from './Routes/books.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5555;

const app = express();

// Middleware for handling CORS policy:
// Option 1: Allow all origins with default of cors(*)
// Option 2: Allow custom origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET, POST, PUT, PATCH, DELETE'],
//     allowedHeaders: ['Content-Type, Authorization'],
//   })
// )

app.use(cors());

// Parse JSON requests
app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api", bookRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: err.message || 'Something went wrong on the server'
  });
});

const connection = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1); // Exit with error
  }
};

connection();
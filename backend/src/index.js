import express from 'express';
import connectDb from './database/db.js';
import bookRoutes from './Routes/books.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 5555;

// Get the directory path using ES modules approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware for handling CORS policy
// Option 1: Allow all origins with default of cors(*)
app.use(cors());

// Option 2: Allow custom origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET, POST, PUT, PATCH, DELETE'],
//     allowedHeaders: ['Content-Type, Authorization'],
//   })
// )

// Parse JSON requests
app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api", bookRoutes);

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

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
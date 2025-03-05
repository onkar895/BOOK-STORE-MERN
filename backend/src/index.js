import express from 'express'
import connectDb from './database/db.js'
import bookRoutes from './Routes/books.js'
import cors from 'cors'

const PORT = 8000

const app = express()

// Middleware for handling CORS policy
// Option 1: Allow all origins with default of cors(*)
app.use(cors())

// Option 2: Allow custom origins
// app.use(
//   cors({
//     origin: 'http:localhost:8000',
//     methods: ['GET, POST, PUT, PATCH, DELETE'],
//     allowedHeaders: ['Content-Type, Authorization'],
//   })
// )

app.use(express.json())
app.use("/api", bookRoutes)

const connection = async () => {
  await connectDb()
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

connection()
 
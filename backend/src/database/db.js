import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

const DB_URL = process.env.DB_URL

const connectDb = async () => {
  try {
    await mongoose.connect(DB_URL)
    console.log('Successfully connected to database')
  } catch (err) {
    console.log('Error connecting to database', err)
  }
}

export default connectDb
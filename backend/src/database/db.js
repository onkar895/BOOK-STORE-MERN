import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/bookStore_db')
    console.log('Successfully connected to database')
  } catch (error) {
    console.log('Error connecting to database', error)
  }
}

export default connectDb
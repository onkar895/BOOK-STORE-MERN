import React, { useState } from 'react'
import BackButton from '../Components/BackButton'
import Spinner from '../Components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { apiUrl } from "../utils/bookAPI"

const DeleteBooks = () => {
    
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const {id} = useParams()

    const handleDeleteBook = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/${id}`, {
          method: 'DELETE',  // Specify the HTTP method
          headers: {
            'Content-Type': 'application/json'  // Set the content type
          }, 
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const result = await response.json()
        console.log('Book deleted successfully:', result);
        navigate('/')
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('An error occurred. Please check console')
      } finally {
        setLoading(false);
      }
    }

    return (
      <div className='min-h-screen flex flex-col items-center justify-center'>
        <div className='flex items-center gap-10 justify-center mb-10'>
          <BackButton />
          <h1 className='text-2xl text-sky-400 tracking-widest'>Delete Book</h1>
        </div>
  
        {loading && <Spinner />}
  
        <div className='flex flex-col items-center justify-center px-10 gap-8 border-2 border-sky-500 rounded-xl w-[500px] h-[400px] mx-auto'>
          <h3 className='text-lg text-white'>Are You Sure! You want to delete this book?</h3>
  
          <button
            className='p-3 rounded-lg bg-red-600 hover:bg-red-500 text-white w-full'
            onClick={handleDeleteBook}
          >
            Yes, Delete it
          </button>
        </div>
      </div>
  )
}

export default DeleteBooks

import React, { useState, useEffect } from 'react'
import BackButton from '../Components/BackButton'
import Spinner from '../Components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { apiUrl } from "../utils/bookAPI"

const EditBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [publishYear, setPublishYear] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${apiUrl}/${id}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json()
        setTitle(result.data.title || '');
        setAuthor(result.data.author || '');
        setPrice(result.data.price ? result.data.price.toString() : '');
        setDescription(result.data.description || '');
        setPublishYear(result.data.publishYear ? result.data.publishYear.toString() : '');
        setIsDataLoaded(true);
      } catch (error) {
        setLoading(false)
        console.error("Error fetching data:", error)
        alert('An error occurred. Please check console')
      } finally {
        setLoading(false);
      }
    }

    fetchBookData()
  }, [id])

  const setAutoError = (message) => {
    setError(message);
    
    setTimeout(() => {
      setError('');
    }, 3000);
  }

  const handleEditBook = async () => {
    if (!title || !author || !price || !description || !publishYear) {
      setAutoError('Please fill in all fields');
      return;
    }

    try {
      const bookData = {
        title,
        author,
        price: parseFloat(price),
        description,
        publishYear: parseInt(publishYear)
      };
      setLoading(true);
      setError('');

      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(bookData)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json()
      console.log('Book Updated successfully:', result);
      navigate('/')
    } catch (error) {
      setLoading(false)
      console.error('Error saving book:', error);
      alert('An error occurred. Please check console')
      setAutoError('Failed to save book. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const inputStyles = 'border-2 border-gray-500 px-4 py-2 w-full text-white rounded-md text-sm'

  const errorStyles = 'text-red-500 text-sm mt-2 text-center';

  // Only render the form once data is loaded
  if (loading && !isDataLoaded) {
    return <Spinner />
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <div className='flex items-center gap-10 justify-center mb-6'>
        <BackButton />
        <h1 className='text-2xl text-sky-400 tracking-widest'>Edit Book</h1>
      </div>
    
      <div className='flex flex-col gap-6 border border-sky-500 rounded-xl w-[500px] px-10 py-12 mx-auto'>
        <div>
          <input
            type='text'
            placeholder='Enter book title'
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className={inputStyles}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Enter author name'
            value={author}
            required
            onChange={(e) => setAuthor(e.target.value)}
            className={inputStyles}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Enter book price'
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
            className={inputStyles}
          />
        </div>
        <div>
          <textarea
            type='text'
            placeholder='Enter book description'
            rows={3}
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            className={inputStyles}
          />
        </div>
        <div>
          <input
            type='number'
            placeholder='Enter publish year'
            value={publishYear}
            required
            onChange={(e) => setPublishYear(e.target.value)}
            className={inputStyles}
          />
        </div>

        <button 
          className='p-2 bg-sky-400 hover:bg-sky-500 mt-4 w-full rounded-md' 
          onClick={handleEditBook} 
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>

        {error && (
          <div className={errorStyles}>
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

export default EditBooks
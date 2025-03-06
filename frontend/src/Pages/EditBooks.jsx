import React, { useState, useEffect } from 'react'
import BackButton from '../Components/BackButton'
import Spinner from '../Components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { apiUrl } from "../utils/bookAPI"
import useFetchBooks from '../Hooks/useFetchBooks'

const EditBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [publishYear, setPublishYear] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();
  const {id} = useParams();

  const { books: book, loading, error } = useFetchBooks(id); // Fetch single book data

  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
      setAuthor(book.author || "");
      setPrice(book.price ? book.price.toString() : "");
      setDescription(book.description || "");
      setPublishYear(book.publishYear ? book.publishYear.toString() : "");
      setIsDataLoaded(true);
    }
  }, [book]);

  const setAutoError = (message) => {
    setSaveError(message);
    setTimeout(() => {
      setSaveError("");
    }, 3000);
  };

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
      setIsSaving(true);
      setSaveError("");

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

      navigate('/')
    } catch (error) {
      setIsSaving(false);
      console.error('Error saving book:', error);
      alert('An error occurred. Please check console')
      setAutoError('Failed to save book. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }

  const inputStyles = 'border-2 border-gray-500 px-4 py-2 w-full text-white rounded-md text-sm'

  const errorStyles = 'text-red-500 text-sm mt-2 text-center';

  // Only render the form once data is loaded
  if (loading && !isDataLoaded) {
    return <Spinner />
  }

  if (error) return <p className="text-red-500 text-center">{error}</p>;

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
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>

        {saveError && (
          <div className={errorStyles}>
            {saveError}
          </div>
        )}
      </div>
    </div>
  )
}

export default EditBooks
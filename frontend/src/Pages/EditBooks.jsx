/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import BackButton from '../Components/BackButton'
import Spinner from '../Components/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import { apiUrl } from "../utils/bookAPI"
import useFetchBooks from '../Hooks/useFetchBooks'
import { createBookApi } from '../utils/bookAPI'
import ComingSoon from '../assets/Coming-Soon.png'

const EditBooks = () => {
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null)
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [publishYear, setPublishYear] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isError, isSetError] = useState('');
  
  const navigate = useNavigate();
  const {id} = useParams();

  const { books: book, loading, error } = useFetchBooks(id); // Fetch single book data

   const defaultBookCover = ComingSoon

  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
      setAuthor(book.author || "");
      setPrice(book.price ? book.price.toString() : "");
      setDescription(book.description || "");
      setPublishYear(book.publishYear ? book.publishYear.toString() : "");
      // If book has image, set the preview URL correctly
      book.image ? setImagePreview(`${createBookApi}${book.image}`) : setImagePreview(defaultBookCover)

      setIsDataLoaded(true);
    }
  }, [book, defaultBookCover]);

  const setAutoError = (message) => {
    setSaveError(message);
    setTimeout(() => {
      setSaveError("");
    }, 3000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.match('image.*')) {
        isSetError('Please select an image file');
        return;
      }
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        isSetError('Image size should be less than 5MB');
        return;
      }
      
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditBook = async () => {
    if (!title || !author || !price || !description || !publishYear) {
      setAutoError('Please fill in all required fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      if (imageFile) formData.append('image', imageFile);
      formData.append('author', author);
      formData.append('price', parseFloat(price));
      formData.append('description', description);
      formData.append('publishYear', parseInt(publishYear));
      
      setIsSaving(true);
      setSaveError("");

      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'PATCH', 
        body: formData
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      navigate('/')
    } catch (error) {
      setIsSaving(false);
      console.error('Error editing book:', error);
      setAutoError('Failed to edit book. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }

  const inputStyles = 'border-2 border-gray-500 px-4 py-2 w-full text-white rounded-md text-sm bg-slate-600'

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
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-sky-400 file:text-white hover:file:bg-sky-500"
          />
          {
            imagePreview && (
              <div className="mt-3">
                <p className="text-sm text-gray-400 mb-1">Image Preview:</p>
                <img 
                  src={imagePreview} 
                  alt="Book cover preview" 
                  className="w-32 h-40 object-cover rounded border border-gray-400" 
                />
              </div>
            )
          }
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
          <input
            type='number'
            placeholder='Enter publish year'
            value={publishYear}
            required
            onChange={(e) => setPublishYear(e.target.value)}
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
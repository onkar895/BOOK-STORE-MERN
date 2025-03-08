/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import BackButton from '../Components/BackButton'
import Spinner from '../Components/Spinner'
import { useNavigate } from 'react-router-dom'
import { apiUrl } from "../utils/bookAPI"
import NavBar from '../Components/NavBar'

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [publishYear, setPublishYear] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const setAutoError = (message) => {
    setError(message);
    
    setTimeout(() => {
      setError('');
    }, 3000);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.match('image.*')) {
        setError('Please select an image file');
        return;
      }
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
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

  const handleSaveBook = async () => {
    if (!title || !imageFile || !author || !price || !description || !publishYear) {
      setAutoError('Please fill in all fields');
      return;
    }

    try {
      // / Create bookData object to send the file and other data
      const bookData = {
        title,
        imageFile,
        author,
        price: parseFloat(price),
        description,
        publishYear: parseInt(publishYear)
      };
      
      setLoading(true);
      setError('');

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'  // Set the content type
        }, 
        body: JSON.stringify(bookData) // Convert data to JSON string
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Book created successfully:', result);
      navigate('/');
    } catch (error) {
      console.error('Error saving book:', error);
      setAutoError('Failed to save book. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const inputStyles = 'border-2 border-gray-500 px-4 py-2 w-full text-white rounded-md text-sm';
  const errorStyles = 'text-red-500 text-sm mt-2 text-center';

  return (
    <>
      <div className="mx-auto px-4 sm:px-10 lg:px-28">
        <NavBar />
        <div className='my-36 sm:my-28'>
          <div className='flex items-center gap-10 justify-center my-6'>
            <BackButton />
            <h1 className='text-2xl text-sky-400 tracking-widest'>Create Book</h1>
          </div>
        
          {loading && <Spinner />}

          <div className='flex flex-col gap-6 border border-sky-500 rounded-xl w-full max-w-xl md:max-w-2xl px-10 py-12 mx-auto'>
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
              {/* Image Preview */}
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
            
            <button className='p-2 bg-sky-400 hover:bg-sky-500 mt-4 w-full rounded-md' onClick={handleSaveBook} disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>

            {error && (
              <div className={errorStyles}>
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateBooks
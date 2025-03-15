/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import BackButton from "../Components/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../utils/bookAPI";
import useFetchBooks from "../Hooks/useFetchBooks";
import ComingSoon from "../assets/Coming-Soon.png";
import { useSnackbar } from "notistack";
import { IoCloseSharp } from "react-icons/io5";
import NavBar from "../Components/NavBar";

const EditBooks = () => {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isError, isSetError] = useState("");

  const navigate = useNavigate();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { id } = useParams();

  const { books: book, error } = useFetchBooks(id);

  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
      setAuthor(book.author || "");
      setPrice(book.price ? book.price.toString() : "");
      setDescription(book.description || "");
      setPublishYear(book.publishYear ? book.publishYear.toString() : "");
      setImagePreview(book.image ? book.image : ComingSoon);

      setIsDataLoaded(true);
    }
  }, [book]);

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
      if (!file.type.match("image.*")) {
        isSetError("Please select an image file");
        return;
      }

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        isSetError("Image size should be less than 5MB");
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
      setAutoError("Please fill in all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      if (imageFile) formData.append("image", imageFile);
      formData.append("author", author);
      formData.append("price", parseFloat(price));
      formData.append("description", description);
      formData.append("publishYear", parseInt(publishYear));

      setIsSaving(true);
      setSaveError("");

      const response = await fetch(`${apiUrl}/${id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      closeSnackbar();
      enqueueSnackbar("Book Edited Successfully", {
        variant: "success",
        action: (key) => (
          <button onClick={() => closeSnackbar(key)} className='text-white px-2 text-xl hover:scale-110 transition-all duration-300 ease-in-out'>
            <IoCloseSharp />
          </button>
        ),
      });
      navigate("/");
    } catch (error) {
      setIsSaving(false);
      closeSnackbar();
      enqueueSnackbar("Error Editing Book", {
        variant: "error",
        action: (key) => (
          <button onClick={() => closeSnackbar(key)} className='text-white px-2 text-xl hover:scale-110 transition-all duration-300 ease-in-out'>
            <IoCloseSharp />
          </button>
        ),
      });
      setAutoError("Failed to edit book. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const inputStyles = "border-2 border-gray-500 px-4 py-2 w-full text-white rounded-md text-sm bg-slate-600";

  const errorStyles = "text-red-500 text-sm mt-2 text-center";

  if (error) return <p className='text-red-500 text-center'>{error}</p>;

  return (
    <div className='mx-auto'>
      <NavBar />
      <div className='min-h-screen flex flex-col items-center justify-center py-36 sm:py-28'>
        <div className='flex items-center gap-10 justify-center mb-6'>
          <BackButton />
          <h1 className='text-2xl text-sky-400 tracking-widest font-semibold'>Edit Book</h1>
        </div>

        <div className='flex flex-col gap-6 border border-sky-500 rounded-xl w-full max-w-xl md:max-w-2xl px-10 py-12 mx-auto'>
          <div>
            <input type='text' placeholder='Enter book title' value={title} required onChange={(e) => setTitle(e.target.value)} className={inputStyles} />
          </div>
          <div>
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-sky-400 file:text-white hover:file:bg-sky-500'
            />
            {imagePreview && (
              <div className='mt-3'>
                <p className='text-sm text-gray-400 mb-1'>Image Preview:</p>
                <img src={imagePreview} alt='Book cover preview' className='w-32 h-40 object-cover rounded border border-gray-400' />
              </div>
            )}
          </div>
          <div>
            <input type='text' placeholder='Enter author name' value={author} required onChange={(e) => setAuthor(e.target.value)} className={inputStyles} />
          </div>
          <div>
            <input type='text' placeholder='Enter book price' value={price} required onChange={(e) => setPrice(e.target.value)} className={inputStyles} />
          </div>
          <div>
            <input type='number' placeholder='Enter publish year' value={publishYear} required onChange={(e) => setPublishYear(e.target.value)} className={inputStyles} />
          </div>
          <div>
            <textarea type='text' placeholder='Enter book description' rows={3} value={description} required onChange={(e) => setDescription(e.target.value)} className={inputStyles} />
          </div>

          <button className='p-2 bg-sky-400 hover:bg-sky-500 mt-4 w-full rounded-md' onClick={handleEditBook} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </button>

          {saveError && <div className={errorStyles}>{saveError}</div>}
        </div>
      </div>
    </div>
  );
};

export default EditBooks;

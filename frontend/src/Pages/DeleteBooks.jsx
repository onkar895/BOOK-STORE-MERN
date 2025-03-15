import React from "react";
import BackButton from "../Components/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../utils/bookAPI";
import { useSnackbar } from "notistack";
import { IoCloseSharp } from "react-icons/io5";
import NavBar from "../Components/NavBar";

const DeleteBooks = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleDeleteBook = async () => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Set the content type
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Book deleted successfully:", result);
      closeSnackbar();
      enqueueSnackbar("Book Deleted Successfully", {
        variant: "success",
        action: (key) => (
          <button onClick={() => closeSnackbar(key)} className='text-white px-2 text-xl hover:scale-110 transition-all duration-300 ease-in-out'>
            <IoCloseSharp />
          </button>
        ),
      });
      navigate("/");
    } catch (error) {
      console.error("Error deleting book:", error);
      closeSnackbar();
      enqueueSnackbar("Error Deleting Book", {
        variant: "error",
        action: (key) => (
          <button onClick={() => closeSnackbar(key)} className='text-white px-2 text-xl hover:scale-110 transition-all duration-300 ease-in-out'>
            <IoCloseSharp />
          </button>
        ),
      });
    } 
  };

  return (
    <div className="mx-auto">
      <NavBar/>
      <div className='min-h-screen flex flex-col items-center justify-center'>
      <div className='flex items-center gap-10 justify-center mb-10'>
        <BackButton />
        <h1 className='text-2xl text-sky-400 tracking-widest font-semibold'>Delete Book</h1>
      </div>
      <div className='flex flex-col items-center justify-center gap-8 border-2 border-sky-500 rounded-xl w-full max-w-xl md:max-w-2xl px-10 h-[300px] mx-auto'>
        <h3 className='text-lg text-white'>Are You Sure! You want to delete this book?</h3>
        <button className='p-3 rounded-lg bg-red-600 hover:bg-red-500 text-white w-full' onClick={handleDeleteBook}>
          Yes, Delete it
        </button>
      </div>
    </div>
    </div>
  );
};

export default DeleteBooks;

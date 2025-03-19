import { useState, memo } from "react";
import { NavLink } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle, BsCurrencyDollar, BsCardText } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import ComingSoon from "../assets/Coming-Soon.png";

const BookSingleCard = memo(({ book, index }) => {
  const [imageError, setImageError] = useState(false);

  // Truncate long descriptions
  const truncateText = (text, maxLength = 80) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Default image to show when the URL is invalid or image fails to load
  const defaultBookCover = ComingSoon;

  return (
    <div className='relative border border-gray-600 shadow-md rounded-md p-6 cursor-pointer'>
      <NavLink to={`/books/details/${book._id}`}>
        <img
          src={imageError ? defaultBookCover : book.image}
          alt={book.title}
          loading='lazy'
          className='block m-auto w-[650px] h-[250px] sm:h-[200px] object-cover rounded-lg transition-transform hover:scale-105 duration-500 ease-in-out'
          onError={() => {
            console.error("Image failed to load:", book.image);
            setImageError(true);
          }}
        />
        {/* Book Number Badge */}
        <div className='absolute -top-3 -left-3 w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center text-white font-bold shadow-md'>{index + 1}</div>

        {/* Publish Year Badge */}
        <div className='absolute top-3 right-3 px-4 py-1 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full shadow-md font-medium'>{book.publishYear}</div>

        {/* Content Container with extra spacing for badges */}
        <div className='mt-10'>
          {/* Title with hover effect */}
          <div className={`flex items-center gap-x-5 border-b pb-2`}>
            <PiBookOpenTextLight className={`text-3xl text-sky-400 transition-colors duration-300`} />
            <h2 className='text-lg text-white'>{book.title}</h2>
          </div>

          <div className='flex flex-col justify-center gap-3 my-4'>
            {/* Author Info */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-x-2'>
                <BiUserCircle className={`text-2xl text-sky-400 transition-colors duration-300`} />
                <h3 className='text-sm text-white/60'>{book.author}</h3>
              </div>

              {/* Price Info with proper icon */}
              <div className='flex items-center gap-x-2 mt-1'>
                <BsCurrencyDollar className={`text-2xl text-sky-400 transition-colors duration-300`} />
                <h3 className='text-sm text-white/60'>{book.price}</h3>
              </div>
            </div>
            {/* Description with truncation */}
            <div className='flex items-center gap-x-3'>
              <BsCardText className={`text-3xl text-sky-400 transition-colors duration-300 ml-1`} />
              <p className='text-white/60 text-sm'>{truncateText(book.description)}</p>
            </div>
          </div>
        </div>
      </NavLink>
      {/* Action Buttons */}
      <div className={`flex justify-between items-center border-t border-sky-100 transition-colors duration-300`}>
        <NavLink to={`/books/details/${book._id}`} className='group flex flex-col items-center gap-1'>
          <span className='text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-green-400 mb-1'>Details</span>
          <BsInfoCircle className='text-2xl text-green-500 group-hover:text-green-400 transform group-hover:scale-110 transition-all duration-300' />
        </NavLink>

        <NavLink to={`/books/edit/${book._id}`} className='group flex flex-col items-center gap-1'>
          <span className='text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sky-400 mb-1'>Edit</span>
          <AiOutlineEdit className='text-2xl text-sky-500 group-hover:text-sky-400 transform group-hover:scale-110 transition-all duration-300' />
        </NavLink>

        <NavLink to={`/books/delete/${book._id}`} className='group flex flex-col items-center gap-1'>
          <span className='text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-400 mb-1'>Delete</span>
          <MdOutlineDelete className='text-2xl text-red-500 group-hover:text-red-400 transform group-hover:scale-110 transition-all duration-300' />
        </NavLink>
      </div>
    </div>
  );
});

export default BookSingleCard;

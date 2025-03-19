import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaStar, FaRegStar, FaStarHalfAlt, FaEye } from 'react-icons/fa';

const FeaturedBook = ({ book }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Generate star ratings
  const renderRatingStars = (rating = 4.5) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    
    return stars;
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    // Get the current element
    const element = document.getElementById('featured-book');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.disconnect();
    };
  }, []);
  
  // If no book is provided, return null
  if (!book) return null;
  
  // Default values for potentially missing properties
  const defaultDescription = "A captivating story that will take you on an unforgettable journey through imagination and adventure.";
  const defaultCoverImage = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWt1cjZ3M200OG9tb3ZjcnU4NXpsM3d2NGYxcmMyYzk0dG9vcnVhayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26ufpIWyTAznh9hFC/giphy.gif";
  
  return (
    <div 
      id="featured-book"
      className={`w-full mx-auto relative transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
      
      {/* Featured label */}
      <div className="absolute -top-12 z-10 left-0 bg-sky-600 text-white px-8 py-2 rounded-full font-medium text-sm shadow-md cursor-pointer">
        Featured Book
      </div>
      
      <div className="relative rounded-lg shadow-3xl overflow-hidden transition-all duration-300 border border-gray-700">
        <div className="flex flex-col lg:flex-row">
          {/* Book cover */}
          <div className="p-6 flex items-center justify-center">
            <div className="relative group">
              <div className="absolute rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative">
                <img 
                src={imageError ? defaultCoverImage : book.image} 
                  alt={book.title} 
                  className="w-[100vw] lg:w-[60vw] xl:w-[50vw] h-[25vh] sm:h-[42vh] object-cover rounded shadow-lg transform transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                  onError={() => {
                    console.error("Image failed to load:", book.image);
                    setImageError(true);
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Book details */}
          <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{book.title}</h2>
              <p className="text-xl text-gray-400 mb-4">by {book.author}</p>
              
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {renderRatingStars(book.rating)}
                </div>
                <span className="text-gray-400">({book.rating || '4.5'})</span>
              </div>
              
              <div className="mb-6">
                {book.publishYear && (
                  <span className="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                    {book.publishYear}
                  </span>
                )}
              </div>
              
              <p className="text-gray-300 mb-6 line-clamp-3 md:line-clamp-none">
                {book.description || defaultDescription}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <NavLink 
                to={`/books/details/${book._id}`}
                className="bg-sky-600 hover:bg-sky-700 text-white py-2 px-6 rounded-full shadow-md transition-colors duration-300 flex justify-center items-center"
              >
                View Details
              </NavLink>
              <button 
                className="border-2 text-sky-400 border-sky-400 bg-sky-900/30 py-2 px-6 rounded-full transition-colors duration-300 flex justify-center items-center gap-2"
              >
                <FaEye /> Quick Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBook;
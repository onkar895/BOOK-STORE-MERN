import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaStarHalfAlt, FaEye } from 'react-icons/fa';

const FeaturedBook = ({ book }) => {
  const [isVisible, setIsVisible] = useState(false);
  
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
  const defaultCoverImage = "https://nnp.wustl.edu/library/periodical/15587/300x450?text=Book+Cover";
  
  return (
    <div 
      id="featured-book"
      className={`w-full max-w-7xl mx-auto relative transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
      
      {/* Featured label */}
      <div className="absolute -top-12 z-10 left-0 bg-sky-600 text-white px-8 py-2 rounded-full font-medium text-sm shadow-md cursor-pointer">
        Featured Book
      </div>
      
      <div className="relative rounded-lg shadow-3xl overflow-hidden transition-all duration-300 border border-gray-700">
        <div className="flex flex-col md:flex-row">
          {/* Book cover */}
          <div className="p-6 flex items-center justify-center">
            <div className="relative group">
              <div className="absolute rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative">
                <img 
                src={book.imageUrl ? `https://book-store-mern-31yo.onrender.com${book.imageUrl}` : defaultCoverImage} 
                  alt={book.title} 
                  className="w-[650px] h-[300px] object-cover rounded shadow-lg transform transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                />
              </div>
            </div>
          </div>
          
          {/* Book details */}
          <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{book.title}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">by {book.author}</p>
              
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {renderRatingStars(book.rating)}
                </div>
                <span className="text-gray-600 dark:text-gray-400">({book.rating || '4.5'})</span>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-6">
                {book.genre && (
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-3 py-1 rounded-full text-sm font-medium">
                    {book.genre}
                  </span>
                )}
                {book.publishYear && (
                  <span className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                    {book.publishYear}
                  </span>
                )}
                {book.pages && (
                  <span className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <span className="mr-1">{book.pages}</span> pages
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-3 md:line-clamp-none">
                {book.description || defaultDescription}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link 
                to={`/books/details/${book._id}`}
                className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-6 rounded-full shadow-md transition-colors duration-300 flex justify-center items-center"
              >
                View Details
              </Link>
              <button 
                className="bg-transparent border-2 border-sky-600 text-sky-600 dark:text-sky-400 dark:border-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/30 font-medium py-2 px-6 rounded-full transition-colors duration-300 flex justify-center items-center gap-2"
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
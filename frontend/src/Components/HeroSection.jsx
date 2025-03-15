import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdOutlineAddBox, MdMenuBook } from 'react-icons/md';
import BookVerse from '../assets/bookverse-logo.png'
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    // Add animation effect when component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const styles = "p-6 rounded-lg shadow-md border border-gray-600 hover:border-gray-500 transition-all duration-300 hover:shadow-lg cursor-pointer"

  return (
    <div className="w-full py-32 md:py-40">
      <div className="flex flex-col xl:flex-row items-center gap-10">
        <div
          className={`flex flex-col items-center xl:items-start gap-4 mb-10 md:mb-0 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
        >
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight text-center ">
            Your <span className="text-sky-400">Digital</span> Bookshelf
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 text-center lg:text-start">
            Manage your book collection, discover new titles, and keep track of your reading journey all in one place.
          </p>
          <div className="flex flex-wrap gap-4">
            <NavLink
              to="/books/create"
              className="inline-flex items-center px-3 md:px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-300"
            >
              <MdOutlineAddBox className="mr-2 text-xl" />
              Add New Book
            </NavLink>
            <button
              onClick={() => navigate('/books')}
              className="inline-flex items-center px-3 md:px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-300"
            >
              <MdMenuBook className="mr-2 text-xl" />
              Browse Collection
            </button>
          </div>
        </div>

        <div
          className={`md:w-1/2 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
        >
          {/* Hero Image */}
          <div className="shadow-2xl">
            <div className="relative bg-white dark:bg-gray-800 p-2 rounded-lg shadow-xl">
              <img
                src={BookVerse}
                alt="BookVerse Platform"
                className="w-full h-auto rounded shadow-sm"
              />
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12">
                New Features!
              </div>
              <div className="absolute bottom-0 left-24 -translate-x-1/2 bg-sky-600 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg">
                ⭐ Curate Your Reads
              </div>
              {/* <div className="absolute bottom-8 right-0 translate-x-1/4 bg-sky-600 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg">
                  Full CRUD
                </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div
        className={`mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
      >
        <div className={styles}>
          <div className="text-sky-400 text-3xl font-bold mb-2">1000+</div>
          <div className="text-gray-300 font-medium">Books Managed</div>
        </div>
        <div className={styles}>
          <div className="text-sky-400 text-3xl font-bold mb-2">500+</div>
          <div className="text-gray-300 font-medium">Active Users</div>
        </div>
        <div className={styles}>
          <div className="text-sky-400 text-3xl font-bold mb-2">4.6</div>
          <div className="text-gray-300 font-medium">User Rating</div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
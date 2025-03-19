import { useState, useEffect } from 'react';
import NavBar from '../Components/NavBar';
import useFetchBooks from '../Hooks/useFetchBooks';
import BooksTable from '../Components/BooksTable';
import BooksCard from '../Components/BooksCard';
import HeroSection from '../Components/HeroSection';
import FeaturedBook from '../Components/FeaturedBook';
import Footer from '../Components/Footer';

const HomePage = () => {
  const [showType, setShowType] = useState('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [fadeIn, setFadeIn] = useState(false);
  const { books, loading, error } = useFetchBooks();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [featuredBook, setFeaturedBook] = useState(null);

  // Filter books based on search query
  useEffect(() => {
    if (books) {
      const filtered = books.filter(book => 
        book.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        book.author?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(filtered);
      
      // Set the featured book (first book or a specific one you want to feature)
      if (books.length > 0 && !featuredBook) {
        setFeaturedBook(books[3]);
      }
    }
  }, [books, searchQuery, featuredBook]);

  // Animation on page load
  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 mx-auto px-4 md:px-6 lg:px-12 xl:px-20`}>
      {/* Navbar */}
      <NavBar />
      {/* Hero Section */}
      <HeroSection/>
      {/* Featured Book */}
      <div className="my-10">
          {!loading && !error && featuredBook && (
            <FeaturedBook book={featuredBook} />
          )}
      </div>

      {/* Main Content */}
      <div id="book-collection" className='w-full mx-auto py-10'>
        <div className='flex flex-col md:flex-row justify-between items-center mb-10 gap-4'>
          <h2 className={`text-2xl md:text-3xl font-bold text-white`}>
            Book Collection
          </h2>
          
          {/* View Toggle */}
          <div className='flex border border-sky-300 rounded-md overflow-hidden'>
            <button
              className={`px-6 py-2 transition-colors duration-300 ${
                showType === 'card' ? 'bg-sky-500 text-white' : `bg-gray-800 text-gray-300`
              }`}
              onClick={() => setShowType('card')}>
              Card View
            </button>
            <button
              className={`px-6 py-2 transition-colors duration-300 ${
                showType === 'table' ? 'bg-sky-500 text-white' : `bg-gray-800 text-gray-300`
              }`}
              onClick={() => setShowType('table')}>
              Table View
            </button>
          </div>
        </div>

        {/* Search Results Count */}
        {searchQuery && (
          <div className={`mb-6 text-gray-300`}>
            Found {filteredBooks.length} results for "{searchQuery}"
          </div>
        )}

        {/* Loading and Error States */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Books Display */}
        {!loading && !error && (
          <div className={`transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            {showType === 'table' ? (
              <BooksTable books={searchQuery ? filteredBooks : books} />
            ) : (
              <BooksCard books={searchQuery ? filteredBooks : books} loading={loading} />
            )}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && searchQuery && filteredBooks.length === 0 && (
          <div className="text-center py-20">
            <p className={`text-xl dar:text-gray-300 text-gray-600`}>
              No books found matching "{searchQuery}"
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md transition-colors duration-300"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default HomePage;
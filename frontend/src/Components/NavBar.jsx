/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext  } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { MdMenu, MdClose, MdSearch } from 'react-icons/md';
import { FaBook, FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import SearchContext from '../Context/SearchContext';
import useFetchBooks from '../Hooks/useFetchBooks';

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);

  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const { books } = useFetchBooks();

  const navigate = useNavigate();

  const handleSearchInput = (e) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
  
    if (searchQuery.trim() !== "") {
      const filtered = books.filter(
        (book) =>
          book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(filtered);
  
      // Navigate with search query
      const currentPath = window.location.pathname;
      navigate(`${currentPath === "/" ? "/" : currentPath}?search=${encodeURIComponent(searchQuery)}`);
    } else {
      setFilteredBooks(books); // Show all books when search is cleared
    }
  
    // Scroll to books section after search
    setTimeout(() => {
      const bookCollectionElement = document.getElementById("book-collection");
      if (bookCollectionElement) {
        bookCollectionElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  
    setMobileMenuOpen(false);
  };
  

   // Clear search when navigating away from home page
   useEffect(() => {
    return () => {
      if (setSearchQuery) {
        setSearchQuery('');
      }
    };
  }, [setSearchQuery]);

  return (
    <nav className="fixed top-0 left-0 z-50 bg-slate-900 transition-colors duration-300 w-full">
      <div className="mx-auto px-4 md:px-6 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <FaBook className="text-2xl text-sky-500 transition-colors duration-300" />
              <div className="text-2xl md:text-3xl font-bold">
                <span className="text-sky-500">
                  Book
                </span>
                <span className="text-white">
                  Verse
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-between space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-gray-300 hover:text-sky-500 hover:border-b-2 hover:border-sky-400 transition-all duration-300 ease-in-out ${
                  isActive ? 'border-b-2 border-sky-400 text-sky-400 font-medium' : ''
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/books" end 
              className={({ isActive }) => 
                `text-gray-300 hover:text-sky-500 transition-all ease-in-out duration-500 ${
                  isActive ? 'border-b-2 border-sky-500 text-sky-500 font-medium' : ''
                }`
              }
            >
              Books
            </NavLink>
            <NavLink 
              to="/books/create" 
              className={({ isActive }) => 
                `text-gray-300 hover:text-sky-500 transition-colors duration-500 ${
                  isActive ? 'border-b-2 border-sky-500 text-sky-500 font-medium' : ''
                }`
              }
            >
              Add Book
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `text-gray-300 hover:text-sky-500 transition-colors duration-300 ${
                  isActive ? 'border-b-2 border-sky-500 text-sky-500 font-medium' : ''
                }`
              }
            >
              About
            </NavLink>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={handleSearchInput}
                className="px-4 text-sm py-1.5 w-72 rounded-full bg-transparent text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors duration-300"
              />
              <button type="submit" className="absolute right-3 top-2 text-gray-400 hover:text-gray-300">
                <MdSearch size={22} />
              </button>
            </form>

            {/* GitHub Link */}
            <a 
              href="https://github.com/onkar895/BOOK-STORE-MERN" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub repository"
            >
              <FaGithub size={25} className='text-gray-300 hover:text-white transition-all duration-500 ease-in-out'/>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button 
              className="text-gray-300 hover:text-sky-500 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-20 left-0 w-full bg-slate-900 shadow-lg transition-all duration-500 ease-in-out 
  ${mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}>
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-slate-900 shadow-lg">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md ${
                isActive 
                  ? 'bg-sky-900 text-sky-400' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-sky-400'
              } transition-all duration-500 ease-in-out`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink 
            to="/books" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md ${
                isActive 
                  ? 'bg-sky-900 text-sky-400 font-medium' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-sky-400'
              } transition-colors duration-300`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Books
          </NavLink>
          <NavLink 
            to="/books/create" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md ${
                isActive 
                  ? 'bg-sky-900 text-sky-400 font-medium' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-sky-400'
              } transition-colors duration-300`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            Add Book
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md ${
                isActive 
                  ? 'bg-sky-900 text-sky-400 font-medium' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-sky-400'
              } transition-colors duration-300`
            }
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </NavLink>
          
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="py-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={handleSearchInput}
                className="w-full py-2 px-3 rounded-md border border-gray-500 text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors duration-300 bg-transparent"
              />
              <button type="submit" className="absolute right-3 top-3 text-gray-400">
                <MdSearch size={22} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
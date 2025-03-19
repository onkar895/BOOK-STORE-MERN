/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import useFetchBooks from "../Hooks/useFetchBooks";
import Spinner from "../Components/Spinner";
import BookSingleCard from "../Components/BookSingleCard";
import NavBar from "../Components/NavBar";
import FeaturedBook from "../Components/FeaturedBook";
import Footer from "../Components/Footer";

const AllBooks = () => {
  const { books, loading } = useFetchBooks();
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredBook, setFeaturedBook] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Filter books based on search query
  useEffect(() => {
    if (books) {
      const filtered = books.filter((book) => book.title?.toLowerCase().includes(searchQuery.toLowerCase()) || book.author?.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredBooks(filtered);

      // Set the featured book (first book or a specific one you want to feature)
      if (books.length > 0 && !featuredBook) {
        setFeaturedBook(books[3]);
      }
    }
  }, [books, searchQuery, featuredBook]);

  return (
    <>
      <NavBar />
      {loading ? (
        <Spinner />
      ) : (
        <div className='py-36 sm:py-28 px-4 sm:px-10 lg:px-28'>
          <div className='my-16'>{featuredBook && <FeaturedBook book={featuredBook} />}</div>
          <h1 className='my-6 text-white text-xl sm:text-2xl'>{books.length} books are available right now :-</h1>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16 my-10'>
            {books.length > 0 ? books.map((book, index) => <BookSingleCard key={book._id} book={book} index={index} />) : <p>No books available</p>}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default AllBooks;

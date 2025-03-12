import React from 'react'
import useFetchBooks from '../Hooks/useFetchBooks'
import Spinner from '../Components/Spinner';
import BookSingleCard from '../Components/BookSingleCard';
import NavBar from '../Components/NavBar';
import FeaturedBook from '../Components/FeaturedBook';
import Footer from '../Components/Footer';

const AllBooks = () => {
  const { books, loading } = useFetchBooks();

  return (
    <>
      <NavBar />
      {loading ? (
        <Spinner/>
      ) : (
       <div className='py-36 sm:py-28 px-4 sm:px-10 lg:px-28'>
        <FeaturedBook/>
        <h1 className='my-6 text-white text-xl sm:text-2xl'>{books.length} books are available right now :-</h1>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-6 my-10'>
          {books.length > 0 ? (
            books.map((book, index) => (
              <BookSingleCard key={book._id} book={book} index={index}/>
            ))
          ) : (
            <p>No books available</p> 
          )}
        </div>
        <Footer/>
       </div>
      )}
    </>
  )
}

export default AllBooks

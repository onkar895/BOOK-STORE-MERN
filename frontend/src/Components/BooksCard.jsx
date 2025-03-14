import React from 'react'
import BookSingleCard from './BookSingleCard'

const BooksCard = ({ books }) => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-6'>
      {
        books.length > 0 ? (
          books.map((book, index) => (
          <BookSingleCard key={book._id} book={book} index={index}/>
          ))
        ) : (
          <p>No books available</p> 
        )
      }
    </div>
  )
}

export default BooksCard 
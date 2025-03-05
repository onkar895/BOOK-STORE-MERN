import React from 'react'
import BookSingleCard from './BookSingleCard'

const BooksCard = ({ books }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {books.map((book, index) => (
        <BookSingleCard key={book._id} book={book} index={index}/>
      ))}
    </div>
  )
}

export default BooksCard
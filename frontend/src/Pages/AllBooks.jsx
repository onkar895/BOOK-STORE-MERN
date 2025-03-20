import { useContext, useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Spinner from "../Components/Spinner";
import BooksCard from "../Components/BooksCard";
import FeaturedBook from "../Components/FeaturedBook";
import useFetchBooks from "../Hooks/useFetchBooks";
import SearchContext from "../Context/SearchContext";

const AllBooks = () => {
  const { books, loading, loadMore, hasMore, initialLoad } = useFetchBooks();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [featuredBook, setFeaturedBook] = useState(null);

  const { searchQuery } = useContext(SearchContext);

  // Filter books based on search query
  useEffect(() => {
    if (books && searchQuery) {
      const filtered = books.filter((book) => book.title?.toLowerCase().includes(searchQuery.toLowerCase()) || book.author?.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books); // Show all books if no search query
    }

    if (books.length > 0 && !featuredBook) {
      setFeaturedBook(books[3] || books[0]);
    }
  }, [books, searchQuery, featuredBook]);

  return (
    <>
      <NavBar />
      {initialLoad ? (
        <Spinner />
      ) : (
        <div className='py-36 sm:py-28 px-4 sm:px-10 lg:px-28'>
          <div className='my-16'>{featuredBook && <FeaturedBook book={featuredBook} />}</div>
          <div className='my-10 text-white text-xl sm:text-2xl'>
            {searchQuery ? (
              <h1>
                Found {filteredBooks.length} {filteredBooks.length === 1 ? "result" : "results"} for "{searchQuery}"
              </h1>
            ) : (
              <h1>
                {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"} are available right now :-)
              </h1>
            )}
          </div>
          <BooksCard books={searchQuery ? filteredBooks : books} loadMore={searchQuery ? null : loadMore} hasMore={searchQuery ? false : hasMore} />

          {
            loading && <Spinner/>
          }
          <Footer />
        </div>
      )}
    </>
  );
};

export default AllBooks;

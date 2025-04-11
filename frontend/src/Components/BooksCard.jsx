import React, { useRef, useCallback } from "react";
import BookSingleCard from "./BookSingleCard";
import Spinner from "./Spinner";

const BooksCard = ({ books, loading, loadMore, hasMore, initialLoad }) => {
  const observer = useRef();

  // Last book element ref callback for intersection observer
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("Fetching more books...");
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-6 md:gap-16">
      {initialLoad || (books?.length === 0 && !loading) ? (
        <Spinner />
      ) : books?.length > 0 ? (
        books.map((book, index) => (
          <div key={book._id} ref={index === books.length - 1 ? lastBookElementRef : null}>
            <BookSingleCard book={book} index={index} />
          </div>
        ))
      ) : (
        <div className="col-span-full font-semibold text-xl text-center py-10 text-gray-400">
          No books available
        </div>
      )}
      {loading && <Spinner/>}
    </div>
  );
};

export default BooksCard;

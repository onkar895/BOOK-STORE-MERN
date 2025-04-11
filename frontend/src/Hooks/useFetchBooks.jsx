import { useState, useEffect, useCallback } from "react";
import { apiUrl } from "../utils/bookAPI";

const useFetchBooks = (id = null) => {
  const [books, setBooks] = useState(id ? null : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchBooks = useCallback(async (pageNum = 1) => {
    try {
      setLoading(true);
      const url = id 
        ? `${apiUrl}/${id}` 
        : `${apiUrl}?page=${pageNum}&limit=9`; // Add pagination parameters
      
      const response = await fetch(url);
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const result = await response.json();
      
      if (id) {
        setBooks(result.data);
      } else {
        // For infinite scroll, append new books to existing ones
        if (pageNum === 1) {
          setBooks(result.data);
        } else {
          setBooks(prev => [...prev, ...result.data]);
        }
        
        // Check if there are more books to load
        setHasMore(result.currentPage < result.totalPages);
      }

      setInitialLoad(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Initial data fetch
  useEffect(() => {
    setPage(1); // Reset page when id changes
    fetchBooks(1);
  }, [id, fetchBooks]);

  // Function to load more books (for infinite scroll)
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchBooks(nextPage);
    }
  }, [loading, hasMore, page, fetchBooks]);

  return { books, loading, error, loadMore, hasMore, initialLoad };
};

export default useFetchBooks;
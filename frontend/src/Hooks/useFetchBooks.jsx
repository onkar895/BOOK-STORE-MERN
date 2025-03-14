import { useState, useEffect } from "react";
import { apiUrl } from "../utils/bookAPI";

const useFetchBooks = (id = null) => {
  const [books, setBooks] = useState(id ? null : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const url = id ? `${apiUrl}/${id}` : `${apiUrl}`; // Fetch a single book if id is provided, otherwise fetch all books
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        setBooks(result.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        alert('An error occurred. Please check console')
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [id]);  // Fetch data when id changes

  return { books, loading, error };
};

export default useFetchBooks;

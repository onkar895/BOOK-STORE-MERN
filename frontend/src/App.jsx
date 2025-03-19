import { useState, useEffect } from "react";
import HomePage from "./Pages/HomePage";
import CreateBooks from "./Pages/CreateBooks";
import EditBooks from "./Pages/EditBooks";
import DeleteBooks from "./Pages/DeleteBooks";
import ShowBook from "./Pages/ShowBook";
import { Routes, Route } from "react-router-dom";
import Spinner from "./Components/Spinner";
import AboutPage from "./Pages/AboutPage";
import AllBooks from "./Pages/AllBooks";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Show content after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []); // Empty dependency array to run only once

  return (
    <>
      <div className="min-h-screen bg-slate-900">
        {loading ? (
          <Spinner /> // Show spinner when loading
        ) : (
          <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route exact path='/about' element={<AboutPage />} />
            <Route exact path='/books' element={<AllBooks/>} />
            <Route exact path='/books/create' element={<CreateBooks />} />
            <Route exact path='/books/details/:id' element={<ShowBook />} />
            <Route exact path='/books/edit/:id' element={<EditBooks />} />
            <Route exact path='/books/delete/:id' element={<DeleteBooks />} />
          </Routes>
        )}
      </div>
    </>
  );
}

export default App;
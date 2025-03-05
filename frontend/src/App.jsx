import { useState, useEffect } from 'react'
import HomePage from './Pages/HomePage'
import CreateBooks from './Pages/CreateBooks'
import EditBooks from './Pages/EditBooks'
import DeleteBooks from './Pages/DeleteBooks'
import ShowBooks from './Pages/ShowBooks'
import {Routes, Route} from 'react-router-dom'
import Spinner from './Components/Spinner'

function App() {
  
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false) // Show content after 3 seconds
    }, 3000)

    return () => clearTimeout(timer) // Cleanup timer
  }, []) // Empty dependency array to run only once

  return (
    <>
      {loading ? (
        <Spinner /> // Show spinner when loading
      ) : (
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/books/create' element={<CreateBooks />} />
          <Route exact path='/books/details/:id' element={<ShowBooks />} />
          <Route exact path='/books/edit/:id' element={<EditBooks />} />
          <Route exact path='/books/delete/:id' element={<DeleteBooks />} />
        </Routes>
      )}
    </>
  )
}

export default App

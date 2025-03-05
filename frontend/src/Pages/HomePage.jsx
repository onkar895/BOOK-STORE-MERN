import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { MdOutlineAddBox } from 'react-icons/md'
import { apiUrl } from '../utils/bookAPI'
import BooksTable from '../Components/BooksTable'
import BooksCard from '../Components/BooksCard' // Correct import path

const HomePage = () => {
  const [data, setData] = useState([])
  const [showType, setShowType] = useState('table')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl)
        const result = await response.json()
        console.log(result.data)
        setData(result.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='flex flex-col items-center justify-center p-4 min-h-screen my-10 gap-10'>
      <div className='flex justify-center items-center gap-20'>
        <h1 className='text-2xl md:text-3xl text-white'>List Of Books</h1>
        <NavLink to='/books/create' className="flex items-center gap-2 text-xl text-sky-500 hover:text-sky-400">
          <MdOutlineAddBox className='text-4xl' />
          <h1>Create New Book</h1>
        </NavLink>
      </div>
      
      <div className='flex justify-center'>
        <button
          className={`mx-2 px-6 py-2 ${
            showType === 'table' ? 'bg-sky-500 text-white' : 'bg-sky-200'
          } rounded-md`}
          onClick={() => setShowType('table')}
        >
          View in Table
        </button>
        <button
          className={`mx-2 px-6 py-2 ${
            showType === 'card' ? 'bg-sky-500 text-white' : 'bg-sky-200'
          } rounded-md`}
          onClick={() => setShowType('card')}
        >
          View in Card
        </button>
      </div>

      {
        showType === 'table' ? (
          <BooksTable books={data} />
        ) : (
          <BooksCard books={data} />
        )
      }
    </div>
  )
}

export default HomePage
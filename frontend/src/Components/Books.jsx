import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
import {apiUrl} from '../utils/bookAPI'

const Books = () => {
  const [getData, setGetData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl)
        const result = await response.json()
        console.log(result.data)
        setGetData(result.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const headingStyle = 'border border-slate-600 p-3'
  const dataStyle = 'border border-slate-700 text-center p-4'

  return (
    <div className="w-full min-h-screen my-12 px-4 flex flex-col items-center">
      {/* Header and Add Button */}
      <div className="w-full flex justify-between items-center max-w-6xl mb-4">
        <h1 className="text-3xl text-white font-semibold">List Of Books</h1>
        <NavLink to="/books/create">
          <MdOutlineAddBox className="text-sky-600 hover:text-sky-500 text-4xl" />
        </NavLink>
      </div>

      {/* Table Container for responsiveness */}
      <div className="w-full max-w-6xl overflow-x-auto">
        <table className="w-full border-separate border-spacing-2 border-slate-600 mt-4 text-sm sm:text-base">
          <thead>
            <tr className="text-white/70 bg-gray-800">
              <th className={headingStyle}>No</th>
              <th className={headingStyle}>Title</th>
              <th className={headingStyle}>Author</th>
              <th className={`${headingStyle} hidden md:table-cell`}>Price</th>
              <th className={`${headingStyle} hidden lg:table-cell`}>Description</th>
              <th className={headingStyle}>Published Year</th>
              <th className={headingStyle}>Operations</th>
            </tr>
          </thead>
          <tbody>
            {
              getData &&
              getData.map((data, index) => (
                <tr key={data._id} className="text-white/70 even:bg-gray-900 odd:bg-gray-800">
                  <td className={dataStyle}>{index + 1}</td>
                  <td className={dataStyle}>{data.title}</td>
                  <td className={dataStyle}>{data.author}</td>
                  <td className={`${dataStyle} hidden md:table-cell`}>{data.price}</td>
                  <td className={`${dataStyle} hidden lg:table-cell`}>{data.description}</td>
                  <td className={dataStyle}>{data.publishYear}</td>
                  <td className={dataStyle}>
                    <div className="flex justify-center gap-4">
                      <NavLink to={`/books/details/${data._id}`}>
                        <BsInfoCircle className="text-green-500 text-lg sm:text-2xl" />
                      </NavLink>
                      <NavLink to={`/books/edit/${data._id}`}>
                        <AiOutlineEdit className="text-blue-400 text-lg sm:text-2xl" />
                      </NavLink>
                      <NavLink to={`/books/delete/${data._id}`}>
                        <MdOutlineDelete className="text-red-500 text-lg sm:text-2xl" />
                      </NavLink>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Books

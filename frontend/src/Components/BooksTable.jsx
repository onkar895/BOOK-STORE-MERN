import React from 'react'
import { NavLink } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BooksTable = ({books}) => {

  const headingStyle = 'border border-slate-600 p-3'
  const dataStyle = 'border border-slate-700 text-center p-4'

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-separate border-spacing-2 border-slate-600 mt-4 text-sm sm:text-base">
         <thead>
            <tr className="text-white bg-gray-800">
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
              books &&
              books.map((data, index) => (
                <tr key={data._id} className="text-white/70 even:bg-gray-900 odd:bg-gray-800">
                  <td className={dataStyle}>{index + 1}</td>
                  <td className={dataStyle}>{data.title}</td>
                  <td className={dataStyle}>{data.author}</td>
                  <td className={`${dataStyle} hidden md:table-cell`}>${data.price}</td>
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
  )
}

export default BooksTable

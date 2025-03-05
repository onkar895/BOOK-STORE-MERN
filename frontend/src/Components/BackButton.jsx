import React from 'react'
import { NavLink } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

const BackButton = ({destination = '/'}) => {
  return (
    <div className='flex'>
      <NavLink to={destination} className="inline-flex items-center justify-center bg-sky-600 hover:bg-sky-500 p-1 rounded-full">
        <BsArrowLeft className='text-3xl text-white bg-transparent' />
      </NavLink>
    </div>
  )
}

export default BackButton

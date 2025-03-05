import React from 'react'

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin h-16 w-16 border-4 border-sky-500 border-t-transparent rounded-full"></div>
    </div>
  )
}

export default Spinner

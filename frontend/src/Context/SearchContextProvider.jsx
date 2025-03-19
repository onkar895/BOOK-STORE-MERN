import React, { useState } from 'react'
import SearchContext from './SearchContext';

const SearchContextProvider = ({children}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchContext.Provider  value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  )
}

export default SearchContextProvider

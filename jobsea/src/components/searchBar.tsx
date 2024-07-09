import React, { useState } from 'react'
import searchBarCSS from './searchBar.module.css'

type Props = {
  getInput: (input: string) => void
}

const SearchBar: React.FunctionComponent<Props> = ({ getInput }) => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const isKeyEntered = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //if (!e) e = window.event;
    var keyCode = e.code || e.key
    if (keyCode === 'Enter') {
      getInput(searchQuery)
    }
  }

  return (
    <div className={searchBarCSS.searchBarCSS}>
      <input
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder='Search...'
        onKeyDown={isKeyEntered}
      />
    </div>
  )
}

export default SearchBar

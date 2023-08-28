import React, { useState } from "react";
import searchBarCSS from "./searchBar.module.css";

const SearchBar = (props) => {
  const [searchQuery, setSearchQuery] = useState();
  
  const isKeyEntered = (e) => {
    if (!e) e = window.event;
    var keyCode = e.code || e.key;
    if (keyCode === "Enter") {
      props.getInput(searchQuery);
    }
  };

  return (
    <div className={searchBarCSS.searchBarCSS}>
      <input
        onChange={setSearchQuery}
        placeholder="Search..."
        onKeyDown={isKeyEntered}
      />
    </div>
  );
};

export default SearchBar;

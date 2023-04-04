import React, { useEffect } from "react";
import SearchBar from "../components/searchBar";
import jobsCSS from "./jobs.module.css";
import { useState } from "react";

const Header = (props) => {
  return (
    <div className={jobsCSS.logonOptions}>
      <div>Hello Daniel</div>
      <div>|</div>
      <div onClick={props.signOut}>Sign out</div>
    </div>
  );
};

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState();

  useEffect(() => {}, [searchQuery]);

  const signOut = () => {
    localStorage.removeItem("token");
  };

  const getSearchQuery = (searchInput) => {
    setSearchQuery(searchInput);
  };

  return (
    <div className={jobsCSS.jobsCSS}>
      <Header signOut={signOut} />
      <SearchBar getInput={getSearchQuery} />
    </div>
  );
};

export default Jobs;

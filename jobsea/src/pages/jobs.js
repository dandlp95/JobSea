import React, { useEffect } from "react";
import SearchBar from "../components/searchBar";
import jobsCSS from "./jobs.module.css";
import { useState } from "react";

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState();
  useEffect(() => {
  }, [searchQuery]);
  const getSearchQuery = (searchInput) => {
    setSearchQuery(searchInput);
  };
  return (
    <div className={jobsCSS.jobsCSS}>
      <SearchBar getInput={getSearchQuery} />
    </div>
  );
};

export default Jobs;

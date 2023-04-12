import React, { useEffect } from "react";
import SearchBar from "../components/searchBar";
import JobPreview from "../components/jobPreview";
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

  const job = {
    position: "Full Stack Developer",
    status: "Applied on 1/11/2022",
    company: "Shopify",
    updates: [
      {
        preview: "talked to them on the phone..."
      },
      {
        preview: "I had the best interview"
      },
      {
        preview: "I don't know what else to put here..."
      }
    ]
  };

  return (
    <div className={jobsCSS.jobsCSS}>
      <Header signOut={signOut} />
      <SearchBar getInput={getSearchQuery} />
      <div className={jobsCSS.jobs}>
        <JobPreview job={job} />
      </div>
    </div>
  );
};

export default Jobs;

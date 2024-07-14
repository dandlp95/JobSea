import React, { useState, useEffect } from 'react';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Initial page number

  useEffect(() => {
    // Function to fetch applications
    const fetchApplications = async () => {
      setLoading(true);
      try {
        // Replace with your API endpoint and parameters
        const response = await fetch(`your-api-endpoint?page=${page}&pageSize=10`);
        const data = await response.json();
        setApplications((prevApplications) => [...prevApplications, ...data]); // Append new applications to existing list
        setPage((prevPage) => prevPage + 1); // Increment page for next fetch
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
      setLoading(false);
    };

    // Initial load
    fetchApplications();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on component mount

  // Function to handle scroll event
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // User has scrolled to the bottom
      fetchApplications(); // Fetch more applications
    }
  };

  // Attach scroll event listener when component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <h1>Job Applications</h1>
      {applications.map((app) => (
        <div key={app.id}>
          {/* Render your application details here */}
          <p>{app.title}</p>
          <p>{app.company}</p>
          {/* Add more details as needed */}
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ApplicationList;

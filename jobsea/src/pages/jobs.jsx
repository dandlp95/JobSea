import React, { useEffect, useState } from 'react'
import SearchBar from '../components/searchBar'
import JobPreview from '../components/jobPreview'
import jobsCSS from './jobs.module.css'
import AddJob from '../components/addJob'
import { useNavigate } from 'react-router-dom'

const Header = props => {
  return (
    <div className={jobsCSS.logonOptions}>
      <div>Hello Daniel</div>
      <div>|</div>
      <div onClick={props.signOut}>Sign out</div>
    </div>
  )
}

const Jobs = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState()
  const [jobs, setJobs] = useState([])
  const [urlChange, setUrlChange] = useState()

  useEffect(() => {}, [searchQuery])

  useEffect(() => {
    const getApplications = async () => {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      const options = {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      const response = await fetch(
        'https://localhost:7283' +
          '/jobsea/jobapplication/GetAllApplications/' +
          userId,
        options
      )
      if (response.ok) {
        const responseObject = await response.json()
        setJobs(responseObject.result)
        console.log(responseObject)
      }
    }
    getApplications()
  }, [])

  const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
    navigate('/')
  }

  const getSearchQuery = searchInput => {
    setSearchQuery(searchInput)
  }

  const job = {
    position: 'Full Stack Developer',
    status: 'Applied on 1/11/2022',
    company: 'Shopify',
    updates: [
      {
        preview: 'talked to them on the phone...'
      },
      {
        preview: 'I had the best interview'
      },
      {
        preview: "I don't know what else to put here..."
      }
    ]
  }

  return (
    <div className={jobsCSS.jobsCSS}>
      <Header signOut={signOut} />
      <SearchBar getInput={getSearchQuery} />
      <div className={jobsCSS.jobs}>
        {/* <JobPreview job={job} /> */}
        {/* {jobs && jobs.map((job)=>(
          <JobPreview job={job}/>
        ))} */}
      </div>
      <AddJob />
    </div>
  )
}

export default Jobs

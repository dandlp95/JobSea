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
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isAddJobActive, setIsAddJobActive] = useState(false)

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
      }
    }
    getApplications()
  }, [formSubmitted])

  const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
    navigate('/')
  }

  const getSearchQuery = searchInput => {
    setSearchQuery(searchInput)
  }

  const reRenderParent = () => {
    setFormSubmitted(!formSubmitted)
  }

  return (
    <div className={jobsCSS.jobsCSS}>
      <Header signOut={signOut} />
      <SearchBar getInput={getSearchQuery} />
      <div className={jobsCSS.jobs}>
        {jobs && jobs.map(job => <JobPreview job={job} />)}
      </div>
      {isAddJobActive && <AddJob reRenderParentFunction={reRenderParent} />}
    </div>
  )
}

export default Jobs

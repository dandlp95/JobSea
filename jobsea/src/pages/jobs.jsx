import React, { useEffect, useState } from 'react'
import SearchBar from '../components/searchBar'
import JobPreview from '../components/jobPreview'
import jobsCSS from './jobs.module.css'
import AddJob from '../components/addJob'
import { useNavigate } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'

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
          `/jobsea/users/${userId}/applications`, options
      )
      const responseObject = await response.json()
      if (response.ok) {
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

  const addApplication = () => {
    setIsAddJobActive(true)
  }

  const closeApplication = () => {
    setIsAddJobActive(false)
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
      <div className={jobsCSS.alignContainer}>
        <div className={jobsCSS.topContainer}>
          <SearchBar getInput={getSearchQuery} />
          <div
            className={jobsCSS.addApplicationSection}
            onClick={addApplication}
          >
            <AiOutlinePlus />
            <span>Add Application</span>
          </div>
        </div>
        <div className={jobsCSS.jobs}>
          {jobs && jobs.map(job => <JobPreview job={job} reRenderParentFunction={reRenderParent}/>)}
        </div>
      </div>
      {isAddJobActive && (
        <AddJob reRenderParentFunction={reRenderParent} closeComponentFunction={closeApplication} />
      )}
    </div>
  )
}

export default Jobs

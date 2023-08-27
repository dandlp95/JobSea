import React, { useEffect, useState } from 'react'
import SearchBar from '../components/searchBar'
import JobPreview from '../components/jobPreview'
import jobsCSS from './jobs.module.css'
import AddJob from '../components/addJob'
import { useNavigate } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import apiService from '../utilities/ApiService'

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
      const userId = localStorage.getItem('userId')
      const pathParam = {
        userId: userId
      }
      apiService
        .get('users/{userId}/applications', pathParam)
        .then(response => {
          setJobs(response.result)
        })
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
          {jobs &&
            jobs.map(job => (
              <JobPreview job={job} reRenderParentFunction={reRenderParent} />
            ))}
        </div>
      </div>
      {isAddJobActive && (
        <AddJob
          reRenderParentFunction={reRenderParent}
          closeComponentFunction={closeApplication}
        />
      )}
    </div>
  )
}

export default Jobs

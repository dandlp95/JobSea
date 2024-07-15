import React, { useEffect, useState } from 'react'
import SearchBar from '../components/searchBar'
import JobPreview from '../components/jobPreview'
import jobsCSS from './jobs.module.css'
import AddJob from '../components/addJob'
import { useNavigate } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import { ApiData, ApplicationDTO } from '../customTypes/responseTypes'
import { createApplicationApiService } from '../utilities/ApiServices/ApplicationsApiService'
import { FilterOptions, PathParams } from '../customTypes/requestTypes'
import FilterMenu from '../components/filterMenu'
import IApplicationApiService from '../utilities/interfaces/IApplicationApiService'
import { getApplications } from '../utilities/getApplications'
import Spinner from '../components/spinner'

type HeaderProps = {
  signOut: () => void
}

const Header: React.FunctionComponent<HeaderProps> = ({ signOut }) => {
  return (
    <div className={jobsCSS.logonOptions}>
      <div>Hello Daniel</div>
      <div>|</div>
      <div onClick={signOut}>Sign out</div>
    </div>
  )
}

const Jobs: React.FunctionComponent = () => {
  const [skip, setSkip] = useState<number>(10)
  const [showSpinner, setShowSpinner] = useState<boolean>(false)
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [jobs, setJobs] = useState<ApplicationDTO[]>([])
  const [urlChange, setUrlChange] = useState()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isAddJobActive, setIsAddJobActive] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({
    Company: [],
    Cities: [],
    States: [],
    Modalities: [],
    StatusId: [],
    SalaryRange: { min: null, max: null }
  })

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    const ApplicationsApiService = createApplicationApiService()

    if (userId) {
      // setShowSpinner(true);
      getApplications(userId, ApplicationsApiService, filters, searchQuery, 0).then(response => {
        setJobs(response.result ? response.result : [])
        // setShowSpinner(false);
      })
    } else {
      //implemment later...
    }

    setSkip(10)
  }, [formSubmitted, filters, searchQuery])

  const handleScroll = () => {
    //If user reaches the bottom of the page, more applications are loaded
    const userId = localStorage.getItem('userId')
    const ApplicationsApiService = createApplicationApiService()

    if (userId) {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
        // setShowSpinner(true)
        getApplications(userId, ApplicationsApiService, filters, searchQuery, skip).then(
          response => {
            if (response.result) {
              setJobs(previousJobs => [...previousJobs, ...(response.result as [])])
              setSkip(prevSkip => prevSkip + 10)
              // setShowSpinner(false)
            }
          }
        )
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    // The return statement inside useEffect allows you to define a clean-up function. This function is executed when:
    // The component is about to be unmounted from the DOM, or before the effect runs again due to changes in dependencies (if specified).
    // Execution Timing:

    // When the component first mounts, React executes the effect function (window.addEventListener('scroll', handleScroll);).
    // Before the next execution of the effect function (either due to unmounting or due to changes in dependencies), React executes the clean-up function defined by the return statement.
    return () => window.removeEventListener('scroll', handleScroll)

    //since handlescroll uses the 3 params below, it needs to be re added to the scroll event listeners with the updated values...
  }, [skip, filters, searchQuery])

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

  const getSearchQuery = (searchInput: string) => {
    setSearchQuery(searchInput)
  }

  const reRenderParent = () => {
    setFormSubmitted(!formSubmitted)
  }

  const sendFilterValues = (filterValues: FilterOptions) => {
    setFilters(filterValues)
  }

  const hideScrollBar = `html {overflow: hidden};`

  return (
    <div className={jobsCSS.jobsCSS}>
      {/* Removes scrolling from elements behind the AddJob component when active. */}
      {isAddJobActive && <style>{hideScrollBar}</style>}
      <Header signOut={signOut} />
      <div className={jobsCSS.mainFlexContainer}>
        <div className={jobsCSS.filterMenu}>
          <FilterMenu sendFilterValues={sendFilterValues} />
        </div>
        <div className={jobsCSS.alignContainer}>
          <div className={jobsCSS.topContainer}>
            <SearchBar getInput={getSearchQuery} />
            <div className={jobsCSS.addApplicationSection} onClick={addApplication}>
              <AiOutlinePlus />
              <span>Add Application</span>
            </div>
          </div>
          <div className={jobsCSS.jobs}>
            {jobs &&
              jobs.map(job => <JobPreview job={job} key={job.applicationId} reRenderParentFunction={reRenderParent} />)}
          </div>
          <div className={jobsCSS.spinnerContainer}>{showSpinner && <Spinner />}</div>
        </div>
      </div>
      {/* 
      //Loading spinner not needed for now as data is quickly retrieved...
      {isAddJobActive && (
        <AddJob reRenderParentFunction={reRenderParent} closeComponentFunction={closeApplication} />
      )} */}
    </div>
  )
}

export default Jobs

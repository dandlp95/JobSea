import React, { useEffect, useState, useCallback } from 'react'
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
import { getApplications } from '../utilities/getApplications'
import Spinner from '../components/spinner'
const skipNumber: number = 8

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
  const [skip, setSkip] = useState<number>(skipNumber)
  // const [showSpinner, setShowSpinner] = useState<boolean>(false)
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [jobs, setJobs] = useState<ApplicationDTO[]>([])
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
    setSkip(skipNumber)
  }, [formSubmitted, filters, searchQuery])

  const handleScroll = () => {
    const userId = localStorage.getItem('userId');
    const ApplicationsApiService = createApplicationApiService();

    if (userId) {
      const isAtBottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
      if (isAtBottom) {
        console.log('firedup')
        getApplications(userId, ApplicationsApiService, filters, searchQuery, skip).then(response => {
          if (response.result) {
            setJobs(previousJobs => {
              // Filter out duplicates because some times this gets fired up twice when scrolling
              
              // It worked here because i am using the jobs states from the call back, as before I was using simply
              // jobs which wasn't always the most up to date state. Still need to figure out why this gets fired
              // up twice during initial scrolling.
              const newJobs = (response.result as ApplicationDTO[]).filter(newJob => (
                !previousJobs.some(existingJob => existingJob.applicationId === newJob.applicationId)
              ));
              return [...previousJobs, ...newJobs];
            });
            setSkip(prevSkip => prevSkip + skipNumber);
          }
        });
      }
    }
  };
  
  useEffect(() => {
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [skip, filters, searchQuery]); // Ensure dependencies are accurate
  

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
              jobs.map(job => (
                <JobPreview
                  job={job}
                  key={job.applicationId}
                  reRenderParentFunction={reRenderParent}
                />
              ))}
          </div>
          {/* <div className={jobsCSS.spinnerContainer}>{showSpinner && <Spinner />}</div> */}
        </div>
      </div>
      {isAddJobActive && (
        <AddJob reRenderParentFunction={reRenderParent} closeComponentFunction={closeApplication} />
      )}
    </div>
  )
}

export default Jobs

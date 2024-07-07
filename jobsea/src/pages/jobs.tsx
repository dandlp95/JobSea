import React, { useEffect, useState } from 'react'
import SearchBar from '../components/searchBar'
import JobPreview from '../components/jobPreview'
import jobsCSS from './jobs.module.css'
import AddJob from '../components/addJob'
import { useNavigate } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import { ApplicationDTO } from '../customTypes/responseTypes'
import { createApplicationApiService } from '../utilities/ApiServices/ApplicationsApiService'
import { FilterOptions, PathParams } from '../customTypes/requestTypes'
import FilterMenu from '../components/filterMenu'

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

  // This useeffect hook will  be used to send searchquery request to backend
  useEffect(() => {}, [searchQuery])

  useEffect(() => {
    const getApplications = async () => {
      const userId = localStorage.getItem('userId')
      if (userId) {
        const pathParam: PathParams = {
          userId: parseInt(userId)
        }
        
        const ApplicationsApiService = createApplicationApiService()
        const apiData = await ApplicationsApiService.getApplications(
          'users/{userId}/applications',
          pathParam
        )
        setJobs(apiData.result ? apiData.result : [])
      } else {
        // implement later.
      }
    }
    getApplications()
  }, [formSubmitted])

  useEffect(()=>{
    console.log(JSON.stringify(filters))
    const userId = localStorage.getItem('userId')
    if(userId){
      const pathParam: PathParams = {
        userId: parseInt(userId)
      }
    }

  }, [filters])

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
              jobs.map(job => <JobPreview job={job} reRenderParentFunction={reRenderParent} />)}
          </div>
        </div>
      </div>
      {isAddJobActive && (
        <AddJob reRenderParentFunction={reRenderParent} closeComponentFunction={closeApplication} />
      )}
    </div>
  )
}

export default Jobs

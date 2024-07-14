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
const skip: number = 10

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
  const [page, setPage] = useState<number>(0)
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
    const skip = page ** 10
    if (userId) {
      console.log('filters', filters)
      getApplications(userId, ApplicationsApiService, filters, searchQuery, skip).then(response => {
        setJobs(response.result ? response.result : [])
        console.log('response', response)
      })
    } else {
      //implemment later...
    }
  }, [formSubmitted, filters, searchQuery])

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
